<template lang="html">
  <div class="tags">
    <div :class="layout">
      <CheckTag
        v-for="(tag, index) in options"
        :key="`tag-${index}`"
        :label="get(tag, keyLabel)"
        :value="get(tag, keyValue)"
        :checked="selected.includes(get(tag, keyValue))"
        @toggle="value => toggle(value)"
      />
    </div>
    <div class="actions">
      <ButtonSecondary @click.native.prevent="$emit('cancel')">Cancel</ButtonSecondary>
      <ButtonPrimary
        @click.native.prevent="$emit('apply', selected)"
        >
        Apply
      </ButtonPrimary>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash'

import ButtonPrimary from '@/components/atoms/ButtonPrimary'
import ButtonSecondary from '@/components/atoms/ButtonSecondary'
import CheckTag from '@/components/forms/CheckTag'

export default {
  props: ['accepted', 'options', 'keyLabel', 'keyValue', 'layout'],
  components: { ButtonPrimary, ButtonSecondary, CheckTag },

  data () {
    return {
      selected: []
    }
  },

  mounted () {
    this.selected = JSON.parse(JSON.stringify(this.accepted))
  },

  methods: {
    get,

    toggle (value) {
      const index = this.selected.findIndex(item => {
        return item === value
      })

      if (index !== -1) {
        this.$delete(this.selected, index)
      }

      if (index === -1) {
        this.selected.push(value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .tags {

  }

  .flex {
    @include Flex($align: flex-start, $justify: flex-start);

    > * {
      margin-bottom: grid(3);
      &:not(:last-child) {margin-right: grid(3)}
    }
  }

  .grid {
    display: grid;
    grid-gap: grid(3);
    grid-template-columns: repeat(7, 1fr);
  }

  .grid-column {
    display: grid;
    grid-row-gap: grid(3);
    grid-template-columns: 1fr;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: grid(6);
    width: 100%;

    > *:not(:last-child) {
      margin-right: grid(3);
    }
  }
</style>
