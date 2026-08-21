<template>
  <main class="procure-home">
    <section class="procure-hero">
      <div class="procure-hero__copy">
        <h1>{{ p('heroLine1') }}<br>{{ p('heroLine2') }}</h1>
        <p class="procure-hero__intro">{{ p('intro') }}</p>

        <form class="procure-search" @submit.prevent="submitSearch">
          <input v-model="search" type="search" :placeholder="p('search')" :aria-label="p('search')">
          <button type="submit" aria-label="Search"><Search :size="24" :stroke-width="1.8" /></button>
        </form>

        <div class="procure-try">
          <span>{{ p('try') }}</span>
          <button type="button" @click="useExample('A105 WN Flange Class 300')">A105 WN Flange Class 300</button>
          <i></i>
          <button type="button" @click="useExample('ASTM A106 Gr.B pipe')">ASTM A106 Gr.B pipe</button>
          <i></i>
          <button type="button" @click="useExample('ASME B16.9 elbow')">ASME B16.9 elbow</button>
        </div>

        <div class="procure-hero__buttons">
          <router-link to="/products/steel" class="procure-button procure-button--orange">
            {{ p('browseProducts') }} <ArrowRight :size="19" />
          </router-link>
          <router-link to="/contact#rfq-form" class="procure-button procure-button--outline">
            {{ p('uploadBom') }} <Upload :size="18" />
          </router-link>
        </div>
      </div>
      <div class="procure-hero__image" role="img" aria-label="Machined ASME weld neck flange"></div>
    </section>

    <section class="procure-standards procure-shell">
      <h2 class="procure-kicker">{{ p('sourceByStandard') }}</h2>
      <div class="procure-standard-grid">
        <router-link v-for="item in standards" :key="item.code" :to="item.to" class="procure-standard-card">
          <strong>{{ item.family }}<br>{{ item.code }}</strong>
          <span>{{ p(item.productKey) }}</span>
          <ArrowRight :size="19" />
        </router-link>
        <router-link to="/catalog" class="procure-standard-card procure-standard-card--all">
          <strong>{{ p('viewAllStandards') }}</strong>
          <Grid3X3 :size="18" />
        </router-link>
      </div>
    </section>

    <section class="procure-market procure-shell">
      <div class="procure-market__left">
        <h2 class="procure-kicker">{{ p('browseCategory') }}</h2>
        <div class="procure-category-grid">
          <router-link
            v-for="item in categories"
            :key="item.title"
            :to="item.to"
            class="procure-category-card"
            :style="{ backgroundImage: categoryBackground(item) }"
          >
            <div>
              <strong>{{ p(item.titleKey) }}</strong>
              <span>{{ item.line1 }}</span>
              <span>{{ item.line2 }}</span>
            </div>
            <ArrowRight :size="25" />
          </router-link>
        </div>

        <div class="procure-metrics">
          <div v-for="item in metrics" :key="item.label" class="procure-metric">
            <component :is="item.icon" :size="43" :stroke-width="1.35" />
            <div>
              <strong>{{ item.value }}</strong>
              <span>{{ p(item.labelKey) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="procure-market__right">
        <h2 class="procure-kicker">{{ p('whyUs') }}</h2>
        <div class="procure-benefits">
          <div v-for="item in benefits" :key="item.title" class="procure-benefit">
            <component :is="item.icon" :size="39" :stroke-width="1.35" />
            <strong>{{ p(item.titleKey) }}</strong>
            <span>{{ p(item.textKey) }}</span>
          </div>
        </div>

        <div class="procure-request">
          <div class="procure-request__copy">
            <h2>{{ p('startRequest') }}</h2>
            <p>{{ p('requestText') }}</p>
            <div>
              <router-link to="/contact#rfq-form" class="procure-button procure-button--orange procure-button--small">{{ p('uploadBom') }} <Upload :size="15" /></router-link>
              <router-link to="/contact" class="procure-button procure-button--outline procure-button--small">{{ p('requestQuote') }}</router-link>
            </div>
          </div>
          <div class="procure-request__image" role="img" aria-label="Oil refinery project"></div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowRight,
  ClipboardCheck,
  FileCheck2,
  Globe2,
  Grid3X3,
  Headphones,
  Medal,
  Search,
  ShieldCheck,
  Truck,
  Upload,
} from '@lucide/vue'
import { useProcurementCopy } from '@/data/procurementCopy'

const router = useRouter()
const search = ref('')
const p = useProcurementCopy()

const standards = [
  { family: 'ASME', code: 'B16.5', productKey: 'flanges', to: '/products/flanges?mode=data' },
  { family: 'ASME', code: 'B16.9', productKey: 'buttWeld', to: '/products/fittings?mode=data' },
  { family: 'ASTM', code: 'A106', productKey: 'seamlessPipe', to: '/products/steel?mode=data' },
  { family: 'ASTM', code: 'A312', productKey: 'stainlessPipe', to: '/products/steel?mode=data' },
  { family: 'API', code: '5L', productKey: 'linePipe', to: '/products/steel?mode=data' },
  { family: 'EN', code: '10216', productKey: 'pressurePipe', to: '/products/steel?mode=data' },
]

const categories = [
  { title: 'PIPES', titleKey: 'pipes', line1: 'Seamless / Welded', line2: 'CS / SS / Alloy', image: '/images/gangguan2.jpg', to: '/products/steel' },
  { title: 'FLANGES', titleKey: 'flanges', line1: 'WN / SO / BL / SW / THD', line2: 'Class 150 - 2500', image: '/images/falan-bg3.jpg', to: '/products/flanges' },
  { title: 'FITTINGS', titleKey: 'fittings', line1: 'Elbow / Tee / Reducer', line2: 'Cap / Cross', image: '/images/guanjian-bg11.jpg', to: '/products/fittings' },
]

const benefits = [
  { icon: Globe2, titleKey: 'wideRange', textKey: 'wideRangeText' },
  { icon: ShieldCheck, titleKey: 'quality', textKey: 'qualityText' },
  { icon: Truck, titleKey: 'delivery', textKey: 'deliveryText' },
  { icon: Headphones, titleKey: 'support', textKey: 'supportText' },
  { icon: ClipboardCheck, titleKey: 'traceability', textKey: 'traceabilityText' },
]

const metrics = [
  { icon: Globe2, value: '60+', labelKey: 'countries' },
  { icon: FileCheck2, value: '5000+', labelKey: 'specifications' },
  { icon: Medal, value: '20+', labelKey: 'experience' },
]

function submitSearch() {
  router.push({ path: '/find-products', query: search.value ? { q: search.value } : {} })
}

function useExample(value) {
  search.value = value
  submitSearch()
}

function categoryBackground(item) {
  return "linear-gradient(180deg, transparent 28%, rgba(0,0,0,.86) 100%), url('" + item.image + "')"
}
</script>

<style lang="scss" scoped>
.procure-home {
  background: #f7f7f5;
  color: #111;
}

.procure-shell {
  width: min(1760px, calc(100% - 96px));
  margin: 0 auto;
}

.procure-hero {
  height: 470px;
  display: grid;
  grid-template-columns: 46% 54%;
  border-bottom: 1px solid #ddddda;
  background: #f7f7f5;
}

.procure-hero__copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: max(48px, calc((100vw - 1760px) / 2));
  padding-right: 54px;

  h1 {
    margin: 0;
    font-size: clamp(48px, 3.3vw, 64px);
    font-weight: 780;
    line-height: 0.99;
    letter-spacing: -0.045em;
  }
}

.procure-hero__intro {
  margin-top: 28px;
  color: #292929;
  font-size: 15px;
  line-height: 1.5;
  white-space: nowrap;
}

.procure-hero__image {
  background: url('/images/hero-flange-reference.png') center / cover no-repeat;
}

.procure-search {
  width: min(100%, 720px);
  height: 56px;
  display: grid;
  grid-template-columns: 1fr 58px;
  margin-top: 28px;
  border: 1px solid #cfcfcb;
  background: #fff;

  input {
    min-width: 0;
    padding: 0 22px;
    border: 0;
    outline: 0;
    background: transparent;
    color: #111;
    font-size: 14px;
  }

  button {
    border: 0;
    background: #17191a;
    color: #fff;
    cursor: pointer;
  }
}

.procure-try {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 13px;
  color: #555;
  font-size: 12px;
  white-space: nowrap;

  button {
    padding: 0;
    border: 0;
    background: transparent;
    color: #3c3c3c;
    font: inherit;
    cursor: pointer;

    &:hover { color: #f04418; }
  }

  i {
    width: 1px;
    height: 14px;
    background: #9d9d98;
  }
}

.procure-hero__buttons {
  display: flex;
  gap: 16px;
  margin-top: 26px;
}

.procure-button {
  height: 54px;
  min-width: 214px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 0 24px;
  border: 1px solid transparent;
  border-radius: 2px;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;

  &--orange {
    background: #f04418;
    color: #fff;
  }

  &--outline {
    border-color: #9d9d99;
    background: #fff;
    color: #111;
  }

  &--small {
    height: 40px;
    min-width: 0;
    padding: 0 17px;
    gap: 16px;
    font-size: 11px;
  }
}

.procure-standards {
  padding-top: 20px;
  padding-bottom: 27px;
}

.procure-kicker {
  margin: 0 0 11px;
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.01em;
}

.procure-standard-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr)) 110px;
  gap: 26px;
}

.procure-standard-card {
  position: relative;
  height: 105px;
  padding: 18px 22px;
  border: 1px solid #d9d9d5;
  background: #fff;
  color: #111;
  text-decoration: none;

  strong {
    display: block;
    font-size: 17px;
    line-height: 1.15;
  }

  span {
    position: absolute;
    left: 22px;
    bottom: 17px;
    color: #555;
    font-size: 11px;
  }

  > svg {
    position: absolute;
    right: 18px;
    bottom: 14px;
    color: #f04418;
  }

  &:hover { border-color: #f04418; }
}

.procure-standard-card--all {
  display: grid;
  place-items: center;
  padding: 10px;
  text-align: center;

  strong {
    font-size: 10px;
    line-height: 1.2;
  }

  > svg {
    position: static;
    color: #111;
  }
}

.procure-market {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid #ddddda;
}

.procure-market__left {
  padding: 23px 28px 18px 0;
  border-right: 1px solid #ddddda;
}

.procure-market__right {
  padding: 23px 0 18px 28px;
}

.procure-category-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.procure-category-card {
  position: relative;
  height: 176px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 16px 14px;
  overflow: hidden;
  background-position: center;
  background-size: cover;
  color: #fff;
  text-decoration: none;

  strong,
  span { display: block; }

  strong {
    margin-bottom: 7px;
    font-size: 18px;
    line-height: 1;
  }

  span {
    font-size: 11px;
    line-height: 1.45;
  }

  > svg { flex: 0 0 auto; }
}

.procure-benefits {
  height: 176px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  border: 1px solid #d9d9d5;
  background: #fff;
}

.procure-benefit {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 18px 9px;
  text-align: center;

  strong {
    margin-top: 12px;
    font-size: 11px;
    line-height: 1.2;
  }

  span {
    margin-top: 8px;
    color: #555;
    font-size: 9.5px;
    line-height: 1.55;
  }
}

.procure-metrics,
.procure-request {
  height: 133px;
  margin-top: 17px;
  border: 1px solid #d9d9d5;
  background: #fff;
}

.procure-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 22px 10px;
}

.procure-metric {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  border-right: 1px solid #dededb;

  &:last-child { border-right: 0; }

  strong,
  span { display: block; }

  strong {
    font-size: 32px;
    line-height: 1;
    letter-spacing: -0.04em;
  }

  span {
    margin-top: 9px;
    font-size: 11px;
    font-weight: 650;
  }
}

.procure-request {
  display: grid;
  grid-template-columns: 52% 48%;
  overflow: hidden;
}

.procure-request__copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 18px 26px;

  h2 {
    font-size: 14px;
    font-weight: 800;
  }

  p {
    max-width: 390px;
    margin: 9px 0 13px;
    color: #444;
    font-size: 10px;
    line-height: 1.4;
  }

  > div {
    display: flex;
    gap: 12px;
  }
}

.procure-request__image {
  background: linear-gradient(90deg, #fff 0%, transparent 30%), url('/images/chemical-plant.jpg') center 58% / cover no-repeat;
}

@media (max-width: 1450px) {
  .procure-shell { width: calc(100% - 48px); }
  .procure-hero__copy { padding-left: 24px; padding-right: 34px; }
  .procure-standard-grid { gap: 14px; }
  .procure-hero__intro { font-size: 13px; }
  .procure-try { gap: 9px; font-size: 11px; }
}

@media (max-width: 1100px) {
  .procure-hero { height: auto; grid-template-columns: 1fr; }
  .procure-hero__copy { min-height: 470px; padding: 60px 32px; }
  .procure-hero__image { min-height: 420px; }
  .procure-standard-grid { grid-template-columns: repeat(6, 190px) 110px; overflow-x: auto; padding-bottom: 8px; }
  .procure-market { grid-template-columns: 1fr; }
  .procure-market__left { padding-right: 0; border-right: 0; }
  .procure-market__right { padding-left: 0; border-top: 1px solid #ddddda; }
}

@media (max-width: 700px) {
  .procure-shell { width: calc(100% - 32px); }
  .procure-hero__copy { min-height: 430px; padding: 46px 16px; }
  .procure-hero__copy h1 { font-size: 42px; }
  .procure-hero__intro { white-space: normal; }
  .procure-try { flex-wrap: wrap; }
  .procure-try i { display: none; }
  .procure-hero__buttons { flex-direction: column; }
  .procure-button { width: 100%; }
  .procure-hero__image { min-height: 300px; }
  .procure-category-grid { grid-template-columns: 1fr; }
  .procure-benefits { height: auto; grid-template-columns: 1fr 1fr; }
  .procure-benefit { min-height: 160px; border-bottom: 1px solid #dededb; }
  .procure-metrics { height: auto; grid-template-columns: 1fr; padding: 8px 18px; }
  .procure-metric { min-height: 98px; justify-content: flex-start; border-right: 0; border-bottom: 1px solid #dededb; }
  .procure-metric:last-child { border-bottom: 0; }
  .procure-request { height: auto; grid-template-columns: 1fr; }
  .procure-request__copy { padding: 28px 22px; }
  .procure-request__copy > div { flex-direction: column; }
  .procure-request__image { min-height: 180px; }
}
</style>
