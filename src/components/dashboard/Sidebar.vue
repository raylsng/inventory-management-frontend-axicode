<template>
  <div :class="['sidebar', { 'd-none': !isSidebarVisible }]">
    <a
      href="#"
      class="logo d-flex justify-content-center align-items-center text-center mb-4 text-white text-decoration-none fw-bold fs-5"
    >
      AXICODE</a
    >
    <ul class="nav flex-column">
      <li v-if="currentRole === 'ph operator'" class="nav-item mb-2">
        <a
          href="#"
          @click.prevent="showComponent('users')"
          class="nav-link text-white d-flex align-items-center"
        >
          <i class="bi bi-house-door me-2"></i> Master Data Pekerja
        </a>
      </li>
      <li class="nav-item mb-2">
        <a
          href="#"
          @click.prevent="showComponent('items')"
          class="nav-link text-white d-flex align-items-center"
        >
          <i class="bi bi-box me-2"></i> Master Data Material
        </a>
      </li>
      <li class="nav-item mb-2">
        <a
          href="#"
          @click.prevent="showComponent('transactions')"
          class="nav-link text-white d-flex align-items-center"
        >
          <i class="bi bi-file-earmark-text me-2"></i> Surat Perintah Kerja
        </a>
      </li>
      <li class="nav-item">
        <!--<li v-if="currentRole == 'user'">-->
        <a
          href="#"
          @click.prevent="showComponent('history')"
          class="nav-link text-white d-flex align-items-center"
        >
          <i class="bi bi-clock-history me-2"></i> History
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    currentRole: {
      type: String,
      required: true,
    },
    isSidebarVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    showComponent(component) {
      this.$emit("showComponent", component);
    },
  },
  emits: ["showComponent"],
};
</script>

<style scoped>
.sidebar {
  width: 230px;
  background: #4b3f6b;
  color: white;
  padding: 14px;
  height: 100vh;
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  font-size: 18px;
  font-family: sans-serif;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-2);
}
.nav-link {
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  padding: 10px 0;
  transition: background-color 0.3s ease;
}
.nav-link:hover {
  text-decoration: underline;
  background-color: rgba(255, 255, 255, 0.1);
}
.me-2 {
  margin-right: 0.5rem;
}
</style>
