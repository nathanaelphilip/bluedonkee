<template>
  <article class="questions">
    <HeaderPage
      emoji="🗽"
      :heading="`Positioned for <span>Change.</span>`"
    />
    <Question
      v-for="(question, index) in questions"
      :key="index"
      v-bind="question"
    />
    <ContactForm />
    <div class="copyright">&copy; 2020 Blue Donkee</div>
  </article>
</template>

<script>
import ContactForm from '@/components/forms/Contact'
import HeaderPage from '@/components/molecules/HeaderPage'
import Question from '@/components/molecules/Question'

const questions = [{
  heading: `What is WorkBlue?`,
  content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mattis nisi non enim mollis aliquam. Fusce nec auctor massa. Integer placerat tortor neque, ac finibus magna placerat ut. Donec iaculis risus in ex commodo, nec sollicitudin orci euismod. Aenean ultrices dignissim augue ac congue.
    </p><p>Suspendisse scelerisque consequat urna tempor condimentum. Praesent imperdiet eu nibh eget interdum. Mauris porta odio vitae finibus facilisis.</p>`
}, {
  heading: `What are you trying to accomplish?`,
  content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mattis nisi non enim mollis aliquam. Fusce nec auctor massa. Integer placerat tortor neque, ac finibus magna placerat ut. Donec iaculis risus in ex commodo, nec sollicitudin orci euismod. Aenean ultrices dignissim augue ac congue.
    </p><p>Suspendisse scelerisque consequat urna tempor condimentum. Praesent imperdiet eu nibh eget interdum. Mauris porta odio vitae finibus facilisis.</p>`
}, {
  heading: `Want to help?`,
  content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mattis nisi non enim mollis aliquam. Fusce nec auctor massa. Integer placerat tortor neque, ac finibus magna placerat ut. Donec iaculis risus in ex commodo, nec sollicitudin orci euismod. Aenean ultrices dignissim augue ac congue.
    </p><p>Suspendisse scelerisque consequat urna tempor condimentum. Praesent imperdiet eu nibh eget interdum. Mauris porta odio vitae finibus facilisis.</p>`
}, {
  heading: `Send us a note`,
  content: `<p>Have questions, suggestions, comments or concens? Doubt Mitch McConnell will listen, but we will. Send us a message or contact via Twitter.</p>`
}]

export default {
  name: 'views-questions',
  components: { ContactForm, HeaderPage, Question },

  data () {
    return { questions }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    margin-bottom: 70px;
  }

  .questions {
    padding: 60px 0;
  }

  .question {
    &:not(:last-child) {
      margin-bottom: 40px;
    }
  }

  .form-contact {
    margin-bottom: 25px;
  }

  .copyright {
    color: $BLUEGREY;
    font-size: 13px;
    text-align: center;
  }
</style>
