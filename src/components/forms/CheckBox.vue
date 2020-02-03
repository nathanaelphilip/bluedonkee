<template lang="html">
  <div class="input">
    <input
      :checked="checked"
      :id="id"
      :value="id"
      @input="event => $emit('change', event.target.value)"
      type="checkbox"
      class="hidden"
    />
    <div class="checkbox" @click.prevent="$emit('change', id)">
      <IconCheck class="icon" width="10" height="8" />
    </div>
    <label class="label" :for="id">{{ label }}</label>
  </div>
</template>

<script>
import IconCheck from '@/components/icons/Check'

export default {
  props: ['checked', 'id', 'label', 'value'],
  components: { IconCheck }
}
</script>

<style lang="scss" scoped>
  .input {
    align-items: center;
    display: flex;
    justify-content: flex-start;
    padding: 5px 6px;

    &:hover {
      .checkbox {border-color:  $BLUE;}
    }
  }

  .checkbox {
    $d: 22px;
    align-items: center;
    background: $WHITE;
    border: 1px solid $GREY;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    margin-right: 12px;
    height: $d;
    width: $d;
  }

  .label {
    font-size: 15px;
    flex: 1;
  }

  .icon {opacity: 0}

  .hidden {
    height: 0;
    opacity: 0;
    position: absolute;
    left: -9999px;
    width: 0;

    &:checked + .checkbox {
    }

    &:checked + .checkbox > .icon {
      opacity: 1;
      fill: $BLUE;
    }
  }
</style>
