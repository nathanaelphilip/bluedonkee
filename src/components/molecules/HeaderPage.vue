<template>
   <header class="header">
     <h2 class="heading" v-html="heading"></h2>
     <div class="content">{{ content }}</div>
     <Newsletter :simple="true" v-if="newsletter" />
   </header>
</template>

<script>
import Newsletter from '@/components/forms/Newsletter'

export default {
  props: ['content', 'heading', 'newsletter'],
  components: { Newsletter }
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
      font-size: 24px;
      line-height: 1.25;
    }

    &:not(:last-child) {
      margin-bottom: grid(3);

      @include mq ($until: small) {
        margin-bottom: grid(2);
      }
    }
  }

  .content {
    line-height: 24px;
    margin: 0 auto;
    max-width: 530px;

    &:not(:last-child) {
      margin-bottom: grid(8);
    }
  }

  .newsletter {
    margin: 0 auto;
    max-width: grid(100);
  }
</style>
