import { ref, onMounted, onUnmounted, Ref } from "vue";

export function useClickOutside(element: Ref<HTMLElement | null>) {
  const isClickedOutside = ref(false);

  function handleClickOutside(event: Event) {
    if (element.value && !element.value.contains(event.target as HTMLElement)) {
      isClickedOutside.value = true;
    } else {
      isClickedOutside.value = false;
    }
  }

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });

  return { isClickedOutside };
}
