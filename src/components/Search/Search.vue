<template>
  <div class="wrapper-search">
    <div class="search">
      <div class="search-icon">
        <svg class="search-icon__svg">
          <use href="@/assets/sprite.svg#search"></use>
        </svg>
      </div>
    </div>
    
    <input class="wrapper-search__input" type="text" :placeholder="placeholder" v-model="search"/>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Search',
    }
  },
  data() {
    return { 
      search: this.value,
    };
  },
  watch: {
    search(val) {
      this.$emit('search', val);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./Search.module.scss";
</style>