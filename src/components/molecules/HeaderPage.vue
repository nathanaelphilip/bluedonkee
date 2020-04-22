<template>
   <header class="header">
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

  .heading {
    font-size: 48px;
    line-height: 52px;
    font-weight: 900;

    @include mq ($until: small) {
      font-size: 28px;
    }
  }
</style>
