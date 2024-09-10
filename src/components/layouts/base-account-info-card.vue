<template>
  <div class="account-info" :class="customClass">
    <div class="account-info__header">
      <span class="account-info__header-title">{{ title }}</span>

      <slot name="header-info"></slot>
    </div>

    <slot name="main"></slot>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  customClass: String,
});
</script>

<style scoped lang="scss">
.account-info {
  @include flex($direction: column, $justify: space-between);
  padding: var(--p-5);
  background: var(--surface);
  border-radius: var(--radius-12);
  &__header {
    width: 100%;
    @include flex($justify: space-between);

    &-title {
      @include font-style($size: 2rem, $family: "peyda-700");

      @include respond-to(xxs) {
        font-size: 1.6rem;
      }
    }
  }
}
</style>
