export const productFinderEntries = [
  {
    id: 'steel-pipe', category: 'steel', title: 'Steel Pipe',
    subtitle: 'Seamless, welded and line pipe for industrial projects',
    examples: ['API 5L line pipe', 'Seamless pipe', 'Boiler tube'],
    keywords: ['pipe', 'tube', 'seamless', 'welded', 'line pipe', 'api', 'astm', 'steel', '管', '钢管', '无缝', '焊管']
  },
  {
    id: 'butt-weld-fittings', category: 'fittings', title: 'Pipe Fittings',
    subtitle: 'Elbows, tees, reducers and caps in carbon or stainless steel',
    examples: ['90 degree elbow', 'Reducing tee', 'Concentric reducer'],
    keywords: ['fitting', 'elbow', 'tee', 'reducer', 'cap', 'butt weld', 'socket', 'threaded', 'sch', '管件', '弯头', '三通', '异径管', '管帽', '承插焊', '螺纹']
  },
  {
    id: 'industrial-flanges', category: 'flanges', title: 'Industrial Flanges',
    subtitle: 'ANSI, DIN and high-pressure flanges for pipeline connections',
    examples: ['Weld neck flange', 'Class 150 flange', 'DIN PN16 flange'],
    keywords: ['flange', 'weld neck', 'slip on', 'blind', 'class', 'pn', '150lb', '300lb', 'din', 'ansi', '法兰', '对焊法兰', '平焊法兰', '盲板']
  }
]

function normalize(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, ' ').trim()
}

export function findProductMatches(query) {
  const normalizedQuery = normalize(query)
  if (!normalizedQuery) return productFinderEntries

  const terms = normalizedQuery.split(' ').filter((term) => term.length > 1)
  return productFinderEntries
    .map((item) => {
      const searchable = normalize([item.title, item.subtitle, ...item.examples, ...item.keywords].join(' '))
      const score = terms.reduce((total, term) => total + (searchable.includes(term) ? 1 : 0), 0)
      return { ...item, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
}
