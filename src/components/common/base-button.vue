<template>
  <button :class="customClass">
    <slot name="right-icon"></slot>
    <span v-if="!isLoading">{{ text }}</span>
    <base-loader :isLoading="isLoading" customClass="btn-loader" />
    <slot name="left-icon"></slot>
  </button>
</template>

<script setup>
defineProps({
  text: String,
  isLoading: Boolean,
  customClass: String,
});
</script>

<style lang="scss" scoped>
button {
  width: 100%;
  height: 4.8rem;
  @include flex($gap: var(--g-4));
  transition: background 0.2s ease-in-out;
  border-radius: var(--radius-8);
  font-family: "peyda-700";
  font-size: 1.6rem;
}

.btn-primary {
  background: var(--primary-500);
  color: var(--text-on-primary);

  &:hover {
    background: darken(map-get($palette, primary-500), 10%);
  }

  &:disabled {
    background-color: lighten(map-get($palette, primary-500), 30%);
    cursor: not-allowed;
  }
}

.btn-secondary {
  background: var(--primary-50);
  color: var(--text-title);

  &:hover {
    background: darken(map-get($palette, primary-50), 5%);
  }

  &:disabled {
    background-color: lighten(map-get($palette, primary-50), 30%);
    cursor: not-allowed;
  }
}

.btn-loader {
  width: 3rem;
  height: 3rem;
}
</style>
