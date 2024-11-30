<template>
  <div :class="['sidebar', { 'd-none': !isSidebarVisible }]">
    <a class="logo d-block text-center mb-4 text-white">AXICODE</a>
    <ul class="nav flex-column" >
      <li v-if="currentRole === 'admin'" class="nav-item">
        <a href="#" @click.prevent="showComponent('users')" class="nav-link text-white d-flex align-items-center">
          <i class="bi bi-house-door me-2"></i> Users
        </a>
      </li>
      <li class="nav-item">
        <a href="#" @click.prevent="showComponent('items')" class="nav-link text-white d-flex align-items-center">
          <i class="bi bi-box me-2"></i> Items
        </a>
      </li>
      <li class="nav-item">
        <a href="#" @click.prevent="showComponent('transactions')" class="nav-link text-white d-flex align-items-center">
          <i class="bi bi-cash me-2"></i> Transactions
        </a>
      </li>
      <li v-if="currentRole == 'user'" class="nav-item">
        <a href="#" @click.prevent="showComponent('history')" class="nav-link text-white d-flex align-items-center">
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
  data() {
    return {
      activeComponent: null,
    };
  },
  methods: {
    // setActiveComponent(component) {
      //this.activeComponent = component;
      //this.showComponent(component);
    //},
    showComponent(component) {
      this.$router.push({ name: this.currentRole, params: { component } });
    },
  },
  //emits: ["showComponent"],
};
</script>

<style scoped>
.sidebar {
  width: 215px;
  background: #2980b9;
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
  justify-content: left;
  align-items: start;
  margin-left: 8px;
  padding: 10px 0;
  transition: background-color 0.3s ease;
}
.active-nav {
  background-color: #191616;
  border-radius: 5px;
}
.nav-item:hover {
  background-color: #191616;
  border-radius: 5px;
}
.me-2 {
  margin-right: 0.5rem;
}
</style>
