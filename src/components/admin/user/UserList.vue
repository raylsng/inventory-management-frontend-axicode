<template>
  <div class="user-list">
    <div class="header">
      <h2>List Data Pekerja</h2>
      <button class="add-btn" @click="showAddForm">Tambah Data Pekerja</button>
    </div>
    <div class="user-cards">
      <UserCard
        v-for="user in users"
        :key="user.id"
        :user="user"
        @edit-user="editUser"
        @delete-user="confirmDeleteUser"
      />
    </div>
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
import UserCard from "./UserCard.vue";
import Modal from "@/components/Modal.vue";
import UserForm from "./UserForm.vue";
import EventBus from "@/utils/EventBus";

export default {
  name: "users",
  components: {
    UserCard,
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
    async handleSubmit(user) {
      if (this.isEdit) {
        await this.updateUser(user);
        await this.userStore.fetchUser();
      } else {
        await this.addUser(user);
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
      if (confirm(`Apakah Anda yakin ingin menghapus ${user.username}?`)) {
        await this.deleteUser(id);
        await this.userStore.fetchUser();
      }
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
.user-list {
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
  color: #4b3f6b;
  font-size: 24px;
}
.add-btn {
  background-color: #754bc5;
  color: white;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}
.add-btn:hover {
  background-color: #5a37a0;
}
.user-cards {
  display: flex;
  flex-direction: column;
}
</style>
