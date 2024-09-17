<template>
  <the-header :number="phoneNumber" />
  <main id="file-picker-main">
    <base-open-account-wrapper
      title="تصویر کارت ملی"
      wrapperCustomClass="layout-wrapper"
    >
      <template #wrapper-main>
        <form class="file-picker__form" @submit.prevent="submitForm">
          <div class="file-picker__card-items-container">
            <base-file-picker
              containerCustomClass="file-picker__card-items"
              text="تصویر روی کارت ملی"
              v-model="filePicker1Valid"
              @fileError="handleFileError"
            />
            <base-file-picker
              containerCustomClass="file-picker__card-items"
              text="تصویر پشت کارت ملی"
              v-model="filePicker2Valid"
              @fileError="handleFileError"
            />
          </div>
          <div class="card-item__actions-section">
            <div class="card-item__buttons-container">
              <base-button
                text="قبلی"
                customClass="btn-secondary"
                @click.prevent="personalInfoPage"
              >
              </base-button>
              <base-button
                text="ثبت و ادامه"
                customClass="btn-primary"
                @click.prevent="submitForm"
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToastStore } from "@/stores/toast-store";

const router = useRouter();
const toastStore = useToastStore();

const filePicker1Valid = ref<boolean>(false);
const filePicker2Valid = ref<boolean>(false);

const phoneNumber = localStorage.getItem("phoneNumber");

const checkValidation = () => {
  if (!filePicker1Valid.value || !filePicker2Valid.value) {
    toastStore.showToast("لطفاً ابتدا تصاویر موردنظر را آپلود کنید.", "error");
    return;
  }
  router.push("/confirm-info");
};

const submitForm = () => {
  checkValidation();
};

const personalInfoPage = () => {
  router.push("/personal-info");
};

const handleFileError = () => {
  toastStore.showToast(
    `خطا در بارگذاری فایل: فایل بزرگ تر از ۱ مگابایت است یا فرمتی غیر از jpg، jpeg، png، webp دارد`
  );
};
</script>

<style lang="scss" scoped>
#file-picker-main {
  height: calc(100vh - 6.8rem);
  @include flex($align: flex-start);
  background-color: var(--background);
  padding-top: 4.2rem;
}

.layout-wrapper {
  width: 140rem;
}

.file-picker {
  &__form {
    @include flex($direction: column, $gap: var(--p-8));
    width: 100%;
  }

  &__card-items-container {
    display: flex;
    gap: 4rem;
  }

  &__card-items {
    width: 32rem;
  }
}

.card-item {
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
</style>
