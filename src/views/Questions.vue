<template>
  <article class="questions">
    <div class="grouped">
      <Question
        v-for="(question, index) in questions"
        :key="index"
        v-bind="question"
      />
    </div>
    <ContactForm />
    <div class="copyright">&copy; 2020 Blue Donkee</div>
  </article>
</template>

<script>
import Question from '@/components/molecules/Question'
import ContactForm from '@/components/forms/Contact'

const questions = [{
  emoji: `🤔`,
  heading: `What is Blue Donkee?`,
  subheading: `Seems like a fair question.`,
  content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mattis nisi non enim mollis aliquam. Fusce nec auctor massa. Integer placerat tortor neque, ac finibus magna placerat ut. Donec iaculis risus in ex commodo, nec sollicitudin orci euismod. Aenean ultrices dignissim augue ac congue.
    </p><p>Suspendisse scelerisque consequat urna tempor condimentum. Praesent imperdiet eu nibh eget interdum. Mauris porta odio vitae finibus facilisis.</p>`
}, {
  emoji: `🗽`,
  heading: `What are you trying to accomplish?`,
  subheading: `Saving democracy, duh.`,
  content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mattis nisi non enim mollis aliquam. Fusce nec auctor massa. Integer placerat tortor neque, ac finibus magna placerat ut. Donec iaculis risus in ex commodo, nec sollicitudin orci euismod. Aenean ultrices dignissim augue ac congue.
    </p><p>Suspendisse scelerisque consequat urna tempor condimentum. Praesent imperdiet eu nibh eget interdum. Mauris porta odio vitae finibus facilisis.</p>`
}, {
  emoji: `💪`,
  heading: `Want to help?`,
  subheading: `Let’s do this thing!`,
  content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mattis nisi non enim mollis aliquam. Fusce nec auctor massa. Integer placerat tortor neque, ac finibus magna placerat ut. Donec iaculis risus in ex commodo, nec sollicitudin orci euismod. Aenean ultrices dignissim augue ac congue.
    </p><p>Suspendisse scelerisque consequat urna tempor condimentum. Praesent imperdiet eu nibh eget interdum. Mauris porta odio vitae finibus facilisis.</p>`
}, {
  emoji: `📨`,
  heading: `Send us a note`,
  content: `<p>Have questions, suggestions, comments or concens? Doubt Mitch McConnell will listen, but we will. Send us a message or contact via Twitter.</p>`
}]

export default {
  name: 'views-questions',
  components: { ContactForm, Question },

  data () {
    return { questions }
  }
}
</script>

<style lang="scss" scoped>
  .questions {
    padding: 60px 0;
  }

  .question {
    &:not(:last-child) {
      margin-bottom: 60px;
    }
  }

  .form-contact {
    margin-bottom: 25px;
    margin-top: 15px;
  }

  .copyright {
    color: $BLUEGREY;
    font-size: 13px;
    text-align: center;
  }
</style>
