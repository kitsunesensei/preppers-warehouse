<script lang="ts" setup>
import { useSlots, ref } from 'vue'
import { DotsIcon } from 'vue-tabler-icons'

const slots = useSlots()

const hasMenuSlot = ref(!!slots.menu)

const showMenu = ref(false)

const toggleMenuShow = () => (showMenu.value = !showMenu.value)

const closeMenu = () => (showMenu.value = false)
</script>

<template>
  <div class="page-title">
    <h1><slot /></h1>
    <div v-if="hasMenuSlot" :class="{ submenu: true, 'show-menu': showMenu }">
      <button v-click-outside="closeMenu">
        <dots-icon @click="toggleMenuShow" />
      </button>

      <ul>
        <slot name="menu" @keypress="closeMenu" />
      </ul>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.page-title
  @apply flex

  h1
    @apply grow font-bold text-2xl

  .submenu
    @apply relative

    &.show-menu
      button
        @apply opacity-40

    &:not(.show-menu)
      ul
        @apply hidden

    button
      @apply border rounded-full
      border-color: $crayolas-blue
      color: $crayolas-blue

      &:active
        @apply opacity-40

    ul
      @apply mt-3 right-0 absolute rounded bg-slate-100 overflow-hidden

      :deep(li)
        @apply px-4 py-2 w-72 flex justify-between content-center whitespace-nowrap cursor-pointer

        &:hover,
        &:focus,
        &:active
          @apply bg-slate-200
</style>
