<template lang="html">
  <div class="tags">
    <div :class="layout">
      <CheckTag
        v-for="(tag, index) in options"
        :key="`tag-${index}`"
        :label="tag.fields[keyLabel]"
        :value="tag.fields[keyValue]"
      />
    </div>
    <div class="actions">
      <ButtonSecondary @click.native.prevent="$emit('cancel')">Cancel</ButtonSecondary>
      <ButtonPrimary
        @click.native.prevent="$emit('apply')"
        >
        Apply
      </ButtonPrimary>
    </div>
  </div>
</template>

<script>
import ButtonPrimary from '@/components/atoms/ButtonPrimary'
import ButtonSecondary from '@/components/atoms/ButtonSecondary'
import CheckTag from '@/components/forms/CheckTag'

export default {
  props: ['options', 'keyLabel', 'keyValue', 'layout'],
  components: { ButtonPrimary, ButtonSecondary, CheckTag }
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
