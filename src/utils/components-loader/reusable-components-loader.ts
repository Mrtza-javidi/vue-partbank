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
export const BaseSidebarButton = loadComponent("common", "base-sidebar-button");

//layouts
export const BaseAccountInfo = loadComponent("layouts", "base-account-info");
export const BaseBankCard = loadComponent("layouts", "base-bank-card");
export const BaseFilePicker = loadComponent("layouts", "base-file-picker");
export const BaseOpenAccount = loadComponent("layouts", "base-open-account");

// icons
export const GridElements = loadComponent("icons", "icon-grid-elements");
export const Angle = loadComponent("icons", "icon-angle");
export const ArrowLeft = loadComponent("icons", "icon-arrow-left");
export const CardPos = loadComponent("icons", "icon-card-pos");
export const ChangeCard = loadComponent("icons", "icon-change-card");
export const ClosedEye = loadComponent("icons", "icon-closed-eye");
export const Deposit = loadComponent("icons", "icon-deposit");
export const Edit = loadComponent("icons", "icon-edit");
export const EmptyState = loadComponent("icons", "icon-empty-state");
export const ErrorOutline = loadComponent("icons", "icon-error-outline");
export const Exit = loadComponent("icons", "icon-exit");
export const HamburgerMenu = loadComponent("icons", "icon-hamburger-menu");
export const InfoCircle = loadComponent("icons", "icon-info-circle");
export const InfoOutline = loadComponent("icons", "icon-info-outline");
export const Logo = loadComponent("icons", "icon-logo");
export const Logout = loadComponent("icons", "icon-logout");
export const More = loadComponent("icons", "icon-more");
export const MultipleCards = loadComponent("icons", "icon-multiple-cards");
export const Note = loadComponent("icons", "icon-note");
export const Notification = loadComponent("icons", "icon-notification");
export const OpenEye = loadComponent("icons", "icon-open-eye");
export const Search = loadComponent("icons", "icon-search");
export const Sort = loadComponent("icons", "icon-sort");
export const StrongBox = loadComponent("icons", "icon-strong-box");
export const TickOutline = loadComponent("icons", "icon-tick-outline");
export const Trash = loadComponent("icons", "icon-trash");
export const Upload = loadComponent("icons", "icon-upload");
export const Wallet = loadComponent("icons", "icon-wallet");
export const Withdraw = loadComponent("icons", "icon-withdraw");
