<template>
  <aside class="banner">
    <div class="info">
      <h3 class="heading">{{ heading }}</h3>
      <div class="content">{{ content }}</div>
      <div class="actions">
        <LinkPrimary :to="{name: 'postJob'}">Post a job to WorkBlue</LinkPrimary>
      </div>
    </div>
  </aside>
</template>

<script>
import LinkPrimary from '@/components/atoms/LinkPrimary'

export default {
  props: ['heading', 'content'],
  components: { LinkPrimary }
}
</script>

<style lang="scss" scoped>
  .banner {
    padding: grid(15) 0;
    text-align: center;

    @include mq ($until: small) {
      padding: grid(8) grid(10);
    }
  }

  .heading {
    font-size: 36px;
    font-weight: 900;
    line-height: 42px;
    margin-bottom: grid(3);

    @include mq ($until: small) {
      font-size: 24px;
      line-height: 30px;
    }
  }

  .content {
    margin: 0 auto grid(6) auto;
    line-height: 24px;
    max-width: 420px;

    @include mq ($until: small) {
      font-size: 14px;
    }
  }
</style>
