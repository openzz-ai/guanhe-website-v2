#!/usr/bin/env node
/**
 * 从提取 JSON 生成数据集模块文件（src/data/datasets/<name>.js）。
 * 输入 JSON 支持 rows 为对象数组（原样）或列值数组（按 columns 转对象）。
 * 用法：node scripts/build-dataset.mjs <input.json> <name> <id> <sourceImages逗号分隔> [note]
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const [,, inputPath, name, id, sourceImagesArg, note] = process.argv

if (!inputPath || !name || !id) {
  console.error('用法: node scripts/build-dataset.mjs <input.json> <name> <id> <sourceImages> [note]')
  process.exit(1)
}

const raw = JSON.parse(readFileSync(inputPath, 'utf8'))
const columns = raw.columns
const columnTitles = raw.columnTitles || Object.fromEntries(columns.map(c => [c, c]))
const rows = raw.rows.map(r => (Array.isArray(r) ? Object.fromEntries(columns.map((c, i) => [c, r[i] ?? null])) : r))

const sourceImages = (sourceImagesArg || '').split(',').map(s => s.trim()).filter(Boolean)

const ds = {
  id,
  title: raw.title,
  note: note || raw.note || '',
  sourceImages,
  columns,
  columnTitles,
  rows
}

const out = `// 由 scripts/build-dataset.mjs 生成（源: ${inputPath}），行数 ${rows.length}
export default ${JSON.stringify(ds, null, 2)}
`

const dir = join(root, 'src', 'data', 'datasets')
mkdirSync(dir, { recursive: true })
writeFileSync(join(dir, `${name}.js`), out)
console.log(`生成 ${name}.js：${rows.length} 行，${columns.length} 列`)
