import test from 'node:test'
import assert from 'node:assert/strict'
import { getPricing, isCampaignActive } from '../src/data/promotions.js'
import { getProduct, isPurchasable } from '../src/data/products.js'

const at = date => Date.parse(date)
const sale = { id: 'test', enabled: true, annual: { start: '10-01', end: '10-08' }, salePrices: { 'chatgpt-pro-100': 600 } }
test('Pro prices are available and no longer pending', () => {
  for (const [quota, price] of [[100,685],[200,1200],[500,3399]]) {
    const product = getProduct(`chatgpt-pro-${quota}`)
    assert.equal(product.price, price)
    assert.equal(isPurchasable(product), true)
  }
})
test('Annual China-time boundaries repeat across years and restore base prices', () => {
  for (const year of [2026, 2027, 2028]) {
    assert.equal(isCampaignActive(sale, at(`${year}-09-30T23:59:59+08:00`)), false)
    assert.equal(isCampaignActive(sale, at(`${year}-10-01T00:00:00+08:00`)), true)
    assert.equal(isCampaignActive(sale, at(`${year}-10-07T23:59:59+08:00`)), true)
    assert.equal(isCampaignActive(sale, at(`${year}-10-08T00:00:00+08:00`)), false)
    assert.equal(getPricing(getProduct('chatgpt-pro-100'), at(`${year}-10-07T23:59:59+08:00`), [sale]).price, 600)
    assert.equal(getPricing(getProduct('chatgpt-pro-100'), at(`${year}-10-08T00:00:00+08:00`), [sale]).price, 685)
  }
})
test('Invalid discounts, disabled campaigns and unavailable items cannot reduce prices', () => {
  const now = at('2026-10-02T12:00:00+08:00')
  const product = getProduct('chatgpt-pro-100')
  for (const price of [0,0.001,-1,null,undefined,NaN,700,'600']) {
    assert.equal(getPricing(product, now, [{ ...sale, salePrices: { [product.id]: price } }]).price, 685)
  }
  assert.equal(getPricing(product, now, [{ ...sale, enabled: false }]).price, 685)
  assert.equal(getPricing(getProduct('gemini-pro'), now, [{ ...sale, salePrices: { 'gemini-pro': 50 } }]).price, null)
})
test('Overlapping offers use the lowest price without stacking and preserve snapshot metadata', () => {
  const offer = getPricing(getProduct('chatgpt-pro-100'), at('2027-10-02T00:00:00+08:00'), [sale, { ...sale, id: 'lower', salePrices: { 'chatgpt-pro-100': 580.5 } }])
  assert.equal(offer.price, 580.5)
  assert.equal(offer.originalPrice, 685)
  assert.equal(offer.saving, 104.5)
  assert.equal(offer.campaign.id, 'lower')
})
