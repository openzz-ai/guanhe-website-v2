<template>
  <v-app-bar flat :height="smAndDown ? 72 : 88" class="procure-header">
    <div class="procure-header__inner">
      <router-link to="/" class="procure-brand" aria-label="Dalian Pipe and Fitting home">
        <strong>DALIAN PIPE &amp; FITTING</strong>
        <span>ENGINEERING CO., LTD.</span>
      </router-link>

      <nav class="procure-nav d-none d-lg-flex" aria-label="Primary navigation">
        <router-link to="/products/steel">{{ p('products') }}</router-link>
        <router-link to="/catalog">{{ p('standards') }}</router-link>
        <router-link to="/products/steel">{{ p('materials') }}</router-link>
        <router-link to="/about">{{ p('industries') }}</router-link>
        <router-link to="/catalog">{{ p('resources') }}</router-link>
        <router-link to="/about">{{ p('about') }}</router-link>
      </nav>

      <div class="procure-header__actions d-none d-md-flex">
        <router-link to="/contact" class="procure-rfq">{{ p('rfqList') }}</router-link>
        <div ref="langRef" class="procure-language">
          <button type="button" aria-label="Choose language" @click.stop="langOpen = !langOpen">
            <Globe2 :size="22" :stroke-width="1.8" />
          </button>
          <div v-show="langOpen" class="procure-language__menu">
            <button
              v-for="lang in languagesList.languages"
              :key="lang.name"
              type="button"
              :class="{ 'is-active': i18n.activeLanguage === lang.name }"
              @click="selectLang(lang.name)"
            >
              {{ languageTitle(lang.name) }}
            </button>
          </div>
        </div>
        <router-link to="/find-products" class="procure-icon-link" aria-label="Search products">
          <Search :size="24" :stroke-width="1.8" />
        </router-link>
      </div>

      <button class="procure-menu-button d-lg-none" type="button" aria-label="Open menu" @click="drawer = true">
        <Menu :size="26" :stroke-width="1.8" />
      </button>
    </div>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="right" temporary width="310" class="procure-drawer">
    <div class="procure-drawer__head">
      <span>{{ p('menu') }}</span>
      <button type="button" aria-label="Close menu" @click="drawer = false"><X :size="22" /></button>
    </div>
    <v-list nav>
      <v-list-item to="/products/steel" :title="p('products')" @click="drawer = false" />
      <v-list-item to="/catalog" :title="p('standards')" @click="drawer = false" />
      <v-list-item to="/products/steel" :title="p('materials')" @click="drawer = false" />
      <v-list-item to="/about" :title="p('industries')" @click="drawer = false" />
      <v-list-item to="/catalog" :title="p('resources')" @click="drawer = false" />
      <v-list-item to="/about" :title="p('about')" @click="drawer = false" />
      <v-list-item to="/contact" :title="p('rfqList')" @click="drawer = false" />
    </v-list>
    <div class="procure-drawer__languages">
      <button
        v-for="lang in languagesList.languages"
        :key="lang.name"
        type="button"
        :class="{ 'is-active': i18n.activeLanguage === lang.name }"
        @click="selectLang(lang.name); drawer = false"
      >
        {{ languageTitle(lang.name) }}
      </button>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { injectVoerkaI18n } from '@voerkai18n/vue'
import { useDisplay } from 'vuetify'
import { Globe2, Search, Menu, X } from '@lucide/vue'
import { languagesList } from '@/languages'
import { useProcurementCopy } from '@/data/procurementCopy'

const i18n = injectVoerkaI18n()
const { smAndDown } = useDisplay()
const p = useProcurementCopy()
const drawer = ref(false)
const langOpen = ref(false)
const langRef = ref(null)

const nativeLanguageTitles = {
  zh: '简体中文',
  cht: '繁體中文',
  en: 'English',
  jp: '日本語',
  de: 'Deutsch',
  ara: 'العربية',
  kor: '한국어',
}

function languageTitle(name) {
  return nativeLanguageTitles[name] ?? name
}

function selectLang(name) {
  i18n.activeLanguage = name
  langOpen.value = false
}

function closeLanguageMenu(event) {
  if (langRef.value && !langRef.value.contains(event.target)) langOpen.value = false
}

watch(() => i18n.activeLanguage, (language) => {
  document.documentElement.lang = language === 'cht' ? 'zh-Hant' : language
  document.documentElement.dir = language === 'ara' ? 'rtl' : 'ltr'
}, { immediate: true })

onMounted(() => document.addEventListener('click', closeLanguageMenu))
onUnmounted(() => document.removeEventListener('click', closeLanguageMenu))
</script>

<style lang="scss" scoped>
.procure-header {
  background: #fff !important;
  border-bottom: 1px solid #dededb;

  :deep(.v-toolbar__content) {
    overflow: visible;
    padding: 0;
  }
}

.procure-header__inner {
  width: min(1760px, calc(100% - 96px));
  height: 88px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 285px 1fr 285px;
  align-items: center;
}

.procure-brand {
  width: max-content;
  color: #111;
  text-decoration: none;
  line-height: 1;

  strong {
    display: block;
    font-size: 20px;
    font-weight: 850;
    letter-spacing: -0.035em;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.19em;
  }
}

.procure-nav {
  justify-self: center;
  align-items: center;
  gap: clamp(28px, 2.4vw, 48px);

  a {
    color: #151515;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    white-space: nowrap;
    transition: color 0.15s;

    &:hover,
    &.router-link-active {
      color: #f04418;
    }
  }
}

.procure-header__actions {
  justify-self: end;
  align-items: center;
  gap: 26px;
}

.procure-rfq {
  color: #111;
  font-size: 13px;
  font-weight: 750;
  text-decoration: none;
  white-space: nowrap;
}

.procure-language,
.procure-icon-link {
  position: relative;
  display: grid;
  place-items: center;
  color: #111;
}

.procure-language > button,
.procure-menu-button,
.procure-drawer button {
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.procure-language__menu {
  position: absolute;
  z-index: 500;
  top: 34px;
  right: -18px;
  width: 150px;
  padding: 5px;
  border: 1px solid #dededb;
  background: #fff;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);

  button {
    display: block;
    width: 100%;
    padding: 9px 12px;
    border: 0;
    background: transparent;
    color: #2c2c2c;
    text-align: left;
    cursor: pointer;

    &:hover,
    &.is-active {
      background: #f3f3f1;
      color: #f04418;
    }
  }
}

.procure-menu-button {
  justify-self: end;
}

.procure-drawer__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #dededb;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.procure-drawer__languages {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 16px;

  button {
    padding: 9px;
    border: 1px solid #dededb;
    font-size: 12px;

    &.is-active {
      border-color: #f04418;
      color: #f04418;
    }
  }
}

@media (max-width: 1200px) {
  .procure-header__inner {
    width: min(100% - 48px, 1760px);
    grid-template-columns: 240px 1fr 220px;
  }

  .procure-nav { gap: 22px; }
}

@media (max-width: 960px) {
  .procure-header__inner {
    width: calc(100% - 32px);
    grid-template-columns: 1fr auto;
  }
}

@media (max-width: 600px) {
  .procure-header { height: 72px !important; }
  .procure-header__inner { height: 72px; }
  .procure-brand strong { font-size: 16px; }
  .procure-brand span { font-size: 7px; }
}
</style>
