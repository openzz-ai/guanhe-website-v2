<template>
  <div v-if="category">
    <!-- 品类 banner -->
    <section class="gh-page-hero gh-prod-hero" :style="{ backgroundImage: `url('${category.image}')` }">
      <div class="gh-page-hero__inner gh-fade-up">
        <h1>{{ $t(category.label) }}</h1>
        <p>{{ $t(category.desc) }}</p>
      </div>
    </section>

    <!-- 品类切换 -->
    <div class="gh-prod-tabs">
      <div class="gh-container gh-prod-tabs__inner">
        <router-link v-for="cat in productCategories" :key="cat.type" :to="`/products/${cat.type}`"
          class="gh-prod-tabs__tab" :class="{ 'gh-prod-tabs__tab--active': cat.type === category.type }">
          {{ $t(cat.label) }}
        </router-link>
      </div>
    </div>

    <section class="gh-section">
      <div class="gh-container">
        <!-- 执行标准 -->
        <div class="gh-standards">
          <span class="gh-standards__label">{{ $t('执行标准') }}：</span>
          <span v-for="s in category.standards" :key="s" class="gh-standards__chip">{{ s }}</span>
        </div>

        <div class="gh-product-guide">
          <div>
            <span class="gh-product-guide__eyebrow">{{ ui('buyerStart') }}</span>
            <strong>{{ ui('rightProduct') }}</strong>
            <p>{{ ui('buyerLead') }}</p>
          </div>
          <div class="gh-product-guide__actions">
            <router-link to="/find-products" class="gh-product-guide__link">{{ ui('openFinder') }} <v-icon size="16" icon="mdi-arrow-right" /></router-link>
            <router-link :to="{ path: '/contact', query: { product: $t(category.label) } }" class="gh-product-guide__quote">{{ ui('requestQuote') }}</router-link>
          </div>
        </div>

        <!-- 模式切换：规格图纸 / 数据检索 -->
        <div class="gh-mode-switch" role="tablist">
          <button type="button" role="tab" class="gh-mode-switch__btn"
            :class="{ 'gh-mode-switch__btn--active': mode === 'gallery' }" @click="mode = 'gallery'">
            <v-icon size="17" icon="mdi-file-image-outline" />
            {{ $t('规格图纸') }}
          </button>
          <button type="button" role="tab" class="gh-mode-switch__btn"
            :class="{ 'gh-mode-switch__btn--active': mode === 'data' }" @click="mode = 'data'">
            <v-icon size="17" icon="mdi-table-search" />
            {{ $t('数据检索') }}
            <span v-if="datasetCount" class="gh-mode-switch__badge">{{ datasetCount }}</span>
          </button>
        </div>

        <!-- 规格图纸模式 -->
        <template v-if="mode === 'gallery'">
          <!-- 搜索 -->
          <div class="gh-search">
            <v-text-field v-model="keyword" variant="outlined" density="comfortable" hide-details
              :placeholder="$t('搜索规格表：如 B16.9、A53、壁厚、弯头、150# …')"
              prepend-inner-icon="mdi-magnify" clearable />
          </div>

          <!-- 规格表与照片 -->
          <SpecGrid :groups="groups" :keyword="keyword" />
        </template>

        <!-- 数据检索模式 -->
        <SpecData v-else :category-type="category.type" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { productCategories, getCategory } from '@/data/products'
import { getDatasets } from '@/data/datasets'
import { datasetIsSearchReady } from '@/data/datasetQuality'
import { useUiCopy } from '@/data/uiCopy'
import SpecGrid from '@/components/SpecGrid.vue'
import SpecData from '@/components/SpecData.vue'

const route = useRoute()
const ui = useUiCopy()
const router = useRouter()
const keyword = ref('')
// 模式持久化到 URL query（?mode=data 可直达/收藏数据检索）
const mode = computed({
  get: () => (route.query.mode === 'data' ? 'data' : 'gallery'),
  set: (val) => {
    router.replace({ query: { ...route.query, mode: val === 'data' ? 'data' : undefined } })
  }
})

const category = computed(() => getCategory(route.params.type))

watch(() => route.params.type, () => {
  keyword.value = ''
})

const datasetCount = computed(() => getDatasets(category.value.type).filter(datasetIsSearchReady).length)

const groups = computed(() => {
  const c = category.value
  const byCat = new Map()
  for (const item of c.specs) {
    const key = item.category || '其他'
    if (!byCat.has(key)) byCat.set(key, [])
    byCat.get(key).push(item)
  }
  const result = [...byCat.entries()].map(([title, items]) => ({ title, items }))
  if (c.photos.length) {
    result.push({
      title: '产品实物',
      items: c.photos.map(p => ({ ...p, category: '产品实物', keywords: ['实物', 'photo', '现场'] }))
    })
  }
  return result
})
</script>

<style lang="scss" scoped>
.gh-prod-hero {
  padding: 88px 24px 64px;

  h1 {
    font-size: 38px;
  }

  p {
    max-width: 760px;
    line-height: 1.9;
  }
}

.gh-prod-tabs {
  background: var(--gh-primary);

  &__inner {
    display: flex;
  }

  &__tab {
    padding: 16px 28px;
    color: rgba(255, 255, 255, 0.72);
    font-size: 15.5px;
    text-decoration: none;
    position: relative;
    transition: color 0.2s;

    &:hover {
      color: #fff;
    }

    &--active {
      color: #fff;
      font-weight: 600;

      &::after {
        content: '';
        position: absolute;
        left: 20px;
        right: 20px;
        bottom: 0;
        height: 3px;
        background: var(--gh-accent);
        border-radius: 2px 2px 0 0;
      }
    }
  }
}

.gh-standards {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;

  &__label {
    font-size: 14.5px;
    font-weight: 600;
    color: var(--gh-text);
  }

  &__chip {
    padding: 4px 14px;
    border-radius: 6px;
    background: #fff;
    border: 1px solid var(--gh-border);
    color: var(--gh-secondary);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
}

.gh-search {
  max-width: 520px;
  margin-bottom: 36px;
}

.gh-product-guide {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
  padding: 20px 22px;
  margin-bottom: 24px;
  color: #fff;
  background: linear-gradient(120deg, var(--gh-primary-dark), var(--gh-primary));
  border-radius: 10px;

  &__eyebrow { display: block; margin-bottom: 5px; color: var(--gh-accent); font-size: 11px; font-weight: 700; letter-spacing: 0.14em; }
  strong { font-size: 17px; }
  p { margin-top: 5px; color: rgba(255, 255, 255, 0.76); font-size: 13.5px; line-height: 1.55; }
  &__actions { display: flex; gap: 12px; flex-shrink: 0; align-items: center; }
  &__link { display: inline-flex; align-items: center; gap: 4px; color: #fff; font-size: 14px; font-weight: 700; text-decoration: none; }
  &__quote { padding: 9px 14px; color: var(--gh-primary); background: var(--gh-accent); border-radius: 6px; font-size: 14px; font-weight: 700; text-decoration: none; }
}

/* 模式切换（分段控制器） */
.gh-mode-switch {
  display: inline-flex;
  margin-bottom: 22px;
  background: var(--gh-surface);
  border: 1px solid var(--gh-border);
  border-radius: 10px;
  padding: 4px;
  gap: 4px;

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 20px;
    font-size: 14.5px;
    color: var(--gh-text-light);
    background: none;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      color: var(--gh-secondary);
    }

    &--active {
      background: #fff;
      color: var(--gh-primary);
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(7, 42, 66, 0.1);
    }
  }

  &__badge {
    padding: 1px 8px;
    border-radius: 999px;
    background: var(--gh-accent);
    color: #fff;
    font-size: 12px;
    font-weight: 600;
  }
}

@media (max-width: 960px) {
  .gh-prod-tabs__inner {
    overflow-x: auto;
  }
  .gh-prod-tabs__tab {
    white-space: nowrap;
    padding: 14px 18px;
  }
  .gh-product-guide { align-items: flex-start; flex-direction: column; }
}
</style>
