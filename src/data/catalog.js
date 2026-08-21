// 电子样本：PDF 逐页高清图（public/catalog/page-XX.jpg）
export const catalogTotal = 61

export function pageSrc(n) {
  return `/catalog/page-${String(n).padStart(2, '0')}.jpg`
}

export const catalogSections = [
  { titleKey: '公司简介', from: 1, to: 5 },
  { titleKey: '管件产品', from: 6, to: 38 },
  { titleKey: '法兰产品', from: 39, to: 61 }
]
