<template>
  <the-header :number="phoneNumber" />
  <main id="personal-info-main">
    <base-open-account-wrapper
      title="اطلاعات فردی"
      wrapperCustomClass="layout-wrapper"
    >
      <template #wrapper-main>
        <form
          class="personal-info__form info-form"
          @submit.prevent="createAccount"
        >
          <div class="info-form__inputs-wrapper">
            <base-input
              label="نام"
              labelCustomClass="label-variant-gray"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="نام خود را وارد کنید"
              :required="true"
              :autofocus="true"
              regexType="name"
              v-model="firstName"
              @validationCheck="(isValid: boolean) => (validations.firstName = isValid)"
            />

            <base-input
              label="نام خانوادگی"
              labelCustomClass="label-variant-gray"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="نام خانوادگی خود را وارد کنید"
              :required="true"
              regexType="name"
              v-model="lastName"
              @validationCheck="(isValid: boolean) => (validations.lastName = isValid)"
            />

            <base-input
              label="کدپستی"
              labelCustomClass="label-variant-gray"
              type="text"
              id="postalCode"
              name="postalCode"
              placeholder="کدپستی خود را وارد کنید"
              :required="true"
              regexType="postalCode"
              v-model="postalCode"
              @validationCheck="(isValid: boolean) => (validations.postalCode = isValid)"
            />
          </div>
          <base-textarea
            label="آدرس"
            labelCustomClass="label-variant-gray"
            id="address"
            name="address"
            placeholder="آدرس خود را وارد کنید"
            rows="12"
            :required="true"
            regexType="address"
            v-model="address"
            @validationCheck="(isValid: boolean) => (validations.address = isValid)"
          />
          <div class="info-form__actions-section">
            <div class="info-form__buttons-container">
              <base-button
                text="قبلی"
                class="btn-secondary"
                @click.prevent="dashboardPage"
              >
              </base-button>
              <base-button
                text="ثبت و ادامه"
                class="btn-primary"
                @click.prevent="createAccount"
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCreateAccount } from "@/stores/create-account-store";
import { useToastStore } from "@/stores/toast-store";

const router = useRouter();
const createAccountStore = useCreateAccount();
const toastStore = useToastStore();

const loading = ref<boolean>(false);
const firstName = ref<string>("");
const lastName = ref<string>("");
const postalCode = ref<string>("");
const address = ref<string>("");

const phoneNumber = localStorage.getItem("phoneNumber");

createAccountStore.enableMocking(true);

const validations = ref({
  firstName: false,
  lastName: false,
  postalCode: false,
  address: false,
});

const createAccount = () => {
  if (
    !validations.value.firstName ||
    !validations.value.lastName ||
    !validations.value.postalCode ||
    !validations.value.address
  ) {
    toastStore.showToast(
      "خطایی رخ داده است. فیلد هارا دوباره بررسی کنید",
      "error"
    );
    return;
  }

  loading.value = true;

  if (
    firstName.value === "مرتضی" &&
    lastName.value === "جاویدی" &&
    postalCode.value === "۱۲۱۲۱۲۱۲۱۲" &&
    address.value === "همین دور و بر"
  ) {
    createAccountStore.createAccount(
      firstName.value,
      lastName.value,
      postalCode.value,
      address.value
    );
    router.push("/file-picker");
  } else
    toastStore.showToast(
      "اطلاعات وارد شده مطابق با mock data نمیباشد. دوباره تلاش کنید.",
      "error"
    );

  loading.value = false;
};

const dashboardPage = () => {
  router.push("/dashboard");
};
</script>

<style lang="scss" scoped>
#personal-info-main {
  height: calc(100vh - 6.8rem);
  @include flex($justify: flex-start, $direction: column);
  background-color: var(--background);
  padding-top: 4.2rem;
}

.layout-wrapper {
  width: 140rem;
}

.personal-info__form {
  width: 100%;
  @include flex($direction: column);
  gap: var(--g-8);
}

.info-form {
  &__inputs-wrapper {
    width: 100%;
    display: flex;
    gap: 3.2rem;
  }

  &__input {
    width: 100%;
    height: 4.8rem;
    padding: 0 var(--p-1);
    @include font-style($size: 1.4rem, $family: "peyda-600");
    border-radius: var(--radius-6);
    background: var(--surface-light-blue);
    direction: rtl;
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

  &__next-button {
    width: 209px;
  }

  &__previous-button {
    @extend .info-form__next-button;
  }
}
</style>
