<template>
  <header class="intro">
    <div class="boxes">
      <div class="box">
        <ButtonBack :to="back" v-if="back" />
        <h1 class="heading">{{ heading }}</h1>
      </div>
      <div class="actions">
        <slot></slot>
      </div>
    </div>
    <Filters v-if="filter && $mq !== 'small' && $mq !== 'xsmall'" />
    <FiltersToggle v-if="filter && ($mq !== 'small' || $mq !== 'xsmall')" />
  </header>
</template>

<script>
import ButtonBack from '@/components/atoms/ButtonBack'
import Filters from '@/components/forms/Filters'
import FiltersToggle from '@/components/forms/FiltersToggle'

export default {
  props: ['back', 'heading', 'filter'],
  components: { ButtonBack, Filters, FiltersToggle }
}
</script>

<style lang="scss" scoped>
  .intro {
    background: $WHITE;
    border-bottom: 1px solid $GREY;
    position: sticky;
    top: 0;
    z-index: 8;

    @include mq($until: small) {
      z-index: 12;
    }

    @include mq($until: xsmall) {
      padding: grid(4);
    }
  }

  .boxes {
    @include Flex;
    padding: grid(6) grid(8);

    @include mq($until: xsmall) {
      padding: grid(0) 0;
    }
  }

  .heading {
    font-size: 22px;
    font-weight: 900;
    line-height: 1.25;
    max-width: 330px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @include mq($until: xsmall) {
      font-size: 18px;
      max-width: 160px;
    }
  }

  .button-back {
    margin-right: 16px;
  }

  .box {
    align-items: center;
    display: flex;
    justify-content: flex-start;
  }

  .actions {
    display: flex;
    justify-content: flex-end;

    &::v-deep > *:first-child:not(:last-child) {
      margin-right: 12px;
    }
  }
</style>
