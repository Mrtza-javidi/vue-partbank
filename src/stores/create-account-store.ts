import { defineStore } from "pinia";
import axiosInstance from "../services/axios/axios-config.js";
import { enableMocking } from "@/services/axios/mock-axios";

interface CreateAccountState {
  firstName: string;
  lastName: string;
  postalCode: string;
  address: string;
  isLoading: boolean;
  mockEnabled: boolean;
}

export const useCreateAccount = defineStore("create-account", {
  state: (): CreateAccountState => ({
    firstName: "",
    lastName: "",
    postalCode: "",
    address: "",
    isLoading: false,
    mockEnabled: true,
  }),
  actions: {
    async createAccount(
      firstName: string,
      lastName: string,
      postalCode: string,
      address: string
    ): Promise<any> {
      try {
        if (this.mockEnabled) {
          this.isLoading = true;

          if (
            firstName === "مرتضی" &&
            lastName === "جاویدی" &&
            postalCode === "۱۲۱۲۱۲۱۲۱۲" &&
            address === "همین دور و بر"
          ) {
            const mockResponse = {
              firstName: "مرتضی",
              lastName: "جاویدی",
              postalCode: "1212121212",
              address: "همین دور و بر",
            };
            this.firstName = mockResponse.firstName;
            this.lastName = mockResponse.lastName;
            this.postalCode = mockResponse.postalCode;
            this.address = mockResponse.address;

            return mockResponse;
          } else {
            throw new Error("information");
          }
        } else {
          const response = await axiosInstance.post("/deposit-account", {
            firstName,
            lastName,
            postalCode,
            address,
          });

          return response;
        }
      } catch (error: any) {
        console.error("create account failed:", error);
        this.isLoading = false;
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
        key: "create-account",
        storage: localStorage,
      },
    ],
  },
});
