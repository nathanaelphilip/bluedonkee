<template>
  <form class="options">
    <div class="list">
      <Option
        v-for="option in options"
        :key="get(option, keyValue)"
        :value="get(option, keyValue)"
        :selected="selected === get(option, keyValue)"
        :name="_uid"
        @change="value => $emit('selected', value)"
       >
       {{ get(option, keyLabel) }}
     </Option>
     <slot></slot>
    </div>
    <div class="actions">
      <ButtonSecondary @click.native.prevent="$emit('close')">Cancel</ButtonSecondary>
      <ButtonPrimary
        :disabled="!selected"
        @click.native.prevent="$emit('process', selected)"
        >
          <Processing :processing="status === 'processing'">Submit</Processing>
      </ButtonPrimary>
    </div>
  </form>
</template>

<script>
import { get } from 'lodash'

import ButtonPrimary from '@/components/atoms/ButtonPrimary'
import ButtonSecondary from '@/components/atoms/ButtonSecondary'
import Option from '@/components/forms/Option'
import Processing from '@/components/forms/Processing'

export default {
  props: ['options', 'status', 'selected', 'keyLabel', 'keyValue'],
  components: { ButtonPrimary, ButtonSecondary, Option, Processing },

  created () {
    if (this.accepted) {
      this.selected = JSON.parse(JSON.stringify(this.accepted))
    }
  },

  methods: {
    get
  }
}
</script>

<style lang="scss" scoped>
  .list {
    margin-bottom: 20px;
  }

  .actions {
    display: flex;
    justify-content: flex-end;

    > *:not(:last-child) {
      margin-right: 12px;
    }
  }
</style>
