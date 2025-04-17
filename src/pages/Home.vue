<template>
    <div class="home">
      <h1>Заметки</h1>
      <button @click="$router.push('/edit')">Создать новую</button>
  
      <NoteCard
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @confirm-delete="askDelete"
      />
  
      <ConfirmDialog
        :visible="showConfirm"
        message="Вы точно хотите удалить эту заметку?"
        @confirm="deleteNote"
        @cancel="showConfirm = false"
      />
    </div>
  </template>
  
  <script>
  import { mapState, mapMutations } from 'vuex'
  import NoteCard from '../components/NoteCard.vue'
  import ConfirmDialog from '../components/ConfirmDialog.vue'
  
  export default {
    components: { NoteCard, ConfirmDialog },
    data() {
      return {
        noteToDelete: null,
        showConfirm: false
      }
    },
    computed: {
      ...mapState(['notes'])
    },
    methods: {
      ...mapMutations(['deleteNote']),
      askDelete(id) {
        this.noteToDelete = id
        this.showConfirm = true
      },
      deleteNote() {
        this.$store.commit('deleteNote', this.noteToDelete)
        this.showConfirm = false
      }
    }
  }
  </script>
  
  <style scoped>
  .home {
    max-width: 600px;
    margin: auto;
    padding: 20px;
  }
  </style>
  