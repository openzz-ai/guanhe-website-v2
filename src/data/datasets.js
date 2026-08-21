// 规格数据集聚合入口（由 scripts/collect-datasets.mjs 自动生成，勿手工编辑）
// 数据文件：src/data/datasets/<name>.js，由 scripts/build-dataset.mjs 从提取 JSON 生成。
// 数据准确性说明：数据由视觉识别/OCR 从原表提取，用于快速检索参考；
// 正式报价/设计前请点击"查看原图"与原表核对。

import steel_a53 from './datasets/steel-a53.js'
import steel_wall from './datasets/steel-wall.js'
const _steel = [steel_a53, steel_wall]

import cs_elbow_lr from './datasets/cs-elbow-lr.js'
import cs_elbow_sr_cont from './datasets/cs-elbow-sr-cont.js'
import cs_elbow_sr from './datasets/cs-elbow-sr.js'
import cs_tee from './datasets/cs-tee.js'
import material_grades from './datasets/material-grades.js'
import material_spec from './datasets/material-spec.js'
import misc_cap_butt_p35 from './datasets/misc-cap-butt-p35.js'
import misc_cap_butt_p36 from './datasets/misc-cap-butt-p36.js'
import misc_hydraulic_socket_threaded from './datasets/misc-hydraulic-socket-threaded.js'
import misc_reducer_butt from './datasets/misc-reducer-butt.js'
import misc_ss_elbow_45lr from './datasets/misc-ss-elbow-45lr.js'
import misc_ss_tee_reducing from './datasets/misc-ss-tee-reducing.js'
import misc_stainless_screwed from './datasets/misc-stainless-screwed.js'
import ss_cap from './datasets/ss-cap.js'
import ss_elbow_45lr from './datasets/ss-elbow-45lr.js'
import ss_elbow_90lr from './datasets/ss-elbow-90lr.js'
import ss_elbow_90sr from './datasets/ss-elbow-90sr.js'
import ss_reducer from './datasets/ss-reducer.js'
import ss_stub_ends from './datasets/ss-stub-ends.js'
import ss_tee_equal from './datasets/ss-tee-equal.js'
import ss_tee_reducing from './datasets/ss-tee-reducing.js'
const _fittings = [cs_elbow_lr, cs_elbow_sr_cont, cs_elbow_sr, cs_tee, material_grades, material_spec, misc_cap_butt_p35, misc_cap_butt_p36, misc_hydraulic_socket_threaded, misc_reducer_butt, misc_ss_elbow_45lr, misc_ss_tee_reducing, misc_stainless_screwed, ss_cap, ss_elbow_45lr, ss_elbow_90lr, ss_elbow_90sr, ss_reducer, ss_stub_ends, ss_tee_equal, ss_tee_reducing]

import flange_b16_150_dim from './datasets/flange-b16-150-dim.js'
import flange_b16_150_weight from './datasets/flange-b16-150-weight.js'
import flange_b16_300_dim from './datasets/flange-b16-300-dim.js'
import flange_b16_300_weight from './datasets/flange-b16-300-weight.js'
import flange_b169_1500_dim from './datasets/flange-b169-1500-dim.js'
import flange_b169_1500_weight from './datasets/flange-b169-1500-weight.js'
import flange_b169_2500_dim from './datasets/flange-b169-2500-dim.js'
import flange_b169_2500_weight from './datasets/flange-b169-2500-weight.js'
import flange_b169_400_dim from './datasets/flange-b169-400-dim.js'
import flange_b169_400_weight from './datasets/flange-b169-400-weight.js'
import flange_b169_600_dim from './datasets/flange-b169-600-dim.js'
import flange_b169_600_weight from './datasets/flange-b169-600-weight.js'
import flange_b169_900_dim from './datasets/flange-b169-900-dim.js'
import flange_b169_900_weight from './datasets/flange-b169-900-weight.js'
import flange_din_10bar from './datasets/flange-din-10bar.js'
import flange_din_16bar from './datasets/flange-din-16bar.js'
import flange_din_25bar from './datasets/flange-din-25bar.js'
const _flanges = [flange_b16_150_dim, flange_b16_150_weight, flange_b16_300_dim, flange_b16_300_weight, flange_b169_1500_dim, flange_b169_1500_weight, flange_b169_2500_dim, flange_b169_2500_weight, flange_b169_400_dim, flange_b169_400_weight, flange_b169_600_dim, flange_b169_600_weight, flange_b169_900_dim, flange_b169_900_weight, flange_din_10bar, flange_din_16bar, flange_din_25bar]

export const datasets = {
  steel: _steel,
  fittings: _fittings,
  flanges: _flanges
}

export function getDatasets(categoryType) {
  return datasets[categoryType] || []
}
