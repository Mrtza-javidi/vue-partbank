<template>
  <span v-if="isLoading" :class="['loader', customClass]"></span>
</template>

<script setup lang="ts">
defineProps({
  isLoading: Boolean,
  customClass: String,
});
</script>

<style lang="scss" scoped>
.loader {
  display: inline-block;
  border: 5px solid var(--loader);
  border-bottom-color: transparent;
  border-radius: var(--radius-circle);
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  100% {
    transform: rotate(360deg);
  }
}
</style>
