<template>
  <div>
    <section class="gh-page-hero" style="background-image: url('/images/lxwm-bg.jpg')">
      <div class="gh-page-hero__inner gh-fade-up">
        <h1>{{ $t('联系我们') }}</h1>
        <p>{{ $t('留下您的需求，我们将尽快与您联系') }}</p>
      </div>
    </section>

    <section class="gh-section">
      <div class="gh-container">
        <v-row>
          <!-- 联系信息 -->
          <v-col cols="12" md="5">
            <div class="gh-contact-info">
              <h3>{{ $t('联系方式') }}</h3>

              <div class="gh-contact-info__item">
                <v-icon icon="mdi-map-marker-outline" />
                <div>
                  <span class="gh-contact-info__label">{{ $t('公司地址') }}</span>
                  <span class="gh-contact-info__value">{{ $t('中国·辽宁省大连市中山区鲁迅路191号环海公寓1单元3楼22号') }}</span>
                </div>
              </div>

              <div class="gh-contact-info__item">
                <v-icon icon="mdi-phone-outline" />
                <div>
                  <span class="gh-contact-info__label">{{ $t('电话') }}</span>
                  <span class="gh-contact-info__value">+86 411 6666 9976 / 6666 9971 / 6666 9972</span>
                </div>
              </div>

              <div class="gh-contact-info__item">
                <v-icon icon="mdi-cellphone" />
                <div>
                  <span class="gh-contact-info__label">{{ $t('手机') }}</span>
                  <span class="gh-contact-info__value">+86 180 4261 9992</span>
                </div>
              </div>

              <div class="gh-contact-info__item">
                <v-icon icon="mdi-fax" />
                <div>
                  <span class="gh-contact-info__label">{{ $t('传真') }}</span>
                  <span class="gh-contact-info__value">+86 411 6666 9975</span>
                </div>
              </div>

              <v-img src="/images/lxwm-ditu1.jpg" cover class="gh-contact-map" rounded="lg" />
            </div>
          </v-col>

          <!-- 留言表单 -->
          <v-col cols="12" md="7">
            <v-card variant="flat" class="gh-form-card">
              <span class="gh-form-card__eyebrow">{{ ui('rfqTitle') }}</span>
              <h3>{{ ui('rfqHeading') }}</h3>
              <p class="gh-form-card__hint">{{ ui('rfqLead') }}</p>

              <v-form ref="form" v-model="valid" validate-on="blur">
                <v-row>
                  <v-col cols="12" sm="6"><v-text-field v-model="name" :label="ui('yourName')" :rules="nameRules" counter="30" variant="outlined" color="primary" prepend-inner-icon="mdi-account-outline" /></v-col>
                  <v-col cols="12" sm="6"><v-text-field v-model="companyName" :label="ui('company')" counter="60" variant="outlined" color="primary" prepend-inner-icon="mdi-domain" /></v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6"><v-text-field v-model="email" :label="ui('workEmail')" :rules="emailRules" counter="80" variant="outlined" color="primary" prepend-inner-icon="mdi-email-outline" /></v-col>
                  <v-col cols="12" sm="6"><v-text-field v-model="phone" :label="ui('phoneWhatsApp')" :rules="phoneRules" counter="30" variant="outlined" color="primary" prepend-inner-icon="mdi-phone-outline" /></v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6"><v-text-field v-model="country" :label="ui('countryRegion')" counter="60" variant="outlined" color="primary" prepend-inner-icon="mdi-map-marker-outline" /></v-col>
                  <v-col cols="12" sm="6"><v-text-field v-model="quantity" :label="ui('quantity')" counter="60" variant="outlined" color="primary" prepend-inner-icon="mdi-format-list-numbered" /></v-col>
                </v-row>
                <v-text-field v-model="product" :label="ui('productRequired')" :rules="productRules" counter="100" variant="outlined" color="primary" prepend-inner-icon="mdi-pipe-valve" />
                <v-text-field v-model="standard" :label="ui('specification')" counter="160" variant="outlined" color="primary" prepend-inner-icon="mdi-ruler-square" />
                <v-textarea v-model="content" :label="ui('projectDetails')" :rules="contentRules" counter="500"
                  variant="outlined" color="primary" rows="5" auto-grow />

                <v-btn color="primary" size="large" variant="flat" :loading="submitting" @click="submit">
                  {{ ui('sendRfq') }}
                </v-btn>
              </v-form>

              <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3500" location="top">
                {{ snackbarText }}
              </v-snackbar>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUiCopy } from '@/data/uiCopy'

const { proxy } = getCurrentInstance()
const $t = (...args) => proxy.$t(...args)
const ui = useUiCopy()
const route = useRoute()

const FEISHU_WEBHOOK = 'https://open.feishu.cn/open-apis/bot/v2/hook/78b5cd7a5-dfbf-44cc-bf54-c0a856ca826c'

const form = ref(null)
const valid = ref(true)
const submitting = ref(false)
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')
const name = ref('')
const companyName = ref('')
const email = ref('')
const phone = ref('')
const country = ref('')
const product = ref(String(route.query.product || ''))
const standard = ref('')
const quantity = ref('')
const content = ref('')

watch(() => route.query.product, (value) => {
  if (value) product.value = String(value)
})

const nameRules = [
  v => !!v || $t('请填写您的称呼'),
  v => (v || '').length <= 30 || $t('您输入的过长')
]
const phoneRules = [
  v => !!v || $t('请填写您的联系方式'),
  v => (v || '').length <= 30 || $t('您输入的过长')
]
const emailRules = [
  v => !!v || ui('emailRequired'),
  v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || '') || ui('emailInvalid')
]
const productRules = [
  v => !!v || ui('productRequiredError'),
  v => (v || '').length <= 100 || ui('productTooLong')
]
const contentRules = [
  v => !!v || ui('projectRequired'),
  v => (v || '').length <= 500 || ui('projectTooLong')
]

async function submit() {
  const { valid: ok } = await form.value.validate()
  if (!ok) return

  submitting.value = true
  try {
    const res = await fetch(FEISHU_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        msg_type: 'text',
        content: {
          text: `官网有新的 RFQ 请及时查看!\n姓名: ${name.value}\n公司: ${companyName.value || '-'}\n邮箱: ${email.value}\n电话/WhatsApp: ${phone.value}\n国家地区: ${country.value || '-'}\n产品: ${product.value}\n标准/尺寸/材质/压力: ${standard.value || '-'}\n数量: ${quantity.value || '-'}\n项目详情: ${content.value}`
        }
      })
    })
    await res.json()
    snackbarText.value = ui('rfqSent')
    snackbarColor.value = 'success'
    form.value.reset()
  } catch (e) {
    snackbarText.value = ui('rfqFailed')
    snackbarColor.value = 'error'
  } finally {
    submitting.value = false
    snackbar.value = true
  }
}
</script>

<style lang="scss" scoped>
.gh-contact-info {
  background: #fff;
  border: 1px solid var(--gh-border);
  border-radius: 12px;
  padding: 30px;
  height: 100%;

  h3 {
    font-size: 20px;
    font-weight: 700;
    color: var(--gh-primary);
    margin-bottom: 22px;
  }

  &__eyebrow {
    display: block;
    margin-bottom: 7px;
    color: var(--gh-secondary);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.13em;
  }

  &__item {
    display: flex;
    gap: 14px;
    padding: 12px 0;
    border-bottom: 1px dashed var(--gh-border);

    .v-icon {
      color: var(--gh-accent);
      margin-top: 2px;
    }
  }

  &__label {
    display: block;
    font-size: 12.5px;
    color: var(--gh-text-light);
    margin-bottom: 3px;
  }

  &__value {
    display: block;
    font-size: 15px;
    color: var(--gh-text);
    line-height: 1.6;
  }
}

.gh-contact-map {
  margin-top: 20px;
  width: 100%;
  height: 220px;
  border: 1px solid var(--gh-border);
}

.gh-form-card {
  padding: 30px 32px;
  border: 1px solid var(--gh-border) !important;
  border-radius: 12px;
  background: #fff !important;

  h3 {
    font-size: 20px;
    font-weight: 700;
    color: var(--gh-primary);
  }

  &__hint {
    margin: 8px 0 24px;
    font-size: 13.5px;
    color: var(--gh-text-light);
  }

  .v-btn {
    min-width: 160px;
    letter-spacing: 2px;
  }
}
</style>
