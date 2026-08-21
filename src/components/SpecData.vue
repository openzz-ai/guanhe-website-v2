<template>
  <div>
    <!-- 数据集选择 -->
    <div v-if="sets.length" class="gh-dataset-switch">
      <button v-for="ds in sets" :key="ds.id" type="button" class="gh-dataset-switch__btn"
        :class="{ 'gh-dataset-switch__btn--active': ds.id === currentId }" @click="currentId = ds.id">
        {{ ds.title }}
        <span class="gh-dataset-switch__count">{{ ds.rows.length }}</span>
      </button>
    </div>

    <template v-if="current">
      <!-- 工具栏：搜索 + 原图 -->
      <div class="gh-data-toolbar">
        <v-text-field v-model="search" variant="outlined" density="compact" hide-details clearable
          class="gh-data-toolbar__search" :placeholder="$t('输入任意值筛选：如 2、Sch40、150、610…')"
          prepend-inner-icon="mdi-magnify" />
        <v-btn variant="outlined" color="primary" prepend-icon="mdi-file-image-outline" @click="showSource">
          {{ $t('查看原表图片') }}
        </v-btn>
      </div>

      <v-alert v-if="current.note" type="info" variant="tonal" density="compact" class="mb-4">
        {{ current.note }}
      </v-alert>

      <!-- 数据表（内置全字段搜索、排序、分页） -->
      <div class="gh-data-table-wrap">
        <v-data-table :headers="headers" :items="current.rows" :search="search"
          :items-per-page="25" :items-per-page-options="[10, 25, 50, -1]"
          density="compact" hover class="gh-data-table" />
      </div>

      <p class="gh-data-disclaimer">
        {{ $t('数据由视觉识别从原表提取，供快速检索参考；正式报价或设计前请点击"查看原表图片"核对原始数据。') }}
      </p>
    </template>

    <div v-if="sourceOnlySets.length" class="gh-source-first">
      <div>
        <span class="gh-source-first__eyebrow">{{ ui('sourceTables') }}</span>
        <h3>{{ ui('sourceTitle') }}</h3>
        <p>{{ ui('sourceText') }}</p>
      </div>
      <div class="gh-source-first__sets">
        <button v-for="dataset in sourceOnlySets" :key="dataset.id" type="button" @click="showSource(dataset)">
          <v-icon size="17" icon="mdi-file-image-outline" /> {{ dataset.title }}
        </button>
      </div>
    </div>

    <div v-if="!current" class="gh-spec-empty">
      <v-icon icon="mdi-database-search-outline" size="48" color="grey-lighten-1" />
      <p>{{ ui('sourceEmpty') }}</p>
    </div>

    <!-- viewerjs 图片源（隐藏） -->
    <div ref="viewerRoot" class="gh-viewer-source">
      <img v-for="src in viewerImages" :key="src" :src="src" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'
import { getDatasets } from '@/data/datasets'
import { columnTitle, datasetIsSearchReady } from '@/data/datasetQuality'
import { useUiCopy } from '@/data/uiCopy'

const props = defineProps({
  categoryType: { type: String, required: true }
})

const ui = useUiCopy()

const route = useRoute()
const router = useRouter()
const allSets = computed(() => getDatasets(props.categoryType))
const sets = computed(() => allSets.value.filter(datasetIsSearchReady))
const sourceOnlySets = computed(() => allSets.value.filter((dataset) => !datasetIsSearchReady(dataset)))
const search = ref('')

// 当前数据集持久化到 ?ds=<id>，与 ?mode=data 配合可直接收藏/分享
const currentId = computed({
  get: () => {
    const fromQuery = sets.value.find(s => s.id === route.query.ds)
    return fromQuery ? fromQuery.id : (sets.value[0]?.id ?? null)
  },
  set: (val) => {
    router.replace({ query: { ...route.query, ds: val || undefined } })
  }
})

watch(() => props.categoryType, () => {
  search.value = ''
})

const current = computed(() => sets.value.find(s => s.id === currentId.value) || null)

const headers = computed(() => {
  if (!current.value) return []
  return current.value.columns.map(key => ({
    title: columnTitle(current.value, key),
    key,
    align: 'start',
    sortable: true
  }))
})

// viewerjs 查看原表
const viewerRoot = ref(null)
const viewerImages = ref([])
let viewerInstance = null

async function showSource(dataset = current.value) {
  if (!dataset?.sourceImages?.length) return
  viewerImages.value = dataset.sourceImages
  await nextTick()
  if (viewerInstance) {
    viewerInstance.destroy()
    viewerInstance = null
  }
  viewerInstance = new Viewer(viewerRoot.value, {
    inline: false, button: true, navbar: true, title: false, toolbar: true,
    zoomable: true, rotatable: true, transition: true, fullscreen: true, keyboard: true, zoomOnWheel: true,
    hidden() {
      if (viewerInstance) { viewerInstance.destroy(); viewerInstance = null }
    }
  })
  viewerInstance.view(0)
}

onUnmounted(() => {
  if (viewerInstance) viewerInstance.destroy()
})
</script>

<style lang="scss" scoped>
.gh-dataset-switch {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 16px;
    font-size: 14px;
    color: var(--gh-text);
    background: #fff;
    border: 1px solid var(--gh-border);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: var(--gh-secondary);
      color: var(--gh-secondary);
    }

    &--active {
      background: var(--gh-primary);
      border-color: var(--gh-primary);
      color: #fff;

      .gh-dataset-switch__count {
        background: rgba(255, 255, 255, 0.2);
        color: #fff;
      }
    }
  }

  &__count {
    padding: 1px 8px;
    border-radius: 999px;
    background: var(--gh-surface);
    color: var(--gh-text-light);
    font-size: 12px;
    font-weight: 600;
  }
}

.gh-data-toolbar {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-bottom: 14px;
  flex-wrap: wrap;

  &__search {
    max-width: 420px;
    flex: 1;
    min-width: 220px;
  }
}

.gh-data-table-wrap {
  background: #fff;
  border: 1px solid var(--gh-border);
  border-radius: 10px;
  overflow: hidden;
}

.gh-data-table {
  :deep(table) {
    font-size: 13.5px;
  }

  :deep(th) {
    background: var(--gh-surface) !important;
    color: var(--gh-primary);
    font-weight: 600;
    white-space: nowrap;
  }

  :deep(td) {
    white-space: nowrap;
  }
}

.gh-data-disclaimer {
  margin-top: 12px;
  font-size: 12.5px;
  color: var(--gh-text-light);
  line-height: 1.7;
}

.gh-source-first {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 0.8fr);
  gap: 24px;
  align-items: start;
  margin-top: 30px;
  padding: 24px;
  background: #fff9ed;
  border: 1px solid #f1d49b;
  border-radius: 10px;

  &__eyebrow { display: block; margin-bottom: 7px; color: #9b6400; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; }
  h3 { color: var(--gh-primary); font-size: 18px; }
  p { margin-top: 8px; color: var(--gh-text-light); font-size: 13.5px; line-height: 1.7; }
  &__sets { display: flex; flex-wrap: wrap; gap: 8px; }
  &__sets button { display: inline-flex; align-items: center; gap: 6px; padding: 8px 10px; color: var(--gh-primary); background: #fff; border: 1px solid #e7c77e; border-radius: 6px; cursor: pointer; font-size: 12.5px; text-align: left; }
}

.gh-spec-empty {
  text-align: center;
  padding: 60px 0;
  color: var(--gh-text-light);

  p {
    margin-top: 14px;
    font-size: 15px;
  }
}

.gh-viewer-source {
  display: none;
}

@media (max-width: 760px) {
  .gh-source-first { grid-template-columns: 1fr; }
}
</style>
