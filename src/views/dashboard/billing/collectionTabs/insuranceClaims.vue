<template>
  <div>
    <div class="flex w-full py-10 space-x-12">
      <div class="flex-1 rounded-2xl px-10 py-5 shadow-lg">
        <div class="flex">
          <div class="flex-1">
            <div class="flex flex-col">
              <div class="text-gray-400">Transaction Volume</div>
              <div class="font-bold text-xl">{{ bills.length }}</div>
            </div>
          </div>
          <div class="flex-none">
            <img src="@/assets/img/debit-card-green.svg" />
          </div>
        </div>
      </div>
      <div class="flex-1 rounded-2xl px-10 py-5 shadow-lg">
        <div class="flex">
          <div class="flex-1">
            <div class="flex flex-col">
              <div class="text-gray-400">Total Receivables Value</div>
              <div class="font-bold text-xl">N5,094,045</div>
            </div>
          </div>
          <div class="flex-none">
            <img src="@/assets/img/debit-card-blue.svg" />
          </div>
        </div>
      </div>
    </div>
    <cornie-table @filter="showFDialog" :columns="headers" v-model="items">
      <template #status="{ item: { status } }">
        <span
          :class="{
            'bg-success text-success': status && status.toLowerCase() == 'paid',
            // ' bg-danger text-danger': status == 'inactive',
            ' bg-warning text-warning':
              status && status.toLowerCase() == 'pending',
            // ' bg-blue-yonder text-blue-yonder': status == 'relapse',
            // ' bg-blue-800 text-blue-800': status == 'remission',
            // ' bg-gray-800 text-gray-800': status == 'resolved',
          }"
          class="px-1 text-center rounded-md p-1 bg-opacity-20"
        >
          {{ status }}
        </span>
      </template>
    </cornie-table>
    <transaction-filter-dialog v-model="showDialog" />
  </div>
</template>
<script lang="ts">
  import CornieTable from "@/components/cornie-table/CornieTable.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop } from "vue-property-decorator";
  import transactionFilterDialog from "../components/transaction-filter-dialog.vue";

  @Options({
    name: "Billing Transactions",
    components: {
      CornieTable,
      transactionFilterDialog,
    },
  })
  export default class BillingTransactions extends Vue {
    showDialog = false;
    @Prop({ type: Array, default: "" })
    bills!: any[];

    headers = [
      {
        title: "Bill date",
        key: "date",
        show: true,
        noOrder: true,
      },
      {
        title: "Bill id",
        key: "id",
        show: true,
        noOrder: true,
      },
      {
        title: "Biller",
        key: "biller",
        show: true,
        noOrder: true,
      },
      {
        title: "Patient/subject",
        key: "patient",
        show: true,
        noOrder: true,
      },
      {
        title: "Account",
        key: "account",
        show: true,
        noOrder: true,
      },
      {
        title: "Payor",
        key: "payor",
        show: true,
        noOrder: true,
      },
      {
        title: "Total amount",
        key: "total",
        show: true,
        noOrder: true,
      },
      {
        title: "status",
        key: "status",
        show: true,
        noOrder: true,
      },
    ];

    get items() {
      return this.bills.length == 0
        ? []
        : this.bills.map((x) => ({
            date: new Date(x.createdAt).toLocaleDateString(),
            id: x.idn,
            biller: x.createdBy.firstName + " " + x.createdBy.lastName,
            patient: x.subject,
            total: `₦ ${x.total}`,
            status: x.status,
            account: "-----",
            payor: "-----",
          }));
      // return new Array(3).fill({
      //   date: new Date().toLocaleDateString(),
      //   id: "CRH438934",
      //   biller: "Dr. John Adeniyi",
      //   patient: "Daniel Johnson",
      //   account: "3432923032",
      //   payor: "James Daniel",
      //   total: "N40,000",
      //   status: "Ongoing",
      // });
    }

    showFDialog() {
      this.showDialog = true;
    }
  }
</script>
