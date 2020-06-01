<template>
  <article class="contact" v-if="!loading">
    <HeaderPage
      :heading="fields.Heading"
      :content="fields.Subheading"
    />
    <ContactForm />
  </article>
</template>

<script>
import ContactForm from '@/components/forms/Contact'
import HeaderPage from '@/components/molecules/HeaderPage'

export default {
  name: 'views-questions',

  metaInfo: {
    title: 'Contact'
  },

  components: { ContactForm, HeaderPage },

  data () {
    return {
      fields: false,
      loading: true
    }
  },

  async mounted () {
    const key = 'Contact Us'

    if (!(key in this.$store.state.cms.pages)) {
      await this.$store.dispatch('cms/fetchPage', key)
    }

    this.fields = this.$store.state.cms.pages[key].fields
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
  .contact {
    padding-bottom: grid(15);
    padding-top: grid(22);

    @include mq ($until: xsmall) {
      padding-bottom: grid(8);
      padding-top: grid(8);
    }
  }

  .header {
    margin-bottom: grid(17);

    @include mq ($until: xsmall) {
      margin-bottom: grid(9);
    }
  }
</style>
