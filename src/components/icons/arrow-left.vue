<template>
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    :stroke="color"
    :class="customClass"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="vuesax/linear/arrow-left">
      <g id="arrow-left">
        <path
          id="Vector"
          d="M10.07 5.92969L4 11.9997L10.07 18.0697"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
        />
        <path
          id="Vector_2"
          d="M20.9999 12H4.16992"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  color: { type: String, default: "#3C4351" },
  customClass: String,
});
</script>
