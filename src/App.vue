<script setup lang="ts">
import PageNavigation from '@/components/PageNavigation.vue'
</script>

<template>
  <div class="layout">
    <router-view />

    <footer>
      <page-navigation class="navigation" />
    </footer>
  </div>
</template>

<style lang="sass" scoped>
.layout
  @apply flex flex-col justify-between min-h-screen

  footer
    @apply w-screen bottom-0 sticky
</style>
