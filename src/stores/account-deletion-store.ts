import { defineStore } from "pinia";
import axiosInstance from "@/services/axios/axios-config";
import { useTransactionsStore } from "@/stores/account-transactions-store";
import { enableMocking } from "@/services/axios/mock-axios";

interface AccountData {
  data: { [key: string]: any };
  isModalVisible: boolean;
  isLoading: boolean;
  mockEnabled: boolean;
}

export const useAccountDeletionStore = defineStore("account-data", {
  state: (): AccountData => ({
    data: {},
    isModalVisible: true,
    isLoading: false,
    mockEnabled: true,
  }),
  actions: {
    async deleteBankAccount() {
      const transactionsStore = useTransactionsStore();
      this.isLoading = true;
      try {
        if (this.mockEnabled) {
          this.data = {};
          transactionsStore.transactions = [];
          transactionsStore.count = 0;
          this.isModalVisible = true;
        } else {
          const response = await axiosInstance.delete(`/deposit-account`, {
            params: { id: this.data.id },
          });

          if (
            typeof response.status === "string" &&
            response.status === "success"
          ) {
            this.data = {};
            transactionsStore.transactions = [];
            transactionsStore.count = 0;
            this.isModalVisible = true;
          } else {
            throw new Error("Failed to delete bank account.");
          }
        }
      } catch (error) {
        console.error("Error deleting bank account:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    enableMocking(state: boolean): void {
      this.mockEnabled = state;
      enableMocking(state);
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "account-data",
        storage: localStorage,
      },
    ],
  },
});
