<template>
    <div class="overlay" v-if="visible">
      <div class="dialog">
        <p>{{ message }}</p>
        <button @click="$emit('confirm')">Да</button>
        <button @click="$emit('cancel')">Нет</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ConfirmDialog',
    props: {
      visible: Boolean,
      message: String
    }
  }
  </script>
  
  <style scoped>
  .overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dialog {
    background: white;
    padding: 20px;
    border-radius: 8px;
    min-width: 300px;
    text-align: center;
  }
  button {
    margin: 10px;
  }
  </style>
  