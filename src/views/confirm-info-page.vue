<template>
  <the-header :number="phoneNumber" />
  <main id="confirm-info-main">
    <base-open-account-wrapper
      title="تایید اطلاعات"
      wrapperCustomClass="layout-wrapper"
    >
      <template #wrapper-main>
        <form class="confirm-info__form user-info-container">
          <div class="user-info-container__data-row">
            <div class="user-info-container__data-container">
              <p class="user-info-container__data-title">نام:</p>
              <p class="user-info-container__data-value">
                {{ createAccountStore.firstName }}
              </p>
            </div>
            <div class="user-info-container__data-container">
              <p class="user-info-container__data-title">نام خانوادگی:</p>
              <p class="user-info-container__data-value">
                {{ createAccountStore.lastName }}
              </p>
            </div>
            <div class="user-info-container__data-container">
              <p class="user-info-container__data-title">کد پستی:</p>
              <p class="user-info-container__data-value">
                {{ formattedPostalCode }}
              </p>
            </div>
          </div>
          <div class="user-info-container__data-row--address">
            <div class="user-info-container__data-address-container">
              <p class="user-info-container__data-title">محل سکونت:</p>
              <p class="user-info-container__data-value">
                {{ createAccountStore.address }}
              </p>
            </div>
          </div>

          <div class="confirm-info__actions-section">
            <div class="confirm-info__buttons-container">
              <base-button
                text="قبلی"
                customClass="btn-secondary"
                @click.prevent="filePickerPage"
              >
              </base-button>
              <base-button
                text="افتتاح حساب"
                customClass="btn-primary"
                @click.prevent="submitData"
                :isLoading="loading"
              >
              </base-button>
            </div>
          </div>
        </form>
      </template>
    </base-open-account-wrapper>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useCreateAccount } from "@/stores/create-account-store";
import { useToastStore } from "@/stores/toast-store";
import { convertToFarsiNumber } from "@/utils/number-formatter";
import { convertFarsiToEnglishNumbers } from "@/utils/farsi-to-english-number";

const router = useRouter();
const createAccountStore = useCreateAccount();
const toastStore = useToastStore();

const loading = ref<boolean>(false);

const formattedPostalCode = computed(() =>
  convertToFarsiNumber(createAccountStore.postalCode, { useGrouping: false })
);
const phoneNumber = localStorage.getItem("phoneNumber");

createAccountStore.enableMocking(true);

const filePickerPage = () => {
  router.push("/file-picker");
};

const submitData = () => {
  loading.value = true;

  setTimeout(() => {
    const convertedPostalCode = convertFarsiToEnglishNumbers(
      createAccountStore.postalCode
    );
    createAccountStore.postalCode = convertedPostalCode;
    toastStore.showToast("حساب شما با موفقیت ایجاد شد!", "success");
    router.push("/dashboard");
    loading.value = false;
  }, 3000);
};
</script>

<style lang="scss" scoped>
#confirm-info-main {
  height: calc(100vh - 6.8rem);
  @include flex($justify: flex-start, $direction: column);
  background-color: var(--background);
  padding-top: 4.2rem;
}

.layout-wrapper {
  width: 140rem;
}

.confirm-info {
  width: 140rem;
  height: fit-content;
  padding: var(--p-8);
  @include flex($direction: column);
  border-radius: var(--radius-12);
  gap: var(--g-8);
  background: var(--surface);

  &__header {
    @include font-style($size: 2rem, $family: "peyda-700", $weight: normal);
  }

  &__form {
    @include flex($align: flex-start, $direction: column, $gap: var(--g-8));
    width: 100%;
  }

  &__actions-container {
    @include flex($direction: column, $gap: var(--g-3));
    @include position(
      $position: absolute,
      $top: initial,
      $bottom: 1.2rem,
      $left: 1.6rem,
      $right: initial
    );
    padding: var(--p-1) var(--p-2);
    background-color: var(--surface);
    border-radius: var(--radius-8);
    box-shadow: var(--box-shadow-sm) rgba(0, 67, 101, 0.05);
    overflow: hidden;
    transition: visibility 0.3s ease, opacity 0.3s ease;
  }

  &__buttons-container {
    @include flex;
    gap: var(--g-5);
    width: 43.4rem;
  }

  &__actions-section {
    width: 100%;
    @include flex($justify: flex-end);
  }
}

.user-info-container {
  &__data-row {
    display: flex;
    gap: 12rem;

    &--address {
      width: 100%;
    }
  }

  &__data-container {
    width: 150px;
  }

  &__data-title {
    @include font-style($size: 1.6rem, $color: var(--gray-gray));
    opacity: 0.6;
  }

  &__data-value {
    @include font-style(
      $size: 1.6rem,
      $family: "peyda-600",
      $color: var(--black-500)
    );
  }
}
</style>
