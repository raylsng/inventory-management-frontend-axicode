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

  methods: {
    showAddForm() {
      //text lms (beda dikit)
      this.selectedItem = { kode: "", nama: "", deskripsi: "", stok: 0 };
      this.isEdit = false;
      this.showForm = true;
    },

    editItem(item) {
      // lms text dan video
      this.selectedItem = { ...item };
      this.isEdit = true;
      this.showForm = true;
    },

    handleSubmit(item) {
      //text lms
      if (
        item.kode &&
        item.nama &&
        item.deskripsi &&
        item.stok !== null &&
        !isNaN(item.stok)
      ) {
        if (this.isEdit) {
          const index = this.items.findIndex((i) => i.kode === item.kode);

          this.items[index] = item;
        } else {
          this.items.push(item);
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
        this.items = this.items.filter((item) => item.kode !== kode);
        this.deleteSuccess = true; // Tampilkan pesan sukses
        setTimeout(() => (this.deleteSuccess = false), 3000); // Hilangkan pesan setelah 3 detik
      }
    },
  },
}; // end of export default
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
  color: #4b3f6b;
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
