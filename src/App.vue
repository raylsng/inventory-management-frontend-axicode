<template>
  <div id="app">
    <Header
      :currentRole="currentRole"
      @update-role="updateRole"
      @toggle-sidebar="toggleSidebar"
      :isSidebarVisible="isSidebarVisible"
    />
    <div class="app-content">
      <Sidebar
        :currentRole="currentRole"
        :isSidebarVisible="isSidebarVisible"
        @showComponent="navigateTo"
      />
      <div class="main-content" :class="{ expanded: isSidebarVisible }">
        <!-- mengganti yang awalnya manual dengan router view -->
        <router-view
          :key="$route.fullPath"
          :currentComponent="$route.params.component"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Header from "./components/dashboard/Header.vue";
import Sidebar from "./components/dashboard/Sidebar.vue";
import { EventBus } from "@/utils/EventBus";

export default {
  components: {
    Header,
    Sidebar,
  },
  data() {
    // mengganti url search param dengan router
    return {
      currentRole: this.$route.name || "phOperator",
      isSidebarVisible: true,
      searchTerm: "",
    };
  },
  // menambah watch untuk router
  watch: {
    "$route.name"(newRole) {
      this.currentRole = newRole;
    },
  },
  computed: {
    currentView() {
      return this.currentRole === "phOperator" ? AdminView : UserView;
    },
  },
  methods: {
    updateRole(role) {
      this.currentRole = role;
      this.navigateTo("items");
    },
    navigateTo(component) {
      this.currentComponent = component;
      // mengganti update params manual dengan router
      this.$router.push({ name: this.currentRole, params: { component } });
    },
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
      //hapus update params manual karena sudah pake router
    },
    // menghapus metode update url params
  },
  mounted() {
    EventBus.on("search", this.handleSearch);
  },
  beforeUnmount() {
    EventBus.off("search", this.handleSearch);
  },
};
</script>
<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.app-content {
  display: flex;
  height: 100%;
}
.main-content {
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  transition: margin-left 0.3s ease;
}
.main-content.expanded {
  margin-left: 200px;
}
</style>
