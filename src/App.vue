<script setup lang="ts">
import PageNavigation from '@/components/PageNavigation.vue'
</script>

<template>
  <div class="layout">
    <div class="container">
      <router-view />
    </div>
    <footer>
      <page-navigation class="navigation" />
    </footer>
  </div>
</template>

<style lang="sass" scoped>
.layout
  @apply flex flex-col min-h-screen

  .container
    @apply flex-grow

  .navigation
    @apply w-screen bottom-0 sticky
</style>
