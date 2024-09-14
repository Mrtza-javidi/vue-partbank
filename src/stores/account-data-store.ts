import { defineStore } from "pinia";
import axiosInstance from "@/services/axios/axios-config";
import { enableMocking } from "@/services/axios/mock-axios";

interface AccountData {
  data: object;
  isModalVisible: boolean;
  isLoading: boolean;
  mockEnabled: boolean;
}

export const useAccountDataStore = defineStore("account-data", {
  state: (): AccountData => ({
    data: {},
    isModalVisible: true,
    isLoading: false,
    mockEnabled: true,
  }),
  actions: {
    async fetchAccountData() {
      this.isLoading = true;
      try {
        if (this.mockEnabled) {
          const mockResponse = {
            data: {
              status: "success",
              result: {
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
            },
          };
          this.data = mockResponse.data;
          this.isModalVisible = false;
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
