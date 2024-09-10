<template>
  <div :class="['search-box', searchBoxCustomClass]">
    <input
      type="search"
      name="search"
      id="search"
      class="search-box__input"
      v-model="query"
      placeholder="جستجو"
    />
    <span :class="['search-box__icon-container', iconContainerCustomClass]">
      <svg viewBox="0 0 20 20" :class="['search-box__icon', iconCustomClass]">
        <use href="@/assets/icons/serach.svg#Search" />
      </svg>
    </span>
  </div>
</template>

<script setup>
const query = defineModel("modelValue", { type: String, default: "" });

defineProps({
  searchBoxCustomClass: String,
  iconContainerCustomClass: String,
  iconCustomClass: String,
});
</script>

<style lang="scss" scoped>
.search-box {
  display: flex;
  align-items: center;
  position: relative;
  border-radius: var(--radius-8);
  border: 1px solid var(--line);
  background: var(--surface);

  &__input {
    @include font-style(
      $size: 1.4rem,
      $color: var(--text-gray),
      $family: "peyda-400"
    );
    width: 100%;
    height: 100%;
    background: none;
    text-align: left;
  }

  &__icon-container {
    @include position($position: absolute, $left: 0, $right: initial);
    display: flex;
    padding: var(--p-1);
    border-radius: 6px 0px 0px 6px;
    background-color: var(--primary-50);
  }

  &__icon {
    width: 1.6rem;
    height: 1.6rem;
    stroke: var(--primary-color);
  }

  ::placeholder {
    color: var(--text-gray);
    text-align: right;
  }
}
</style>
