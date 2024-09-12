<template>
  <div class="dashboard__sidebar sidebar">
    <div class="sidebar__header">
      <span class="sidebar__header-name">{{ userName }}</span>
      <div class="sidebar__header-id-container">
        <span class="sidebar__header-id-label">کد ملی:</span>
        <span class="sidebar__header-id-value">{{ nationalId }}</span>
      </div>
    </div>
    <hr class="sidebar__divider" />
    <div class="sidebar__nav">
      <ul class="sidebar__nav-list">
        <li>
          <base-sidebar-button
            to="/dashboard"
            :icon="ElementIcon"
            label="داشبورد"
          />
        </li>
        <li>
          <base-sidebar-button to="/account" :icon="WalletIcon" label="حساب" />
        </li>
        <li>
          <base-sidebar-button
            to="/facilities"
            :icon="iconStrongBox"
            label="تسهیلات"
          />
        </li>
        <li>
          <base-sidebar-button
            to="/card-operations"
            :icon="IconMultipleCards"
            label="عملیات کارت"
          />
        </li>
        <li>
          <base-sidebar-button
            to="/electronic-guarantee"
            :icon="IconNote"
            label="سفته الکترونیک"
          />
        </li>
        <li>
          <base-sidebar-button
            to="/services"
            :icon="IconCardPos"
            label="خدمات"
          />
        </li>
        <li>
          <base-sidebar-button
            to="/login"
            :icon="IconExit"
            label="خروج"
            mode="danger"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import ElementIcon from "@/components/icons/icon-grid-elements.vue";
import WalletIcon from "@/components/icons/icon-wallet.vue";
import iconStrongBox from "@/components/icons/icon-strong-box.vue";
import IconMultipleCards from "@/components/icons/icon-multiple-cards.vue";
import IconNote from "@/components/icons/icon-note.vue";
import IconCardPos from "@/components/icons/icon-card-pos.vue";
import IconExit from "@/components/icons/icon-exit.vue";

defineProps({
  userName: String,
  nationalId: String,
});
</script>

<style scoped lang="scss">
.sidebar {
  @include flex($justify: flex-start, $direction: column);
  width: 22rem;
  height: 80.4rem;
  padding: var(--p-5) var(--p-1);
  border-radius: var(--radius-12);
  background: var(--surface);

  @include respond-to(xxs) {
    display: none;
  }

  &__header {
    @include flex($direction: column);
    width: 17.2rem;
    gap: 4rem;

    &-name {
      @include font-style(
        $size: 1.8rem,
        $family: "peyda-700",
        $align: center,
        $line-height: 2.8rem
      );
    }

    &-id-container {
      @include flex($justify: space-between);
      width: 100%;
      height: fit-content;
    }

    &-id-label {
      @include font-style($size: 1.2rem, $color: var(--gray-gray));
    }

    &-id-value {
      @include font-style($size: 1.4rem, $family: "peyda-600");
    }
  }

  &__divider {
    width: calc(100% - 1.2rem);
    color: var(--hr-color);
    margin: var(--m-4) 0;
  }

  &__nav {
    width: 100%;
    height: fit-content;

    &-list {
      @include flex($direction: column, $gap: var(--g-1), $align: stretch);
    }
  }
}
</style>
