<template>
  <aside class="banner">
    <div class="info">
      <h3 class="heading">{{ heading }}</h3>
      <div class="content">{{ content }}</div>
      <div class="actions">
        <LinkPrimary :to="{name: 'jobPost'}"><strong>Post a Job</strong> – Save Democracy</LinkPrimary>
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
  }

  .heading {
    font-size: 36px;
    font-weight: 900;
    line-height: 42px;
    margin-bottom: grid(3);
  }

  .content {
    margin: 0 auto grid(6) auto;
    line-height: 24px;
    max-width: 420px;
  }
</style>
