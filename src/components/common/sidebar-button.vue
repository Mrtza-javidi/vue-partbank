<template>
  <router-link class="sidebar__nav-link">
    <button :class="buttonClass">
      <component :is="icon"></component>
      <span>{{ label }}</span>
    </button>
  </router-link>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  icon: {
    type: Object,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    default: "",
  },
});

const buttonClass = computed(() => {
  return ["sidebar__nav-button"];
});
</script>

<style scoped lang="scss">
.sidebar__nav-button {
  @include flex($justify: flex-start, $gap: var(--g-3));
  @include element-size($height: 4.4rem);
  padding: var(--p-1) var(--p-3) var(--p-1) var(--p-2);
  border-radius: var(--radius-6);
  background: var(--surface);
  @include font-style(
    $size: 1.4rem,
    $family: "peyda-400",
    $color: var(--text-gray)
  );
  transition: backgroundColor 0.2s ease-in-out;

  &:hover {
    background-color: var(--surface-light-blue);
  }

  &-icon {
    @include element-size($width: 2rem, $height: 2rem);
    fill: var(--gray-gray);
  }

  &--active {
    @include font-style(
      $size: 1.4rem,
      $family: "peyda-700",
      $color: var(--primary-500)
    );
    background: var(--surface-light-blue);
  }

  &--danger {
    color: var(--fail-500);
    stroke: var(--fail-500);
  }
}
</style>
