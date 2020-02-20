<template>
  <aside class="copy">
    <div class="header">
      <div class="heading">Copy this link</div>
      <button
        class="action"
        v-clipboard:copy="value"
        v-clipboard:success="onCopy"
        >{{ copyText }}</button>
    </div>
    <Input :value="value" :readonly="true" />
  </aside>
</template>

<script>
import Input from '@/components/forms/Input'

export default {
  props: ['value'],
  components: { Input },

  data () {
    return { copyText: 'Copy' }
  },

  methods: {
    onCopy () {
      this.copyText = 'Copied!'

      setTimeout(() => {
        this.copyText = 'Copy'
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
  .copy {
    color: $BLUEGREY;
  }

  .header {
    align-items: center;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 15px;
  }

  .action {
    @include ButtonStripped;
    color: $BLUE;
    font-weight: 500;
  }
</style>
