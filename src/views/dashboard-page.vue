<template>
  <the-header :number="phoneNumber" showDownChevron="true" />

  <main id="dashboard-main">
    <section class="dashboard">
      <the-sidebar :userName="fullName" :nationalId="'۰' + nationalId" />

      <div class="dashboard__contents contents">
        <div
          v-if="isModalVisible || loading"
          :style="{
            display: isModalVisible || loading ? 'flex' : 'none',
          }"
          class="modal"
          ref="modal"
        >
          <div v-if="isModalVisible" class="modal__contents-container">
            <icon-empty-state customClass="modal__icon" />
            <div class="modal__message">
              برای دسترسی به داشبورد، لطفا ابتدا افتتاح حساب کنید
            </div>
            <button class="modal__button" @click="personalInfoPage">
              افتتاح حساب
            </button>
          </div>

          <base-loader
            customClass="loader"
            :isLoading="loading && !isModalVisible"
          ></base-loader>
        </div>

        <div class="contents__bank-info bank-info">
          <base-bank-card
            :balance="data?.balance || ''"
            :number="data?.cardNumber || ''"
          >
            <template #bank-actions>
              <div
                :class="[
                  'balance-actions__more-menu',
                  { 'is-active': isMenuActive },
                ]"
                ref="moreMenu"
              >
                <icon-more
                  customClass="balance-actions__menu-icon"
                  color="var(--surface)"
                  @click="toggleMenu"
                />
                <div class="balance-actions__actions-container">
                  <button class="balance-actions__button">
                    <icon-change-card
                      customClass="balance-actions__button-icon"
                      color="var(--black-100)"
                    />
                    <p>تغییر حساب متصل</p>
                  </button>
                  <hr />
                  <button
                    class="balance-actions__button balance-actions__button--danger"
                    @click="deleteBankAccount"
                  >
                    <icon-logout
                      customClass="balance-actions__button-icon"
                      color="var(--fail-500)"
                    />
                    <p>حذف حساب بانکی</p>
                  </button>
                </div>
              </div>
            </template>
          </base-bank-card>

          <base-account-info-card
            title="امتیاز حساب"
            accountInfoCustomClass="score-card"
          >
            <template #header-info>
              <icon-info-circle
                customClass="account-score__header-icon"
                color="var(--gray-gray)"
              />
            </template>

            <template #main>
              <div class="bank-info__account-score account-score">
                <div class="account-score__score-info-container">
                  <div class="account-score__money">
                    <span class="account-score__money-amount">{{
                      formattedScoreAmount
                    }}</span>
                    <span class="account-score__money-currency">ریال</span>
                  </div>
                  <div class="account-score__month">
                    <span class="account-score__month-number">{{
                      formattedMonth
                    }}</span>
                    <span class="account-score__month-text">ماهه</span>
                  </div>
                </div>
              </div>
              <base-button
                text="محاسبه امتیاز"
                customClass="btn-secondary"
              ></base-button>
            </template>
          </base-account-info-card>

          <base-account-info-card
            title="قسط پیش رو"
            accountInfoCustomClass="installment-card"
          >
            <template #header-info>
              <button class="account-installment__header-details">
                <span>جزئیات</span>
                <icon-angle
                  customClass="account-installment__header-icon"
                  color="var(--gray-gray)"
                />
              </button>
            </template>

            <template #main>
              <div class="account-installment__info-pay-container">
                <div class="account-installment__info">
                  <div class="account-installment__amount">
                    <span class="account-installment__amount-text"
                      >مبلغ قسط:</span
                    >
                    <span class="account-installment__amount-number">{{
                      formattedInstallmentAmount
                    }}</span>
                  </div>

                  <div class="account-installment__deadline">
                    <span class="account-installment__deadline-text"
                      >تاریخ سررسید:</span
                    >
                    <span class="account-installment__deadline-number">{{
                      formattedInstallmentDate
                    }}</span>
                  </div>
                </div>
                <base-button text="پرداخت" class="btn-secondary">
                  <template #left-icon>
                    <icon-arrow-left
                      customClass="account-installment__pay-chevron"
                      color="#3c4351"
                    />
                  </template>
                </base-button>
              </div>
            </template>
          </base-account-info-card>
        </div>

        <div class="contents__transactions transactions">
          <div class="transactions__header">
            <div class="transactions__title-currency">
              <span class="transactions__title">لیست تراکنش ها</span>
              <span class="transactions__currency">( ریال )</span>
            </div>
            <div class="transactions__actions">
              <div class="transactions__sort">
                <div class="transactions__sort-label">
                  <icon-sort
                    customClass="transactions__sort-icon"
                    color="var(--text-gray)"
                  />
                  <span class="transactions__sort-text">مرتب سازی:</span>
                </div>
                <select
                  name="sort"
                  id="sort"
                  class="transactions__sort-method"
                  @change="handleTransactionTypeChange"
                >
                  <option value="all" class="transactions__sort-method-option">
                    همه
                  </option>
                  <option
                    value="withdraw"
                    class="transactions__sort-method-option"
                  >
                    برداشت ها
                  </option>
                  <option
                    value="deposit"
                    class="transactions__sort-method-option"
                  >
                    واریزی ها
                  </option>
                </select>
              </div>
              <div
                class="transactions__search-container-sm search-container-sm"
              >
                <span class="search-container-sm__icon-container">
                  <icon-search
                    customClass="search-container-sm__icon"
                    color="var(--gray-gray)"
                  />
                </span>
              </div>
              <base-search-input
                searchBoxCustomClass="transactions__search-container"
                v-model="searchQuery"
              ></base-search-input>
            </div>
          </div>
          <div class="transactions__table-container">
            <base-table
              tableCustomClass="transactions__table"
              v-if="!isModalVisible"
            >
              <template #header>
                <tr class="table__row table__header-row">
                  <th class="table__header-data" @click="toggleSort('type')">
                    نوع تراکنش
                  </th>
                  <th class="table__header-data" @click="toggleSort('date')">
                    تاریخ و ساعت تراکنش
                  </th>
                  <th class="table__header-data" @click="toggleSort('amount')">
                    مبلغ تراکنش
                  </th>
                </tr>
              </template>
              <template #body>
                <tr
                  v-for="(transaction, i) in paginatedTransactions"
                  :key="i"
                  class="table__row"
                >
                  <td class="table__data">
                    <component
                      :is="
                        transaction.type === 'deposit'
                          ? DepositIcon
                          : WithdrawIcon
                      "
                    />
                    {{ transaction.type === "deposit" ? "واریز" : "برداشت" }}
                  </td>
                  <td class="table__data">
                    {{ formatTime(transaction.date) }}،
                    {{ formatFullDate(transaction.date) }}
                  </td>
                  <td class="table__data">
                    {{ convertToFarsiNumber(transaction.amount) }}
                  </td>
                </tr>
              </template>
            </base-table>
          </div>
          <base-pagination
            v-if="!isModalVisible"
            :currentPage="currentPage"
            :totalPages="totalPages"
            @page-changed="handlePageChange"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
import { useAccountDataStore } from "@/stores/account-data-store.ts";
import { useAccountDeletionStore } from "@/stores/account-deletion-store.ts";
import { useTransactionsStore } from "@/stores/account-transactions-store.ts";
import { useToastStore } from "@/stores/toast-store";
import { useClickOutside } from "@/composables/click-outside";

const DepositIcon = defineAsyncComponent(
  () => import("@/components/icons/icon-deposit.vue")
);
const WithdrawIcon = defineAsyncComponent(
  () => import("@/components/icons/icon-withdraw.vue")
);

import { convertToFarsiNumber } from "@/utils/number-formatter";
import { formatDate, formatFullDate } from "@/utils/date-formatter";
import { convertFarsiToEnglishNumbers } from "@/utils/farsi-to-english-number";

const router = useRouter();
const accountDataStore = useAccountDataStore();
const deleteAccountStore = useAccountDeletionStore();
const transactionsStore = useTransactionsStore();
const toastStore = useToastStore();

accountDataStore.enableMocking(true);

const loading = ref<boolean>(false);

const moreMenu = ref(null);
const { isClickedOutside } = useClickOutside(moreMenu);
watch(isClickedOutside, (outside) => {
  outside && (isMenuActive.value = false);
});

const isModalVisible = computed(() => {
  console.log(data.value);

  return (
    !data.value ||
    (data.value && Object.keys(data.value).length === 0) ||
    (data.value.firstName === "" && !loading.value)
  );
});

const data = computed(() => accountDataStore.data);

(() => {
  if (data.value.firstName === "") {
    loading.value = true;
    setTimeout(() => {
      accountDataStore.fetchAccountData();
      if (Object.keys(accountDataStore.data).length > 0) {
        transactionsStore.fetchTransactions();
      }
      loading.value = false;
    }, 1000);
  }

  if (Object.keys(accountDataStore.data).length === 0) {
    loading.value = true;
    console.log(loading.value);
    setTimeout(() => {
      accountDataStore.fetchAccountData();
      if (Object.keys(accountDataStore.data).length > 0) {
        transactionsStore.fetchTransactions();
      }
      loading.value = false;
    }, 2000);
  }
})();

const isMenuActive = ref<boolean>(false);
const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value;
};

const deleteBankAccount = () => {
  loading.value = true;
  isMenuActive.value = false;
  setTimeout(() => {
    deleteAccountStore.deleteBankAccount();
    toastStore.showToast("حساب شما با موفقیت حذف شد!", "success");
    loading.value = false;
  }, 1000);
};

const modal = ref<boolean>(false);

const fullName = computed(() => accountDataStore.fullName || "خوش آمدید");

const formattedScoreAmount = computed(() =>
  convertToFarsiNumber(data.value?.score?.amount || 0)
);
const formattedMonth = computed(() =>
  convertToFarsiNumber(data.value?.score?.paymentPeriod || 0)
);
const formattedInstallmentAmount = computed(() =>
  convertToFarsiNumber(data.value?.upcomingInstalment?.amount || 0)
);

const formattedInstallmentDate = computed(() => {
  const dueDate = data.value?.upcomingInstalment?.dueDate;
  return formatDate(dueDate || "");
});

const authData = localStorage.getItem("auth");
const idNumber = authData ? JSON.parse(authData).idNumber : "";

const phoneNumber = localStorage.getItem("phoneNumber");
const nationalId = computed(() => {
  return convertToFarsiNumber(idNumber || "", { useGrouping: false });
});

const currentPage = ref<number>(1);
const transactionsPerPage: number = 5;
const searchQuery = ref<string>("");
const selectedTransactionType = ref<string>("all");
const sortColumn = ref<string | null>(null);
const sortDirection = ref<string>("asc");

const handleTransactionTypeChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  selectedTransactionType.value = value;
  currentPage.value = 1;
};

const toggleSort = (column: string): void => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = column;
    sortDirection.value = "asc";
  }
  currentPage.value = 1;
};

const filteredTransactions = computed(() => {
  let filtered = transactionsStore.transactions;

  if (selectedTransactionType.value !== "all") {
    filtered = filtered.filter(
      (transaction) => transaction.type === selectedTransactionType.value
    );
  }

  if (searchQuery.value) {
    const queryValue = convertFarsiToEnglishNumbers(searchQuery.value);
    filtered = filtered.filter((transaction) =>
      transaction.amount.includes(queryValue)
    );
  }

  if (sortColumn.value) {
    filtered.sort((a, b) => {
      let comparison = 0;

      if (sortColumn.value === "amount") {
        comparison = Number(a.amount) - Number(b.amount);
      } else if (sortColumn.value === "date") {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (sortColumn.value === "type") {
        comparison = a.type.localeCompare(b.type);
      }

      return sortDirection.value === "asc" ? comparison : -comparison;
    });
  }

  return filtered;
});

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * transactionsPerPage;
  const end = start + transactionsPerPage;
  return filteredTransactions.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredTransactions.value.length / transactionsPerPage);
});

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

watch(searchQuery, () => {
  currentPage.value = 1;
});

function formatTime(dateString: string) {
  const timePart = dateString.split(" ")[1];
  return timePart ? timePart.slice(0, 5) : "";
}

const personalInfoPage = () => {
  router.push("/personal-info");
};
</script>

<style scoped lang="scss">
#dashboard-main {
  height: calc(100vh - 6.8rem);
  @include flex($align: flex-start);
  background: var(--background);
  padding-top: var(--p-8);
  overflow: hidden;

  @include respond-to(xxs) {
    height: fit-content;
    padding: var(--p-4);
  }
}

.loader-container {
  @include flex();
  @include position($position: fixed, $z-index: 9999);
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
}

.loader {
  position: absolute;
  width: 10rem;
  height: 10rem;

  @include respond-to(xxs) {
    top: 11.4rem;
  }
}

.dashboard {
  display: flex;
  gap: var(--g-5);
  width: 140rem;
  height: 80.4rem;

  @include respond-to(xxs) {
    width: 100%;
    height: fit-content;
  }

  &__contents {
    @include flex($direction: column, $align: stretch, $gap: var(--g-7));
    position: relative;
    width: 116.4rem;
    height: 100%;

    @include respond-to(xxs) {
      width: 100%;
      height: 100%;
    }
  }
}

.contents {
  &__bank-info {
    display: flex;
    gap: var(--g-5);
    width: 100%;
    height: 26rem;

    @include respond-to(xxs) {
      flex-direction: column;
      height: 100%;
      gap: var(--g-6);
    }
  }

  &__transactions {
    display: flex;
    flex-direction: column;
    gap: var(--g-7);
    width: 100%;
    height: 52rem;
    padding: var(--p-5) var(--p-5) var(--p-3);
    background-color: var(--surface);
    border-radius: var(--radius-12);
    box-shadow: var(--box-shadow-sm) var(--box-shadow-light);

    @include respond-to(xxs) {
      height: fit-content;
      padding: var(--p-5);
    }
  }
}

.balance-actions {
  &__more-menu {
    position: relative;
    display: flex;

    &.is-active .balance-actions__actions-container {
      visibility: visible;
      opacity: 1;
      transform: translateY(3.6rem);
    }
  }

  &__menu-icon {
    width: 3.2rem;
    height: 3.2rem;
    cursor: pointer;

    @include respond-to(xxs) {
      width: 2.25rem;
      height: 2.25rem;
    }
  }

  &__actions-container {
    visibility: hidden;
    opacity: 0;
    @include flex(
      $direction: column,
      $justify: stretch,
      $align: stretch,
      $gap: var(--g-4)
    );
    @include position($position: absolute, $right: 1.2rem);
    width: 18.7rem;
    height: 8.8rem;
    transform: translateY(2rem);
    padding: var(--p-2);
    background-color: var(--surface);
    border-radius: var(--radius-12);
    transition: transform, opacity, 0.5s ease 0.1s;
  }

  &__button {
    width: 100%;
    display: flex;
    gap: var(--g-3);

    @include font-style(
      $size: 1.4rem,
      $family: "peyda-400",
      $color: var(--black-100)
    );
    background-color: var(--surface);

    &--danger {
      color: var(--fail-500);
    }
  }

  &__button-icon {
    width: 2rem;
  }
}

.score-card {
  width: 33.8rem;
  height: 26rem;

  @include respond-to(xxs) {
    width: 100%;
    height: 21.7rem;
  }
}

.account-score {
  &__header-icon {
    width: 2.4rem;
    height: 2.4rem;
  }

  &__score-info-container {
    @include flex($direction: column);
  }

  &__money {
    @include flex($gap: var(--g-1));

    &-amount {
      @include font-style(
        $size: 4rem,
        $family: "peyda-700",
        $color: var(--primary-500)
      );

      @include respond-to(xxs) {
        font-size: 3.2rem;
      }
    }

    &-currency {
      @include font-style($size: 1.4rem, $color: var(--text-gray));
    }
  }

  &__month {
    display: flex;
    gap: var(--g-1);

    &-number {
      @include font-style(
        $size: 1.8rem,
        $family: "peyda-700",
        $color: var(--primary-500)
      );
    }

    &-text {
      @include font-style($size: 1.4rem, $color: var(--text-gray));
    }
  }

  &__calculate-button {
    width: 100%;
    padding: var(--p-1);
    @include font-style($color: var(--text-title), $family: "peyda-700");
    border-radius: var(--radius-8);
    background: var(--primary-50);
  }
}

.installment-card {
  width: 33.8rem;
  height: 26rem;

  @include respond-to(xxs) {
    width: 100%;
    height: 20.4rem;
  }
}

.account-installment {
  &__header {
    &-details {
      @include flex;
      @include font-style($size: 1.4rem, $color: var(--text-gray));
      background: none;
    }

    &-icon {
      @extend .account-score__header-icon;
      transform: rotate(90deg);
    }
  }

  &__info-pay-container {
    width: 100%;
    @include flex($direction: column, $gap: var(--g-6));
  }

  &__info {
    @include flex($align: stretch, $direction: column, $gap: var(--g-4));
    width: 100%;
    font-size: 1.4rem;
  }

  &__amount {
    @include flex($justify: space-between);

    &-text {
      color: var(--text-gray);
    }

    &-number {
      font-family: "peyda-600";
    }
  }

  &__deadline {
    @extend .account-installment__amount;

    &-text {
      @extend .account-installment__amount-text;
    }

    &-number {
      @extend .account-installment__amount-number;
    }
  }

  &__pay {
    @extend .account-score__calculate-button;
    @include flex($gap: 1.2rem);

    &-chevron {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
}

.modal {
  @include flex($display: flex);
  @include position($position: absolute, $bottom: 0, $left: 0, $z-index: 2);

  &::before {
    content: "";
    @include position($position: absolute, $bottom: 0, $left: 0, $z-index: -1);
    background-color: var(--background);
    opacity: 0.8;
  }

  &__contents-container {
    @include flex($justify: space-between, $direction: column);
    width: 33.1rem;
    height: 23.7rem;

    @include respond-to(xxs) {
      position: absolute;
      top: 11.4rem;
    }
  }

  &__icon {
    width: 17.5rem;
    height: 11.5rem;
  }

  &__message {
    @include font-style($size: 1.6rem, $family: "peyda-600");

    @include respond-to(xxs) {
      text-align: center;
      width: 24rem;
    }
  }

  &__button {
    @include flex;
    width: 20rem;
    height: 4.8rem;
    @include font-style($size: 1.6rem, $family: "peyda-600");
    padding: var(--p-1) var(--p-3);
    border-radius: var(--radius-8);
    background: var(--primary-color);
    color: var(--text-on-primary);
  }
}

.transactions {
  &__header {
    @include flex;
    width: 100%;
    height: 3.8rem;
  }

  &__title-currency {
    flex-grow: 2;
  }

  &__title {
    @include font-style($size: 2rem, $family: "peyda-700");

    @include respond-to(xxs) {
      @include font-style($size: 1.6rem, $family: "peyda-400");
    }
  }

  &__currency {
    @include font-style($color: var(--text-gray));
  }

  &__actions {
    @include flex;
    gap: var(--g-4);
  }

  &__sort {
    width: 26.9rem;
    height: 3.3rem;
    @include flex($justify: space-between);
    @include respond-to(xxs) {
      width: fit-content;
    }

    &-label {
      @include flex($gap: 0.1rem);
      color: var(--text-gray);
    }

    &-text {
      font-size: 1.4rem;

      @include respond-to(xxs) {
        display: none;
      }
    }

    &-icon {
      width: 1.7rem;
      height: 1.6rem;
      padding: 1.999px 0.999px 1.999px 1px;
      @include respond-to(xxs) {
        width: 2rem;
        height: 2rem;
      }
    }

    &-method {
      width: 18.3rem;
      height: 3.4rem;
      border-radius: var(--radius-8);
      border: 1px solid var(--line);
      background: var(--surface);
      padding: 0.7rem var(--p-1);
      @include font-style($size: 1.4rem, $family: "peyda-400");

      @include respond-to(xxs) {
        display: none;
      }

      &-option {
        @include font-style($size: 1.4rem, $family: "peyda-400");
      }
    }
  }

  th {
    cursor: pointer;
  }

  .transactions &__search-container {
    width: 25.7rem;
    height: 3.4rem;

    @include respond-to(xxs) {
      display: none;
    }
  }

  &__search-container-sm {
    display: none;
    width: 2rem;
    height: 2rem;

    @include respond-to(xxs) {
      display: flex;
    }

    &__icon {
      width: 2rem;
      height: 2rem;
    }
  }

  &__table-container {
    @include respond-to(xxs) {
      overflow-x: auto;
    }
  }

  &__table {
    height: 36rem;
  }

  &__pagination {
    @include flex($gap: var(--g-3));
  }
}
</style>
