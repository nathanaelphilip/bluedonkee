<template>
  <article class="post">
    <HeaderPage
      :heading="`Post a Job.<br>Save Democracy`"
      :content="`Fill out the form below and we will review and post the opportunity. For more information please view our F.A.Q`"
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
    padding: grid(15) 0;

    @include mq ($until: xsmall) {
      padding: grid(8) 0;
    }
  }

  .header {
    margin-bottom: grid(17);

    @include mq ($until: xsmall) {
      margin-bottom: grid(10);
    }
  }
</style>
