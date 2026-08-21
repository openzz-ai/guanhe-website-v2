# PDF 全量数据提取计划（因限额中断后恢复用）

任务：把 ~/Downloads/大连管和件管道有限公司-交付-20230105/大连管和件管道有限公司样本.pdf 的全部表格内容提取为结构化数据，写入 ~/Projects/guanhe-website-v2/src/data/datasets/。

高清页图已就绪：/tmp/catalog-hd/page-01.jpg ~ page-61.jpg（200dpi，若被清理则用以下命令重转）：
```sh
mkdir -p /tmp/catalog-hd && pdftoppm -jpeg -r 200 -jpegopt quality=88 "/Users/zhanghui/Downloads/大连管和件管道有限公司-交付-20230105/大连管和件管道有限公司样本.pdf" /tmp/catalog-hd/page
```

## ⚠️ 低限额策略（2026-08-19 两次撞限额后确立）

并行大 agent 会快速烧完 5 小时 API 限额。恢复提取时必须：

1. **本地 OCR 优先**：tesseract 5.5.3 已装（/opt/homebrew/bin/tesseract）。参考已成功的 A53 组管线代码 `/tmp/a53ocr/build_final.py`、`/tmp/a53ocr/finalcheck.py`（tesseract TSV 坐标重建行列 → 可疑单元格 ImageMagick/PIL 放大多阈值复检 → 数字字形模板相关判定 3/8、2/5、1/9 混淆 → 物理公式全量校验）。本地处理不烧限额。
2. **MCP 视觉识别只做两件事**：a) 表格结构理解（每页 1 次调用：列头、区块、单位）；b) 最终抽样复核（每组抽 5-10 行对照图片）。**不要**用视觉识别逐行提取。
3. **物理校验规则**（能用则用）：壁厚 mm=in×25.4；kg/ft=lb/ft×0.4536；kg/m=lb/ft×1.4882；钢管 kg/m=0.02466×t×(D−t)；弯头中心距≈1.5D（LR）/1.0D（SR）；同表相邻行数值单调性检查。
4. **串行小批量**：一次只派 2 组 agent，完成入库后再派下一批。8 组并行已被证明会烧穿限额。
5. agent 遇 MCP 429 立即转本地管线，不要退避重试。
6. 每组产出存 /tmp/extract/<组名>.json 备份（防 agent 中途挂掉丢结果），入库用 `node scripts/build-dataset.mjs <input.json> <name> <id> <sourceImages> [note]`。

## 提取分组（串行批次）

| 批次 | 组 | 页面 | 内容 |
|---|---|---|---|
| 1 | materials | p09-11 | 材料规格表 + 牌号对照表 |
| 1 | ss-elbows | p12-15 | 不锈钢弯头系列 |
| 2 | ss-tees | p16-21 | 不锈钢三通/短管/异径管 |
| 2 | cs-elbows | p22-27 | 碳钢弯头系列 |
| 3 | cs-fittings | p28-33 | 碳钢管件续 |
| 3 | misc-fittings | p34-38, 60, 61 | 异径管/管帽/承插焊/螺纹/补页 |
| 4 | flanges-1 | p39-47 | 法兰 150#~900# |
| 4 | flanges-2 | p48-56 | 法兰续（含螺栓/垫片） |

已完成入库（无需重做）：steel-wall（壁厚表 24 行）、steel-a53（A53 重量表 154 行）。

## 输出格式（严格 JSON）

{"page": 12, "title": "表标题（中文+原文）", "columns": ["nps", "..."], "columnTitles": {"nps": "NPS(in)"}, "rows": [{...}]}
- 空单元格/短横线 → null；不确定数字 → null 不要猜；原表印刷异常忠实转录并在报告中标注
- 每个数据集 sourceImages 用 ['/catalog/page-XX.jpg']（对照原页）

## 🤖 全自动推进协议（定时任务每次运行执行）

状态目录 /tmp/extract/：
- `<组名>.json` —— 该组提取完成（含最终数据）
- `<组名>.lock` —— 该组 agent 正在跑（mtime 超 2 小时视为过期锁，可重派）
- `ALL-DONE` —— 全部完成标记

组清单：materials(p9-11) / ss-elbows(p12-15) / ss-tees(p16-21) / cs-elbows(p22-27) / cs-fittings(p28-33) / misc-fittings(p34-38,60,61) / flanges-1(p39-47) / flanges-2(p48-56)
品类映射（文件名前缀）：steel-*→steel；flange-*→flanges；ss-*/cs-*/misc-*/material-*→fittings

每次运行流程：
1. 若 /tmp/extract/ALL-DONE 存在 → 无事可做，直接结束
2. 若 /tmp/catalog-hd/ 缺失 → 按顶部命令重转页图
3. 对每组：json 存在=已完成；否则（lock 不存在 或 lock mtime>2h）=待派发
4. 取待派发组的前 2 组，各派一个后台 agent（prompt 见下方模板），并 touch 对应 lock
5. 对已完成但未入库的组（datasets/ 下无对应 前缀-*.js 或聚合未刷新）：用 `node scripts/build-dataset.mjs /tmp/extract/<组>.json <文件名> <id> <sourceImages> [note]` 入库，然后 `node scripts/collect-datasets.mjs` 刷新聚合
   - 文件名/id 规范：材料表 material-spec（页9）/ material-grades（页10-11）；ss-elbows 可能产出多个数据集（不同表），若 json 是数组则逐个入库（文件名 material-xx / ss-xx / cs-xx / misc-xx / flange-xx 唯一即可）
   - sourceImages 用对应 /catalog/page-XX.jpg
6. 若全部 8 组 json 齐备且已入库：终验（npm run build + 浏览器 URL 直达抽查 /products/fittings?mode=data 等 + 抽 2-3 行对照原页图）→ 写 ALL-DONE → 向用户汇报统计（数据集数、总行数、各组校验方式、抽查结论）

agent prompt 模板（低限额版，替换 <组名>/<页码>/<内容说明>）：
"任务：从 <页码列表> 页面图提取完整表格数据。图片在 /tmp/catalog-hd/page-XX.jpg。
执行低限额策略：本地 tesseract OCR 优先（参考 /tmp/a53ocr/build_final.py、finalcheck.py 管线改造），MCP 视觉识别每页最多 2 次（1 次结构理解 + 抽 3-5 行复核）；遇 429 立即转纯本地，不退避重试。
物理校验：壁厚 mm=in×25.4；kg/m=lb/ft×1.4882；钢管 kg/m=0.02466×t×(D−t)；90°LR 弯头中心距≈1.5×OD；同表行单调性。
规则：空单元格/短横线→null；不确定→null 不猜；原表印刷异常忠实转录并标注；同一表跨页合并（标 pages）。
流程：开始时先写 /tmp/extract/<组名>.lock；完成时把最终 JSON 写 /tmp/extract/<组名>.json（数组，每元素含 pages/title/columns/columnTitles/rows），然后删除自己的 lock 文件。
最终回复：JSON 全文 + 简短报告（行数、范围、校验方式、不确定点）。"

已完成的组（勿重做）：steel-wall、steel-a53（钢管已入库）。批1（materials、ss-elbows）可能已有 agent 在跑（lock 存在则跳过）。

## 入库后验证

1. datasets.js 聚合（运行 scripts/collect-datasets.mjs 自动刷新）
2. 浏览器 URL 直达实测：/products/<type>?mode=data&ds=<id>（IAB 点击不稳定，用 URL 驱动）
3. 抽查 2-3 行数字与原页图对照
4. npm run build
5. 汇报：数据集数量、总行数、每组校验方式、抽查结论
