<template>
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    :fill="color"
    :class="customClass"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Linear / Essentional, UI / Hamburger Menu">
      <path
        id="Vector (Stroke)"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.5 8.16669C24.5 8.64994 24.0971 9.04169 23.6 9.04169L4.4 9.04169C3.90294 9.04169 3.5 8.64994 3.5 8.16669C3.5 7.68344 3.90294 7.29169 4.4 7.29169L23.6 7.29169C24.0971 7.29169 24.5 7.68344 24.5 8.16669Z"
      />
      <path
        id="Vector (Stroke)_2"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.5 14C24.5 14.4832 24.0971 14.875 23.6 14.875L4.4 14.875C3.90294 14.875 3.5 14.4832 3.5 14C3.5 13.5168 3.90294 13.125 4.4 13.125L23.6 13.125C24.0971 13.125 24.5 13.5168 24.5 14Z"
      />
      <path
        id="Vector (Stroke)_3"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.5 19.8333C24.5 20.3166 24.0971 20.7083 23.6 20.7083L4.4 20.7083C3.90294 20.7083 3.5 20.3166 3.5 19.8333C3.5 19.3501 3.90294 18.9583 4.4 18.9583L23.6 18.9583C24.0971 18.9583 24.5 19.3501 24.5 19.8333Z"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { PropType } from "vue";

type ClassType = string | string[] | object;

defineProps({
  color: { type: String, default: "#3C4351" },
  customClass: { type: [String, Array, Object] as PropType<ClassType> },
});
</script>
