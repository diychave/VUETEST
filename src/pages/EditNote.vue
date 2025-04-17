<template>
  <div class="edit-note">
    <h1>{{ isNew ? 'Создание заметки' : 'Редактирование заметки' }}</h1>
    <input v-model="note.title" placeholder="Заголовок заметки" class="note-title" />

    <div class="todo-list">
      <TodoItem
        v-for="(todo, index) in note.todos"
        :key="index"
        :todo="todo"
        @delete="removeTodo(index)"
      />
      <button @click="addTodo">Добавить задачу</button>
    </div>

    <div class="actions">
      <button @click="saveNote">Сохранить</button>
      <button @click="askCancel">Отменить</button>
      <button v-if="!isNew" @click="askDelete">Удалить</button>
      <button :disabled="!canUndo" @click="undo">Отменить изменение</button>
      <button :disabled="!canRedo" @click="redo">Повторить изменение</button>
    </div>

    <ConfirmDialog
      :visible="confirmDialog"
      :message="confirmMessage"
      @confirm="onConfirm"
      @cancel="confirmDialog = false"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import TodoItem from '../components/TodoItem.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'

export default {
  components: { TodoItem, ConfirmDialog },
  data() {
    return {
      note: {
        id: null,
        title: '',
        todos: []
      },
      original: null,
      history: [],
      future: [],
      confirmDialog: false,
      confirmMessage: '',
      confirmAction: null
    }
  },
  computed: {
    ...mapState(['notes']),
    isNew() {
      return !this.$route.params.id
    },
    canUndo() {
      return this.history.length > 0
    },
    canRedo() {
      return this.future.length > 0
    }
  },
  created() {
    if (!this.isNew) {
      const id = this.$route.params.id
      const existingNote = this.notes.find(n => n.id === id)
      if (existingNote) {
        this.note = JSON.parse(JSON.stringify(existingNote))
        this.original = JSON.parse(JSON.stringify(existingNote))
      }
    } else {
      this.note.id = Date.now().toString()
    }
    this.saveHistory()
  },
  methods: {
    ...mapMutations({
      addNoteMutation: 'addNote',
      updateNoteMutation: 'updateNote',
      deleteNoteMutation: 'deleteNote'
    }),

    saveNote() {
      if (this.isNew) {
        this.addNoteMutation(this.note)
      } else {
        this.updateNoteMutation(this.note)
      }
      this.$router.push('/')
    },

    askDelete() {
      this.confirmMessage = 'Удалить эту заметку?'
      this.confirmAction = this.deleteConfirmed
      this.confirmDialog = true
    },
    deleteConfirmed() {
      this.deleteNoteMutation(this.note.id)
      this.$router.push('/')
    },

    askCancel() {
      this.confirmMessage = 'Отменить редактирование и выйти?'
      this.confirmAction = () => this.$router.push('/')
      this.confirmDialog = true
    },
    onConfirm() {
      this.confirmDialog = false
      if (this.confirmAction) this.confirmAction()
    },

    addTodo() {
      this.note.todos.push({ text: '', done: false })
      this.saveHistory()
    },
    removeTodo(index) {
      this.note.todos.splice(index, 1)
      this.saveHistory()
    },

    undo() {
      if (this.canUndo) {
        this.future.push(JSON.parse(JSON.stringify(this.note)))
        this.note = this.history.pop()
      }
    },
    redo() {
      if (this.canRedo) {
        this.history.push(JSON.parse(JSON.stringify(this.note)))
        this.note = this.future.pop()
      }
    },
    saveHistory() {
      this.history.push(JSON.parse(JSON.stringify(this.note)))
      this.future = []
    }
  },
  watch: {
    note: {
      handler() {
        this.saveHistory()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.edit-note {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
.note-title {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
}
.todo-list {
  margin-bottom: 20px;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
