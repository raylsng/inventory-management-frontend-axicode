<template>
  <div class="transaction-list">
    <h2>List Data SPK</h2>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead class="table-primary">
          <tr>
            <th>ID SPK</th>
            <th>ID PH</th>
            <th>Nama Barang</th>
            <th>Jumlah Order</th>
            <th>Status SPK</th>
            <th>Order Dibuat</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.userId }}</td>
            <td>{{ order.material?.name }}</td>
            <td>{{ order.orderQty }}</td>
            <td>
              <span class="badge" 
                    :class="warnaStatus(order.status)">
                    {{ order.status }}
              </span>
            </td>
            <td>{{ order.createdAt }}</td>

            <td class="action-buttons">
              <button 
                @click="buttonrReceiveOrder(order)" 
                type="button"
                class="orderSpk action-buttons btn btn-sm btn-info"
                :disabled="order.status !== 'ON_PROCESS'" 
                title="Received Order SPK">
                Receive
              </button>
            </td>

          </tr>
        </tbody>
      </table>
    </div>

    <Modal :visible="showForm" @close="cancelReturnForm">
      <TransactionForm
        :transaction="selectedTransaction"
        @submit="handleReturn"
        @cancel="cancelReturnForm"
      />
    </Modal>

  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useOrderStore } from "@/store/orderStore";
import { useAuthStore } from "@/store/authStore";
import Modal from "@/components/Modal.vue";
import TransactionForm from "@/components/user/transaction/TransactionForm.vue";
import { EventBus } from "@/utils/EventBus";
import Swal from "sweetalert2";

export default {
  name: "orders",
  components: {
    Modal,
  },
  setup() {
    const orderStore = useOrderStore();
    const authStore = useAuthStore();
    const orders = computed(() => orderStore.orders);
    onMounted(() => {
      if (authStore.token) {
        orderStore.fetchOrders();
      } else {
        console.error("Orders is not authenticated");
      }
    });
    return {
      orders,
      orderStore,
      // addItem: itemStore.addItem,
      // updateItem: itemStore.updateItem,
      // deleteItem: itemStore.deleteItem,
    };
  },

  data() {
    return {
      showForm: false,
      selectedUser: null,
      isEdit: false,
      searchQuery: "",
    };
  },

  computed: {
    orders() {
      return this.orderStore.orders; // mengakses itemsStore dari store pinia
    },

    filteredOrders() {
      return this.orders.filter((order) => {
        return (
          order.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          order.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },


  methods: {
  // warna status sesuai PENDING, ON_PROCESS, DONE
  warnaStatus(status) {
    switch (status) {
      case 'PENDING':
        return 'bg-warning';
      case 'ON_PROCESS':
        return 'bg-primary';
      case 'DONE':
        return 'bg-success';
      default:
        return 'bg-warning';
    }
  },

  // PH ganti status Order Received
  async buttonrReceiveOrder(order) {
      // Validasi status sebelum melakukan aksi
      if (order.status !== "ON_PROCESS" ) {
        Swal.fire({
          icon: "error",
          title: "Tidak dapat Receive order",
          text: `Status Order SPK ini ${order.status} !`,
        });
        return;
      }

      // sweet alert untuk konfirmasi PH Received order
      const confirm = await Swal.fire({
        icon: "warning",
        title: "Apakah Anda yakin?",
        text: "Order ini akan Diselesaikan dan status menjadi DONE",
        showCancelButton: true,
        confirmButtonText: "Ya, Lanjutkan",
        cancelButtonText: "Batal",
      });

      if (confirm.isConfirmed) {
        try {
          // Panggil method dari store untuk memperbarui status
          const updatedOrder = { ...order, status: "DONE" };
          await this.orderStore.receiveOrder(updatedOrder);

          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Order berhasil diperbarui ke DONE.",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Receive Gagal",
            text: "Terjadi kesalahan saat memperbarui status order ke DONE.",
          });
          console.error("Failed to update order status:", error);
        }
      }
    },



    // openReturnForm(transaction) {
    //   this.selectedTransaction = { ...transaction };
    //   this.showForm = true;
    // },
    // handleReturn(updatedTransaction) {
    //   const index = this.transactions.findIndex(
    //     (t) => t.id === updatedTransaction.id
    //   );
    //   if (index !== -1) {
    //     this.transactions[index] = {
    //       ...updatedTransaction,
    //       status: "Returned",
    //     };
    //   }
    //   this.cancelReturnForm();
    // },
    // cancelReturnForm() {
    //   this.showForm = false;
    //   this.selectedTransaction = null;
    // },
  },
};
</script>

<style scoped>
.transaction-list {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* margin: 20px 0; */
  width: 100%;
  box-sizing: border-box;
}
h2 {
  margin-bottom: 10px;
  color: #2980b9;
  text-align: center;
  font-size: 24px;
}
.table-responsive {
  width: 100%;
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}
th {
  background-color: #2980b9;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
tr:hover {
  background-color: #ddd;
}
button {
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

/*
.return-btn {
  background-color: #754bc5;
  color: white;
}
.return-btn:hover {
  background-color: #5a37a0;
}
.return-btn[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}
@media (max-width: 600px) {
  th,
  td {
    padding: 8px 10px;
  }
  .action-buttons {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
*/

</style>
