<template>
   <header class="header">
     <h2 class="heading" v-html="heading"></h2>
     <div class="content">{{ content }}</div>
   </header>
</template>

<script>
export default {
  props: ['content', 'heading']
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

    &:not(:last-child) {
      margin-bottom: grid(6);
    }
  }

  .content {
    font-size: 16px;
    line-height: 24px;
  }
</style>
