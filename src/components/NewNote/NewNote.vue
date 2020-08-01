<template>
  <div class="new-note">
    <h2 class="new-note__title">Title</h2>
    <input type="text" v-model="note.title">
    <h2 class="new-note__title">Priority</h2>

    <div class="checkbox">
      <div v-for="(item, index) in 3" :key="index">
        <input :id="index" type="radio" v-model="note.type" :value="typesCamelCase[index]">
        <label :for="index" class="checkbox__item" :class="{[classesForLabels[index]]: note.type === typesCamelCase[index], }">
          {{ buttonNames[index] }}
        </label>
      </div>
    </div>

    <h2 class="new-note__title">Description</h2>
    <textarea class="new-note__textarea" v-model="note.descr"></textarea>
    <button class="btn new-note__button" :class="`new-note__button_${types[note.type].color}`" @click="addNote">New note</button>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true,
    },
    types: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      buttonNames: ['Normal', 'High', 'Very high'],
      typesCamelCase: ['normal', 'high', 'veryHigh'],
      classesForLabels: [ 'checked-normal', 'checked-high', 'checked-very-high']
    };
  },
  methods: {
    addNote() {
      this.$emit('add-note');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./NewNote.module.scss";
</style>