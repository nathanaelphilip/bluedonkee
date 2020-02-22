<template lang="html">
  <div class="markdown" v-html="markdown"></div>
</template>

<script>
import Markdown from 'markdown-it'
const md = new Markdown({
  linkify: true
})

export default {
  props: ['content'],

  computed: {
    markdown () {
      return md.render(this.content)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
