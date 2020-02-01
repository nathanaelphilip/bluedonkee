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
    background: rgba($WHITE, .25);
    align-items: center;
    display: flex;
    height: 100%;
    left: 0;
    justify-content: center;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9;
  }

  .boxed {
    @include Shadow;
    background: $WHITE;
    min-width: 320px;
    padding: 20px;
  }

  .header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .heading {
    font-size: 20px;
    font-weight: 900;
  }

  .close {
    @include ButtonClose;
  }
</style>
