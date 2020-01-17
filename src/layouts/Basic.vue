<template>
  <div class="grid">
    <div class="one">
      <button>Close</button>
    </div>
    <div class="two">
      <slot />
    </div>
    <div class="three">
      &nbsp;
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout-basic'
}
</script>
