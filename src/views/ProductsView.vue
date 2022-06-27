<script lang="ts" setup>
import type { ProductSummary } from '@/stores/products'
import { computed } from 'vue'
import moment from 'moment'
import { ArrowNarrowRightIcon } from 'vue-tabler-icons'
import { useFormStore } from '@/stores/formCache'
import { useProductsStore } from '@/stores/products'
import PageTitle from '@/components/PageTitle.vue'
import SearchForm from '@/components/SearchForm.vue'

const productsStore = useProductsStore()

const formStore = useFormStore()

const exploreFilter = computed({
  get: () => formStore.exploreFilter,
  set: (value) => (formStore.exploreFilter = value),
})

const products = computed(() =>
  productsStore.summary
    .filter((product: ProductSummary) =>
      `${product.id} ${product.identifiers.concat(' ')} ${product.name}`
        .toLowerCase()
        .includes(`${exploreFilter.value}`.toLowerCase())
    )
    .map((product: ProductSummary) =>
      Object.assign(product, {
        expired: product.nextExpiresAt
          ? product.nextExpiresAt <= new Date()
          : false,
        expiresSoon: product.nextExpiresAt
          ? product.nextExpiresAt <= new Date(new Date().getDate() + 15)
          : false,
      })
    )
)
</script>

<template>
  <div>
    <page-title>{{ $t('navigation.browse') }}</page-title>
    <search-form v-model.trim="exploreFilter" />
    <div
      v-for="(product, index) in products"
      :key="index"
      :class="{ product: true, 'has-expires': product.expiresSoon }"
      @click="
        $router.push({
          name: 'product-view',
          params: { productId: product.id },
        })
      "
    >
      <div class="product-top">
        <div class="label">{{ product.name }}</div>
        <div class="quantity" :title="`${product.itemsSum} ${$t('available')}`">
          {{ product.itemsSum > 99 ? '99+' : product.itemsSum }}
          <arrow-narrow-right-icon />
        </div>
      </div>
      <div
        v-if="product.nextExpiresAt"
        :class="{
          expires: true,
          'expires-soon': product.expiresSoon,
          expired: product.expired,
        }"
      >
        {{
          $t(product.expired ? 'expiredAt' : 'expiresIn', [
            moment(product.nextExpiresAt).fromNow(),
          ])
        }}
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.product
  @apply mb-4 pb-4 border-b

  &:last-child
    @apply border-b-0

  .product-top
    @apply flex

  .label
    @apply font-bold flex-grow

  .quantity
    @apply pl-1 flex shrink-0 content-start whitespace-nowrap text-gray-400
    font-family: 'Courier Prime', monospace

  .expires
    @apply text-slate-400
</style>
