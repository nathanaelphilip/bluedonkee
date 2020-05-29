<template>
  <div class="colophon">&copy; WorkBlue {{ new Date().getFullYear() }}. Paid for by Work Blue Organization.<br>Not authorized by any candidate or candidate’s committee.</div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .colophon {
    background: $BLUELIGHT;
    border: 1px solid $GREY3;
    border-radius: grid(3);
    color: $BLUEGREY;
    font-size: 14px;
    line-height: 1.57;
    padding: grid(3) grid(10);
    text-align: center;

    @include mq ($until: xsmall) {
      font-size: 12px;
      padding-left: grid(3);
      padding-right: grid(3);
    }

    @include mq ($until: xxsmall) {
      font-size: 11px;
      padding-left: grid(3);
      padding-right: grid(3);
    }
  }
</style>
