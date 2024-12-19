<template>
  <div id="app" @click="handleClickOutside">
    <Header
      v-if="showHeader"
      :currentRole="currentRole"
      @update-role="updateRole"
      @toggle-sidebar="toggleSidebar"
      :isSidebarVisible="isSidebarVisible"
    />
    <!-- menambahkan :class="{ noHeader: !showHeader }  -->
    <div class="app-content" :class="{ noHeader: !showHeader }">
      <Sidebar
        v-if="showSidebar"
        :currentRole="currentRole"
        :isSidebarVisible="isSidebarVisible"
        @showComponent="navigateTo"
        ref="sidebarRef"
      />
      <!-- menambahkan && showSidebar  -->
      <!-- alhamdulillah -->
      <div
        class="main-content"
        :class="{
          expanded: !isSidebarVisible && toggleSidebar && showSidebar,
        }"
      >
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
      isSidebarVisible: false,
      searchTerm: "",
    };
  },
  // mengedit kode computed dan menambah showHeader - showSidebar
  computed: {
    showHeader() {
      return !this.$route.meta.hideHeader;
    },
    showSidebar() {
      return !this.$route.meta.hideSidebar;
    },
  },
  // menambah watch untuk router
  watch: {
    "$route.name"(newRole) {
      this.currentRole = newRole;
    },
  },
  // merubah isi kode dari methods
  methods: {
    updateRole(role) {
      this.currentRole = role;
    },
    navigateTo(component) {
      if (this.currentRole === "PH_OPERATOR") {
        this.$router.push({ name: "phOperator", params: { component } });
      } else if (this.currentRole === "WH_OPERATOR") {
        this.$router.push({ name: "whOperator" });
      } else {
        this.$router.push({ name: "login" });
      }
    },
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    handleSearch(newQuery) {
      console.log("Search term:", newQuery);
      if (this.currentRole === "phOperator") {
        console.log("Search in admin items"); //merubah currentRole dari admin ke phOperator
      } else if (this.currentRole === "whOperator") {
        console.log("Search in user items"); //merubah currentRole dari admin ke whOperator
      }
    },
    handleClickOutside(event) {
      if (window.innerWidth < 992) {
        // if (this.isSidebarVisible) {
        const sidebar = this.$refs.sidebarRef;
        const toggleButton = this.$el.querySelector(".toggle-btn");
        // const header = this.$el.querySelector("header");

        if (
          this.isSidebarVisible &&
          sidebar &&
          // header &&
          !sidebar.$el.contains(event.target) &&
          (!toggleButton || !toggleButton.contains(event.target))
          // event.target !== header &&
          // !header.contains(event.target)
        ) {
          this.isSidebarVisible = false;
        }
      }
    },
    // },
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
/* menambah ini */
html,
body {
  height: 100%;
  margin: 0;
}
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f6fa;
}
.app-content {
  display: flex;
  /* height: 100%; */
  flex-grow: 1;
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  font: 1em sans-serif; */
  height: calc(100vh - 60px);
  /* margin-top: 60px; */
  background-color: #f5f6fa;
}
.main-content {
  flex: 1;
  /* padding: 20px; */
  background-color: #ffffff;
  transition: margin-left 0.3s ease;
}
.main-content.expanded {
  /* width: calc(100% - 255px); */
  margin-left: 250px;
}

.app-content.noHeader {
  margin-top: 0;
  height: 100vh;
}

@media (max-width: 992px) {
  .main-content.expanded {
    margin-left: 0;

    /* margin-top: 180px; */
  }
  .app-content.noHeader {
    margin-top: 0;
    height: calc(100vh - 60px);
  }
}
</style>
