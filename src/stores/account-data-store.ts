import { defineStore } from "pinia";
import axiosInstance from "@/services/axios/axios-config";
import { enableMocking } from "@/services/axios/mock-axios";
import { useTransactionsStore } from "@/stores/account-transactions-store";

interface Score {
  amount: number;
  paymentPeriod: number;
}

interface Instalment {
  amount: number;
  dueDate: string;
}

interface AccountDetails {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  balance: number;
  cardNumber: string;
  score: Score;
  upcomingInstalment: Instalment;
  id: string;
}

interface AccountData {
  data: AccountDetails;
  isModalVisible: boolean;
  isLoading: boolean;
  mockEnabled: boolean;
}

export const useAccountDataStore = defineStore("account-data", {
  state: (): AccountData => ({
    data: {} as AccountDetails,
    isModalVisible: true,
    isLoading: false,
    mockEnabled: true,
  }),
  actions: {
    async fetchAccountData() {
      this.isLoading = true;
      try {
        if (this.mockEnabled) {
          const createAccountData = localStorage.getItem("create-account");
          const firstName = createAccountData
            ? JSON.parse(createAccountData).firstName
            : "";
          if (firstName) {
            const mockResponse = {
              data: {
                firstName: "مرتضی",
                lastName: "جاویدی",
                address: "همین دور و بر",
                postalCode: "1212121212",
                balance: 92000000,
                cardNumber: "1395516919687507",
                score: {
                  amount: 20000000,
                  paymentPeriod: 48,
                },
                upcomingInstalment: {
                  amount: 1000000,
                  dueDate: "20250307",
                },
                id: "30ab1b8c-4a14-40fc-bd0a-4927c85263ee",
              },
            };
            this.data = mockResponse.data;
            this.isModalVisible = false;
          }
        } else {
          const response = await axiosInstance.get("/deposit-account");
          if (
            response &&
            response.result &&
            Object.keys(response.result).length !== 0
          ) {
            this.data = response.result;
            this.isModalVisible = false;
          } else {
            this.isLoading = false;
            this.isModalVisible = true;
          }
        }
      } catch (error) {
        console.error("Error fetching account data:", error);
        this.isModalVisible = true;
      } finally {
        this.isLoading = false;
      }
    },
    enableMocking(state: boolean): void {
      this.mockEnabled = state;
      enableMocking(state);
    },
  },
  getters: {
    fullName(state) {
      if (state.data && state.data.firstName && state.data.lastName) {
        return `${state.data.firstName} ${state.data.lastName}`;
      }
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
