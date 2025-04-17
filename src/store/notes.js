import { createStore } from 'vuex'

export default createStore({
  state: {
    notes: JSON.parse(localStorage.getItem('notes') || '[]'),
    history: [],
    future: []
  },
  mutations: {
    addNote(state, note) {
      state.notes.push(note)
      localStorage.setItem('notes', JSON.stringify(state.notes))
    },
    updateNote(state, updatedNote) {
      const index = state.notes.findIndex(n => n.id === updatedNote.id)
      if (index !== -1) {
        state.history.push(JSON.parse(JSON.stringify(state.notes)))
        state.notes.splice(index, 1, updatedNote)
        localStorage.setItem('notes', JSON.stringify(state.notes))
      }
    },
    deleteNote(state, id) {
      state.history.push(JSON.parse(JSON.stringify(state.notes)))
      state.notes = state.notes.filter(n => n.id !== id)
      localStorage.setItem('notes', JSON.stringify(state.notes))
    },
    undo(state) {
      if (state.history.length > 0) {
        state.future.push(JSON.parse(JSON.stringify(state.notes)))
        state.notes = state.history.pop()
        localStorage.setItem('notes', JSON.stringify(state.notes))
      }
    },
    redo(state) {
      if (state.future.length > 0) {
        state.history.push(JSON.parse(JSON.stringify(state.notes)))
        state.notes = state.future.pop()
        localStorage.setItem('notes', JSON.stringify(state.notes))
      }
    }
  },
  actions: {},
  getters: {
    getNoteById: (state) => (id) => {
      return state.notes.find(n => n.id === id)
    }
  }
})
