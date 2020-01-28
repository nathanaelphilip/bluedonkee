<template>
  <div class="input">
    <label class="label" v-if="label">{{ label }}</label>
    <input
      @input="event => $emit('input', event.target.value)"
      :required="required"
      :placeholder="placeholder"
      :type="type"
      :value="value"
      class="text"
     >
  </div>
</template>

<script>
export default {
  props: [ 'label', 'placeholder', 'required', 'value', 'type' ]
}
</script>

<style lang="scss" scoped>
  .label {
    @include Label;
    margin-bottom: 8px;
  }

  .text {
    @include Input;
  }
</style>
