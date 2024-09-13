<template>
  <div class="input-container">
    <label :for="id" :class="labelCustomClass">{{ label }}</label>
    <div class="input-container__input-wrapper">
      <input
        :type="computedType"
        :name="name"
        :id="id"
        :class="inputClass"
        :placeholder="placeholder"
        :required="required"
        :autofocus="autofocus"
        :value="modelValue"
        @input="handleInput"
        :ref="regexType"
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
import { ref, computed, watch, defineAsyncComponent } from "vue";

const ClosedEye = defineAsyncComponent(
  () => import(`@/components/icons/icon-closed-eye.vue`)
);
const OpenEye = defineAsyncComponent(
  () => import(`@/components/icons/icon-open-eye.vue`)
);

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

const emit = defineEmits(["update:modelValue", "validationCheck"]);

const showPassword = ref<boolean>(false);
const error = ref<string>("");

const inputClass = computed(() => [
  "input-container__input",
  { "input-container__input--password": props.type === "password" },
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
    regex: /^(۰۹)([۰-۹]{9})$/,
    errmsg: "شماره تلفن باید با پیش شماره ۰۹ شروع شود و شامل ۱۱ عدد فارسی باشد",
  },
  {
    key: "email",
    regex: /^([a-z\d\.-]+)(@)([a-z\d-]+)(\.)([a-z]{2,8})(\.[a-z]{2,8})?$/i,
    errmsg: "ایمیل وارد شده معتبر نمیباشد. کاراکتر های وارد شده را بررسی کنید",
  },
  {
    key: "name",
    regex: /^([\u0600-\u06FF\s]+)$/,
    errmsg: "نام باید شامل حروف فارسی باشد",
  },
  {
    key: "postalCode",
    regex: /^(([0-9]{10})|([۰-۹]{10}))$/,
    errmsg: "کدپستی باید۱۰ رقمی باشد",
  },
];
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  emit("update:modelValue", value);
  validateInput();
};

const validateInput = () => {
  error.value = "";

  const modelValue = props.modelValue || "";
  const matchedRegex = regexes.find(({ key }) => props.regexType === key);

  if (props.required && (!modelValue || modelValue.trim() === "")) {
    error.value = "پر کردن این ورودی الزامی است";
    emit("validationCheck", false);
    return;
  }

  if (matchedRegex && !matchedRegex.regex.test(modelValue)) {
    error.value = matchedRegex.errmsg;
    emit("validationCheck", false); // Emit false if the validation fails
    return;
  }

  emit("validationCheck", true);
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
      @include position($position: absolute, $top: initial, $bottom: -2rem);
    }
  }

  &__input-icon {
    @include position(
      $position: absolute,
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
