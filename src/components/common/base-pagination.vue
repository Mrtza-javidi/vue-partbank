<template>
  <div class="pagination">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="pagination__button"
      :class="{ 'pagination__button--disabled': currentPage === 1 }"
    >
      &lt;
    </button>

    <button
      v-for="page in visiblePages"
      :key="page"
      @click="changePage(page)"
      class="pagination__button"
      :class="{ 'pagination__button--active': currentPage === page }"
    >
      {{ page }}
    </button>

    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="pagination__button"
      :class="{ 'pagination__button--disabled': currentPage === totalPages }"
    >
      &gt;
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});

const emits = defineEmits(["page-changed"]);

const visiblePages = computed(() => {
  if (props.totalPages <= 3) {
    return Array.from({ length: props.totalPages }, (_, i) => i + 1);
  }

  if (props.currentPage === 1) {
    return [1, 2, 3];
  } else if (props.currentPage === props.totalPages) {
    return [props.totalPages - 2, props.totalPages - 1, props.totalPages];
  } else {
    return [props.currentPage - 1, props.currentPage, props.currentPage + 1];
  }
});

const changePage = (page) => {
  emits("page-changed", page);
};

const prevPage = () => {
  if (props.currentPage > 1) {
    emits("page-changed", props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emits("page-changed", props.currentPage + 1);
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
