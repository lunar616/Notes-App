<template>
  <transition-group 
    tag="div" 
    class="notes" 
    name="note"
    @after-enter="afterEnter" 
    mode="in-out" 
    appear
  >
    <div 
      class="note" 
      :class="{ full: !grid, [`note_${types[note.type].color}`]: true, 'note-hover': !animation }" 
      v-for="(note, index) of notes" :key="note.date"
    >
      <div class="note-header" :class="{ full: !grid }">
        <h3 
          class="note-header__title"
          @click="editValue($event)"
          @blur="saveNewValue($event, index, 'title')"
          @keydown.enter.prevent.exact="e => e.target.blur()"
        >
          {{ note.title }}
        </h3>
        <p class="note-header__button-close" @click="removeNote(index, note)">✖</p>
      </div>
      <div class="note-body">
        <p 
          class="note-body__text"
          @click="editValue($event)"
          @blur="saveNewValue($event, index, 'descr')"
          @keydown.enter.prevent.exact="saveNewValue($event, index, 'descr')"
        >
          {{ note.descr }}
        </p>
        <span class="note-body__date">{{ note.date }}</span>
      </div>
    </div>
  </transition-group>
</template>

<script>
export default {
  props: {
    notes: {
      type: Array,
      required: true,
    },
    grid: {
      type: Boolean,
      required: true,
    },
    types: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      animation: true,
    }
  },
  methods: {
    afterEnter() {
      this.animation = false;
    },
    saveChangesInLocalStorage() {
      this.$emit('saveNewChangesInLocalStorage');
    },
    removeNote(index, note) {
      this.$emit('remove', index, note);
    },
    editValue(e) {
      const target = e.target;

      if (!target.hasAttribute('contenteditable')) {
        target.setAttribute('contenteditable', 'true');
        target.innerHTML = target.innerText.trim();

        const range = document.createRange();
        range.selectNodeContents(target);
        range.collapse(false);
        
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        target.focus();
      };
    },
    saveNewValue(e, index, element) {
      const target = e.target;  
      
      if (this.notes[index][element] === target.innerText.trim()) {
        target.innerHTML = target.innerText.trim();
        target.removeAttribute('contenteditable');
      } else {
        this.notes[index][element] = target.innerText;
        this.notes[index].date = new Date(Date.now()).toLocaleString();

        target.removeAttribute('contenteditable');
      };

      this.saveChangesInLocalStorage();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./Notes.module.scss";
</style>