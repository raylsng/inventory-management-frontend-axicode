<template>
  <div class="item-list container my-5 bg-white rounded">
    <div
      v-if="deleteSuccess"
      class="alert alert-success alert-dismissible fade show"
      role="alert"
    >
      Item berhasil dihapus.
      <button
        type="button"
        class="btn-close"
        @click="deleteSuccess = false"
        aria-label="Close"
      ></button>
    </div>
    <div class="header d-flex justify-content-between align-items-center mb-3">
      <h2 class="mt-2">List Data Material</h2>
      <button class="btn btn-primary mt-2" @click="showAddForm">
        Tambah Material
      </button>
    </div>
    <div class="row px-5">
      <ItemCard
        v-for="item in items"
        :key="item.kode"
        :item="item"
        @edit-item="editItem"
        @delete-item="deleteItem"
        class="col-md-6 col-lg-4 mb-4"
      />
    </div>
    <Modal :visible="showForm" @close="cancelEditForm">
      <ItemForm
        :item="selectedItem"
        :isEdit="isEdit"
        @submit="handleSubmit"
        @cancel="cancelEditForm"
      />
    </Modal>
  </div>
</template>

<script>
//Import Komponen Custom
import ItemCard from "./ItemCard.vue";
import Modal from "../../Modal.vue";
import ItemForm from "./ItemForm.vue";
import { useItemStore } from "@/store/itemStore";
import { EventBus } from "@/utils/EventBus";

export default {
  //export komponen custom
  components: {
    ItemCard,
    Modal,
    ItemForm,
  },

  data() {
    return {
      items: [],
      showForm: false,
      selectedItem: null,
      isEdit: false,
      deleteSuccess: false,
    };
  },
  computed: {
    items() {
      return this.itemStore.items; // mengakses itemsStore dari store pinia
    },
    filteredItems() {
      return this.items.filter((item) => {
        return (
          item.kode.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.nama.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },

  methods: {
    showAddForm() {
      this.selectedItem = { kode: "", nama: "", deskripsi: "", stok: 0 };
      this.isEdit = false;
      this.showForm = true;
    },

    editItem(item) {
      this.selectedItem = { ...item };
      this.isEdit = true;
      this.showForm = true;
    },

    handleSubmit(item) {
      if (
        item.kode &&
        item.nama &&
        item.deskripsi &&
        item.stok !== null &&
        !isNaN(item.stok)
      ) {
        if (this.isEdit) {
          this.itemStore.updateItem(item); // memanggil action update item dari store
        } else {
          this.itemStore.addItem(item); // memanggil action add item dari store
        }
      }

      this.showForm = false;
    },

    cancelEditForm() {
      this.showForm = false;
      this.selectedItem = null; //text lms rev =
      this.isEdit = false; //text lms rev =
    },

    deleteItem(kode) {
      if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
        this.itemStore.deleteItem(kode); // memangil action delete dari store
        this.deleteSuccess = true; // Tampilkan pesan sukses
        setTimeout(() => (this.deleteSuccess = false), 3000); // Hilangkan pesan setelah 3 detik
      }
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
  setup() {
    const itemStore = useItemStore();
    return { itemStore };
  },
};
</script>

<style scoped>
.item-list {
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
}
</style>
