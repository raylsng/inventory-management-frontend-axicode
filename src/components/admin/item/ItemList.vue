<template>
  <div class="container-fluid item-list">
    <div class="header d-flex justify-content-between align-items-center mb-4">
      <h2 class="h3">List Material</h2>
      <button
        type="button"
        class="btn btn-outline-primary"
        @click="showAddForm"
      >
        <i class="bi bi-plus-circle me-2"></i>
        Tambah Material
      </button>
    </div>
    <div class="card shadow">
      <div class="card-body">
        <div class="table-responsive">
          <!-- search -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <form
              @submit.prevent="handleSearch"
              class="d-flex align-items-center"
            >
              <input
                type="search"
                v-model="searchQuery"
                class="form-control form-control-sm"
                placeholder="Search items..."
              />
              <button type="submit" class="btn btn-sm btn-outline-primary">
                <i class="bi bi-search"></i>
              </button>
            </form>
          </div>
          <!-- table data items -->
          <table class="table table-hover border-top">
            <thead>
              <tr class="table-primary">
                <th>Nama Barang</th>
                <th>Deskripsi</th>
                <th>Stok</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredItems" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.stock }}</td>
                <td>
                  <div class="btn-group">
                    <button
                      @click="editItem(item)"
                      type="button"
                      class="btn btn-sm btn-info edit"
                      title="Edit"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      @click="HandleDeleteItem(item)"
                      type="button"
                      class="delete btn btn-sm btn-danger"
                      title="Delete"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredItems.length === 0">
                <td colspan="4" class="text-center text-muted">
                  Tidak ada data item
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
      <!-- <div class="row px-5">
        <ItemCard
          v-for="item in items"
          :key="item.id"
          :item="item"
          @edit-item="editItem"
          @delete-item="HandleDeleteItem"
          class="col-md-6 col-lg-4 mb-4"
        />
      </div> -->
      <Modal :visible="showForm" @close="cancelEditForm">
        <ItemForm
          :item="selectedItem"
          :isEdit="isEdit"
          @submit="handleSubmit"
          @cancel="cancelEditForm"
        />
      </Modal>
    </div>
  </div>
</template>

<script>
//Import Komponen Custom
// import ItemCard from "./ItemCard.vue";
import Modal from "../../Modal.vue";
import ItemForm from "./ItemForm.vue";
import { useItemStore } from "@/store/itemStore";
import { EventBus } from "@/utils/EventBus";
import { computed, onMounted } from "vue";
import Swal from "sweetalert2";

export default {
  //export komponen custom
  name: "ItemList",
  components: {
    // ItemCard,
    Modal,
    ItemForm,
  },
  setup() {
    const itemStore = useItemStore();
    const items = computed(() => itemStore.items);

    onMounted(() => {
      itemStore.fetchItems();
    });
    return {
      items,
      itemStore,
      addItem: itemStore.addItem,
      updateItem: itemStore.updateItem,
      deleteItem: itemStore.deleteItem,
    };
  },
  data() {
    return {
      showForm: false,
      selectedItem: null,
      isEdit: false,
      searchQuery: "",
    };
  },
  computed: {
    // items() {
    //   return this.itemStore.items; // mengakses itemsStore dari store pinia
    // },
    filteredItems() {
      return this.items.filter((item) => {
        const idAsString = String(item.id).toLowerCase();
        const nameAsString = item.name.toLowerCase();
        const query = this.searchQuery.toLowerCase();

        return idAsString.includes(query) || nameAsString.includes(query);
      });
      // return this.items.filter((item) => {
      //   item.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      //     item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      // });
    },
  },

  methods: {
    showAddForm() {
      this.selectedItem = { id: 0, name: "", description: "", stock: 0 };
      this.isEdit = false;
      this.showForm = true;
    },

    editItem(item) {
      this.selectedItem = { ...item };
      this.isEdit = true;
      this.showForm = true;
    },
    // notifikasi alert sukses
    notificationAlert(description) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: description,
      });
    },

    async handleSubmit(item) {
      if (this.isEdit) {
        await this.itemStore.updateItem(item);
        this.notificationAlert("Data material berhasil diubah");
      } else {
        await this.itemStore.addItem(item);
        this.notificationAlert("Data material berhasil ditambah");
      }
      await this.itemStore.fetchItems();
      this.showForm = false;
    },
    cancelEditForm() {
      this.showForm = false;
    },

    async HandleDeleteItem(item) {
      Swal.fire({
        title: `Anda yakin ingin hapus data barang ini?`,
        text: "Data barang ini akan dihapus secara permanen",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, delete aja",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteItem(item.id);
          Swal.fire({
            title: "Terhapus!",
            text: "Datamu telah dihapus",
            icon: "success",
          });
        }
      });
      await this.itemStore.fetchItems();
      // if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      //   await this.deleteItem(item.id); // memangil action delete dari store
      //   this.deleteSuccess = true; // Tampilkan pesan sukses
      //   setTimeout(() => (this.deleteSuccess = false), 3000); // Hilangkan pesan setelah 3 detik
      //   await this.itemStore.fetchItems();
      // }
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
  },
  mounted() {
    EventBus.on("search", this.handleSearch);
  },
  beforeUnmount() {
    EventBus.off("search", this.handleSearch);
  },
};
</script>

<style scoped>
.table > :not(caption) > * > * {
  vertical-align: middle;
}
.form-control:focus {
  box-shadow: none;
  border-color: #86b7fe;
}
.btn-group {
  gap: 0.25rem;
}
/* .item-list {
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  transition: 0.3s;
}
.item-list:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.header h2 {
  color: #2980b9;
  font-size: 24px;
}
.header .btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}
.header .btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
} */
</style>
