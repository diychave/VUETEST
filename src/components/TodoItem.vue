<template>
    <div class="todo-item">
      <input type="checkbox" v-model="todo.done" />
      <input v-model="todo.text" class="todo-text" />
      <button @click="$emit('delete')">Удалить</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TodoItem',
    props: {
      todo: Object
    }
  }
  </script>
  
  <style scoped>
  .todo-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
  .todo-text {
    flex: 1;
    margin-left: 8px;
    margin-right: 8px;
  }
  </style>
  