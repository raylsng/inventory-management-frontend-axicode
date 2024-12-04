<template>
  <!-- untuk menampung login dan register dengan transisi -->
  <div class="auth-container">
    <transition name="fade" mode="out-in">
      <component :is="activeComponent" @switch="setActiveComponent" />
    </transition>
  </div>
</template>

<!-- Selanjutnya, pada kode script kita membuat logika untuk menampilkan komponen yang aktif. Disini, kita menggunakan -->
<!-- komponen login untuk komponen yang aktif pertama kali. -->

<script>
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";

export default {
  components: {
    Login,
    Register,
  },

  data() {
    return {
      activeComponent: "Login",
    };
  },

  methods: {
    setActiveComponent(component) {
      this.activeComponent = component;
    },
  },
};
</script>

<!-- Untuk stylingnya, pada background kita mengikuti warna dari tema aplikasi kita. -->

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.auth-container {
  width: 100%;
}

/* @media (max-width: 768px) {
  .auth-container {
    padding: 15px;
    margin-top: 10px;
  }
} */
</style>
