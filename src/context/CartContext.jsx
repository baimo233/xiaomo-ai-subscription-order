import { createContext, useContext, useMemo, useState } from 'react'
import { getProduct } from '../data/products.js'

const STORAGE_KEY = 'xiaomo-lab-cart'

function readCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart)

  function persist(next) {
    setItems(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const api = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0)
    const total = items.reduce((sum, item) => {
      const product = getProduct(item.id)
      return sum + (product ? product.price * item.qty : 0)
    }, 0)

    return {
      items,
      count,
      total,
      addItem(id, qty = 1) {
        const next = [...items]
        const found = next.find((item) => item.id === id)
        if (found) found.qty += qty
        else next.push({ id, qty })
        persist(next)
      },
      setQty(id, qty) {
        if (qty < 1) {
          persist(items.filter((item) => item.id !== id))
          return
        }
        persist(items.map((item) => (item.id === id ? { ...item, qty } : item)))
      },
      removeItem(id) {
        persist(items.filter((item) => item.id !== id))
      },
      clear() {
        persist([])
      },
    }
  }, [items])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart must be used within CartProvider')
  return value
}
