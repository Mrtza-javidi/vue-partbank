<template>
  <section :class="['wrapper', wrapperCustomClass]">
    <h1 class="wrapper__header">{{ title }}</h1>
    <hr />
    <slot name="wrapper-main"></slot>
  </section>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  wrapperCustomClass: String,
});
</script>

<style scoped lang="scss">
.wrapper {
  padding: var(--p-8);
  @include flex($direction: column);
  border-radius: var(--radius-12);
  gap: var(--g-8);
  background: var(--surface);

  &__header {
    @include font-style($size: 2rem, $family: "peyda-700", $weight: normal);
  }
}
</style>
