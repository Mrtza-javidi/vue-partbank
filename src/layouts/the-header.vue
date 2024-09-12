<template>
  <header class="header">
    <icon-hamburger-Menu class="header__hamburger-menu" />
    <div class="header__icon-title">
      <icon-logo customClass="header__icon" />
      <h1 class="header__title">پارت بانک</h1>
    </div>
    <div class="header__information-container">
      <icon-notification customClass="header__notification-icon" />
      <div class="header__profile-info">
        <span class="header__profile-img-container">
          <img
            src="@/assets/images/profile.png"
            alt="profile"
            class="header__profile-img"
          />
        </span>
        <span class="header__profile-number">{{ number }}</span>
        <icon-angle v-if="showDownChevron" customClass="header__chevron" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps({
  showDownChevron: Boolean,
  number: Number,
});
</script>

<style lang="scss" scoped>
.header {
  @include flex($justify: space-between, $wrap: wrap);
  @include position;
  width: 100%;
  height: 6.8rem;
  padding: 0 var(--p-8);
  box-shadow: var(--box-shadow-down) var(--box-shadow-dark);
  background-color: var(--surface);

  @include respond-to(xxs) {
    width: 100%;
    height: 5.6rem;
    padding: var(--p-2) var(--p-3);
  }

  &__hamburger-menu {
    display: none;
    cursor: pointer;

    @include respond-to(xxs) {
      display: block;
    }
  }

  &__icon-title {
    @include flex($justify: flex-start, $gap: var(--g-4));
    width: 17.8rem;
    height: 3.1rem;

    @include respond-to(xxs) {
      width: 2.8rem;
    }
  }

  &__icon {
    width: 2.8rem;
    height: 2.4rem;
  }

  &__title {
    @include font-style($weight: normal);

    @include respond-to(xxs) {
      display: none;
    }
  }

  &__information-container {
    @include flex($justify: flex-start, $gap: var(--g-5));

    @include respond-to(xxs) {
      display: none;
    }
  }

  &__notification-icon {
    width: 4rem;
    height: 4rem;
    cursor: pointer;
    color: var(--gray-gray);
  }

  &__profile-info {
    @include flex($gap: var(--g-3));
  }

  &__profile-img-container {
    width: 4.1rem;
    height: 4.1rem;
    background: #1818181a;
    border-radius: var(--radius-circle);
    overflow: hidden;
  }

  &__profile-img {
    width: 4.1rem;
  }

  &__profile-number {
    @include font-style($size: 1.4rem);
  }

  &__chevron {
    width: 2.4rem;
    fill: var(--black-500);
    cursor: pointer;
  }
}
</style>
