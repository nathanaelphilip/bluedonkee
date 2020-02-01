<template>
   <header class="header">
     <em class="emoji">{{ emoji }}</em>
     <h2 class="heading" v-html="heading"></h2>
   </header>
</template>

<script>
export default {
  props: ['emoji', 'heading']
}
</script>

<style lang="scss" scoped>
  .header {
    text-align: center;
  }

  .emoji {
    display: inline-block;
    font-size: 85px;
    margin-bottom: 15px;
  }

  .heading {
    font-size: 72px;
    font-weight: 900;

    &::v-deep span { color: $BLUE; }
  }
</style>
