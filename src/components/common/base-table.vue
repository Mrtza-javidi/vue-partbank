<template>
  <table class="table" :class="tableCustomClass">
    <thead class="table__row table__header-row">
      <slot name="header" />
    </thead>
    <tbody class="table__body">
      <slot name="body" />
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  tableCustomClass: String,
  headerRowCustomClass: { type: String, default: "table__header-row" },
  headerDataCustomClass: { type: String, default: "table__header-data" },
  bodyRowCustomClass: { type: String, default: "table__row" },
  bodyDataCustomClass: { type: String, default: "table__data" },
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

  &__header-data {
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

  &__header-row {
    background-color: var(--primary-color);
  }

  &__body {
    @include respond-to(xxs) {
      height: 30rem;
    }
  }

  &__row {
    @include flex($gap: var(--g-1));
    height: 6rem;
    border-radius: var(--radius-8);
    padding: 1rem;

    &:nth-child(even) {
      background-color: #f9fafb;
    }
  }

  &__data {
    @include flex;
    @include font-style($size: 1.6rem);
    width: 100%;

    @include respond-to(xxs) {
      font-size: 1.4rem;
    }
  }
}
</style>
