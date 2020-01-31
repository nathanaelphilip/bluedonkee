<template>
  <aside class="banner">
    <div class="grid">
      <div class="info">
        <h3 class="heading">{{ heading }}</h3>
        <div class="content">{{ content }}</div>
        <div class="actions">
          <LinkPrimary :to="link">Learn More</LinkPrimary>
          <ButtonPrimary
            @click.native.prevent="$emit('close')"
            :simple="true">
            Close
          </ButtonPrimary>
        </div>
      </div>
      <div class="images">
          <Avatar
            v-for="item in shuffled"
            :key="item.id"
            :src="item.fields.Avatar[0].url"
          />
      </div>
    </div>
  </aside>
</template>

<script>
import { shuffle } from 'lodash'

import Avatar from '@/components/atoms/Avatar'
import ButtonPrimary from '@/components/atoms/ButtonPrimary'
import LinkPrimary from '@/components/atoms/LinkPrimary'

export default {
  props: ['heading', 'cookie', 'content', 'items', 'link'],
  components: { Avatar, ButtonPrimary, LinkPrimary },

  computed: {
    shuffled () {
      return shuffle(this.items).splice(0, 9)
    }
  }
}
</script>

<style lang="scss" scoped>
  .banner {
    background: $BLUEDARK;
    border-radius: 16px;
    color: $WHITE;
    overflow: hidden;
    padding: 30px;
  }

  .grid {
    align-items: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 16px;
  }

  .heading {
    font-size: 20px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  .content {
    font-size: 15px;
    line-height: 1.4;
    margin-bottom: 10px;
  }

  .images {
    align-self: stretch;
    display: grid;
    grid-template-columns: repeat(10, 10%);
    grid-template-rows: repeat(10, 10%);
    max-height: 125px;
    min-width: 0;
    min-height: 0;
  }

  .avatar {
    overflow: hidden;
    min-width: 0;

    &:nth-child(1) {
      grid-column-start: 10;
      grid-row-start: 1;
      transform: translateX(25%);
      height: 72px;
      width: 72px;
    }

    &:nth-child(2) {
      grid-column-start: 8;
      grid-row-start: 0;
      transform: translateY(-100%);
      height: 48px;
      width: 48px;
    }

    &:nth-child(3) {
      grid-column-start: 8;
      grid-row-start: 6;
      height: 45px;
      width: 45px;
    }

    &:nth-child(4) {
      grid-column-start: 3;
      grid-row-start: 1;
      transform: translateY(-60%);
      height: 48px;
      width: 48px;
    }

    &:nth-child(5) {
      grid-column-start: 2;
      grid-row-start: 8;
      transform: translateY(80%);
      height: 72px;
      width: 72px;
    }

    &:nth-child(6) {
      grid-column-start: 6;
      grid-row-start: 8;
      transform: translateY(50%);
      height: 72px;
      width: 72px;
    }

    &:nth-child(7) {
      grid-column-start: 4;
      grid-row-start: 7;
      height: 45px;
      width: 45px;
    }

    &:nth-child(8) {
      grid-column-start: 9;
      grid-row-start: 9;
      transform: translateX(50%);
      height: 45px;
      width: 45px;
    }

    &:nth-child(9) {
      grid-column-start: 6;
      grid-row-start: 1;
      height: 60px;
      width: 60px;
    }
  }
</style>
