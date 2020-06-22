<template>
  <form @submit.prevent class="form" :class="{'»open' : open}">
    <div class="box">
      <IconSearch width="16" height="16" />
      <input @focus="open = true" @blur="open = false" v-model="input" type="text" class="input">
      <button class="close">
        <IconClose height="9" width="9" />
      </button>
    </div>
    <div class="results"></div>
  </form>
</template>

<script>
import IconClose from '@/components/icons/Close'
import IconSearch from '@/components/icons/Search'

export default {
  components: { IconClose, IconSearch },

  data () {
    return {
      open: false,
      input: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .form {
    position: relative;
  }

  .box {
    @include Flex;
    border: 1px solid $GREY;
    border-radius: 4px;
    padding: grid(1) grid(3);

    .»open & {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .input {
    border: none;
    font-size: 15px;
    padding: grid(2);

    &:focus { outline: none; }
  }

  .close {
    @include Hide;
    @include Flex ($justify: center);
    background: $GREY;
    border: none;
    border-radius: 100%;
    height: grid(6);
    width: grid(6);

    .»open & {
      @include Show;
    }
  }

  .results {
    background: $WHITE;
    border: 1px solid $GREY;
    border-top: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    display: none;
    overflow: auto;
    position: absolute;
    height: 300px;
    top: 100%;
    width: 100%;

    .»open & {
      display: block;
    }
  }
</style>
