# 大连管和件官网 v2（重构版）

工业深蓝商务风格的企业官网，替代原 fullpage.js 单页版本。

官网域名：www.dlpipefitting.com

## 与旧版 (2023 交付版) 的区别

| 项 | 旧版 | 新版 |
|---|---|---|
| 交互 | vue-fullpage.js 全屏滚动（盗版 license） | vue-router 多页面常规滚动 |
| 产品展示 | 按钮弹出参数图集 | 三模式：规格图纸 / 数据检索 / 电子样本 |
| 视觉 | 彩虹渐变大字/波浪动画 | 深蓝 #0B3C5D 商务风 |
| 语言切换 | hover 中英 hack + 下拉并存 | voerkai18n 统一下拉（响应式，无需刷新） |
| SEO | 无路由单页 | 每页独立 title/meta |

## 技术栈

Vue 3 + Vite + Vue Router + Vuetify 3 + voerkai18n（7 语种） + viewerjs

## 开发

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # 产出 dist/
```

## 产品内容的三种呈现

产品页（/products/:type）顶部可切换：

1. **规格图纸**：34 张规格表截图按品类分组，关键字搜索（B16.9、A53、900#、弯头…），点击 viewerjs 放大
2. **数据检索**：从规格表/样本册提取的结构化数据（v-data-table 全字段筛选、排序、分页），每个数据集可"查看原表图片"对照
3. **电子样本**（/catalog）：61 页产品样本册逐页高清翻阅（章节跳转、页码跳转、全屏缩放），作为人工核对的数据源头

数据提取说明见 `scripts/extract-plan.md`（视觉识别提取，准确率约 97-99%，正式报价前请对照原表）。

## 目录结构

```
src/
├── data/
│   ├── products.js    # 产品品类 + 规格表元数据（图纸模式）
│   ├── datasets.js    # 结构化表格数据（数据检索模式，视觉提取生成）
│   ├── catalog.js     # 电子样本章节定义
│   └── company.js     # 公司信息、简介分段、合作钢厂、出口市场
├── components/        # NavBar / AppFooter / SpecGrid / SpecData
├── views/             # Home / About / Products / Contact / Catalog
├── languages/         # voerkai18n 语言包
└── router/
scripts/
├── add-translations.mjs  # 批量注入多语言词条
└── extract-plan.md       # PDF 数据提取计划与纪律
public/
├── catalog/          # 样本册 61 页页面图（150dpi）
├── product/          # 规格表原图
└── images/           # 背景图等素材
```

## 添加产品规格表（图纸模式）

1. 图片放入 `public/product/<品类目录>/`
2. 在 `src/data/products.js` 对应品类的 `specs` 数组追加条目：
   `{ file, title, category, keywords: [...] }`

## 添加结构化数据集（数据检索模式）

在 `src/data/datasets.js` 对应品类数组追加：
```js
{
  id: 'flange-150-300-dims',
  title: '法兰尺寸表 150#/300#',
  note: '单位说明（可选）',
  sourceImages: ['/catalog/page-39.jpg'],
  columns: ['nps', 'od', ...],
  columnTitles: { nps: 'NPS(in)', od: '外径(mm)', ... },
  rows: [ { nps: '1/2', od: 89, ... }, ... ]
}
```

## 上线前待办

- [ ] Footer 备案号占位 `辽ICP备XXXXXXXX号` 替换为真实备案号（AppFooter.vue）
- [ ] 联系页地图为低分辨率截图（662x438），建议换成高德/百度地图嵌入
- [ ] 留言板直连飞书 webhook（继承旧版），如需防滥用可加后端代理或验证码
- [ ] 数据检索数据为视觉提取，建议业务人员对照电子样本逐表抽检一遍关键规格
