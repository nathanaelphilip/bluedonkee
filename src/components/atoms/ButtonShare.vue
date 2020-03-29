<template>
  <button @click.prevent="$emit('clicked')" class="button-share">
    <IconShare width="19" height="20" class="icon" />
  </button>
</template>

<script>
import IconShare from '@/components/icons/Share'

export default {
  components: { IconShare }
}
</script>

<style lang="scss" scoped>
  .button-share {
    @include ButtonSecondary;
    align-items: center;
    display: flex;
    justify-content: center;
    height: 40px;
    padding: 0;
    width: 40px;
  }

  .icon {
    fill: $BLACK;
  }
</style>
