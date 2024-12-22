<template>
  <footer class="bg-white border-top py-3">
    <div class="container-fluid">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <span class="text-muted"
            >&copy;{{ currentYear }} Axicode Team. All rights reserved.</span
          >
        </div>
        <div>
          <span class="text-muted">Version 1.0.0</span>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>
<style scoped>
footer {
  position: sticky;
  /* bottom: 0; */
  width: calc(100% - 255px);
  left: 255px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease, left 0.3s ease;
}
@media (max-width: 992px) {
  footer {
    position: static;
    width: 100%;
    left: 0;
  }
}
</style>
