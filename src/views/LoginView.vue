<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-center align-items-center">
      <div
        class="border rounded p-4 shadow-sm"
        style="width: 100%; max-width: 400px"
      >
        <h2 class="text-center mb-4">Login</h2>
        <form @submit.prevent="login">
          <div class="form-group mb-3">
            <label for="role" class="form-label">Role:</label>
            <select v-model="role" id="role" class="form-control">
              <option value="phOperator">PH Operator</option>
              <option value="whOperator">WH Operator</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: "phOperator",
    };
  },
  methods: {
    login() {
      localStorage.setItem("auth", true);
      localStorage.setItem("role", this.role);
      this.$router.push({ name: this.role, params: { component: "items" } });
    },
  },
};
</script>
<style scoped>
.d-flex {
  min-height: 80vh;
}
</style>
