// 由 scripts/build-dataset.mjs 生成（源: 手工整理自 g1/g2 提取结果），行数 24
export default {
  id: 'steel-wall-thickness',
  title: 'ASME B36.10/B36.19 管道壁厚表',
  note: '单位 mm。图上未列出的壁厚等级（Sch5s、Sch100~XXS 等）为厂家原表留空，未做填补；小管径 Sch40/80 与 STD/XS 数值相同系标准合并呈现。已与 ASME 标准毫米值逐项比对一致。',
  sourceImages: ['/product/gangguan/g1.jpg', '/product/gangguan/g2.jpg'],
  columns: ['nps', 'dn', 'od_mm', 'sch5s', 'sch10s', 'sch40s', 'sch80s', 'sch10', 'sch20', 'sch30', 'std', 'sch40', 'sch60', 'xs', 'sch80', 'sch100', 'sch120', 'sch140', 'sch160', 'xxs'],
  columnTitles: {
    nps: 'NPS(in)', dn: 'DN(mm)', od_mm: 'OD 外径(mm)',
    sch5s: 'Sch5s', sch10s: 'Sch10s', sch40s: 'Sch40s', sch80s: 'Sch80s',
    sch10: 'Sch10', sch20: 'Sch20', sch30: 'Sch30', std: 'STD', sch40: 'Sch40',
    sch60: 'Sch60', xs: 'XS', sch80: 'Sch80', sch100: 'Sch100', sch120: 'Sch120',
    sch140: 'Sch140', sch160: 'Sch160', xxs: 'XXS'
  },
  rows: [
    { nps: '1/8', dn: 6, od_mm: 10.3, sch5s: null, sch10s: 1.24, sch40s: 1.73, sch80s: 2.41, sch10: null, sch20: null, sch30: null, std: 1.73, sch40: null, sch60: null, xs: 2.41, sch80: null, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '1/4', dn: 8, od_mm: 13.7, sch5s: null, sch10s: 1.65, sch40s: 2.24, sch80s: 3.02, sch10: null, sch20: null, sch30: null, std: 2.24, sch40: null, sch60: null, xs: 3.02, sch80: null, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '3/8', dn: 10, od_mm: 17.1, sch5s: null, sch10s: 1.65, sch40s: 2.31, sch80s: 3.2, sch10: null, sch20: null, sch30: null, std: 2.31, sch40: null, sch60: null, xs: 3.2, sch80: null, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '1/2', dn: 15, od_mm: 21.3, sch5s: null, sch10s: 1.65, sch40s: 2.77, sch80s: 3.73, sch10: null, sch20: null, sch30: null, std: 2.77, sch40: null, sch60: null, xs: 3.73, sch80: null, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '3/4', dn: 20, od_mm: 26.7, sch5s: null, sch10s: 1.65, sch40s: 2.87, sch80s: 3.91, sch10: null, sch20: null, sch30: null, std: 2.87, sch40: null, sch60: null, xs: 3.91, sch80: null, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '1', dn: 25, od_mm: 33.4, sch5s: null, sch10s: 1.65, sch40s: 3.38, sch80s: 4.55, sch10: null, sch20: null, sch30: null, std: 3.38, sch40: null, sch60: null, xs: 4.55, sch80: null, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '1 1/4', dn: 32, od_mm: 42.2, sch5s: null, sch10s: 1.65, sch40s: 3.56, sch80s: 4.85, sch10: null, sch20: null, sch30: null, std: 3.56, sch40: null, sch60: null, xs: 4.85, sch80: null, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '1 1/2', dn: 40, od_mm: 48.3, sch5s: null, sch10s: 1.65, sch40s: 3.68, sch80s: 5.08, sch10: null, sch20: null, sch30: null, std: 3.68, sch40: null, sch60: null, xs: 5.08, sch80: null, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '2', dn: 50, od_mm: 60.3, sch5s: null, sch10s: 1.65, sch40s: 3.91, sch80s: 5.54, sch10: null, sch20: null, sch30: null, std: 3.91, sch40: null, sch60: null, xs: 5.54, sch80: null, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '2 1/2', dn: 65, od_mm: 73.0, sch5s: null, sch10s: 2.11, sch40s: 5.16, sch80s: 7.01, sch10: null, sch20: null, sch30: null, std: 5.16, sch40: null, sch60: null, xs: 7.01, sch80: null, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '3', dn: 80, od_mm: 88.9, sch5s: null, sch10s: 2.11, sch40s: 5.49, sch80s: 7.62, sch10: null, sch20: null, sch30: null, std: 5.49, sch40: null, sch60: null, xs: 7.62, sch80: null, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '3 1/2', dn: 90, od_mm: 101.6, sch5s: null, sch10s: 2.11, sch40s: 5.74, sch80s: 8.08, sch10: null, sch20: null, sch30: null, std: 5.74, sch40: null, sch60: null, xs: 8.08, sch80: null, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '4', dn: 100, od_mm: 114.3, sch5s: null, sch10s: 2.11, sch40s: 6.02, sch80s: 8.56, sch10: null, sch20: null, sch30: null, std: 6.02, sch40: null, sch60: null, xs: 8.56, sch80: null, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '5', dn: 125, od_mm: 139.7, sch5s: null, sch10s: 2.77, sch40s: 6.55, sch80s: 9.53, sch10: null, sch20: null, sch30: null, std: 6.55, sch40: null, sch60: null, xs: 9.53, sch80: null, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '6', dn: 150, od_mm: 168.3, sch5s: null, sch10s: 2.77, sch40s: 7.11, sch80s: 10.97, sch10: null, sch20: null, sch30: null, std: 7.11, sch40: null, sch60: null, xs: 10.97, sch80: null, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '8', dn: 200, od_mm: 219.1, sch5s: null, sch10s: 2.77, sch40s: 8.18, sch80s: 12.7, sch10: null, sch20: null, sch30: null, std: 8.18, sch40: null, sch60: null, xs: 12.7, sch80: null, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '10', dn: 250, od_mm: 273.0, sch5s: null, sch10s: 3.4, sch40s: 9.27, sch80s: 15.09, sch10: null, sch20: null, sch30: null, std: 9.27, sch40: null, sch60: null, xs: 15.09, sch80: null, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '12', dn: 300, od_mm: 323.8, sch5s: null, sch10s: 3.4, sch40s: 9.53, sch80s: 17.45, sch10: null, sch20: null, sch30: null, std: 9.53, sch40: null, sch60: null, xs: 17.45, sch80: null, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '14', dn: 350, od_mm: 355.6, sch5s: null, sch10s: 3.96, sch40s: 9.53, sch80s: 19.05, sch10: 6.35, sch20: 6.35, sch30: 7.92, std: 9.53, sch40: 9.53, sch60: 15.09, xs: 15.09, sch80: 19.05, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '16', dn: 400, od_mm: 406.4, sch5s: null, sch10s: 4.78, sch40s: 10.31, sch80s: 21.44, sch10: 6.35, sch20: 6.35, sch30: 7.92, std: 10.31, sch40: 10.31, sch60: 12.7, xs: 12.7, sch80: 21.44, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '18', dn: 450, od_mm: 457.0, sch5s: null, sch10s: 4.78, sch40s: 10.97, sch80s: 23.8, sch10: 6.35, sch20: 6.35, sch30: 7.92, std: 10.97, sch40: 10.97, sch60: 14.27, xs: 14.27, sch80: 23.8, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '20', dn: 500, od_mm: 508.0, sch5s: null, sch10s: 4.78, sch40s: 11.1, sch80s: 26.19, sch10: 6.35, sch20: 6.35, sch30: 7.92, std: 11.1, sch40: 11.1, sch60: 15.09, xs: 15.09, sch80: 26.19, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '22', dn: 550, od_mm: 559.0, sch5s: null, sch10s: 4.78, sch40s: 12.7, sch80s: 28.57, sch10: 6.35, sch20: 6.35, sch30: 7.92, std: 12.7, sch40: 12.7, sch60: 15.09, xs: 15.09, sch80: 28.57, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null },
    { nps: '24', dn: 600, od_mm: 609.6, sch5s: null, sch10s: 4.78, sch40s: 14.27, sch80s: 30.94, sch10: 6.35, sch20: 6.35, sch30: 7.92, std: 14.27, sch40: 14.27, sch60: 17.45, xs: 17.45, sch80: 30.94, sch100: null, sch120: null, sch140: null, sch160: null, xxs: null }
  ]
}
