<template>
  <div v-if="toastStore.visible" :class="['toast', toastStore.type]">
    <component :is="iconComponent" :class="['toast__icon', iconClass]" />
    <span>{{ toastStore.message }}</span>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from "@/stores/toast-store";
import { computed, ComputedRef, defineAsyncComponent } from "vue";

const SuccessIcon = defineAsyncComponent(
  () => import(`@/components/icons/icon-tick-outline.vue`)
);
const ErrorIcon = defineAsyncComponent(
  () => import(`@/components/icons/icon-error-outline.vue`)
);

const toastStore = useToastStore();

const iconComponent: ComputedRef<typeof SuccessIcon | typeof ErrorIcon> =
  computed(() => {
    return toastStore.type === "success" ? SuccessIcon : ErrorIcon;
  });

const iconClass: ComputedRef<string> = computed(() => {
  return toastStore.type === "success" ? "icon-success" : "icon-error";
});
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
  min-width: 314px;
  border-radius: 16px;

  &__icon {
    min-width: 2.4rem;
    min-height: 2.4rem;
  }
}

.error {
  background-color: var(--fail-500);
  color: var(--text-on-primary);

  .toast__icon {
    fill: var(--text-on-primary);
  }
}

.success {
  background-color: var(--success-600);
  color: var(--text-on-primary);

  .toast__icon {
    stroke: var(--text-on-primary);
  }
}
</style>
