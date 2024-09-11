<template>
  <router-link :to="to" class="sidebar__nav-link">
    <button :class="buttonClass">
      <component :is="icon"></component>
      <span>{{ label }}</span>
    </button>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

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

const route = useRoute();

const isActive = computed(
  () =>
    route.path === props.to || (props.to === "/dashboard" && route.path === "/")
);

const buttonClass = computed(() => {
  return [
    "sidebar__nav-button",
    { "sidebar__nav-button--active": isActive.value },
    { "sidebar__nav-button--danger": props.mode === "danger" },
  ];
});
</script>

<style scoped lang="scss">
.sidebar__nav-button {
  @include flex($justify: flex-start, $gap: var(--g-3));
  width: 100%;
  height: 4.4rem;
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
    width: 2rem;
    height: 2rem;
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
