<script lang="ts" setup>
import type { ProductSummary } from '@/stores/products'
import { computed, ref } from 'vue'
import moment from 'moment'
import { ArrowNarrowRightIcon } from 'vue-tabler-icons'
import PageTitle from '@/components/PageTitle.vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()

const search = ref('')

const products = computed(() =>
  productsStore.summary
    .filter((product: ProductSummary) =>
      `${product.id} ${product.identifiers.concat(' ')} ${product.name}`
        .toLowerCase()
        .includes(`${search.value}`.toLowerCase())
    )
    .map((product: ProductSummary) =>
      Object.assign(product, {
        expired: moment(product.nextExpiresAt).isBefore(moment()),
        expiresSoon: moment(product.nextExpiresAt).isBefore(
          moment().add(15, 'days')
        ),
      })
    )
)
</script>

<template>
  <div>
    <page-title>swag</page-title>
    <div class="search-form">
      <input
        type="search"
        :placeholder="$t('fields.search')"
        v-model.trim="search"
      />
    </div>
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
        {{ moment(product.nextExpiresAt).fromNow() }}
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.search-form

  input[type="search"]
    @apply mt-4 mb-6 px-2 py-1 w-full bg-gray-300 rounded

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
