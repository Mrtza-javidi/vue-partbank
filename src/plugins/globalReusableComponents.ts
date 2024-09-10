import { App } from "vue";
import * as componentLoader from "@/utils/reusableComponentsLoader";

export default function registerBaseComponents(app: App): void {
  // common
  app.component("BaseButton", componentLoader.BaseButton);
  app.component("BaseLoader", componentLoader.BaseLoader);
  app.component("BaseInput", componentLoader.BaseInput);
  app.component("BaseTable", componentLoader.BaseTable);
  app.component("BasePagination", componentLoader.BasePagination);
  app.component("BaseSearchInput", componentLoader.BaseSearchInput);
  app.component("BaseToast", componentLoader.BaseToast);
  app.component("BaseSidebarBtn", componentLoader.BaseSidebarBtn);

  // layouts
  app.component("BaseAccountInfo", componentLoader.BaseAccountInfo);
  app.component("BaseBankCard", componentLoader.BaseBankCard);
  app.component("BaseFilePicker", componentLoader.BaseFilePicker);
  app.component("BaseOpenAccount", componentLoader.BaseOpenAccount);

  // icons
  app.component("GridElements", componentLoader.GridElements);
  app.component("Angle", componentLoader.Angle);
  app.component("ArrowLeft", componentLoader.ArrowLeft);
  app.component("CardPos", componentLoader.CardPos);
  app.component("ChangeCard", componentLoader.ChangeCard);
  app.component("ClosedEye", componentLoader.ClosedEye);
  app.component("Deposit", componentLoader.Deposit);
  app.component("Edit", componentLoader.Edit);
  app.component("EmptyState", componentLoader.EmptyState);
  app.component("ErrorOutline", componentLoader.ErrorOutline);
  app.component("Exit", componentLoader.Exit);
  app.component("HamburgerMenu", componentLoader.HamburgerMenu);
  app.component("InfoCircle", componentLoader.InfoCircle);
  app.component("InfoOutline", componentLoader.InfoOutline);
  app.component("Logo", componentLoader.Logo);
  app.component("Logout", componentLoader.Logout);
  app.component("More", componentLoader.More);
  app.component("MultipleCards", componentLoader.MultipleCards);
  app.component("Note", componentLoader.Note);
  app.component("Notification", componentLoader.Notification);
  app.component("OpenEye", componentLoader.OpenEye);
  app.component("Search", componentLoader.Search);
  app.component("Sort", componentLoader.Sort);
  app.component("StrongBox", componentLoader.StrongBox);
  app.component("TickOutline", componentLoader.TickOutline);
  app.component("Trash", componentLoader.Trash);
  app.component("Upload", componentLoader.Upload);
  app.component("Wallet", componentLoader.Wallet);
  app.component("Withdraw", componentLoader.Withdraw);
}
