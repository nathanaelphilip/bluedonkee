<template>
  <div class="input">
    <label class="label" v-if="label">{{ label }}</label>
    <select class="select" required>
       <option disabled selected hidden>{{ placeholder }}</option>
       <slot></slot>
    </select>
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

  .select {
    @include Select;
  }
</style>
