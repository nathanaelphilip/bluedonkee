<template>
  <label @click.prevent="$emit('toggled')" class="toggle">
    <input :checked="checked" type="checkbox" />
    <div class="dot"></div>
  </label>
</template>

<script>
export default {
  props: ['checked']
}
</script>

<style lang="scss" scoped>
  input {
    position: absolute;
    left: -99999px;
    height: 0;
    width: 0;
  }

  .toggle {
    background: $WHITE;
    border: 1px solid $GREY;
    border-radius: grid(4);
    display: block;
    position: relative;
    padding: grid(1);
    width: grid(12);

    &:hover {
      cursor: pointer;
    }
  }

  .dot {
    $d: grid(4);
    background: $BLUELIGHT;
    border-radius: 100%;
    height: $d;
    transition: background .2s ease, transform .35s ease;
    width: $d;

    .toggle:hover input:not(:checked) + & {
      background: $GREY;
    }

    input:checked + & {
      background: $BLUE2;
      transform: translateX(22px);
    }
  }
</style>
