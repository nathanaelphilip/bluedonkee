<template>
  <label :for="`checkbox-${name}-${value}`" class="checkbox" :class="{checked}">
    <input :id="`checkbox-${name}-${value}`" @change="$emit('toggle', value)" type="checkbox" :name="name" :value="value" :checked="checked">
    <span>{{ label }}</span>
  </label>
</template>

<script>
export default {
  props: ['name', 'label', 'value', 'checked']
}
</script>

<style lang="scss" scoped>
  .checkbox {
    @include Tag;
    text-align: center;
  }

  input {
    position: absolute;
    left: -9999999px;
    height: 0;
    width: 0;
  }
</style>
