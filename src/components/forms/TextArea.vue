<template>
  <div class="input">
    <label class="label" v-if="label">{{ label }}</label>
    <textarea :placeholder="placeholder" class="text"></textarea>
  </div>
</template>

<script>
export default {
  props: [ 'label', 'placeholder' ]
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
  }
</style>
