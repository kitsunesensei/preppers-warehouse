<script lang="ts" setup>
import type { Product } from '@/stores/products'

import { useProductsStore } from '@/stores/products'
import ProductListItem from '@/components/ProductListItem.vue'

const emit = defineEmits<{
  (e: 'discarded'): void
  (e: 'saved', product: Product): void
}>()

const productsStore = useProductsStore()

const saveNewProduct = (event: Event) => {
  const value: string = (event.target as HTMLDivElement).innerText.trim()

  productsStore
    .addProductStub(value)
    .then((product: Product) => emit('saved', product))
}
</script>

<template>
  <product-list-item
    class="new-product"
    :name="$t('product.add')"
    :items-sum="0"
  >
    <template #label>
      <div
        class="label-field"
        contenteditable="true"
        @focusout="saveNewProduct"
        @keypress.enter="saveNewProduct"
        @keypress.esc="emit('discarded')"
        ref="newProductInput"
        v-editable-focus
      >
        {{ $t('product.add') }}
      </div>
    </template>
  </product-list-item>
</template>

<style lang="sass" scoped>
.new-product
  .label-field
    @apply -mx-2 -my-1 px-2 py-1 w-full bg-gray-200 rounded
    outline: none
</style>
