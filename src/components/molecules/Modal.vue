<template>
  <aside class="modal" v-if="open">
    <div class="boxed">
      <div class="header">
        <h4 class="heading">{{ heading }}</h4>
        <button class="close" @click.prevent="$emit('close')">
          <IconClose width="10" height="10" />
        </button>
      </div>
      <slot>
      </slot>
    </div>
  </aside>
</template>

<script>
import IconClose from '@/components/icons/Close'

export default {
  props: ['heading', 'open'],
  components: { IconClose }
}
</script>

<style lang="scss" scoped>
  .modal {
    @include Flex ($justify: center);
    background: rgba($BLACK, .25);
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9;

    &.»mobile-bottom {
      @include mq ($until: small) {
        align-items: flex-end;
      }
    }
  }

  .boxed {
    @include Shadow;
    background: $WHITE;
    border-radius: grid(2);
    min-width: 320px;
    padding: grid(6);

    .»mobile-bottom & {
      @include mq ($until: small) {
        border-radius: 0;
        width: 100%;
      }
    }
  }

  .header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: grid(5);
  }

  .heading {
    font-size: 20px;
    font-weight: 900;
  }

  .close {
    @include ButtonClose;
  }
</style>
