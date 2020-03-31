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

    @include mq ($until: small) {
      font-size: 72px;
    }
  }

  .heading {
    font-size: 72px;
    font-weight: 900;

    @include mq ($until: small) {
      font-size: 28px;
    }

    &::v-deep span { color: $BLUE; }
  }
</style>
