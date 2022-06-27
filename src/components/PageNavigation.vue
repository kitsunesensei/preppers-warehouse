<script lang="ts" setup>
import { FolderIcon, QrcodeIcon, SettingsIcon } from 'vue-tabler-icons'
</script>

<template>
  <div class="navigation-wrapper">
    <router-link to="/">
      <folder-icon />
      <span>{{ $t('navigation.browse') }}</span>
    </router-link>
    <router-link to="/search">
      <qrcode-icon />
      <span>{{ $t('navigation.search') }}</span>
    </router-link>
    <router-link to="/setting">
      <settings-icon />
      <span>{{ $t('navigation.settings') }}</span>
    </router-link>
  </div>
</template>

<style lang="sass" scoped>
.navigation-wrapper
  @apply flex justify-evenly w-full
  background: $light-grey

  a
    @apply flex flex-grow flex-col items-center justify-center pt-2 pb-1
    color: $shale

    &.router-link-exact-active
      color: $crayolas-blue

    svg
      @apply w-8 h-8 mb-1

    span
      @apply text-xs
</style>
