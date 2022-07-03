<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: Event) =>
  emit('update:modelValue', (event.target as HTMLInputElement).value)
</script>

<template>
  <div class="search-form">
    <input
      type="search"
      :placeholder="$t('fields.search')"
      :value="modelValue"
      @input="updateValue"
    />
  </div>
</template>

<style lang="sass" scoped>
input[type="search"]
  @apply px-2 py-1 w-full bg-gray-200 rounded
</style>
