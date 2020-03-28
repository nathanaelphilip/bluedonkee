<template lang="html">
  <section class="filters-toggle">
    <header class="header">
      <div class="heading">Filter Jobs</div>
      <button @click="$store.dispatch('filters/clear')" class="clear">
        Clear <div class="reset"><IconClose width="9" height="9" /></div>
      </button>
    </header>
    <div class="boxed">
      <Toggles>
        <TogglesBox :visible="visible" @toggle="_uid => visible = _uid" heading="Location">
          <div class="tags grid">
            <CheckTag
              v-for="(tag, index) in $store.getters['states/sortAlphabetically']"
              :key="`tag-state-${index}`"
              :label="tag.fields.Abbreviation"
              :value="tag.id"
              :checked="selected.locations.includes(tag.id)"
              @toggle="value => toggle('locations', value)"
            />
          </div>
        </TogglesBox>
        <TogglesBox :visible="visible" @toggle="_uid => visible = _uid" heading="Category">
          <div class="tags flex">
            <CheckTag
              v-for="(tag, index) in $store.getters['workCategories/sortAlphabetically']"
              :key="`tag-cat-${index}`"
              :label="tag.fields.Name"
              :value="tag.fields.Name"
              :checked="selected.categories.includes(tag.fields.Name)"
              @toggle="value => toggle('categories', value)"
            />
          </div>
        </TogglesBox>
        <TogglesBox :visible="visible" @toggle="_uid => visible = _uid" heading="Work Type">
          <div class="tags flex">
            <CheckTag
              v-for="(tag, index) in $store.getters['workTypes/sortAlphabetically']"
              :key="`tag-type-${index}`"
              :label="tag.fields.Name"
              :value="tag.fields.Name"
              :checked="selected.types.includes(tag.fields.Name)"
              @toggle="value => toggle('types', value)"
            />
          </div>
        </TogglesBox>
      </Toggles>
    </div>
    <div class="actions">
      <ButtonPrimary @click.native.prevent="apply" class="apply full large">Apply Filters</ButtonPrimary>
    </div>
  </section>
</template>

<script>
import ButtonPrimary from '@/components/atoms/ButtonPrimary'
import CheckTag from '@/components/forms/CheckTag'
import IconClose from '@/components/icons/Close'
import Toggles from '@/components/molecules/Toggles'
import TogglesBox from '@/components/atoms/TogglesBox'

export default {
  components: { ButtonPrimary, CheckTag, IconClose, Toggles, TogglesBox },

  data () {
    return {
      selected: {
        categories: [],
        locations: [],
        types: []
      },

      visible: false
    }
  },

  methods: {
    async apply () {
      const entries = Object.entries(this.selected)

      for (const [key, items] of entries) {
        await this.$store.dispatch('filters/accept', { key, items })
      }

      this.$emit('close')
    },

    toggle (id, value) {
      const index = this.selected[id].findIndex(item => {
        return item === value
      })

      if (index !== -1) {
        this.$delete(this.selected[id], index)
      }

      if (index === -1) {
        this.selected[id].push(value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .filters-toggle {
    @include Flex($align: stretch, $direction: column, $justify: flex-start, $wrap: nowrap);
    background: $WHITE;
    position: absolute;
    height: calc(100vh - 75px);
    left: 0;
    top: calc(100% + 1px);
    width: 100%;
    z-index: 12;
  }

  .header {
    @include Flex;
    border-bottom: 1px solid $GREY;
    padding: grid(6) grid(4);
  }

  .boxed {
    overflow: auto;
    flex: 1;
  }

  .apply {
    border-radius: 0;
  }

  .reset {
    @include ButtonClose;
    height: 20px;
    width: 20px;
  }

  .clear {
    @include ButtonStripped;
    @include Flex($justify: flex-end);
  }

  .tags {
    width: 100%;

    &.grid {
      display: grid;
      grid-gap: grid(3);
      grid-template-columns: repeat(7, 1fr);
    }

    &.flex {
      @include Flex($align: flex-start, $justify: flex-start);

      > * {
        margin-bottom: grid(3);
        &:not(:last-child) {margin-right: grid(3)}
      }
    }
  }
</style>