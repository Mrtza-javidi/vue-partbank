import { defineAsyncComponent } from "vue";

export const loadComponent = (folder: string, componentName: string) =>
  defineAsyncComponent(
    () => import(`@/components/${folder}/${componentName}.vue`)
  );

// commons
export const BaseButton = loadComponent("common", "base-button");
export const BaseLoader = loadComponent("common", "base-loader");
export const BaseInput = loadComponent("common", "base-input");
export const BaseTable = loadComponent("common", "base-table");
export const BasePagination = loadComponent("common", "base-pagination");
export const BaseSearchInput = loadComponent("common", "base-search-input");
export const BaseToast = loadComponent("common", "base-toast");
export const BaseSidebarBtn = loadComponent("common", "base-sidebar-btn");

//layouts
export const BaseAccountInfo = loadComponent("layouts", "base-account-info");
export const BaseBankCard = loadComponent("layouts", "base-bank-card");
export const BaseFilePicker = loadComponent("layouts", "base-file-picker");
export const BaseOpenAccount = loadComponent("layouts", "base-open-account");

// icons
export const GridElements = loadComponent("icons", "grid-elements");
export const Angle = loadComponent("icons", "angle");
export const ArrowLeft = loadComponent("icons", "arrow-left");
export const CardPos = loadComponent("icons", "card-pos");
export const ChangeCard = loadComponent("icons", "change-card");
export const ClosedEye = loadComponent("icons", "closed-eye");
export const Deposit = loadComponent("icons", "deposit");
export const Edit = loadComponent("icons", "edit");
export const EmptyState = loadComponent("icons", "empty-state");
export const ErrorOutline = loadComponent("icons", "error-outline");
export const Exit = loadComponent("icons", "exit");
export const HamburgerMenu = loadComponent("icons", "hamburger-menu");
export const InfoCircle = loadComponent("icons", "info-circle");
export const InfoOutline = loadComponent("icons", "info-outline");
export const Logo = loadComponent("icons", "logo");
export const Logout = loadComponent("icons", "logout");
export const More = loadComponent("icons", "more");
export const MultipleCards = loadComponent("icons", "multiple-cards");
export const Note = loadComponent("icons", "note");
export const Notification = loadComponent("icons", "notification");
export const OpenEye = loadComponent("icons", "open-eye");
export const Search = loadComponent("icons", "search");
export const Sort = loadComponent("icons", "sort");
export const StrongBox = loadComponent("icons", "strong-box");
export const TickOutline = loadComponent("icons", "tick-outline");
export const Trash = loadComponent("icons", "trash");
export const Upload = loadComponent("icons", "upload");
export const Wallet = loadComponent("icons", "wallet");
export const Withdraw = loadComponent("icons", "withdraw");
