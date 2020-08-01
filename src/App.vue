<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">
          <transition name="fade">
            <message v-if="message" :message="message" />
          </transition>
          <newNote :note="note" :types="types" @add-note="addNote" />

          <div class="note-header">
            <h1 class="note-header__title">{{ title }}</h1>
            <search :value="search" placeholder="Find your note" @search="search = $event" />

            <div class="icons">
              <svg class="icons__svg" :class="{ active: grid }" @click="changeGridView(true)">
                <use href="@/assets/sprite.svg#grid"></use>
              </svg>
              <svg class="icons__svg" :class="{ active: !grid }" @click="changeGridView(false)">
                <use href="@/assets/sprite.svg#column"></use>
              </svg>
            </div>
          </div>

          <notes 
            :notes="notesFilter" 
            :grid="grid" 
            :types="types"
            @saveNewChangesInLocalStorage="saveNotesInLocalStorage" 
            @remove="removeNote" />
          <p>{{ setDefaultGridView }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import message from '@/components/Message/Message.vue';
import newNote from '@/components/NewNote/NewNote.vue';
import notes from '@/components/Notes/Notes.vue';
import search from '@/components/Search/Search.vue';

export default {
  components: {
    message, newNote, notes, search,
  },
  data() {
    return {
      title: 'Notes App',
      search: '',
      message: null,
      grid: true,
      prevGrid: null,
      tablet: null,
      types: {
        normal: {
          type: 'normal',
          color: 'gray',
        },
        high: {
          type: 'high',
          color: 'yellow',
        },
        veryHigh: {
          type: 'very high',
          color: 'red',
        },
      },
      note: {
        title: '',
        descr: '',
        type: 'normal',
        color: 'gray',
      },
      notes: [],
    };
  },
  created() {
    window.addEventListener('resize', this.updateWidth);
    window.innerWidth > 767 ? this.tablet = false : this.tablet = true;
  },
  mounted() {
    if (localStorage.getItem('notes')) {
      try {
        this.notes = JSON.parse(localStorage.getItem('notes'));
      } catch (e) {
        localStorage.removeItem('notes');
      };
    };

    if (localStorage.getItem('grid')) {
      this.grid = localStorage.grid === 'true' ? true : false;
      this.prevGrid = this.grid;
    };
  },
  computed: {
    setDefaultGridView() {
      const tablet = this.tablet;

      if (tablet === true) {
        this.prevGrid = this.grid;
        this.changeGridView(false);
      } else if (tablet === false && this.prevGrid !== null) {
        this.changeGridView(this.prevGrid);
      };
    },
    notesFilter() {
      let array = this.notes;
      let search = this.search;

      if (!search) return array;

      search = search.trim().toLowerCase();

      array = array.filter(item => item.title.toLowerCase().indexOf(search) !== -1);

      return array;
    }
  },
  methods: {
    addNote() {
      let {title, descr, type, color} = this.note;

      if (!title) {
        this.message = 'title can`t be blank!';

        return false;
      };

      this.notes.push({
        title,
        descr,
        date: new Date(Date.now()).toLocaleString(),
        type,
        color,
        id: this.notes.length + 1,
      });

      this.message = null;
      this.note.title = '';
      this.note.descr = '';
      this.note.type = 'normal';
      this.saveNotesInLocalStorage();
    },
    removeNote(i, note) {
      if (this.search.trim() === '') {
        this.notes.splice(i, 1);
      } else {
        this.notes.splice(note.id - 1, 1);
      };
      this.saveNotesInLocalStorage();
    },
    changeGridView(bool) {
      this.grid = bool;
      localStorage.grid = bool;
    },
    saveNotesInLocalStorage() {
      const parsed = JSON.stringify(this.notes);
      localStorage.setItem('notes', parsed);
    },
    updateWidth() {
      if (window.innerWidth > 767 && this.tablet !== false) {
        this.tablet = false;
      } else if (window.innerWidth <= 767 && this.tablet !== true) {
        this.tablet = true;
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./App.module.scss";
</style>