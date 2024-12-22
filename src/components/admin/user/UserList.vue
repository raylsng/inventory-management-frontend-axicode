<template>
  <div class="container-fluid user-list">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3">Users List</h1>
      <button
        type="button"
        class="btn btn-outline-primary"
        @click="showAddForm"
      >
        <i class="bi bi-plus-circle me-2"></i>Tambah Data Pekerja
      </button>
    </div>

    <div class="card shadow user-card">
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
                placeholder="Search users..."
              />
              <!-- <button type="submit" class="btn btn-sm btn-outline-primary">
                <i class="bi bi-search"></i>
              </button> -->
            </form>
          </div>
          <!-- table data user -->
          <table class="table table-hover border-top">
            <thead>
              <tr class="table-primary">
                <th>User ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td>
                  <div class="btn-group">
                    <button
                      @click="editUser(user)"
                      type="button"
                      class="btn btn-sm btn-info edit"
                      title="Edit"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      @click="confirmDeleteUser(user.id)"
                      type="button"
                      class="delete btn btn-sm btn-danger"
                      title="Delete"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredUsers.length === 0">
                <td colspan="4" class="text-center text-muted">
                  Tidak ada data user
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
    <!-- <div class="header">
      <h2>List Data Pekerja</h2>
      <button class="add-btn" @click="showAddForm">Tambah Data Pekerja</button>
    </div> -->

    <!-- <div class="user-cards">
      <UserCard
        v-for="user in users"
        :key="user.id"
        :user="user"
        @edit-user="editUser"
        @delete-user="confirmDeleteUser"
      />
    </div> -->
    <Modal :visible="showForm" @close="cancelEditForm">
      <UserForm
        :user="selectedUser"
        :isEdit="isEdit"
        @submit="handleSubmit"
        @cancel="cancelEditForm"
      />
    </Modal>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useUserStore } from "@/store/userStore";
import { useAuthStore } from "@/store/authStore";
// import UserCard from "./UserCard.vue";
import Modal from "@/components/Modal.vue";
import UserForm from "./UserForm.vue";
import EventBus from "@/utils/EventBus";
import Swal from "sweetalert2";

export default {
  name: "UserList",
  components: {
    // UserCard,
    Modal,
    UserForm,
  },
  setup() {
    const userStore = useUserStore();
    const authStore = useAuthStore();
    const users = computed(() => userStore.users);
    onMounted(() => {
      if (authStore.token) {
        userStore.fetchUser();
      } else {
        console.error("User is not authenticated");
      }
    });
    return {
      users,
      userStore,
      addUser: userStore.addUser,
      updateUser: userStore.updateUser,
      deleteUser: userStore.deleteUser,
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
    filteredUsers() {
      return this.users.filter((user) =>
        user.username.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    showAddForm() {
      this.selectedUser = {
        id: null,
        username: "",
        email: "",
        role: "WH_OPERATOR",
      };
      this.isEdit = false;
      this.showForm = true;
    },
    editUser(user) {
      this.selectedUser = { ...user };
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
    async handleSubmit(user) {
      if (this.isEdit) {
        await this.updateUser(user);
        this.notificationAlert("Data user berhasil diubah");
        await this.userStore.fetchUser();
      } else {
        await this.addUser(user);
        this.notificationAlert("Data user berhasil ditambah");
        await this.userStore.fetchUser();
      }
      this.showForm = false;
    },
    cancelEditForm() {
      this.showForm = false;
    },
    async confirmDeleteUser(id) {
      // Temukan user berdasarkan id
      const user = this.users.find((u) => u.id === id);

      if (!user) {
        console.error("User not found!");
        return;
      }
      Swal.fire({
        title: `Anda yakin mau menghapus ${user.username} ?`,
        text: `Data ${user.username} ini akan dihapus secara permanen`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, delete aja",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteUser(id);
          Swal.fire({
            title: "Terhapus!",
            text: "Datamu telah dihapus",
            icon: "success",
          });
        }
      });
      await this.userStore.fetchUser();
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
  },
  onmounted() {
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
/* .user-list {
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
h2 {
  color: #2980b9;
  font-size: 24px;
}
.add-btn {
  background-color: #2980b9;
  color: white;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}
.add-btn:hover {
  background-color: #0056b3;
}
.user-cards {
  display: flex;
  flex-direction: column;
} */
</style>
