import { defineStore } from "pinia";
import apiClient from "@/plugins/axios";
export const useItemStore = defineStore("itemStore", {
  state: () => ({
    items: [],
  }),
  getters: {
    getItemByKode: (state) => (id) => {
      return state.items.find((item) => item.id === id);
    },
    totalItems: (state) => state.items.length,
    availableItems: (state) => state.items.filter((item) => item.stock > 0),
  },
  actions: {
    async fetchItems() {
      try {
        const response = await apiClient.get("/material");
        this.items = response.data;
        console.log("Fetched items", this.items);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    },
    async addItem(item) {
      try {
        const response = await apiClient.post("/material", item);
        this.items.push(response.data);
      } catch (error) {
        console.error("Failed to add item:", error.message);
      }
    },
    async updateItem(item) {
      try {
        const response = await apiClient.put(`/material/${item.id}`, item);
        const index = this.items.findIndex((u) => u.id === item.id);
        if (index !== -1) {
          this.items.splice(index, 1, response.data);
        }
      } catch (error) {
        console.error("Failed to update item:", error);
      }
    },
    async deleteItem(id) {
      try {
        await apiClient.delete(`/material/${id}`);
        this.items = this.items.filter((item) => item.id !== id);
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    },
  },
  persist: true, // mengaktifkan persistensi state
});
