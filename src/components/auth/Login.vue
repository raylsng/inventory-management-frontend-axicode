<template>
  <div class="login-container">
    <!-- Background image section -->
    <div class="warehouse-section">
      <!-- Curved overlay -->
      <div class="curved-overlay"></div>
    </div>

    <!-- Login form section -->
    <div class="login-form-section">
      <!-- Logo -->
      <img src="@/assets/logo.png" alt="Logo" class="logo" />

      <div class="login-content card-sm">
        <h1 class="login-title text-center">LOGIN</h1>
        <p class="login-subtitle text-center">AXICODE WAREHOUSE</p>

        <form @submit.prevent="login">
          <div class="input-group input-group-lg">
            <span class="input-group-text"
              ><i class="bi bi-person-fill"></i
            ></span>
            <input
              type="text"
              v-model="username"
              placeholder="Masukkan username"
              required
              class="form-control"
            />
          </div>

          <div class="input-group input-group-lg">
            <span class="input-group-text"><i class="bi bi-key-fill"></i></span>
            <input
              :type="passwordType"
              v-model="password"
              placeholder="Masukkan password"
              required
              class="form-control"
            />
            <span
              class="input-group-text toggle-password"
              @click="togglePassword"
            >
              <i
                :class="
                  passwordVisible ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'
                "
              ></i>
            </span>
          </div>

          <div class="forgot-password">
            <a href="#" class="forgot-link">Lupa kata sandi?</a>
          </div>

          <button type="submit" class="login-button">Login</button>
          <div
            v-if="error"
            class="alert alert-danger mt-3 d-flex justify-content-between align-items-center"
          >
            {{ error }}
            <button
              type="button"
              class="btn-close"
              @click="error = ''"
              aria-label="Close"
            ></button>
          </div>
        </form>
        <div class="mt-3 text-center">
          <p class="text-muted">
            Don't have an account?

            <a
              href="#"
              @click.prevent="$emit('switch', 'Register')"
              class="text-custom"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login as loginService } from "@/services/authServices";
import { useAuthStore } from "@/store/authStore";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
      passwordType: "password", // Default tipe input adalah password
      passwordVisible: false, // Kontrol status visibilitas password
    };
  },

  methods: {
    async login() {
      try {
        const { token, role } = await loginService(
          this.username,
          this.password
        );

        const authStore = useAuthStore();
        authStore.setToken(token);
        authStore.setRole(role);

        if (role === "PH_OPERATOR") {
          this.$router.push({ name: "admin" });
        } else if (role === "WH_OPERATOR") {
          this.$router.push({ name: "user" });
        }
      } catch (error) {
        this.error = "Username atau Password tidak sesuai";
        setTimeout(() => {
          this.error = "";
        }, 5000);
      }
    },
    togglePassword() {
      this.passwordVisible = !this.passwordVisible; // Toggle status visibilitas
      this.passwordType = this.passwordVisible ? "text" : "password"; // Ubah tipe input
    },
  },
};
</script>
<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.warehouse-section {
  flex: 1;
  background-image: url("@/assets/warehouse.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
}

.curved-overlay {
  position: absolute;
  top: 0;
  right: -100px;
  width: 200px;
  height: 100%;
  background-color: #2980b9;
  border-radius: 100% 0 0 100%;
}

.login-form-section {
  flex: 1;
  background-color: #2980b9;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.logo {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 120px;
  height: auto;
  color: white;
  background: transparent;
}

.login-content {
  width: 100%;
  max-width: 400px;
  padding: 0 2rem;
}

.login-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  color: white;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.input-group {
  margin-bottom: 1rem;
}
.input-group-text {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-right: none;
  border-left: none;
}
.form-control {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-left: none;
  border-right: none;
}
.form-control::placeholder {
  color: #999;
  font-size: medium;
}

.forgot-password {
  text-align: right;
  margin-bottom: 1.5rem;
}

.forgot-link {
  color: #b4c6e7;
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-link:hover {
  color: #d1e8ff;
  text-decoration: underline;
}
.toggle-password {
  cursor: pointer;
  color: #666;
  margin-left: -30px;
  border: none;
  background-color: white;
}

.toggle-password:hover {
  color: #333;
}
.login-button {
  width: 100%;
  padding: 0.8rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #45a049;
}
.text-custom {
  color: #b4c6e7;
}
.text-custom:hover {
  color: #d1e8ff;
  text-decoration: underline;
}
/* untuk layar mobile */
@media (max-width: 768px) {
  .login-container {
    flex: none;
    height: 100vh;
  }

  .warehouse-section {
    display: none; /* Hilangkan gambar warehouse */
  }

  .login-form-section {
    flex: none;
    width: 100%;
    margin: 0 auto; /* Tengah-tengahkan form */
    padding: 1.5rem; /* Kurangi padding */
    text-align: center;
    background-image: url("@/assets/warehouse.jpg");
    background-size: cover;
    background-position: center;
  }
  .logo {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 120px;
    height: auto;
    color: white;
  }

  .login-content {
    width: 100%; /* Maksimalkan lebar login form */
    max-width: 350px; /* Atur batas maksimal agar tetap proporsional */
    padding: 30px;
    background-color: #2980b9;
    border-radius: 20px;
  }
  .login-content:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 16px rgb(255, 255, 255, 0.2);
  }

  .login-title {
    font-size: 1.8rem; /* Perkecil ukuran font judul */
  }

  .login-subtitle {
    font-size: 0.85rem;
  }

  .input-group {
    margin-bottom: 1rem;
  }

  .form-control {
    font-size: 1rem; /* Sesuaikan ukuran teks input */
    padding: 0.5rem; /* Perkecil padding input */
  }

  .forgot-password {
    text-align: center; /* Tengah-tengahkan link */
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }

  .login-button {
    width: 100%;
    padding: 0.6rem;
    border-radius: 15px;
    font-size: 1rem;
  }
}
</style>
