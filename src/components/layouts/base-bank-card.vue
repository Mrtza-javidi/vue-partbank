<template>
  <div class="card">
    <div class="card__balance-actions balance-actions">
      <div class="balance-actions__more-menu">
        <slot name="bank-actions" />
      </div>
      <div class="balance-actions__balance-container">
        <span class="balance-actions__balance-title">موجودی کل</span>
        <p class="balance-actions__balance-amount">{{ formattedBalance }}</p>
      </div>
    </div>
    <div class="card__number">
      <span>{{ formattedCardNumber.slice(0, 4) }}</span>
      <span>{{ formattedCardNumber.slice(4, 8) }}</span>
      <span>{{ formattedCardNumber.slice(8, 12) }}</span>
      <span>{{ formattedCardNumber.slice(12) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { convertToFarsiNumber } from "@/utils/number-formatter";

const props = defineProps({
  balance: {
    type: Number,
    default: 0,
  },
  number: {
    type: String,
    default: "0",
  },
});

const formattedBalance = computed(() => {
  return props.balance ? convertToFarsiNumber(props.balance) : "۰";
});

const formattedCardNumber = computed(() =>
  props.number ? convertToFarsiNumber(props.number, { useGrouping: false }) : ""
);
</script>

<style lang="scss" scoped>
.card {
  @include flex($justify: space-between, $direction: column, $align: stretch);
  position: relative;
  width: 45.6rem;
  height: 26rem;
  padding: var(--p-7) var(--p-5) var(--p-6) var(--p-5);
  border-radius: var(--radius-12);
  background-image: url("@/assets/images/pattern.png"),
    linear-gradient(
      129deg,
      rgba(68, 83, 156, 1) 27%,
      rgba(198, 192, 187, 1) 100%
    );
  z-index: 1;

  @include respond-to(xxs) {
    width: 100%;
    height: 18rem;
    padding: 2.526rem 1.684rem 2.309rem 2.526rem;
  }

  &::before {
    content: "";
    display: block;
    @include position($position: absolute, $bottom: 0, $left: 0);
    background-image: url("@/assets/images/noise.png");
    opacity: 0.06;
    z-index: -1;
  }

  &__balance-actions {
    @include flex($justify: space-between, $align: flex-start);
  }

  &__number {
    @include flex($align: flex-start, $justify: center, $gap: var(--g-5));
    @include font-style($size: 3.6rem, $color: var(--text-on-primary));
    direction: ltr;

    @include respond-to(xxs) {
      font-size: 2.4rem;
      font-family: "peyda-600";
      gap: var(--g-4);
    }
  }
}

.balance-actions {
  &__balance-container {
    direction: ltr;
    @include font-style($color: var(--text-on-primary), $family: "peyda-600");
    padding-left: var(--p-2);

    @include respond-to(xxs) {
      padding-left: 0;
    }
  }

  &__balance-title {
    font-size: 1.6rem;

    @include respond-to(xxs) {
      font-size: 1.1rem;
    }
  }

  &__balance-amount {
    font-size: 4rem;

    @include respond-to(xxs) {
      font-size: 2.4rem;
    }
  }
}
</style>
