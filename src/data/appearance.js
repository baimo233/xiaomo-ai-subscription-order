export const palettes = [
  { id: 'mist', colors: ['#dce7ee', '#426b88'], names: { 'zh-CN': '雾蓝', 'zh-TW': '霧藍', en: 'Mist blue' } },
  { id: 'cream', colors: ['#efe2cf', '#88694b'], names: { 'zh-CN': '奶油', 'zh-TW': '奶油', en: 'Cream' } },
  { id: 'sage', colors: ['#dce6dc', '#526f60'], names: { 'zh-CN': '鼠尾草绿', 'zh-TW': '鼠尾草綠', en: 'Sage' } },
  { id: 'lilac', colors: ['#e5def0', '#73608d'], names: { 'zh-CN': '浅紫', 'zh-TW': '淺紫', en: 'Lilac' } },
]

export const paletteLabels = { 'zh-CN': '页面配色', 'zh-TW': '頁面配色', en: 'Page colors' }
export function validPalette(value) { return palettes.some(item => item.id === value) ? value : 'mist' }
