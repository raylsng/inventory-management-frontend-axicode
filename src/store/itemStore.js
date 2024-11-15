import { defineStore } from "pinia";
export const useItemStore = defineStore('itemStore', {
    state: () => ({
        items: [
            {
                kode: "2024001",
                nama: "Samsung Galaxy A55 5G",
                deskripsi: "RAM 8, ROM 256, LAYAR SUPER AMOLED 6,6 INCI, CHIPSET EXYNOS 1480, ANDROID 14 ONE UI, 5000 MAH, 12/50 MP ULTRA WIDE/WIDE",
                stok: 80,
              },
              {
                kode: "2024002",
                nama: "REDMI NOTE 14 PRO 5G",
                deskripsi: "Chipset, MediaTek Dimensity 7300 Ultra; CPU, Octa-core (4x2.5 GHz Cortex-A78 & 4x2.0 GHz Cortex-A55); GPU, Mali-G615 MC2; RAM 8/12 GB.",
                stok: 80,
              },
              {
                kode: "2024003",
                nama: "SAMSUNG S24 ULTRA",
                deskripsi: "Layar, Dynamic AMOLED 2X 6,8 inci ; Chipset & OS, Prosesor Snapdragon 8 Gen 3 ; Memori, RAM 12GB ; Kamera Utama, 200MP, f/1.7, 24mm (wide),",
                stok: 80,
              },
        ]
    }),
    getters: {
        getItemByKode: (state) => (kode) => {
            return state.items.find(item => item.kode === kode);
        },
        totalItems: (state) => state.items.length,
        availableItems: (state) => state.items.filter((item) => item.stok > 0),
    },
    actions: {
        addItem(item) {
            this.items.push(item);
        },
        updateItem(updatedItem) {
            const index = this.items.findIndex(item => item.kode === updatedItem.kode);
            if (index !== -1) {
                this.items[index] = updatedItem;
            }
        },
        deleteItem(kode) {
            this.items = this.items.filter(item => item.kode !== kode);
        },
    },
});