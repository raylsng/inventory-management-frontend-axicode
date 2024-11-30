<template>
    <div class="admin-view">
      <div class="scrollable-content">
        <ItemList v-if="currentComponent === 'items'" />
        <UserList v-if="currentComponent === 'users'" />
        <TransactionList v-if="currentComponent === 'transactions'" />
      </div>
      <Modal
        v-if="showForm"
        :isVisible="showForm"
        @close="cancelEditForm"
        :title="isEdit ? 'Edit Barang' : 'Tambah Barang'"
      >
        <ItemForm :item="selectedItem" :isEdit="isEdit" @submit="handleSubmit" />
      </Modal>
    </div>
  </template>
  
  <script>
  import ItemList from '@/components/admin/item/ItemList.vue';
  import ItemForm from '@/components/admin/item/ItemForm.vue';
  import UserList from '@/components/admin/user/UserList.vue';
  import TransactionList from '@/components/user/transaction/TransactionList.vue';
  import Modal from '@/components/Modal.vue';
  
  export default {
    components: {
      ItemList,
      ItemForm,
      UserList,
      TransactionList,
      Modal,
    },
    props: {
      component: {
        type: String,
        required: true,
        default: "users",
      },
    },
    computed: {
      currentComponent() {
        return this.component;
      },
    },
  };
  </script>
  
  <style scoped>

  .admin-view {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }
  
  .scrollable-content {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #ffffff;
    max-height: calc(100vh - 60px);
  }
  </style>
  