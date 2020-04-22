<template>
  <article class="contact">
    <HeaderPage
      :heading="`Positioned for Change.`"
    />
    <ContactForm />
    <Colophon />
  </article>
</template>

<script>
import Colophon from '@/components/molecules/Colophon'
import ContactForm from '@/components/forms/Contact'
import HeaderPage from '@/components/molecules/HeaderPage'

export default {
  name: 'views-questions',

  metaInfo: {
    title: 'Contact'
  },

  components: { Colophon, ContactForm, HeaderPage }
}
</script>

<style lang="scss" scoped>
  .contact {
    padding-top: grid(22);
  }

  .header {
    margin-bottom: grid(17);
  }

  .form-contact {
    margin-bottom: grid(6);
  }
</style>
