<template>
  <div
    :class="['sidebar', { show: isSidebarVisible }]"
    class="shadow position-fixed"
  >
    <div class="d-flex flex-column vh-100">
      <!-- logo -->
      <div class="px-4 py-4 border-bottom">
        <div class="d-flex align-items-center gap-2">
          <div
            class="rounded-circle d-flex align-items-center justify-content-center"
            style="
              width: 40px;
              height: 40px;
              background: linear-gradient(45deg, #0d6efd, #0a58ca);
            "
          >
            <a href="#" class="logo">
              <img src="@/assets/logo.png" alt="Logo" class="img-fluid" />
            </a>
          </div>
          <div class="sidebar-tex">
            <h2 class="fs-5 fw-bold mb-0 text-primary">Axicode</h2>
            <small class="text-muted">Warehouse Management</small>
          </div>
        </div>
      </div>
      <!-- Navigation -->
      <nav class="flex-grow-1 px-3 py-4 overflow-auto">
        <div class="nav flex-column gap-1">
          <a
            v-if="currentRole === 'admin'"
            :class="{ 'active-nav': activeComponent === 'dashboard' }"
            href="#"
            @click.prevent="setActiveComponent('dashboard')"
            class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-2"
          >
            <i class="bi bi-grid-1x2-fill"></i>
            <span class="">Dashboard</span>
          </a>

          <div class="mt-4" v-if="currentRole === 'admin'">
            <p
              class="px-3 text-uppercase small fw-semibold mb-2 text-secondary sidebar-text"
            >
              Users Management
            </p>
            <a
              :class="{ 'active-nav': activeComponent === 'users' }"
              href="#"
              @click.prevent="setActiveComponent('users')"
              class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-2"
            >
              <i class="bi bi-people-fill"></i>
              <span class="sidebar-text">Master Data Pekerja</span>
            </a>
          </div>
          <div :class="{ 'mt-4': currentRole === 'admin' }">
            <p
              class="px-3 text-uppercase small fw-semibold mb-2 text-secondary sidebar-text"
            >
              Material Management
            </p>
            <a
              :class="{ 'active-nav': activeComponent === 'items' }"
              href="#"
              @click.prevent="setActiveComponent('items')"
              class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-2"
            >
              <i class="bi bi-box-fill"></i>
              <spanc class="sidebar-text"></spanc>Master Data Material
            </a>
          </div>
          <div class="mt-4">
            <p
              class="px-3 text-uppercase small fw-semibold mb-2 text-secondary sidebar-text"
            >
              Orders & History
            </p>
            <a
              :class="{ 'active-nav': activeComponent === 'transactions' }"
              href="#"
              @click.prevent="setActiveComponent('transactions')"
              class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-2"
            >
              <i class="bi bi-cart-check-fill"></i>
              <span class="sidebar-text">Surat Perintah Kerja</span>
            </a>
            <!--<li v-if="currentRole == 'user'">-->
            <a
              :class="{ 'active-nav': activeComponent === 'history' }"
              href="#"
              @click.prevent="setActiveComponent('history')"
              class="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-2"
            >
              <i class="bi bi-clock-history"></i>
              <span class="sidebar-text">History</span>
            </a>
          </div>
        </div>
      </nav>
      <!-- user profil -->
      <div class="border-top p-3">
        <div class="d-flex align-items-center gap-3">
          <div
            class="rounded-circle bg-dark d-flex align-items-center justify-content-center"
            style="width: 40px; height: 40px"
          >
            <span class="text-white fw-semibold">
              <i class="bi bi-person-circle"></i>
            </span>
          </div>
          <div class="flex-grow-1 sidebar-text">
            <h6 class="mb-0 text-dark fw-bold">{{ authStore.username }}</h6>
            <small class="text-muted">{{ authStore.role }}</small>
          </div>
          <div class="dropdown">
            <button
              class="btn btn-link text-secondary p-0"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i class="bi bi-three-dots-vertical"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <button class="dropdown-item text-danger" @click="logout">
                  <i class="bi bi-box-arrow-right"></i>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/authStore";
export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  props: {
    currentRole: {
      type: String,
      required: true,
    },
    isSidebarVisible: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      activeComponent: null,
    };
  },
  methods: {
    setActiveComponent(component) {
      this.activeComponent = component;
      this.showComponent(component);
    },
    // agar bisa pindah component
    showComponent(component) {
      this.$router.push({ name: this.currentRole, params: { component } });
    },
    logout() {
      localStorage.removeItem("auth");
      localStorage.removeItem("role");
      this.$emit("update-role", "phOperator");
      this.$emit("toggle-sidebar", false);
      this.$router.push({ name: "login" });
    },
  },
  // emits: ["showComponent"],
};
</script>

<style scoped>
.sidebar {
  /* width: 215px; */
  width: 16rem;
  /*background: #2980b9;*/
  background: #ffffff;
  /* padding: 5px; */
  height: 100vh;
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  /* font-size: 18px; */
  /* font-family: sans-serif; */
  transition: all 0.3s ease;
  transform: translateX(-2);
}
.nav-link {
  color: #6c757d !important;
  /* cursor: pointer;
  display: flex;
  justify-content: left;
  align-items: start; */
  /* margin-left: 8px; */
  /* padding: 10px 0; */
  transition: all 0.3s ease;
}
.nav-link:hover {
  background-color: #f8f9fa;
  color: #2980b9 !important;
}
.active-nav {
  background-color: #f8f9fa !important;
  color: #2980b9 !important;
  font-weight: 600;
  border-radius: 5px;
}
.nav-item:hover {
  background-color: #191616;
  border-radius: 5px;
}
.btn-link:hover {
  background-color: #f8f9fa !important;
}
.dropdown-item {
  transition: all 0.3s ease;
}
.dropdown-item:active {
  background-color: #f8f9fa !important;
}
@media (max-width: 992px) {
  .sidebar {
    transform: translateX(-100%);
  }
  .sidebar.show {
    transform: translateX(0);
  }
}
</style>
