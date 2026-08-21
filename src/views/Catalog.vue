<template>
  <div>
    <section class="gh-page-hero" style="background-image: url('/images/bj2.jpg')">
      <div class="gh-page-hero__inner gh-fade-up">
        <h1>{{ $t('电子样本') }}</h1>
        <p>{{ $t('公司产品样本册完整在线版，可翻页浏览、缩放查看与章节跳转') }}</p>
      </div>
    </section>

    <section class="gh-section gh-catalog">
      <div class="gh-container">
        <!-- 章节导航 -->
        <div class="gh-catalog__sections">
          <button v-for="sec in catalogSections" :key="sec.titleKey" type="button"
            class="gh-catalog__sec-btn" :class="{ 'gh-catalog__sec-btn--active': page >= sec.from && page <= sec.to }"
            @click="page = sec.from">
            {{ $t(sec.titleKey) }}
            <span class="gh-catalog__sec-range">{{ sec.from }}-{{ sec.to }}</span>
          </button>
        </div>

        <!-- 页面查看区 -->
        <div class="gh-catalog__viewer" @click="openViewer">
          <img :src="pageSrc(page)" :alt="`样本第 ${page} 页`" loading="eager" @load="loading = false" />
          <div v-if="loading" class="gh-catalog__loading">
            <v-progress-circular indeterminate color="primary" />
          </div>
          <div class="gh-catalog__zoom-hint">
            <v-icon icon="mdi-magnify-plus" size="16" />
            {{ $t('点击放大') }}
          </div>
        </div>

        <!-- 翻页控制 -->
        <div class="gh-catalog__controls">
          <v-btn icon="mdi-chevron-left" variant="outlined" :disabled="page <= 1" @click="prev" />
          <div class="gh-catalog__pager">
            <input v-model.number="pageInput" type="number" min="1" :max="catalogTotal"
              class="gh-catalog__page-input" @keyup.enter="goPage" @blur="goPage" />
            <span>/ {{ catalogTotal }}</span>
          </div>
          <v-btn icon="mdi-chevron-right" variant="outlined" :disabled="page >= catalogTotal" @click="next" />
        </div>
      </div>
    </section>

    <!-- viewerjs 图片源（隐藏，全屏模式用） -->
    <div ref="viewerRoot" class="gh-viewer-source">
      <img v-for="n in catalogTotal" :key="n" :src="pageSrc(n)" :alt="`page ${n}`" loading="lazy" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'
import { catalogTotal, catalogSections, pageSrc } from '@/data/catalog'

const page = ref(1)
const pageInput = ref(1)
const loading = ref(true)
const viewerRoot = ref(null)
let viewerInstance = null

watch(page, (n) => {
  pageInput.value = n
  loading.value = true
})

function prev() {
  if (page.value > 1) page.value--
  scrollToViewer()
}
function next() {
  if (page.value < catalogTotal) page.value++
  scrollToViewer()
}
function goPage() {
  const n = Math.min(Math.max(Math.round(pageInput.value || 1), 1), catalogTotal)
  page.value = n
  pageInput.value = n
}
function scrollToViewer() {
  document.querySelector('.gh-catalog__viewer')?.scrollIntoView({ block: 'nearest' })
}
function onKey(e) {
  if (viewerInstance) return
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

function openViewer() {
  if (viewerInstance) {
    viewerInstance.destroy()
    viewerInstance = null
  }
  viewerInstance = new Viewer(viewerRoot.value, {
    inline: false, button: true, navbar: true, title: false, toolbar: true,
    zoomable: true, rotatable: true, transition: false, fullscreen: true, keyboard: true, zoomOnWheel: true,
    hidden() {
      if (viewerInstance) { viewerInstance.destroy(); viewerInstance = null }
    }
  })
  viewerInstance.view(page.value - 1)
}

onMounted(async () => {
  window.addEventListener('keydown', onKey)
  await nextTick()
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  if (viewerInstance) viewerInstance.destroy()
})
</script>

<style lang="scss" scoped>
.gh-catalog {
  &__sections {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }

  &__sec-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 18px;
    font-size: 14.5px;
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

      .gh-catalog__sec-range {
        background: rgba(255, 255, 255, 0.2);
        color: #fff;
      }
    }
  }

  &__sec-range {
    padding: 1px 8px;
    border-radius: 999px;
    background: var(--gh-surface);
    color: var(--gh-text-light);
    font-size: 12px;
  }

  &__viewer {
    position: relative;
    background: #fff;
    border: 1px solid var(--gh-border);
    border-radius: 10px;
    overflow: hidden;
    cursor: zoom-in;
    box-shadow: 0 8px 28px rgba(7, 42, 66, 0.08);

    img {
      display: block;
      width: 100%;
      max-height: 82vh;
      object-fit: contain;
      background: #fff;
    }
  }

  &__loading {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.7);
  }

  &__zoom-hint {
    position: absolute;
    right: 12px;
    bottom: 12px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 12px;
    font-size: 12.5px;
    color: #fff;
    background: rgba(7, 42, 66, 0.65);
    border-radius: 6px;
    opacity: 0;
    transition: opacity 0.2s;

    .gh-catalog__viewer:hover & {
      opacity: 1;
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 18px;
  }

  &__pager {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    color: var(--gh-text-light);
  }

  &__page-input {
    width: 72px;
    padding: 7px 10px;
    font-size: 15px;
    text-align: center;
    color: var(--gh-text);
    border: 1px solid var(--gh-border);
    border-radius: 8px;
    outline: none;

    &:focus {
      border-color: var(--gh-secondary);
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}

.gh-viewer-source {
  display: none;
}
</style>
