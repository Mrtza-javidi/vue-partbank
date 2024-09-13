<template>
  <div class="file-picker">
    <div class="file-picker__container">
      <img
        :src="imageUrl"
        alt="national-card front"
        class="file-picker__id-image file-picker__id-image--front"
        v-show="isFileSelected"
      />
      <div class="file-picker__contents" v-show="!isFileSelected">
        <icon-upload customClass="file-picker__upload-icon" />
        <div>
          تصویر را بکشید و در اینجا رها کنید
          <br />
          <p>
            یا
            <span class="file-picker__link" @click="triggerFileInput">
              کلیک کنید</span
            >.
          </p>
        </div>
        <input
          id="fileInput"
          class="file-picker__input"
          type="file"
          accept=".jpg, .jpeg, .png, .webp"
          @change="handleFileChange"
          ref="fileInput"
          required
        />
      </div>
    </div>
    <div class="file-picker__text-actions-container">
      <p class="file-picker__text">{{ text }}</p>
      <div
        v-if="isFilePickerValid"
        ref="actionsMenu"
        class="file-picker__actions-image"
      >
        <span @click="toggleActions">
          <icon-more
            customClass="file-picker__actions-more-icon"
            color="var(--gray-gray)"
          />
        </span>
        <div v-if="showActions" class="file-picker__actions-container">
          <button
            class="file-picker__button file-picker__button--edit"
            @click="triggerFileInput"
          >
            <icon-edit customClass="file-picker__button-icon" />
            <p>ویرایش</p>
          </button>
          <hr />
          <button
            class="file-picker__button file-picker__button--delete"
            @click="handleDelete"
          >
            <icon-trash
              customClass="file-picker__button-icon file-picker__button-icon--delete"
            />
            <p>حذف</p>
          </button>
        </div>
      </div>
    </div>
  </div>
  <teleport to="body">
    <BaseToast
      v-if="showError"
      message="تصویر به درستی آپلود نشد!"
      class="error"
    />
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useClickOutside } from "@/composables/click-outside";

const actionsMenu = ref(null);
const { isClickedOutside } = useClickOutside(actionsMenu);
watch(isClickedOutside, (outside) => {
  outside && (showActions.value = false);
});

const props = defineProps({
  text: { type: String, default: "تصویر کارت ملی" },
  modelValue: { type: Boolean, default: false },
});

const fileInput = ref<HTMLInputElement | null>(null);
const showError = ref(false);
const isFileSelected = ref(props.modelValue);
const imageUrl = ref("");
const isFilePickerValid = ref(false);
const showActions = ref(false);

const emit = defineEmits(["update:modelValue", "fileError"]);

const toggleActions = () => {
  showActions.value = !showActions.value;
};

const triggerFileInput = () => {
  fileInput.value && fileInput.value.click();
  showActions.value = false;
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;
  const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxFileSize = 1 * 1024 * 1024;

  if (!file || !validImageTypes.includes(file.type)) {
    showError.value = true;
    emit("fileError");
    emit("update:modelValue", false);
    return;
  }

  if (file.size > maxFileSize) {
    showError.value = true;
    emit("fileError", "File size exceeds the 1MB limit");
    emit("update:modelValue", false);
    return;
  }

  showError.value = false;
  isFilePickerValid.value = true;
  isFileSelected.value = true;
  readAndSaveFile(file);
  emit("update:modelValue", true);
};

const readAndSaveFile = (file: File) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    reader.result &&
      typeof reader.result === "string" &&
      (imageUrl.value = reader.result);
  };
};

const handleDelete = () => {
  imageUrl.value = "";
  isFileSelected.value = false;
  isFilePickerValid.value = false;
  emit("update:modelValue", false);
};

watch(
  () => props.modelValue,
  (newVal) => {
    isFileSelected.value = newVal;
  }
);

watch(showError, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      showError.value = false;
    }, 4000);
  }
});
</script>

<style lang="scss" scoped>
.file-picker {
  position: relative;
  width: 32rem;
  overflow: hidden;
  border-radius: var(--radius-8);

  &__container {
    @include flex($direction: column);
    height: 180px;
    background-color: #f9fafb;
    border: 1px dashed var(--line);
  }

  &__contents {
    @include font-style(
      $size: 1.4rem,
      $family: "peyda-600",
      $color: var(--text-gray),
      $align: center
    );
  }

  &__upload-icon {
    width: 6.8rem;
    height: 5rem;
    fill: var(--black-100);
  }

  &__link {
    color: var(--primary-color);
    cursor: pointer;
  }

  &__input {
    display: none;
  }

  &__id-image {
    width: 100%;
    height: 100%;
  }

  &__text-actions-container {
    @include flex($justify: space-between);
    background: var(--surface-light-blue);
    padding: var(--p-3) var(--p-2);
  }

  &__text {
    @include font-style($size: 1.4rem);
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

  &__actions-image {
    display: flex;
    flex-direction: column;
    width: 2rem;
    cursor: pointer;
  }

  &__actions-more-icon {
    display: flex;
    width: 2rem;
    height: 2rem;
  }

  &__button {
    @include font-style($family: "peyda-400");
    background-color: transparent;

    display: flex;
    gap: 0.8rem;
    width: 100%;

    &-icon {
      width: 2rem;
      height: 2rem;
      fill: var(--black-500);

      &--delete {
        fill: var(--fail-500);
      }
    }

    &--delete {
      color: var(--fail-500);
    }
  }

  &__icon {
    width: 2rem;
  }

  &__buttons {
    @include flex;
    gap: var(--g-5);
    width: 43.4rem;
  }

  &__buttons-container {
    width: 100%;
    @include flex($justify: flex-end);
  }
}
</style>
