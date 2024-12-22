<template>
    <div>
      <form @submit.prevent="submitForm">
        <h2>Order Barang</h2>
        <!-- <div class="mb-3">
          <label for="userId">User</label>
          <select id="userId" v-model="form.userId" class="form-select" required>
            <option v-for="user in users" :key="user.id" :value="user.username">
              {{ user.username }}
            </option>
          </select>
        </div> -->
        <div class="mb-3">
          <label for="materialId" class="form-label">Pilih Barang</label>
          <select
            id="materialId"
            v-model="form.materialId"
            class="form-select"
            required
          >
            <!-- <option disabled value="">Pilih Barang</option> -->
            <option v-for="item in items" :key="item.id" :value="item.id">
              {{ item.id }}
            </option>
          </select>
          <!-- <input type="text" class="form-control" id="name" :disabled="false" /> -->
        </div>
  
        <!-- <div class="mb-3">
          <label for="tanggal_order" class="form-label">Tanggal Order</label>
          <input
            type="date"
            class="form-control"
            v-model="form.createdAt"
            id="tanggal_order"
            :disabled="true"
          />
        </div> -->
        <div class="mb-3">
          <label for="orderQty" class="form-label">Jumlah Order</label>
          <input
            type="number"
            class="form-control"
            v-model="form.orderQty"
            id="orderQty"
            min="1"
            max="100"
            required
          />
        </div>
        <button type="submit" class="btn btn-success w-100">Order</button>
        <!-- <div>
          <label for="description">Deskripsi:</label>
          <input
            type="text"
            v-model="form.description"
            id="description"
            :disabled="true"
          />
        </div> -->
  
        <!-- <div>
          <label for="tanggal_kembali">Tanggal Kembali:</label>
          <input
            type="date"
            v-model="form.tanggal_kembali"
            id="tanggal_kembali"
          />
        </div> -->
  
        <!-- <div class="button-container"> -->
        <!-- <button type="button" @click="cancelForm">Batal</button> -->
        <!-- </div> -->
      </form>
    </div>
  </template>
  
  <script>
  // import { useUserStore } from "@/store/userStore";
  import { useItemStore } from "@/store/itemStore";
  import { useOrderStore } from "@/store/orderStore";
  import { computed, onMounted } from "vue";
  export default {
    setup() {
      // const userStore = useUserStore();
      // const users = computed(() => userStore.users);
      const itemStore = useItemStore();
      const items = computed(() => itemStore.items);
      // const orderStore = useOrderStore();
      // const orders = computed(() => orderStore.orders);
  
      onMounted(() => {
        itemStore.fetchItems();
      });
      // onMounted(() => {
      //   orderStore.addOrder();
      // });
      // onMounted(() => {
      //   userStore.fetchUser();
      // });
      return {
        items,
        itemStore,
        // orders,
        // orderStore,
        // addOrder: orderStore.addOrder,
        // users,
        // userStore,
      };
    },
    props: {
      order: Object,
      isEdit: Boolean,
    },
  
    data() {
      return {
        form: {
          // userId: null,
          materialId: null,
          // createdAt: this.formatDate(new Date()),
          orderQty: 0,
          // kode: this.item.id,
          // name: this.item.name,
          // description: this.item.description,
          // tanggal_kembali: "",
        },
        // userss: [],
        materials: [],
      };
    },
    methods: {
      async submitForm() {
        const orderStore = useOrderStore();
        try {
          const payload = {
            // userId: this.form.userId,
            materialId: this.form.materialId,
            // createdAt: this.form.createdAt,
            orderQty: this.form.orderQty,
          };
          console.log("Sending data to server:", payload);
          let response;
          response = await orderStore.addOrder(payload);
          console.log("Order created", response.data);
          this.$emit("submit", this.form);
        } catch (error) {
          console.error("Error submitting order:", error.message);
        }
        // this.$emit("submit", { ...this.form });
      },
      cancelForm() {
        this.$emit("cancel");
      },
      // formatDate(date) {
      //   const year = date.getFullYear();
      //   const month = String(date.getMonth() + 1).padStart(2, "0");
      //   const day = String(date.getDate()).padStart(2, "0");
      //   return `${year}-${month}-${day}`;
      // },
    },
    computed: {
      // filteredItems() {
      //   return this.items.filter((item) =>
      //     item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      //   );
      // return this.items.filter((item) => {
      //   const idAsString = String(item.id).toLowerCase();
      //   const nameAsString = item.name.toLowerCase();
      //   const query = this.searchQuery.toLowerCase();
      //   return idAsString.includes(query) || nameAsString.includes(query);
      // });
      // },
    },
    // watch: {
    //   item(newItem) {
    //     if (newItem) {
    //       this.form.kode = newItem.kode;
    //       this.form.nama = newItem.nama;
    //       this.form.deskripsi = newItem.deskripsi;
    //     }
    //   },
    // },
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    margin: auto;
    background: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  label {
    margin-top: 10px;
  }
  
  input {
    padding: 5px;
    margin-top: 5px;
  }
  
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 4px;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  button[type="button"] {
    background-color: #f44336;
  }
  
  button[type="button"]:hover {
    background-color: #e31b0c;
  }
  </style>
  
  <!-- <template>
    <div>
      <form
        @submit.prevent="submitForm"
        class="item-form mb-3 p-3 shadow-sm bg-white rounded"
      >
        <div class="mb-3">
          <label for="id" class="form-label">Kode Barang</label>
          <input
            type="text"
            v-model="form.id"
            id="id"
            :disabled="isEdit"
            required
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">Nama Barang</label>
          <input
            type="text"
            v-model="form.name"
            id="name"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Deskripsi</label>
          <textarea
            v-model="form.description"
            id="description"
            class="form-control"
            required
          >
          </textarea>
        </div>
        <div class="mb-3">
          <label for="stock" class="form-label">Stock</label>
          <input
            type="number"
            v-model.number="form.stock"
            id="stock"
            class="form-control"
            required
          />
        </div>
        <div v-if="form.error" class="alert alert-danger">{{ form.error }}</div>
        <button type="submit" class="btn btn-success w-100">
          {{ isEdit ? "Simpan Perubahan" : "Tambah Barang" }}
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import { useItemStore } from "@/store/itemStore";
  
  export default {
    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
      isEdit: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        form: {
          id: "",
          name: "",
          description: "",
          stock: 0,
          error: "",
        },
      };
    },
    watch: {
      item: {
        immediate: true,
        handler(newItem) {
          if (this.isEdit) {
            this.form = {
              id: newItem.id,
              name: newItem.name,
              description: newItem.description,
              stock: newItem.stock,
            };
          } else {
            this.resetForm();
          }
        },
      },
    },
    methods: {
      resetForm() {
        this.form = {
          id: "",
          name: "",
          description: "",
          stock: 0,
          error: "",
        };
      },
      async submitForm() {
        const itemStore = useItemStore();
        try {
          this.form.error = "";
  
          const payload = {
            id: this.form.id,
            name: this.form.name,
            description: this.form.description,
            stock: this.form.stock,
          };
  
          console.log("Sending data to server:", payload);
          let response;
          if (this.isEdit) {
            response = await itemStore.updateItem({
              id: this.item.id,
              ...payload,
            });
            console.log("Item updated successfully");
          } else {
            response = await itemStore.addItem(payload);
            console.log("Item created:", response.data);
          }
          this.$emit("submit", this.form);
          this.resetForm();
        } catch (error) {
          console.error("Failed to submit form:", error);
          if (error.response) {
            console.error("Response Status:", error.response.status);
            console.error("Response Data:", error.response.data);
            this.form.error = error.response.data.message || "Unknown error";
          } else if (error.request) {
            console.error(
              "Request made but no response received:",
              error.request
            );
            this.form.error = "Request made but no response received";
          } else {
            console.error("Error details:", error.message);
            this.form.error = error.message || "Failed to submit form";
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .mb-3 {
    margin-bottom: 1rem;
  }
  .form-label {
    font-weight: bold;
    color: #4b3f6b;
  }
  .form-control {
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  .form-control:focus {
    border-color: #4b3f6b;
    box-shadow: 0 0 0 0.2rem rgba(75, 63, 107, 0.25);
  }
  .btn-success {
    background-color: #4caf50;
    border-color: #4caf50;
  }
  .btn-success:hover {
    background-color: #45a049;
    border-color: #45a049;
  }
  </style> -->
  