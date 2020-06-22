<template>
  <form @submit.prevent class="form">
    <div class="box">
      <IconSearch width="16" height="16" />
      <input v-model="input" type="text" class="input">
      <button v-if="input" class="close">
        <IconClose height="9" width="9" />
      </button>
    </div>
  </form>
</template>

<script>
import IconClose from '@/components/icons/Close'
import IconSearch from '@/components/icons/Search'

export default {
  components: { IconClose, IconSearch },

  data () {
    return {
      input: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .box {
    @include Flex;
    border: 1px solid $GREY;
    border-radius: 4px;
    padding: grid(1) grid(3);
  }

  .input {
    border: none;
    font-size: 15px;
    padding: grid(2);

    &:focus { outline: none; }
  }

  .close {
    @include Flex ($justify: center);
    background: $GREY;
    border: none;
    border-radius: 100%;
    height: grid(6);
    width: grid(6);
  }
</style>
