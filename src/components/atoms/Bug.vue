<template>
  <div class="bug"><slot></slot></div>
</template>

<style lang="scss" scoped>
  .bug {
    background: $BLUE;
    border-radius: 12px;
    color: $WHITE;
    font-size: 10px;
    font-weight: 800;
    padding: 5px 8px;
    text-transform: uppercase;
  }
</style>
