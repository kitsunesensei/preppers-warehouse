<script lang="ts" setup>
import type { Product, ProductSummary } from '@/stores/products'

import { computed, ref } from 'vue'
import { CirclePlusIcon } from 'vue-tabler-icons'

import { useFormStore } from '@/stores/formCache'
import { useProductsStore } from '@/stores/products'
import PageContainer from '@/components/PageContainer.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import SearchForm from '@/components/SearchForm.vue'
import ProductListItem from '@/components/ProductListItem.vue'
import AddProductListItem from '@/components/AddProductListItem.vue'

const productsStore = useProductsStore()

const formStore = useFormStore()

const exploreFilter = computed({
  get: () => formStore.exploreFilter,
  set: (value) => (formStore.exploreFilter = value),
})

const products = computed(() =>
  productsStore.summary.filter((product: ProductSummary) =>
    `${product.id} ${product.identifiers.concat(' ')} ${product.name}`
      .toLowerCase()
      .includes(`${exploreFilter.value}`.toLowerCase())
  )
)

const productListElements = ref<InstanceType<typeof ProductListItem>[]>([])

const shouldShowAddProduct = ref(false)

const showAddProduct = () => (shouldShowAddProduct.value = true)
const closeAddProduct = () => (shouldShowAddProduct.value = false)

const scrollToProduct = (product: Product) => {
  const element = productListElements.value.find(
    (productItem: InstanceType<typeof ProductListItem>) =>
      productItem.$el.id === product.id
  )

  if (element && element.$el instanceof HTMLElement) {
    element.$el.scrollIntoView()
  }

  closeAddProduct()
}
</script>

<template>
  <div>
    <page-header>
      <page-container class="page-container">
        <page-title>
          <template #default>{{ $t('navigation.browse') }}</template>
          <template #menu>
            <li @click="showAddProduct()">
              {{ $t('product.add') }}
              <circle-plus-icon />
            </li>
          </template>
        </page-title>
        <search-form class="search-form" v-model.trim="exploreFilter" />
      </page-container>
    </page-header>

    <page-container class="page-container">
      <add-product-list-item
        v-if="shouldShowAddProduct"
        class="product"
        @saved="scrollToProduct"
        @discarded="closeAddProduct"
      />

      <product-list-item
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        class="product"
        ref="productListElements"
        :name="product.name"
        :items-sum="product.itemsSum"
        :next-expires-at="product.nextExpiresAt"
        @click="
          $router.push({
            name: 'product-view',
            params: { productId: product.id },
          })
        "
      />
    </page-container>
  </div>
</template>

<style lang="sass" scoped>
.page-container
  @apply pt-4

.search-form
  @apply py-4
</style>
