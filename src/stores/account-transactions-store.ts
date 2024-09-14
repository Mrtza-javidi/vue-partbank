// stores/dashboardStore.js
import { defineStore } from "pinia";
import axiosInstance from "@/services/axios/axios-config.ts";
import { enableMocking } from "@/services/axios/mock-axios";

interface Transactions {
  type: string;
  date: string;
  amount: string;
}

interface TransactionsStore {
  transactions: Transactions[];
  count: number;
  mockEnabled: boolean;
}

export const useTransactionsStore = defineStore("transactions", {
  state: (): TransactionsStore => ({
    transactions: [],
    count: 0,
    mockEnabled: true,
  }),
  actions: {
    async fetchTransactions() {
      try {
        if (this.mockEnabled) {
          const mockResponse = {
            transactions: [
              {
                type: "withdraw",
                date: "2024-07-14 12:53:35",
                amount: "512606758",
              },
              {
                type: "deposit",
                date: "2024-07-17 12:53:35",
                amount: "863937943",
              },
              {
                type: "withdraw",
                date: "2024-07-17 12:53:35",
                amount: "740825361",
              },
              {
                type: "withdraw",
                date: "2024-07-14 12:53:35",
                amount: "512606758",
              },
              {
                type: "withdraw",
                date: "2024-07-18 12:53:35",
                amount: "962769900",
              },
              {
                type: "deposit",
                date: "2024-07-15 12:53:35",
                amount: "129365939",
              },
              {
                type: "deposit",
                date: "2024-07-14 12:53:35",
                amount: "411745627",
              },
              {
                type: "withdraw",
                date: "2024-07-14 12:53:35",
                amount: "960845825",
              },
              {
                type: "withdraw",
                date: "2024-07-14 12:53:35",
                amount: "182193093",
              },
              {
                type: "deposit",
                date: "2024-07-14 12:53:35",
                amount: "701265621",
              },
              {
                type: "withdraw",
                date: "2024-07-11 12:53:35",
                amount: "989765803",
              },
              {
                type: "deposit",
                date: "2024-07-15 12:53:35",
                amount: "517469573",
              },
              {
                type: "withdraw",
                date: "2024-07-19 12:53:35",
                amount: "218225923",
              },
              {
                type: "deposit",
                date: "2024-07-12 12:53:35",
                amount: "339523346",
              },
              {
                type: "withdraw",
                date: "2024-07-13 12:53:35",
                amount: "65924007",
              },
              {
                type: "deposit",
                date: "2024-07-16 12:53:35",
                amount: "592290897",
              },
              {
                type: "deposit",
                date: "2024-07-18 12:53:35",
                amount: "92168285",
              },
              {
                type: "deposit",
                date: "2024-07-12 12:53:35",
                amount: "597042380",
              },
              {
                type: "deposit",
                date: "2024-07-11 12:53:35",
                amount: "259449781",
              },
              {
                type: "withdraw",
                date: "2024-07-20 12:53:35",
                amount: "606907698",
              },
              {
                type: "deposit",
                date: "2024-07-12 12:53:35",
                amount: "327956625",
              },
            ],
            count: 21,
          };
          this.transactions = mockResponse.transactions;
          this.count = mockResponse.count;
        } else {
          const response = await axiosInstance.get("/transactions");

          if (response && response.results) {
            this.transactions = response.results;
            this.count = this.transactions.length;
          }
        }
      } catch (error) {
        console.error("Error fetching transactions data:", error);
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
        key: "transactions",
        storage: localStorage,
      },
    ],
  },
});
