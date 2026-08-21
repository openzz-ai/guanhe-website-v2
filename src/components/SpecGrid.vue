<template>
  <div>
    <div v-for="group in visibleGroups" :key="group.title" class="gh-spec-group">
      <h3 class="gh-spec-group__title">
        {{ group.title }}
        <span class="gh-spec-group__count">{{ group.items.length }}</span>
      </h3>
      <div class="gh-spec-grid">
        <div v-for="(item, i) in group.items" :key="item.file" class="gh-spec-card"
          @click="openViewer(group.items, i)">
          <div class="gh-spec-card__thumb">
            <img :src="item.file" :alt="item.title" loading="lazy" />
            <div class="gh-spec-card__zoom">
              <v-icon icon="mdi-magnify-plus-outline" size="22" color="white" />
            </div>
          </div>
          <div class="gh-spec-card__body">
            <div class="gh-spec-card__title">{{ item.title }}</div>
            <div v-if="item.keywords" class="gh-spec-card__tags">
              <span v-for="kw in item.keywords.slice(0, 3)" :key="kw">{{ kw }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!visibleGroups.length" class="gh-spec-empty">
      <v-icon icon="mdi-file-search-outline" size="48" color="grey-lighten-1" />
      <p>{{ $t('未找到匹配的规格表，请尝试其他关键词') }}</p>
    </div>

    <!-- viewerjs 图片源（隐藏） -->
    <div ref="viewerRoot" class="gh-viewer-source">
      <img v-for="src in viewerImages" :key="src" :src="src" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onUnmounted } from 'vue'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'

const props = defineProps({
  groups: { type: Array, required: true },   // [{ title, items: [{file, title, keywords, category}] }]
  keyword: { type: String, default: '' }
})

const viewerRoot = ref(null)
const viewerImages = ref([])
let viewerInstance = null

function match(item) {
  // clearable 清空时 Vuetify 可能 emit null
  const kw = (props.keyword || '').trim().toLowerCase()
  if (!kw) return true
  const haystack = [item.title, item.category || '', ...(item.keywords || []), item.file]
    .join(' ')
    .toLowerCase()
  return haystack.includes(kw)
}

const visibleGroups = computed(() =>
  props.groups
    .map(g => ({ ...g, items: g.items.filter(match) }))
    .filter(g => g.items.length > 0)
)

async function openViewer(items, index) {
  viewerImages.value = items.map(x => x.file)
  await nextTick()
  if (viewerInstance) {
    viewerInstance.destroy()
    viewerInstance = null
  }
  viewerInstance = new Viewer(viewerRoot.value, {
    inline: false,
    button: true,
    navbar: true,
    title: false,
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true,
    zoomOnWheel: true,
    hidden() {
      if (viewerInstance) {
        viewerInstance.destroy()
        viewerInstance = null
      }
    }
  })
  viewerInstance.view(index)
}

onUnmounted(() => {
  if (viewerInstance) viewerInstance.destroy()
})
</script>

<style lang="scss" scoped>
.gh-spec-group {
  margin-bottom: 40px;

  &__title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 19px;
    font-weight: 700;
    color: var(--gh-primary);
    margin-bottom: 18px;
    padding-left: 12px;
    border-left: 4px solid var(--gh-accent);
  }

  &__count {
    padding: 1px 10px;
    border-radius: 999px;
    background: rgba(21, 101, 192, 0.1);
    color: var(--gh-secondary);
    font-size: 13px;
    font-weight: 600;
  }
}

.gh-spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.gh-spec-card {
  background: #fff;
  border: 1px solid var(--gh-border);
  border-radius: 10px;
  overflow: hidden;
  cursor: zoom-in;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 26px rgba(7, 42, 66, 0.13);

    .gh-spec-card__zoom {
      opacity: 1;
    }
  }

  &__thumb {
    position: relative;
    height: 200px;
    background: #eceff1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
      display: block;
    }
  }

  &__zoom {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(7, 42, 66, 0.35);
    opacity: 0;
    transition: opacity 0.2s;
  }

  &__body {
    padding: 14px 16px 16px;
  }

  &__title {
    font-size: 14.5px;
    font-weight: 600;
    color: var(--gh-text);
    line-height: 1.6;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 10px;

    span {
      padding: 2px 8px;
      border-radius: 4px;
      background: var(--gh-surface);
      color: var(--gh-text-light);
      font-size: 11.5px;
    }
  }
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
</style>
