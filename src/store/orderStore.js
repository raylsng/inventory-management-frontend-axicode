import { defineStore } from "pinia";
import apiClient from "@/plugins/axios";

export const useOrderStore = defineStore("orderStore", {
  state: () => ({
    orders: [],
  }),

  // Fetch all orders
  actions: {
    async fetchOrders() {
      try {
        const response = await apiClient.get("/orders");
        this.orders = response.data;
        console.log("Fetched orders", this.orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error.message);
      }
    },

    // Menambah order baru
    async addOrder(order) {
      try {
        const response = await apiClient.post("/orders/order", order);
        this.orders.push(response.data);
      } catch (error) {
        console.error("Failed to add user:", error.message);
      }
    },

    //PATCH order status ke PENDING
    async verifyOrder(order) {
      try {
        const response = await apiClient.patch(
          `/orders/verify/${order.id}`,
          order
        );
        const index = this.orders.findIndex((o) => o.orderId === order.id);
        if (index !== -1) {
          this.orders.splice(index, 1, response.data);
        }
        return response.data; //nambah ini
      } catch (error) {
        console.error("Failed to update order:", error.message);
        throw error; //nambah ini
      }
    },

    //PATCH order status ke PENDING
    async receiveOrder(order) {
      try {
        const response = await apiClient.patch(
          `/orders/received/${order.id}`,
          order
        );
        const index = this.orders.findIndex((o) => o.orderId === order.id);
        if (index !== -1) {
          this.orders.splice(index, 1, response.data);
        }
        return response.data; //nambah ini
      } catch (error) {
        console.error("Failed to update order:", error.message);
        throw error; //nambah ini
      }
    },

    async deleteUser(id) {
      try {
        await apiClient.delete(`/users/${id}`);
        this.users = this.users.filter((user) => user.id !== id);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    },
  },
  persist: true, // mengaktifkan persistensi state
});
