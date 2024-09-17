<template>
  <table class="table" :class="tableCustomClass">
    <thead class="table__header">
      <slot name="header" />
    </thead>
    <tbody class="table__body">
      <slot name="body" />
    </tbody>
  </table>
</template>

<script setup lang="ts">
defineProps({
  tableCustomClass: String,
});
</script>

<style lang="scss" scoped>
.table {
  table-layout: fixed;
  overflow: hidden;
  border-collapse: collapse;
  min-width: 100%;

  @include respond-to(xxs) {
    min-width: 40rem;
  }

  &__header {
    height: 6rem;
  }
  
  :deep(.table__header-data) {
    @include font-style(
      $size: 1.6rem,
      $family: "peyda-600",
      $color: var(--text-on-primary),
      $weight: normal
    );
    @include respond-to(xxs) {
      font-size: 1.4rem;
    }
    width: 100%;
  }

  :deep(.table__header-row) {
    background-color: var(--primary-color);
  }

  &__body {
    height: fit-content;

    @include respond-to(xxs) {
      height: 30rem;
    }
  }

  :deep(.table__row) {
    @include flex($gap: var(--g-1));
    height: 6rem;
    border-radius: var(--radius-8);
    padding: 1rem;

    &:nth-child(even) {
      background-color: #f9fafb;
    }
  }

  :deep(.table__data) {
    @include flex;
    @include font-style($size: 1.6rem);
    width: 100%;

    @include respond-to(xxs) {
      font-size: 1.4rem;
    }
  }
}
</style>
