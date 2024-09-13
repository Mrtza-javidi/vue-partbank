import { App } from "vue";
import * as componentLoader from "@/utils/components-loader/reusable-components-loader";
import * as layoutLoader from "@/utils/components-loader/layouts-loader";

export function registerBaseComponents(app: App): void {
  // common
  app.component("BaseButton", componentLoader.BaseButton);
  app.component("BaseLoader", componentLoader.BaseLoader);
  app.component("BaseInput", componentLoader.BaseInput);
  app.component("BaseTextarea", componentLoader.BaseTextarea);
  app.component("BaseTable", componentLoader.BaseTable);
  app.component("BasePagination", componentLoader.BasePagination);
  app.component("BaseSearchInput", componentLoader.BaseSearchInput);
  app.component("BaseToast", componentLoader.BaseToast);
  app.component("BaseSidebarButton", componentLoader.BaseSidebarButton);

  // layouts
  app.component("BaseAccountInfo", componentLoader.BaseAccountInfo);
  app.component("BaseBankCard", componentLoader.BaseBankCard);
  app.component("BaseFilePicker", componentLoader.BaseFilePicker);
  app.component(
    "BaseOpenAccountWrapper",
    componentLoader.BaseOpenAccountWrapper
  );

  // icons
  app.component("IconGridElements", componentLoader.GridElements);
  app.component("IconAngle", componentLoader.Angle);
  app.component("IconArrowLeft", componentLoader.ArrowLeft);
  app.component("IconCardPos", componentLoader.CardPos);
  app.component("IconChangeCard", componentLoader.ChangeCard);
  app.component("IconClosedEye", componentLoader.ClosedEye);
  app.component("IconDeposit", componentLoader.Deposit);
  app.component("IconEdit", componentLoader.Edit);
  app.component("IconEmptyState", componentLoader.EmptyState);
  app.component("IconErrorOutline", componentLoader.ErrorOutline);
  app.component("IconExit", componentLoader.Exit);
  app.component("IconHamburgerMenu", componentLoader.HamburgerMenu);
  app.component("IconInfoCircle", componentLoader.InfoCircle);
  app.component("IconInfoOutline", componentLoader.InfoOutline);
  app.component("IconLogo", componentLoader.Logo);
  app.component("IconLogout", componentLoader.Logout);
  app.component("IconMore", componentLoader.More);
  app.component("IconMultipleCards", componentLoader.MultipleCards);
  app.component("IconNote", componentLoader.Note);
  app.component("IconNotification", componentLoader.Notification);
  app.component("IconOpenEye", componentLoader.OpenEye);
  app.component("IconSearch", componentLoader.Search);
  app.component("IconSort", componentLoader.Sort);
  app.component("IconStrongBox", componentLoader.StrongBox);
  app.component("IconTickOutline", componentLoader.TickOutline);
  app.component("IconTrash", componentLoader.Trash);
  app.component("IconUpload", componentLoader.Upload);
  app.component("IconWallet", componentLoader.Wallet);
  app.component("IconWithdraw", componentLoader.Withdraw);
}

export function registerLayouts(app: App): void {
  app.component("TheHeader", layoutLoader.TheHeader);
  app.component("TheSidebar", layoutLoader.TheSidebar);
}
