import assert from 'node:assert/strict'
import test from 'node:test'
import { datasetIsSearchReady } from '../src/data/datasetQuality.js'
import { findProductMatches } from '../src/data/productFinder.js'

test('finds flange guidance from a buyer-style search', () => {
  const matches = findProductMatches('6 inch 150 lb flange')
  assert.equal(matches[0].category, 'flanges')
})

test('understands Chinese product terms as well as English terms', () => {
  const matches = findProductMatches('不锈钢弯头')
  assert.ok(matches.some((item) => item.id === 'butt-weld-fittings'))
})

test('shows all product starting points when a buyer has not entered a term', () => {
  assert.equal(findProductMatches('').length, 3)
})

test('keeps unlabelled OCR tables out of customer-facing data search', () => {
  assert.equal(datasetIsSearchReady({ columns: ['raw'], columnTitles: { raw: 'raw' } }), false)
  assert.equal(datasetIsSearchReady({ columns: ['nps', 'od'], columnTitles: { nps: 'NPS', od: 'OD (mm)' } }), true)
})
