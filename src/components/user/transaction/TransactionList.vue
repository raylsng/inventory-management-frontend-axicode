<template>
  <div class="transaction-list">
    <h2>List Data SPK </h2>

    <div class="table-responsive">
      <table>
        <thead>
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
            <td>{{ order.user?.username }}</td>
            <td>{{ order.material?.name }}</td>
            <td>{{ order.orderQty }}</td>
            <td>
              <span class="badge" :class="warnaStatus(order.status)">
                {{ order.status }}
              </span>
            </td>
            <td>{{ order.createdAt }}</td>

            <td class="action-buttons">
              <button 
                @click="buttonVerifyOrder(order)" 
                type="button"
                class="orderSpk action-buttons btn btn-sm btn-success"
                :disabled="order.status !== 'PENDING'" 
                title="Accept Order SPK">
                Accept
              </button>
            </td>


          </tr>
        </tbody>
      </table>
    </div>

    <!-- <Modal :visible="showForm" @close="cancelReturnForm">
      <TransactionForm
        :transaction="selectedTransaction"
        @submit="handleReturn"
        @cancel="cancelReturnForm"
      />
    </Modal> -->
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useOrderStore } from "@/store/orderStore";
import { useAuthStore } from "@/store/authStore";
// import OrderForm from "@/components/user/transaction/OrderForm.vue";
import Modal from "@/components/Modal.vue";
import { EventBus } from "@/utils/EventBus";
import Swal from "sweetalert2";

export default {
  name: "orders",
  components: {
    // Modal,
    // TransactionForm,
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
      // orders,
      // orderStore,
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


    // buttonVerifyOrder(order) {
    //   // Validasi status sebelum melakukan aksi
    //   if (order.status === "ON_PROCESS" || order.status === "DONE") {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Anda tidak bisa Accept Order SPK ini",
    //       text: `Order SPK ini sudah pada status ${order.status} !`,
    //     });
    //     return;
    //   }

    //   // Lanjutkan dengan logika jika status valid
    //   console.log("Button WH Accept order:", order);
    //   // Panggil API atau logic lainnya di sini
    // },

    async buttonVerifyOrder(order) {
      // Validasi status sebelum melakukan aksi
      if (order.status !== "PENDING") {
        Swal.fire({
          icon: "error",
          title: "Tidak dapat menerima order",
          text: `Order SPK ini sudah pada status ${order.status}!`,
        });
        return;
      }

      // sweet alert untuk konfirmasi WH Accept order
      const confirm = await Swal.fire({
        icon: "warning",
        title: "Apakah Anda yakin?",
        text: "Order ini akan diubah ke status ON_PROCESS.",
        showCancelButton: true,
        confirmButtonText: "Ya, Lanjutkan",
        cancelButtonText: "Batal",
      });

      if (confirm.isConfirmed) {
        try {
          // Panggil method dari store untuk memperbarui status
          const updatedOrder = { ...order, status: "ON_PROCESS" };
          await this.orderStore.verifyOrder(updatedOrder);

          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Order berhasil diperbarui ke ON_PROCESS.",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Verify Gagal",
            text: "Terjadi kesalahan saat memperbarui status order ke ON_PROCESS.",
          });
          console.error("Failed to update order status:", error);
        }
      }
    },
    
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
  margin-bottom: 20px;

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

.accept-btn {
  background-color: #375fa0;

  color: white;
}

.accept-btn:hover {
  background-color: #2980b9;
}

.return-btn[disabled] {
  background-color: #ccc;

  cursor: not-allowed;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
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
</style>
