<template>
  <div class="container-fluid">
    <div class="header d-flex justify-content-center align-items-center mb-4">
      <h2 class="h3">Riwayat Permintaan Material</h2>
    </div>
    <div class="card shadow">
      <div class="card-body">
        <div class="table-responsive">
          <!-- search -->
          <!-- <div class="d-flex justify-content-between align-items-center mb-3">
            <form
              @submit.prevent="handleSearch"
              class="d-flex align-items-center"
            >
              <input
                type="search"
                v-model="searchQuery"
                class="form-control form-control-sm"
                placeholder="Search items..."
              /> -->
          <!-- <button type="submit" class="btn btn-sm btn-outline-primary">
                <i class="bi bi-search"></i>
              </button> -->
          <!-- </form> -->
          <!-- </div> -->
          <!-- table data item -->
          <table class="table table-hover table-striped border-top">
            <thead>
              <tr>
                <th>Nama PH</th>
                <th>Barang diorder</th>
                <th>Jumlah Order</th>
                <th>Waktu Order</th>
                <th>Status Order</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td>{{ order.user?.username }}</td>
                <td>{{ order.material?.name }}</td>
                <td>{{ order.orderQty }}</td>
                <td>{{ order.createdAt }}</td>
                <td>
                  <span class="badge rounded-pill bg-dark">{{
                    order.status
                  }}</span>
                </td>
              </tr>
              <tr v-if="orders.length === 0">
                <td colspan="4" class="text-center text-muted">
                  Tidak ada data history
                </td>
              </tr>
            </tbody>
          </table>
          <!-- pagination -->
          <!-- <div
            class="mt-4 d-flex justify-content-between align-items-center border-top"
          >
            <div class="text-muted small">Showing to of users</div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <!-- <Modal :visible="showForm" @close="cancelBorrowForm">
    <ItemForm
      :item="selectedItem"
      @submit="handleBorrow"
      @cancel="cancelBorrowForm"
    />
  </Modal> -->
</template>

<script>
import Modal from "@/components/Modal.vue";
import ItemForm from "@/components/user/item/ItemForm.vue";
import { EventBus } from "@/utils/EventBus";
import { useOrderStore } from "@/store/orderStore";
import { computed, onMounted } from "vue";

export default {
  name: "ItemListUser",
  components: {
    Modal,
    ItemForm,
  },
  setup() {
    const orderStore = useOrderStore();
    const orders = computed(() => orderStore.orders);

    onMounted(() => {
      orderStore.fetchOrders();
    });
    return {
      orders,
      orderStore,
    };
  },
  // data() {
  //   return {
  //     showForm: false,
  //     selectedItem: null,
  //     searchQuery: "",
  //   };
  // },
  // computed: {
  //   filteredItems() {
  //     if (this.searchQuery) {
  //       return this.items.filter((item) =>
  //         item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
  //       );
  //     }
  //     return this.items;
  //   },
  // },
  // methods: {
  //   borrowItem(item) {
  //     this.selectedItem = { ...item };
  //     this.showForm = true;
  //   },
  //   handleBorrow(item) {
  //     console.log("Borrow item:", item);
  //     // Implementasikan logika peminjaman barang di sini
  //     this.showForm = false;
  //   },
  //   cancelBorrowForm() {
  //     this.showForm = false;
  //     this.selectedItem = null;
  //   },
  //   handleSearch(query) {
  //     this.searchQuery = query;
  //   },
  // },
  // mounted() {
  //   EventBus.on("search", this.handleSearch);
  // },
  // beforeUnmount() {
  //   EventBus.off("search", this.handleSearch);
  // },
};
</script>

<style scoped>
.table > :not(caption) > * > * {
  vertical-align: middle;
}
th {
  background-color: #2980b9;
  color: white;
}
/* .item-list {
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
   margin: 8px 0;
}
h2 {
  margin-bottom: 20px;
  color: #2980b9;
  text-align: center;
  font-size: 24px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th,
td {
  border: 1px solid #ddd;
  padding: 12px 15px;
  text-align: center;
}
th {
  background-color: #2980b9;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.table-responsive {
  width: 100%;
  overflow-x: auto;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
tr:hover {
  background-color: #ddd;
}
.action-column {
  width: 100px;
  text-align: center;
}
button {
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  margin: 0 2px;
}
.borrow-btn {
  background-color: #754bc5;
  color: white;
}
.borrow-btn:hover {
  background-color: #5a37a0;
}
@media (max-width: 600px) {
  th,
  td {
    padding: 8px 10px;
  }
  .action-buttons {
    flex-direction: column;
    align-items: stretch;
  }
} */
</style>
