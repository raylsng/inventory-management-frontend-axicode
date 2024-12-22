<template>
  <div>
    <form
      @submit.prevent="submitForm"
      class="item-form mb-3 p-3 shadow-sm bg-white rounded"
    >
      <!-- <div class="mb-3">
        <label for="id" class="form-label">Kode Barang</label>
        <input
          type="text"
          v-model="form.id"
          id="id"
          :disabled="isEdit"
          required
          class="form-control"
        />
      </div> -->
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
</style>
