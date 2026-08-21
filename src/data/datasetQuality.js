export function datasetIsSearchReady(dataset) {
  if (!dataset || !Array.isArray(dataset.columns) || dataset.columns.length < 2) return false

  return dataset.columns.every((key) => {
    const configuredTitle = dataset.columnTitles?.[key]
    const title = typeof configuredTitle === 'object' ? configuredTitle?.title : configuredTitle
    return typeof title === 'string' && title.trim() && !/^c\d+$/i.test(title.trim())
  })
}

export function columnTitle(dataset, key) {
  const configuredTitle = dataset?.columnTitles?.[key]
  const title = typeof configuredTitle === 'object' ? configuredTitle?.title : configuredTitle
  return typeof title === 'string' && title.trim() ? title : key
}
