<template>
  <div>
    <section class="gh-page-hero" style="background-image: url('/images/bj2.jpg')">
      <div class="gh-page-hero__inner gh-fade-up">
        <h1>{{ $t('公司简介') }}</h1>
        <p>{{ $t('三十年专注管道产品出口，与全球客户共创双赢') }}</p>
      </div>
    </section>

    <!-- 简介分段 -->
    <section class="gh-section">
      <div class="gh-container">
        <v-row>
          <v-col v-for="(sec, i) in aboutSections" :key="sec.titleKey" cols="12" md="6">
            <v-card variant="flat" class="gh-about-card gh-fade-up" :style="{ animationDelay: `${i * 0.08}s` }">
              <h3>
                <span class="gh-about-card__index">{{ String(i + 1).padStart(2, '0') }}</span>
                {{ $t(sec.titleKey) }}
              </h3>
              <p v-for="(p, j) in sec.paragraphs" :key="j">{{ $t(p) }}</p>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </section>

    <!-- 合作伙伴 -->
    <section class="gh-section gh-section--surface">
      <div class="gh-container">
        <div class="gh-section-title">
          <h2>{{ $t('合作钢厂') }}</h2>
          <span>PARTNER MILLS</span>
        </div>
        <div class="gh-partners">
          <div v-for="p in partners" :key="p" class="gh-partners__item">{{ p }}</div>
        </div>
      </div>
    </section>

    <!-- 出口市场 -->
    <section class="gh-section">
      <div class="gh-container">
        <div class="gh-section-title">
          <h2>{{ $t('出口市场') }}</h2>
          <span>EXPORT MARKETS</span>
        </div>
        <div class="gh-markets">
          <span v-for="m in markets" :key="m" class="gh-markets__item">{{ $t(m) }}</span>
        </div>
      </div>
    </section>

    <!-- 企业理念 -->
    <section class="gh-section gh-section--surface">
      <div class="gh-container">
        <div class="gh-section-title">
          <h2>{{ $t('经营理念') }}</h2>
          <span>OUR PHILOSOPHY</span>
        </div>
        <v-row>
          <v-col cols="12" md="4">
            <div class="gh-value-card">
              <v-icon icon="mdi-shield-check" size="40" color="accent" />
              <h4>{{ $t('信誉第一') }}</h4>
              <p>{{ $t('客户至上，与供应商和客户建立长期稳定的合作关系') }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="gh-value-card">
              <v-icon icon="mdi-certificate-outline" size="40" color="accent" />
              <h4>{{ $t('以质量求生存') }}</h4>
              <p>{{ $t('严格执行国际标准，确保每一批产品满足客户要求') }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="gh-value-card">
              <v-icon icon="mdi-handshake-outline" size="40" color="accent" />
              <h4>{{ $t('以信誉得发展') }}</h4>
              <p>{{ $t('诚信为本，愿与广大客户一起开创双赢局面，共创美好未来') }}</p>
            </div>
          </v-col>
        </v-row>
      </div>
    </section>
  </div>
</template>

<script setup>
import { aboutSections, partners, markets } from '@/data/company'
</script>

<style lang="scss" scoped>
.gh-about-card {
  height: 100%;
  padding: 28px 30px;
  border: 1px solid var(--gh-border) !important;
  border-radius: 12px;
  background: #fff !important;

  h3 {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 20px;
    font-weight: 700;
    color: var(--gh-primary);
    margin-bottom: 16px;
  }

  p {
    font-size: 15px;
    line-height: 2;
    color: var(--gh-text);
    text-align: justify;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__index {
    font-size: 26px;
    font-weight: 800;
    color: var(--gh-accent);
    opacity: 0.85;
  }
}

.gh-partners {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;

  &__item {
    padding: 14px 16px;
    background: #fff;
    border: 1px solid var(--gh-border);
    border-radius: 8px;
    text-align: center;
    font-size: 13.5px;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: var(--gh-text);
    transition: border-color 0.2s, color 0.2s;

    &:hover {
      border-color: var(--gh-secondary);
      color: var(--gh-secondary);
    }
  }
}

.gh-markets {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  &__item {
    padding: 8px 18px;
    border-radius: 999px;
    background: rgba(21, 101, 192, 0.08);
    color: var(--gh-secondary);
    font-size: 14px;
    font-weight: 500;
  }
}

.gh-value-card {
  height: 100%;
  background: #fff;
  border-radius: 12px;
  padding: 32px 28px;
  text-align: center;
  border: 1px solid var(--gh-border);

  h4 {
    margin-top: 14px;
    font-size: 18px;
    font-weight: 700;
    color: var(--gh-primary);
  }

  p {
    margin-top: 10px;
    font-size: 14px;
    line-height: 1.9;
    color: var(--gh-text-light);
  }
}
</style>
