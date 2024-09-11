<template>
  <div class="input-container">
    <label :for="id" :class="labelCustomClass">{{ label }}</label>
    <div class="input-container__input-wrapper">
      <input
        :type="computedType"
        :id="id"
        :class="inputClass"
        :placeholder="placeholder"
        :value="modelValue"
        @input="(event: any) => emit('update:modelValue', event.target.value)"
        :ref="regexType"
        :autofocus="autofocus"
      />
      <component
        v-if="isPassword"
        :is="showPassword ? OpenEye : ClosedEye"
        class="input-container__input-icon"
        @click="toggleShowPass"
      />
    </div>
    <div v-if="error" class="input-container__input-error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import ClosedEye from "@/components/icons/icon-closed-eye.vue";
import OpenEye from "@/components/icons/open-eye.vue";

const props = defineProps({
  modelValue: String,
  label: String,
  labelCustomClass: String,
  id: String,
  name: String,
  type: String,
  placeholder: String,
  required: { type: Boolean, required: true },
  autofocus: Boolean,
  regexType: { type: String, required: true },
});

const emit = defineEmits(["update:modelValue"]);

const showPassword = ref<boolean>(false);
const error = ref("");

const inputClass = computed(() => [
  "input-container__input",
  { "input-container__input--password": isPassword },
]);

watch(
  () => props.modelValue,
  (newValue) => {
    validateInput();
  }
);

const isPassword = computed(() => props.type === "password");
const computedType = computed(() => {
  return isPassword.value && showPassword.value ? "text" : props.type;
});

const toggleShowPass = () => {
  showPassword.value = !showPassword.value;
};

const regexes = [
  {
    key: "password",
    regex: /^[A-Za-z\d\.-@]{8,}$/,
    errmsg:
      "پسورد میتواند شامل حروف و اعداد انگلیسی و علائم (. - و @) به اندازه ۸ کاراکتر یا بیشتر باشد",
  },
  {
    key: "phoneNumber",
    regex: /^((09[0-9]{9})|(۰۹[۰-۹]{9}))$/,
    errmsg: "شماره تلفن باید با پیش شماره ۰۹ شروع شود و شامل ۱۱ عدد باشد",
  },
  {
    key: "email",
    regex: /^([a-z\d\.-]+)(@)([a-z\d-]+)(\.)([a-z]{2,8})(\.[a-z]{2,8})?$/i,
    errmsg: "ایمیل وارد شده معتبر نمیباشد. کاراکتر های وارد شده را بررسی کنید",
  },
  {
    key: "postalCode",
    regex: /^(([0-9]{10})|([۰-۹]{10}))$/,
    errmsg: "کدپستی باید۱۰ رقمی باشد",
  },
  {
    key: "address",
    regex: /^[\u0600-\u06FF\s\-]{10,}$/,
    errmsg: "آدرس باید فارسی و حداقل شامل ۵ کاراکتر باشد",
  },
];

const validateInput = () => {
  error.value = "";

  const modelValue = props.modelValue || "";
  regexes.forEach(({ key, regex, errmsg }) => {
    if (props.regexType === key)
      if (!regex.test(modelValue)) {
        error.value = errmsg;
      }
  });

  if (props.required && (!props.modelValue || props.modelValue.trim() === "")) {
    error.value = "پر کردن این ورودی الزامی است";
  }
};
</script>

<style scoped lang="scss">
.label-variant-black {
  @include font-style;
  padding: 0 var(--p-1);
}

.label-variant-gray {
  @include font-style($size: 1.6rem, $family: "peyda-500");
  padding: 0 var(--p-1);
  color: var(--text-gray);
}

.input-container {
  @include flex($align: stretch, $direction: column, $gap: var(--g-2));
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;

  &__input-wrapper {
    @include flex($align: center, $direction: row, $gap: var(--g-1));
    position: relative;
  }

  &__input {
    width: 100%;
    height: 4.8rem;
    padding: 0 var(--p-1);
    @include font-style($size: 1.4rem, $family: "peyda-600");
    border-radius: var(--radius-6);
    background: var(--surface-light-blue);
    direction: rtl;

    &--password {
      padding-left: var(--p-8);
    }

    &-error {
      color: var(--fail-500);
      @include position($position: absolute, $top: initial, $bottom: -1.5rem);
    }
  }

  &__input-icon {
    @include position(
      $position: relative,
      $top: 50%,
      $left: 0.8rem,
      $right: initial
    );
    width: 2.4rem;
    height: 2.4rem;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
</style>
