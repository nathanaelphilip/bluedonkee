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
    padding-top: grid(22);
  }

  .header {
    margin-bottom: grid(17);
  }
</style>
