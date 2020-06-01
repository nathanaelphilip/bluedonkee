<template>
  <div class="avatars">
    <template v-for="(entity, index) in entities">
      <img
        :src="entity.fields.Avatar[0].url"
        :key="index"
        :alt="entity.fields.Name"
        />
      <div :key="`box-${index}`"></div>
    </template>
  </div>
</template>

<script>
export default {
  props: ['entities']
}
</script>

<style lang="scss" scoped>
  .avatars {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    justify-content: center;
    overflow: hidden;
    padding: grid(6) 0;
  }

  img {
    border-radius: 100%;
    box-shadow: 6px 6px 20px rgba($BLACK, .12);
    display: block;
    height: auto;
    margin: 0 auto;
    width: 90px;
  }
</style>
