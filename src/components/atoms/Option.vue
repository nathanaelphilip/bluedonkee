<template>
  <div class="option">
    <input
      class="radio"
      :id="`option-${value}`"
      :value="value"
      @input="$emit('change', value)"
      :name="`${name}[]`"
      type="radio"
      >
    <label
      class="label"
      :class="{selected}"
      :for="`option-${value}`">
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  props: ['value', 'name', 'selected']
}
</script>

<style lang="scss" scoped>
  .option {
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }

  .radio {
    position: absolute;
    left: -99999px;
    height: 0;
    opacity: 0;
    width: 0;
  }

  .label {
    background: $BLUELIGHT;
    border: 1px solid $BLUELIGHT;
    display: block;
    font-size: 15px;
    padding: 15px 20px;

    &:hover, &.selected {
      border-color: $BLUE;
      cursor: pointer;
    }
  }
</style>
