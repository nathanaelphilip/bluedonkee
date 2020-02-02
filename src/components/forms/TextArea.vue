<template>
  <div class="input">
    <label class="label" v-if="label">{{ label }}</label>
    <textarea
      @input="event => $emit('input', event.target.value)"
      class="text"
      :placeholder="placeholder"
      :required="required"
      :value="value"
    >
    </textarea>
  </div>
</template>

<script>
export default {
  props: ['label', 'placeholder', 'required', 'value']
}
</script>

<style lang="scss" scoped>
  .label {
    @include Label;
    margin-bottom: 8px;
  }

  .text {
    @include Input;
    min-height: 150px;
    resize: none;
    width: 100%;
  }
</style>
