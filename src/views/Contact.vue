<template>
  <article class="contact">
    <HeaderPage
      :heading="`Positioned for Change.`"
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

  components: { ContactForm, HeaderPage }
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
