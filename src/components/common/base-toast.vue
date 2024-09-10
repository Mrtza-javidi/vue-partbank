<template>
  <div :class="['toast']">
    <component :class="['toast__icon']" />
    <span>{{}}</span>
  </div>
</template>

<script setup>
import SuccessIcon from "@/components/icons/TickOutline.vue";
import ErrorIcon from "@/components/icons/ErrorOutline.vue";
</script>

<style lang="scss" scoped>
.toast {
  @include flex($justify: flex-start, $gap: var(--g-4));
  @include position(
    $position: absolute,
    $top: initial,
    $bottom: 4.8rem,
    $right: 4.8rem
  );
  @include font-style($size: 1.6rem, $family: "peyda-600", $weight: normal);
  padding: var(--p-3);
  width: 314px;
  border-radius: 16px;

  &__icon {
    @include element-size($width: 2.4rem, $height: 2.4rem);
  }
}

.error {
  background-color: var(--fail-500);
  color: var(--text-on-primary);

  .toast__icon {
    fill: var(--fail-300);
  }
}

.success {
  background-color: var(--success-600);
  color: var(--text-on-primary);

  .toast__icon {
    stroke: var(--success-300);
  }
}
</style>
