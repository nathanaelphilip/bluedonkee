<template>
  <input type="text" class="input">
</template>

<style lang="scss" scoped>
  .input {
    appearance: none;
    background: $WHITE;
    border: 1px solid $GREY;
    border-radius: 4px;
    color: $BLACK;
    font-family: $INTER;
    font-size: 15px;
    line-height: 1;
    padding: 11.5px;

    &:placeholder { color: $GREY; }
  }
</style>
