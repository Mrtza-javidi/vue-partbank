<template>
  <div class="field">
    <label for="address" :class="labelCustomClass">{{ label }}</label>
    <textarea
      type="textarea"
      :name="name"
      :id="id"
      class="field__textarea"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      @input="handleInput"
      :ref="regexType"
      :autofocus="autofocus"
      :style="`height: ${rows}rem`"
    ></textarea>
    <div v-if="error" class="field__error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: String,
  label: String,
  labelCustomClass: String,
  id: String,
  name: String,
  placeholder: String,
  required: { type: Boolean, required: true },
  autofocus: Boolean,
  regexType: { type: String, required: true },
  rows: { type: String, default: "4" },
});

const emit = defineEmits(["update:modelValue", "validationCheck"]);

const error = ref<string>("");

watch(
  () => props.modelValue,
  (newValue) => {
    validateInput();
  }
);

const regexes = [
  {
    key: "address",
    regex: /^[\u0600-\u06FF\s\-]{5,}$/,
    errmsg: "آدرس باید فارسی و حداقل شامل ۵ کاراکتر باشد",
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
    emit("validationCheck", false);
    return;
  }

  emit("validationCheck", true);
};
</script>

<style lang="scss" scoped>
.label-variant-black {
  @include font-style;
  padding: 0 var(--p-1);
}

.label-variant-gray {
  @include font-style($size: 1.6rem, $family: "peyda-500");
  padding: 0 var(--p-1);
  color: var(--text-gray);
}

.field {
  width: 100%;
  @include flex($direction: column, $align: flex-start);
  gap: var(--g-3);
  position: relative;

  &__textarea {
    width: 100%;
    @include font-style($size: 1.4rem, $family: "peyda-600");
    border-radius: var(--radius-6);
    background: var(--surface-light-blue);
    direction: rtl;
    padding: var(--p-3) var(--p-1);
    resize: none;
    border: none;
    outline: none;
  }

  &__error {
    color: var(--fail-500);
    @include position($position: absolute, $top: initial, $bottom: -2rem);
  }
}
</style>
