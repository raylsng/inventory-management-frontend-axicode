<template>
  <div>
    <form @submit.prevent="submitForm">
      <h2>Peminjaman Barang</h2>
      <code>{{ form }}</code>
      <div>
        <label for="id">Kode Barang:</label>
        <input type="text" v-model="form.kode" id="id" :disabled="true" />
      </div>

      <div>
        <label for="name">Nama Barang:</label>
        <input type="text" v-model="form.name" id="name" :disabled="true" />
      </div>

      <div>
        <label for="description">Deskripsi:</label>
        <input
          type="text"
          v-model="form.description"
          id="description"
          :disabled="true"
        />
      </div>
      <div>
        <label for="tanggal_pinjam">Tanggal Pinjam:</label>
        <input
          type="date"
          v-model="form.tanggal_pinjam"
          id="tanggal_pinjam"
          :disabled="true"
        />
      </div>

      <div>
        <label for="tanggal_kembali">Tanggal Kembali:</label>
        <input
          type="date"
          v-model="form.tanggal_kembali"
          id="tanggal_kembali"
        />
      </div>

      <div>
        <label for="jumlah_pinjam">Jumlah Pinjam:</label>
        <input type="number" v-model="form.jumlah_pinjam" id="jumlah_pinjam" />
      </div>

      <div class="button-container">
        <button type="button" @click="cancelForm">Batal</button>
        <button type="submit">Ajukan</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    isEdit: Boolean,
  },

  data() {
    return {
      form: {
        kode: this.item.id,
        name: this.item.name,
        description: this.item.description,
        tanggal_pinjam: this.formatDate(new Date()),
        tanggal_kembali: "",
        jumlah_pinjam: 1,
      },
    };
  },
  methods: {
    submitForm() {
      this.$emit("submit", { ...this.form });
    },
    cancelForm() {
      this.$emit("cancel");
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
  watch: {
    item(newItem) {
      if (newItem) {
        this.form.kode = newItem.kode;
        this.form.nama = newItem.nama;
        this.form.deskripsi = newItem.deskripsi;
      }
    },
  },
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
