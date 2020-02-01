<template>
  <div class="input">
    <label class="label" v-if="label">{{ label }}</label>
    <select
      @change="event => $emit('change', event.target.value)"
      class="select"
      required
      :value="value"
      >
       <option value="" disabled selected hidden>{{ placeholder }}</option>
       <slot></slot>
    </select>
  </div>
</template>

<script>
export default {
  props: [ 'label', 'placeholder', 'value' ]
}
</script>

<style lang="scss" scoped>
  .label {
    @include Label;
    margin-bottom: 8px;
  }

  .select {
    @include Select;
    width: 100%;
  }
</style>
