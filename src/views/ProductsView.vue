<script lang="ts" setup>
import type { Product, ProductSummary } from '@/stores/products'

import { computed, ref } from 'vue'
import { ArrowNarrowRightIcon, CirclePlusIcon } from 'vue-tabler-icons'

import { useFormStore } from '@/stores/formCache'
import { useProductsStore } from '@/stores/products'
import PageContainer from '@/components/PageContainer.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import SearchForm from '@/components/SearchForm.vue'
import ProductListItem from '@/components/ProductListItem.vue'

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

const productElements = ref<InstanceType<typeof ProductListItem>[]>([])

// Product add form.
const shouldShowNewProductForm = ref(false)
const newProductInput = ref(null)

const showNewProductForm = () => {
  shouldShowNewProductForm.value = true
}

const saveNewProduct = () => {
  shouldShowNewProductForm.value = false
  productsStore
    .addProductStub(`${newProductInput.value.innerText}`.trim())
    .then((product: Product) => {
      const element = productElements.value.find(
        (productItem: InstanceType<typeof ProductListItem>) =>
          productItem.productId === product.id
      )
      if (element && element.$el && element.$el.scrollIntoView) {
        element.$el.scrollIntoView()
      }
    })
}

const discardNewProduct = () => (shouldShowNewProductForm.value = false)
</script>

<template>
  <div>
    <page-header>
      <page-container class="page-container">
        <page-title>
          <template #default>{{ $t('navigation.browse') }}</template>
          <template #menu>
            <li @click="showNewProductForm()">
              {{ $t('product.add') }}
              <circle-plus-icon />
            </li>
          </template>
        </page-title>
        <search-form class="search-form" v-model.trim="exploreFilter" />
      </page-container>
    </page-header>

    <page-container class="page-container">
      <product-list-item
        v-if="shouldShowNewProductForm"
        class="product new-product"
        :name="$t('product.add')"
        :items-sum="0"
      >
        <template #label>
          <div
            class="label-field"
            contenteditable="true"
            @focusout="saveNewProduct"
            @keypress.enter="saveNewProduct"
            @keypress.esc="discardNewProduct"
            ref="newProductInput"
            v-editable-focus
          >
            {{ $t('product.add') }}
          </div>
        </template>
      </product-list-item>

      <product-list-item
        v-for="(product, index) in products"
        :key="index"
        class="product"
        ref="productElements"
        :name="product.name"
        :items-sum="product.itemsSum"
        :next-expires-at="product.nextExpiresAt"
        :product-id="product.id"
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

.new-product
  .label-field
    @apply -mx-2 -my-1 px-2 py-1 w-full bg-gray-200 rounded
    outline: none
</style>
