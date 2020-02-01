<template>
  <form class="options">
    <div class="list">
      <Option
        v-for="option in options"
        :key="option.id"
        :value="option.id"
        :selected="selected === option.id"
        :name="_uid"
        @change="value => $emit('selected', value)"
       >
       {{ option.label }}
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
import ButtonPrimary from '@/components/atoms/ButtonPrimary'
import ButtonSecondary from '@/components/atoms/ButtonSecondary'
import Option from '@/components/atoms/Option'
import Processing from '@/components/forms/Processing'

export default {
  props: [ 'options', 'status', 'selected' ],
  components: { ButtonPrimary, ButtonSecondary, Option, Processing }
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
