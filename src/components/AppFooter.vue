<template>
  <footer class="procure-footer">
    <div class="procure-footer__inner">
      <div class="procure-footer__grid">
        <div class="procure-footer__brand">
          <strong>DALIAN PIPE &amp; FITTING</strong>
          <span class="procure-footer__brandline">ENGINEERING CO., LTD.</span>
          <p class="preserve-lines">{{ p('tagline') }}</p>
          <a href="tel:+8641166669976"><Phone :size="15" /> +86 411 6666 9976</a>
          <a href="tel:+8618042619992"><Smartphone :size="15" /> +86 180 4261 9992</a>
          <span class="procure-footer__contact"><Printer :size="15" /> +86 411 6666 9975</span>
        </div>

        <div v-for="column in columns" :key="column.title" class="procure-footer__column">
          <h3>{{ p(column.titleKey) }}</h3>
          <router-link v-for="link in column.links" :key="link.labelKey" :to="link.to">{{ p(link.labelKey) }}</router-link>
        </div>

        <div class="procure-footer__column procure-footer__contact-column">
          <h3>{{ p('contact') }}</h3>
          <p class="preserve-lines">{{ p('address') }}</p>
          <p>{{ p('hours') }}</p>
          <router-link to="/contact" class="procure-footer__button">{{ p('contactUs') }} <ArrowRight :size="16" /></router-link>
        </div>
      </div>

      <div class="procure-footer__bottom">
        <span>{{ p('copyright') }}</span>
        <a
          class="procure-footer__beian"
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >辽ICP备2024018756号</a>
        <div>
          <router-link to="/about">{{ p('privacy') }}</router-link>
          <i></i>
          <router-link to="/about">{{ p('terms') }}</router-link>
          <i></i>
          <router-link to="/catalog">{{ p('sitemap') }}</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ArrowRight, Phone, Printer, Smartphone } from '@lucide/vue'
import { useProcurementCopy } from '@/data/procurementCopy'

const p = useProcurementCopy()

const columns = [
  {
    titleKey: 'products',
    links: [
      { labelKey: 'pipes', to: '/products/steel' },
      { labelKey: 'flanges', to: '/products/flanges' },
      { labelKey: 'fittings', to: '/products/fittings' },
      { labelKey: 'productFinder', to: '/find-products' },
      { labelKey: 'allData', to: '/catalog' },
    ],
  },
  {
    titleKey: 'standards',
    links: [
      { labelKey: 'ASME', to: '/catalog' },
      { labelKey: 'ASTM', to: '/catalog' },
      { labelKey: 'API', to: '/catalog' },
      { labelKey: 'EN', to: '/catalog' },
      { labelKey: 'JIS / DIN', to: '/catalog' },
    ],
  },
  {
    titleKey: 'materials',
    links: [
      { labelKey: 'carbonSteel', to: '/products/steel' },
      { labelKey: 'stainlessSteel', to: '/products/steel' },
      { labelKey: 'alloySteel', to: '/products/steel' },
      { labelKey: 'duplexSteel', to: '/products/steel' },
      { labelKey: 'materialGrades', to: '/catalog' },
    ],
  },
  {
    titleKey: 'resources',
    links: [
      { labelKey: 'productKnowledge', to: '/catalog' },
      { labelKey: 'technicalData', to: '/catalog' },
      { labelKey: 'downloads', to: '/catalog' },
      { labelKey: 'companyProfile', to: '/about' },
      { labelKey: 'faq', to: '/contact' },
    ],
  },
]
</script>

<style lang="scss" scoped>
.procure-footer {
  min-height: 250px;
  padding: 0;
  background: #181a1b;
  color: rgba(255, 255, 255, 0.72);
}

.procure-footer__inner {
  width: min(1760px, calc(100% - 96px));
  margin: 0 auto;
}

.procure-footer__grid {
  display: grid;
  grid-template-columns: 1.55fr repeat(4, 0.82fr) 1.35fr;
  gap: 46px;
  padding: 31px 0 23px;
}

.procure-footer__brand {
  strong,
  .procure-footer__brandline,
  a,
  .procure-footer__contact { display: block; }

  strong {
    color: #fff;
    font-size: 16px;
    line-height: 1;
  }

  .procure-footer__brandline {
    margin-top: 4px;
    color: #fff;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.17em;
  }

  p {
    margin: 15px 0 9px;
    font-size: 11px;
    line-height: 1.55;
  }

  a,
  .procure-footer__contact {
    margin-top: 5px;
    color: rgba(255, 255, 255, 0.72);
    font-size: 10.5px;
    text-decoration: none;
    align-items: center;
    gap: 6px;
  }

  a { display: flex; }
  .procure-footer__contact { display: flex; }
}

.procure-footer__column {
  h3 {
    margin-bottom: 13px;
    color: #fff;
    font-size: 10px;
    font-weight: 800;
  }

  > a:not(.procure-footer__button),
  > p {
    display: block;
    margin-bottom: 8px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 10.5px;
    line-height: 1.35;
    text-decoration: none;
  }

  > a:hover { color: #f04418; }
}

.procure-footer__contact-column p { margin-bottom: 14px; }

.preserve-lines { white-space: pre-line; }

.procure-footer__button {
  width: 160px;
  height: 39px;
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
  padding: 0 17px;
  border: 1px solid rgba(255, 255, 255, 0.55);
  color: #fff !important;
  font-size: 10px !important;
  font-weight: 750;
}

.procure-footer__bottom {
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.48);
  font-size: 9.5px;

  > div {
    display: flex;
    align-items: center;
    gap: 13px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .procure-footer__beian {
    color: rgba(255, 255, 255, 0.65);
    font-size: 9.5px;
    text-decoration: none;
  }

  i {
    width: 1px;
    height: 11px;
    background: rgba(255, 255, 255, 0.3);
  }
}

@media (max-width: 1200px) {
  .procure-footer__inner { width: calc(100% - 48px); }
  .procure-footer__grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 700px) {
  .procure-footer__inner { width: calc(100% - 32px); }
  .procure-footer__grid { grid-template-columns: 1fr 1fr; gap: 32px 22px; }
  .procure-footer__brand,
  .procure-footer__contact-column { grid-column: 1 / -1; }
  .procure-footer__bottom { align-items: flex-start; flex-direction: column; padding: 17px 0; gap: 12px; }
}
</style>
