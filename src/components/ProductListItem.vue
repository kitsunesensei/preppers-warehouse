<script lang="ts" setup>
import { defineProps } from 'vue'
import { ArrowNarrowRightIcon } from 'vue-tabler-icons'

import dayjs from '@/plugins/dayjs'

const props = defineProps<{
  name: string
  itemsSum: number
  productId?: string
  nextExpiresAt?: Date
}>()

defineExpose({
  productId: props.productId,
})
</script>

<template>
  <div class="product">
    <div class="product-top">
      <div class="label">
        <slot name="label">{{ name }}</slot>
      </div>
      <div class="quantity" :title="`${itemsSum} ${$t('available')}`">
        <slot name="quantity">
          {{ itemsSum > 99 ? '99+' : itemsSum }}
          <arrow-narrow-right-icon />
        </slot>
      </div>
    </div>
    <div v-if="nextExpiresAt" class="expires">
      <slot name="expire">
        {{
          $t(product.expired ? 'expiredAt' : 'expiresIn', [
            dayjs(nextExpiresAt).fromNow(),
          ])
        }}
      </slot>
    </div>
  </div>
</template>

<style lang="sass">
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
