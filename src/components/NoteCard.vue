<template>
    <div class="note-card">
      <h2>{{ note.title }}</h2>
      <ul>
        <li v-for="(todo, index) in note.todos.slice(0, 3)" :key="index">
          <input type="checkbox" :checked="todo.done" disabled />
          {{ todo.text }}
        </li>
        <li v-if="note.todos.length > 3">...</li>
      </ul>
      <div class="actions">
        <button @click="$router.push(`/edit/${note.id}`)">Редактировать</button>
        <button @click="$emit('confirm-delete', note.id)">Удалить</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NoteCard',
    props: {
      note: Object
    }
  }
  </script>
  
  <style scoped>
  .note-card {
    background: white;
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  .actions {
    margin-top: 10px;
  }
  button {
    margin-right: 10px;
  }
  </style>
  