<template>
  <div class="pagination">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      :class="prevPageClass"
    >
      &lt;
    </button>

    <button
      v-for="page in visiblePages"
      :key="page"
      @click="changePage(page)"
      :class="changePageClass(page)"
    >
      {{ page }}
    </button>

    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      :class="nextPageClass"
    >
      &gt;
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});

const emits = defineEmits(["page-changed"]);

const prevPageClass = computed(() => [
  "pagination__button",
  { "pagination__button--disabled": props.currentPage === 1 },
]);

const nextPageClass = computed(() => [
  "pagination__button",
  { "pagination__button--disabled": props.currentPage === props.totalPages },
]);

const changePageClass = (page: number) => [
  "pagination__button",
  { "pagination__button--active": props.currentPage === page },
];

const visiblePages = computed(() => {
  const totalPages = props.totalPages || 0;
  const currentPage = props.currentPage || 0;

  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = [];

  if (currentPage === 1) {
    pages.push(1, 2, 3);
  } else if (currentPage === totalPages) {
    pages.push(totalPages - 2, totalPages - 1, totalPages);
  } else {
    pages.push(currentPage - 1, currentPage, currentPage + 1);
  }

  return pages;
});

const changePage = (page: number) => {
  emits("page-changed", page);
};

const prevPage = () => {
  const currentPage = props.currentPage || 0;
  if (currentPage > 1) {
    emits("page-changed", currentPage - 1);
  }
};

const nextPage = () => {
  const currentPage = props.currentPage || 0;
  const totalPages = props.totalPages || 0;

  if (currentPage < totalPages) {
    emits("page-changed", currentPage + 1);
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  @include flex;
  width: 100%;
  gap: var(--g-3);

  .pagination__button {
    width: 3.2rem;
    height: 3.2rem;
    font-size: 1.4rem;
    font-family: "peyda-600";
    color: var(--gray-gray);
    border-radius: var(--radius-4);
    padding: 0.4rem;
    background-color: var(--surface-light-blue);

    &:hover:not(&--disabled, &--active) {
      background-color: darken(map-get($palette, surface-light-blue), 10%);
    }

    &--active {
      background-color: var(--primary-color);
      color: #fff;
    }

    &--disabled:hover {
      cursor: default;
    }
  }
}
</style>
