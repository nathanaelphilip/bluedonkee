<template>
  <article class="post">
    <header class="header">
      <em class="emoji">👍🏽</em>
      <h2 class="heading">Are you ready for change?</h2>
      <div class="subheading">Fill out the form below and we will post and promote the opportunity</div>
    </header>
    <PostJob />
  </article>
</template>

<script>
import PostJob from '@/components/forms/PostJob'

export default {
  name: 'views-post-job',

  metaInfo: {
    title: 'Post a Job'
  },

  components: { PostJob }
}
</script>

<style lang="scss" scoped>
  .post {
    padding: 60px 0;
  }

  .header {
    margin: 0 auto 70px auto;
    max-width: 385px;
    text-align: center;
  }

  .emoji {
    display: inline-block;
    font-size: 72px;
    margin-bottom: 16px;
  }

  .heading {
    font-size: 28px;
    font-weight: 900;
    margin-bottom: 14px;
  }

  .subheading {
    font-size: 18px;
    line-height: 1.4;
  }
</style>
