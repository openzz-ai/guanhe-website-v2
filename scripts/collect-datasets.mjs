#!/usr/bin/env node
/**
 * 扫描 src/data/datasets/*.js 数据文件，按文件名前缀归类品类，重新生成聚合入口 datasets.js。
 * 前缀约定：steel-* → steel；ss-* / cs-* / misc-* / material-* → fittings；flange-* → flanges
 * 用法：node scripts/collect-datasets.mjs（新增/删除数据文件后运行）
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, basename } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'src', 'data', 'datasets')

const categoryOf = (file) => {
  if (file.startsWith('steel-')) return 'steel'
  if (file.startsWith('flange-')) return 'flanges'
  if (/^(ss-|cs-|misc-|material-)/.test(file)) return 'fittings'
  return null
}

const buckets = { steel: [], fittings: [], flanges: [] }
for (const f of readdirSync(dir).filter(f => f.endsWith('.js')).sort()) {
  const cat = categoryOf(f)
  if (!cat) continue
  buckets[cat].push(`./datasets/${f.slice(0, -3)}`)
}

const header = `// 规格数据集聚合入口（由 scripts/collect-datasets.mjs 自动生成，勿手工编辑）
// 数据文件：src/data/datasets/<name>.js，由 scripts/build-dataset.mjs 从提取 JSON 生成。
// 数据准确性说明：数据由视觉识别/OCR 从原表提取，用于快速检索参考；
// 正式报价/设计前请点击"查看原图"与原表核对。
`

const body = ['steel', 'fittings', 'flanges'].map(cat => {
  const imports = buckets[cat].map(p => `import ${p.split('/').pop().replace(/-/g, '_')} from '${p}.js'`).join('\n')
  return `${imports}\nconst _${cat} = [${buckets[cat].map(p => p.split('/').pop().replace(/-/g, '_')).join(', ')}]`
}).join('\n\n')

const out = `${header}
${body}

export const datasets = {
  steel: _steel,
  fittings: _fittings,
  flanges: _flanges
}

export function getDatasets(categoryType) {
  return datasets[categoryType] || []
}
`
writeFileSync(join(root, 'src', 'data', 'datasets.js'), out)
console.log(`聚合完成：steel ${buckets.steel.length} 个 / fittings ${buckets.fittings.length} 个 / flanges ${buckets.flanges.length} 个`)
