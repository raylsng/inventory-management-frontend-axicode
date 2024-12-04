<template>
  <div class="register-container">
    <!-- Background image section -->
    <div class="warehouse-section">
      <!-- Curved overlay -->
      <div class="curved-overlay"></div>
    </div>
    <!-- Login form section -->
    <div class="register-form-section">
      <!-- Logo -->
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <div class="register-content">
        <h1 class="register-title text-center">REGISTER</h1>
        <p class="register-subtitle text-center">AXICODE WAREHOUSE</p>
        <form @submit.prevent="register">
          <div class="input-group">
            <span class="input-group-text"
              ><i class="bi bi-person-fill"></i
            ></span>
            <input
              type="text"
              v-model="username"
              placeholder="Masukkan username"
              class="form-control"
            />
          </div>
          <div class="input-group">
            <span class="input-group-text"
              ><i class="bi bi-envelope-at-fill"></i>
            </span>
            <input
              type="email"
              v-model="email"
              placeholder="Masukkan email"
              class="form-control"
            />
          </div>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-key-fill"></i></span>
            <input
              :type="passwordType"
              v-model="password"
              placeholder="Masukkan password"
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
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-key-fill"></i></span>
            <input
              :type="confirmPasswordType"
              v-model="confirmPassword"
              placeholder="Konfirmasi Password"
              required
              class="form-control"
            />
            <span
              class="input-group-text toggle-password"
              @click="toggleConfirmPassword"
            >
              <i
                :class="
                  confirmPasswordVisible
                    ? 'bi bi-eye-fill'
                    : 'bi bi-eye-slash-fill'
                "
              ></i>
            </span>
          </div>
          <button type="submit" class="register-button">Register</button>
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
            Already have an account?
            <a
              href="#"
              @click.prevent="$emit('switch', 'Login')"
              class="text-custom"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { register as registerService } from "@/services/authServices";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      passwordType: "password", // Default tipe input adalah password
      passwordVisible: false, // Kontrol status visibilitas password
      confirmPasswordType: "password", // Default tipe input adalah password
      confirmPasswordVisible: false, // Kontrol status visibilitas password
    };
  },
  methods: {
    async register() {
      // validasi username
      if (!this.username) {
        this.error = "Username harus diisi";
        setTimeout(() => {
          this.error = "";
        }, 4000);
        return;
      }
      // validasi email
      if (!this.email) {
        this.error = "Email harus diisi";
        setTimeout(() => {
          this.error = "";
        }, 4000);
      }
      // regex format email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.error = "Email tidak valid!";
        setTimeout(() => {
          this.error = "";
        }, 4000);
        return;
      }
      // validasi password
      if (!this.password) {
        this.error = "Password harus diisi.";
        setTimeout(() => {
          this.error = "";
        }, 4000);
        return;
      }
      // validasi panjang password
      if (this.password.length < 8) {
        this.error = "Password harus minimal 8 karakter!";
        setTimeout(() => {
          this.error = "";
        }, 4000);
        return;
      }
      // validasi confirm password
      if (this.password !== this.confirmPassword) {
        this.error = "Password tidak cocok!";
        setTimeout(() => {
          this.error = "";
        }, 4000);
        return;
      }
      try {
        const response = await registerService(
          this.username,
          this.email,
          this.password
        );
        if (response) {
          // sweet alert validasi
          console.log("Registration successful:", response);
          Swal.fire({
            title: "Registrasi Berhasil",
            text: "Akun Anda telah berhasil dibuat.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            this.$emit("switch", "Login");
          });
        }
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          "Username sudah digunakan, silahkan gunakan username lain";
        console.error("Registration failed:", error);
        setTimeout(() => {
          this.error = "";
        }, 5000);
      }
    },
    togglePassword() {
      this.passwordVisible = !this.passwordVisible; // Toggle status visibilitas
      this.passwordType = this.passwordVisible ? "text" : "password"; // Ubah tipe input
    },
    toggleConfirmPassword() {
      this.confirmPasswordVisible = !this.confirmPasswordVisible; // Toggle status visibilitas
      this.confirmPasswordType = this.confirmPasswordVisible
        ? "text"
        : "password"; // Ubah tipe input
    },
  },
};
</script>
<style scoped>
.register-container {
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
.register-form-section {
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
}
.register-content {
  width: 100%;
  max-width: 400px;
  padding: 0 2rem;
}
.register-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
}
.register-subtitle {
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
.register-button {
  width: 100%;
  padding: 0.8rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: 500;
  margin-top: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}
.register-button:hover {
  background-color: #45a049;
}
.text-custom {
  color: #b4c6e7;
}
.text-custom:hover {
  color: #d1e8ff;
}
/* untuk layar mobile */
@media (max-width: 768px) {
  .register-container {
    flex: none;
    height: 100vh;
  }
  .warehouse-section {
    display: none;
  }
  .register-form-section {
    flex: none;
    width: 100%;
    margin: 0 auto;
    padding: 1.5rem;
    text-align: center;
    background-image: url("@/assets/warehouse.jpg");
    background-size: cover;
    background-position: center;
  }
  .logo {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 120px;
    height: auto;
    color: white;
  }
  .register-content {
    width: 100%; /* Maksimalkan lebar login form */
    max-width: 350px; /* Atur batas maksimal agar tetap proporsional */
    padding: 20px;
    background-color: #2980b9;
    border-radius: 20px;
  }
  .register-content:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 16px rgb(255, 255, 255, 0.2);
  }
  .register-title {
    font-size: 1.8rem;
  }
  .register-subtitle {
    font-size: 0.85rem;
  }
  .input-group {
    margin-bottom: 1rem;
  }
  .form-control {
    font-size: 1rem;
    padding: 0.5rem; /* Perkecil padding input */
  }
  .forgot-password {
    text-align: center; /* Tengah-tengahkan link */
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }
  .register-button {
    width: 100%;
    padding: 0.6rem;
    border-radius: 15px;
    font-size: 1rem;
  }
}
</style>
