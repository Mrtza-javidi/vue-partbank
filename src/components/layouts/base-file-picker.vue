<template>
  <div class="file-picker">
    <div class="file-picker__container" :style="customStyle">
      <img
        :src="imageUrl"
        alt="national-card front"
        class="file-picker__id-image file-picker__id-image--front"
        v-show="isFileSelected"
      />
      <div class="file-picker__contents" v-show="!isFileSelected">
        <svg viewBox="0 0 69 52" class="file-picker__upload-icon">
          <use href="@/assets/icons/upload.svg#Upload"></use>
        </svg>
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
        <span class="file-picker__actions-more-icon" @click="toggleActions">
          <svg viewBox="0 0 32 32">
            <use href="@/assets/icons/more.svg#More" />
          </svg>
        </span>
        <div v-if="showActions" class="file-picker__actions-container">
          <button
            class="file-picker__button file-picker__button--edit"
            @click="triggerFileInput"
          >
            <svg viewBox="0 0 20 20" class="file-picker__button-icon">
              <use href="@/assets/icons/edit.svg#Edit" />
            </svg>
            <p>ویرایش</p>
          </button>
          <hr />
          <button
            class="file-picker__button file-picker__button--delete"
            @click="handleDelete"
          >
            <svg
              viewBox="0 0 20 20"
              class="file-picker__button-icon file-picker__button-icon--delete"
            >
              <use href="@/assets/icons/trash.svg#Trash" />
            </svg>
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

<script setup>
import { ref, watch } from "vue";
import { useClickOutside } from "@/composables/click-outside";

const actionsMenu = ref(null);
const { isClickedOutside } = useClickOutside(actionsMenu);
watch(isClickedOutside, (outside) => {
  if (outside) {
    showActions.value = false;
  }
});
const toggleActions = () => {
  showActions.value = !showActions.value;
};

const emit = defineEmits(["update:modelValue", "fileError"]);
const props = defineProps({
  text: { type: String, default: "تصویر کارت ملی" },
  customStyle: String,
  modelValue: { type: Boolean, default: false },
});

const fileInput = ref(null);
const showError = ref(false);
const isFileSelected = ref(props.modelValue);
const imageUrl = ref("");
const isFilePickerValid = ref(false);
const showActions = ref(false);

const triggerFileInput = () => {
  fileInput.value.click();
  showActions.value = false;
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!file || !validImageTypes.includes(file.type)) {
    showError.value = true;
    emit("fileError");
    emit("update:modelValue", false);
    return;
  }
  showError.value = false;
  isFilePickerValid.value = true;
  isFileSelected.value = true;
  readAndSaveFile(file);
  emit("update:modelValue", true);
};

const readAndSaveFile = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    imageUrl.value = reader.result;
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
    fill: var(--gray-gray);
    cursor: pointer;
  }

  &__actions-more-icon {
    display: flex;
  }

  &__actions-container--show {
    visibility: visible;
    opacity: 1;
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
