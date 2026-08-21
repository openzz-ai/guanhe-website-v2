<template>
  <div>
    <section class="gh-finder-hero">
      <div class="gh-container gh-finder-hero__inner gh-fade-up">
        <p class="gh-finder-hero__eyebrow">{{ ui('productFinder') }}</p>
        <h1>{{ ui('finderHeading') }}</h1>
        <p>{{ ui('finderLead') }}</p>
        <v-text-field v-model="query" variant="solo" hide-details clearable class="gh-finder-hero__search"
          prepend-inner-icon="mdi-magnify" :placeholder="ui('finderPlaceholder')" />
      </div>
    </section>

    <section class="gh-section gh-finder">
      <div class="gh-container">
        <div class="gh-finder__heading">
          <div>
            <p class="gh-finder__kicker">{{ ui('finderKicker') }}</p>
            <h2>{{ query ? ui('finderSuggested') : ui('finderChoose') }}</h2>
          </div>
          <router-link to="/contact" class="gh-finder__quote-link">{{ ui('finderHelp') }}</router-link>
        </div>

        <div v-if="matches.length" class="gh-finder__grid">
          <article v-for="(item, index) in matches" :key="item.id" class="gh-finder-card">
            <span class="gh-finder-card__number">0{{ index + 1 }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.subtitle }}</p>
            <div class="gh-finder-card__examples">
              <span v-for="example in item.examples" :key="example">{{ example }}</span>
            </div>
            <div class="gh-finder-card__actions">
              <router-link :to="{ path: `/products/${item.category}`, query: { product: item.title } }" class="gh-finder-card__primary">
                {{ ui('exploreProducts') }} <v-icon size="16" icon="mdi-arrow-right" />
              </router-link>
              <router-link :to="{ path: '/contact', query: { product: item.title } }" class="gh-finder-card__secondary">{{ ui('finderQuote') }}</router-link>
            </div>
          </article>
        </div>

        <div v-else class="gh-finder__empty">
          <v-icon icon="mdi-compass-outline" size="44" />
          <h3>{{ ui('finderEmptyTitle') }}</h3>
          <p>{{ ui('finderEmptyLead') }}</p>
          <router-link to="/contact" class="gh-finder-card__primary">{{ ui('talkTeam') }} <v-icon size="16" icon="mdi-arrow-right" /></router-link>
        </div>

        <div class="gh-finder__guide">
          <v-icon icon="mdi-lightbulb-outline" size="22" />
          <p><strong>{{ ui('quickGuide') }}</strong> {{ ui('finderGuide') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { findProductMatches } from '@/data/productFinder'
import { useUiCopy } from '@/data/uiCopy'

const ui = useUiCopy()
const query = ref('')
const matches = computed(() => findProductMatches(query.value))
</script>

<style lang="scss" scoped>
.gh-finder-hero { position: relative; overflow: hidden; padding: 96px 24px 82px; color: #fff; background: radial-gradient(circle at 78% 20%, rgba(212, 160, 89, 0.24), transparent 28%), linear-gradient(115deg, #121a1c 0%, #202b2e 52%, #3a4544 100%); }
.gh-finder-hero::after { content: ''; position: absolute; right: -18vw; bottom: -20vw; width: 58vw; height: 58vw; border: 1px solid rgba(255, 255, 255, 0.16); border-radius: 50%; }
.gh-finder-hero__inner { position: relative; z-index: 1; max-width: 900px; }
.gh-finder-hero__eyebrow { margin-bottom: 14px; color: #f9a825; font-size: 12px; font-weight: 700; letter-spacing: 0.2em; }
.gh-finder-hero h1 { max-width: 700px; font-size: clamp(36px, 5vw, 58px); line-height: 1.08; letter-spacing: -0.03em; }
.gh-finder-hero p:not(.gh-finder-hero__eyebrow) { max-width: 690px; margin-top: 18px; font-size: 17px; line-height: 1.75; color: rgba(255, 255, 255, 0.82); }
.gh-finder-hero__search { max-width: 760px; margin-top: 34px; }
.gh-finder { background: var(--gh-surface); }
.gh-finder__heading { display: flex; justify-content: space-between; gap: 24px; align-items: end; margin-bottom: 30px; }
.gh-finder__kicker { margin-bottom: 8px; color: var(--gh-secondary); font-size: 12px; font-weight: 700; letter-spacing: 0.13em; }
.gh-finder h2 { color: var(--gh-primary); font-size: 30px; }
.gh-finder__quote-link { color: var(--gh-primary); font-size: 14px; font-weight: 700; text-decoration-color: var(--gh-accent); text-decoration-thickness: 2px; text-underline-offset: 4px; }
.gh-finder__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.gh-finder__guide { display: flex; gap: 12px; align-items: flex-start; max-width: 850px; margin: 34px auto 0; padding: 18px 20px; color: var(--gh-primary); background: #edf5f8; border-left: 4px solid var(--gh-accent); border-radius: 6px; line-height: 1.65; }
.gh-finder__empty { max-width: 650px; margin: 10px auto; padding: 48px 28px; text-align: center; background: #fff; border: 1px solid var(--gh-border); border-radius: 14px; }
.gh-finder__empty h3 { margin-top: 14px; color: var(--gh-primary); font-size: 22px; }
.gh-finder__empty p { max-width: 480px; margin: 10px auto 22px; color: var(--gh-text-light); line-height: 1.7; }
.gh-finder-card { display: flex; min-height: 330px; flex-direction: column; padding: 28px; background: #fff; border: 1px solid var(--gh-border); border-radius: 12px; box-shadow: 0 10px 24px rgba(7, 42, 66, 0.04); transition: transform 0.22s, box-shadow 0.22s; }
.gh-finder-card:hover { transform: translateY(-5px); box-shadow: 0 16px 34px rgba(7, 42, 66, 0.12); }
.gh-finder-card__number { color: var(--gh-accent); font-size: 13px; font-weight: 800; letter-spacing: 0.16em; }
.gh-finder-card h3 { margin-top: 20px; color: var(--gh-primary); font-size: 25px; }
.gh-finder-card p { margin-top: 12px; color: var(--gh-text-light); line-height: 1.7; }
.gh-finder-card__examples { display: flex; flex-wrap: wrap; gap: 7px; margin: 20px 0; }
.gh-finder-card__examples span { padding: 4px 8px; color: var(--gh-secondary); background: #f1f6fa; border-radius: 4px; font-size: 12px; }
.gh-finder-card__actions { display: flex; gap: 16px; align-items: center; margin-top: auto; flex-wrap: wrap; }
.gh-finder-card__primary { display: inline-flex; align-items: center; gap: 5px; color: var(--gh-primary); font-weight: 700; text-decoration: none; }
.gh-finder-card__secondary { color: var(--gh-text-light); font-size: 14px; text-decoration: underline; text-underline-offset: 4px; }
@media (max-width: 840px) { .gh-finder__heading { align-items: flex-start; flex-direction: column; } .gh-finder__grid { grid-template-columns: 1fr; } .gh-finder-card { min-height: 0; } }
</style>
