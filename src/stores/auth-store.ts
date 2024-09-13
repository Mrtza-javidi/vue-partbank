import { defineStore } from "pinia";
import axios from "@/services/axios/axios-config";
import { enableMocking } from "@/services/axios/mock-axios";

interface AuthState {
  firstName: string;
  lastName: string;
  idNumber: string;
  isAuthenticated: boolean;
  uniqueKey: string;
  mockEnabled: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    firstName: "",
    lastName: "",
    idNumber: "",
    isAuthenticated: false,
    uniqueKey: "",
    mockEnabled: true,
  }),
  actions: {
    async login(phoneNumber: string, password: string): Promise<any> {
      try {
        if (this.mockEnabled) {
          if (phoneNumber === "۰۹۱۵۴۸۳۸۳۴۳" && password === "123456789") {
            const mockResponse = {
              idNumber: "0987654321",
              uniqueKey: "3e0a3323-a5a8-4bd8-b61e-170724d34212",
            };
            interface PersonalInfo {
              firstName: string;
              lastName: string;
            }
            const { firstName, lastName }: PersonalInfo = JSON.parse(
              localStorage.get("create-account")
            );
            this.firstName = firstName;
            this.lastName = lastName;
            this.idNumber = mockResponse.idNumber;
            this.uniqueKey = mockResponse.uniqueKey;
            this.isAuthenticated = true;

            return mockResponse;
          } else {
            throw new Error("Invalid phone number or password");
          }
        } else {
          const response = await axios.post("/auth/login", {
            phoneNumber,
            password,
          });

          this.firstName = response.data.firstName;
          this.lastName = response.data.lastName;
          this.idNumber = response.data.idNumber;
          this.uniqueKey = response.data.uniqueKey;
          this.isAuthenticated = true;
          localStorage.setItem("token", response.data.token);

          return response.data;
        }
      } catch (error: any) {
        console.error("Login failed:", error.message);
        throw error;
      }
    },
    enableMocking(state: boolean): void {
      this.mockEnabled = state;
      enableMocking(state);
    },
  },
  getters: {
    fullName(state: AuthState): string {
      if (state.firstName && state.lastName) {
        return `${state.firstName} ${state.lastName}`;
      }
      return "";
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "auth",
        storage: localStorage,
      },
    ],
  },
});
