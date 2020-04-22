<template>
  <article class="post">
    <HeaderPage
      :heading="`Are you ready for change?`"
      :content="`Fill out the form below and we will post and promote the opportunity`"
    />
    <PostJob />
  </article>
</template>

<script>
import HeaderPage from '@/components/molecules/HeaderPage'
import PostJob from '@/components/forms/PostJob'

export default {
  name: 'views-post-job',

  metaInfo: {
    title: 'Post a Job'
  },

  components: { HeaderPage, PostJob },

  async mounted () {
    window.analytics.page('Post Job')
  }
}
</script>

<style lang="scss" scoped>
  .post {
    padding: 60px 0;
  }

  .header {
    margin-bottom: grid(17);
  }
</style>
