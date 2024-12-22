<template>
  <div class="container-fluid">
    <h2 class="h3 text-center mb-4">Riwayat Order SPK Selesai</h2>
    <div class="card shadow">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover table-striped border-top">
            <thead>
              <tr>
                <!-- <th>ID</th> -->
                <th>Nama Barang</th>
                <th>Jumlah Order</th>
                <th>Order Dibuat</th>
                <!-- <th>Tanggal Kembali</th> -->
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <!-- <td>{{ order.id }}</td> -->
                <td v-if="order.status === 'DONE'">
                  {{ order.material?.name }}
                </td>
                <td v-if="order.status === 'DONE'">{{ order.orderQty }}</td>
                <td v-if="order.status === 'DONE'">{{ order.createdAt }}</td>
                <td v-if="order.status === 'DONE'">
                  <span class="badge rounded-pill bg-dark">{{
                    order.status
                  }}</span>
                </td>
              </tr>
              <tr v-if="orders.length === 0">
                <td colspan="4" class="text-center text-muted">
                  Tidak ada data order selesai
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useOrderStore } from "@/store/orderStore";
export default {
  name: "HistoryList",
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
  //     histories: [
  //       {
  //         id: 1,
  //         namaBarang: "Acer Nitro 15 AN515-58",
  //         jumlahPinjam: 1,
  //         tanggalPinjam: "2023-05-01",
  //         tanggalKembali: "2023-05-10",
  //         status: "selesai",
  //       },
  //       {
  //         id: 2,
  //         namaBarang: "Lenovo LOQ 15 15IRH8",
  //         jumlahPinjam: 2,
  //         tanggalPinjam: "2023-06-15",
  //         tanggalKembali: "2023-06-20",
  //         status: "diproses",
  //       },
  //     ],
  //   };
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
/* .btn-group {
  gap: 0.25rem;
} */
/* .history-list {
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 8px 0;
}
h2 {
  margin-bottom: 20px;
  color: #4b3f6b;
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
  text-align: left;
}
th {
  background-color: #4b3f6b;
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
.status {
  text-transform: capitalize;
  font-weight: bold;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  text-align: center;
}
.status.diproses {
  background-color: #f0ad4e;
}
.status.selesai {
  background-color: #5cb85c;
} */
</style>
