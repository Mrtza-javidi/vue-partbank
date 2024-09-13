<template>
  <main id="login-main">
    <section class="login">
      <div class="login__contents login-contents-container">
        <div class="login-contents-container__header">
          <icon-logo customClass="login-contents-container__logo" />
          <div class="login-contents-container__title-container">
            <h1 class="login-contents-container__title">پارت بانک</h1>
            <p class="login-contents-container__title-description">
              تجربه ای نوین در بانک داری
            </p>
          </div>
        </div>

        <form
          class="login-contents-container__form login-form"
          @submit.prevent="handleLogin"
          ref="form"
        >
          <base-input
            label="شماره همراه"
            labelCustomClass="label-variant-black"
            type="text"
            id="tel"
            name="tel"
            placeholder="مثلا ۰۹۱۲۳۴۵۶۷۸۹"
            :required="true"
            :autofocus="true"
            regexType="phoneNumber"
            v-model="phoneNumber"
            @validationCheck="(isValid: boolean) => (validations.phoneNumber = isValid)"
          />
          <base-input
            label="رمز عبور"
            labelCustomClass="label-variant-black"
            type="password"
            id="password"
            name="password"
            placeholder="رمز عبور"
            :required="true"
            :autofocus="true"
            regexType="password"
            v-model="password"
            @validationCheck="(isValid: boolean) => (validations.password = isValid)"
          />
          <base-button
            customClass="login-form__submit-btn btn-primary"
            text="ورود"
            :isLoading="loading"
          >
          </base-button>
        </form>

        <div class="login-contents-container__footer">
          <span>پشتیبانی:</span>
          <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
        </div>
      </div>
      <div class="login__cover"></div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth-store";
import { convertFarsiToEnglishNumbers } from "@/utils/farsi-to-english-number";
import { useToastStore } from "@/stores/toast-store";

const router = useRouter();
const authStore = useAuthStore();
const toastStore = useToastStore();

const phoneNumber = ref<string>("");
const password = ref<string>("");
const loading = ref<boolean>(false);

authStore.enableMocking(true);

const validations = ref({
  phoneNumber: false,
  password: false,
});

const handleLogin = () => {
  if (!validations.value.phoneNumber || !validations.value.password) {
    toastStore.showToast(
      "خطایی رخ داده است. فیلد هارا دوباره بررسی کنید",
      "error"
    );
    return;
  }

  loading.value = true;
  setTimeout(() => {
    if (phoneNumber.value === "۰۹۱۵۴۸۳۸۳۴۳" && password.value === "123456789") {
      const toEnglishPhoneNumber = convertFarsiToEnglishNumbers(
        phoneNumber.value
      );
      authStore.login(phoneNumber.value, password.value);
      toastStore.showToast("ورود شما با موفقیت انجام شد!", "success");
      localStorage.setItem("phoneNumber", toEnglishPhoneNumber);
      router.push("/dashboard");
    } else
      toastStore.showToast(
        "اطلاعات وارد شده مطابق با mock data نمیباشد. دوباره تلاش کنید.",
        "error"
      );

    loading.value = false;
  }, 3000);
};
</script>

<style scoped lang="scss">
#login-main {
  @include flex;
  height: 100vh;
  background: url("@/assets/images/bg-image.png") no-repeat center right / cover;
}

.login {
  @include flex($align: stretch, $gap: 2rem);
  width: 120rem;
  height: 84rem;
  background-color: var(--surface);
  padding: var(--p-4);
  border-radius: var(--radius-8);

  &__cover {
    width: 50%;
    background: url("@/assets/images/login-cover.png") no-repeat center center /
      cover;
    border-radius: var(--radius-12);
  }

  &__contents {
    @include flex($justify: space-between, $direction: column);
    width: 50%;
    padding: 6.3rem 0 var(--p-2);
  }
}

.login-contents-container {
  &__header {
    @include flex;
    gap: 1.6rem;
  }

  &__logo {
    width: 9.6rem;
    height: fit-content;

    // &-path-1 {
    //   fill: var(--primary-500);
    // }

    // &-path-2 {
    //   @extend .login-contents-container__logo-path-1;
    // }

    // &-path-3 {
    //   fill: var(--primary-300);
    // }
  }

  &__title {
    @include font-style(
      $size: 4rem,
      $family: "peyda-700",
      $color: var(--primary-500)
    );
  }

  &__title-description {
    @include font-style($color: var(--primary-500));
    line-height: 1;
  }

  &__footer {
    display: flex;
    gap: 0.4rem;
    @include font-style($size: 1.4rem);
  }

  &__form {
    width: 35.4rem;
    @include flex($align: stretch, $direction: column, $gap: 3rem);
    margin-top: -14rem;
  }
}

.login-form {
  &__submit-btn {
    margin-top: 3rem;
  }

  &__loader {
    width: 3rem;
    height: 3rem;
  }
}
</style>
