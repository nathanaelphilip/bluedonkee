<template>
  <header class="intro">
    <h1 class="heading">{{ heading }}</h1>
  </header>
</template>

<script>
export default {
  props: ['heading']
}
</script>

<style lang="scss" scoped>
  .intro {
    margin: grid(16) 0 grid(15) 0;

    @include mq($until: medium) {
      margin: grid(8) 0 grid(4) 0;
      padding: 0 grid(8);
    }
  }

  .heading {
    font-size: 36px;
    font-weight: 900;
    line-height: 1.25;

    @include mq($until: xsmall) {
      font-size: 18px;
      max-width: 160px;
    }
  }
</style>
