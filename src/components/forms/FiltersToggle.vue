<template lang="html">
  <section class="filters-toggle">
    <header class="header">
      <button @click.prevent="clear" class="clear">
        Clear All
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
import Toggles from '@/components/molecules/Toggles'
import TogglesBox from '@/components/atoms/TogglesBox'

export default {
  components: { ButtonPrimary, CheckTag, Toggles, TogglesBox },

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

  mounted () {
    this.$store.dispatch('app/modalOpen', true)
    this.selected.categories = JSON.parse(JSON.stringify(this.$store.getters['filters/accepted']('categories')))
    this.selected.locations = JSON.parse(JSON.stringify(this.$store.getters['filters/accepted']('locations')))
    this.selected.types = JSON.parse(JSON.stringify(this.$store.getters['filters/accepted']('types')))
  },

  destroyed () {
    this.$store.dispatch('app/modalOpen', false)
  },

  methods: {
    clear () {
      this.$store.dispatch('filters/clear')
      this.selected = {
        categories: [],
        locations: [],
        types: []
      }
    },

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
    height: calc(100vh - max(110px, constant(safe-area-inset-bottom)));
    height: calc(100vh - max(110px, env(safe-area-inset-bottom)));
    left: 0;
    top: 100%;
    width: 100%;
    z-index: 12;
  }

  .header {
    padding: grid(5) grid(4) 0 grid(4);
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
    margin-left: grid(3);
    height: 24px;
    width: 24px;
  }

  .clear {
    @include Tag;
    border: 1px solid $GREY;
    padding: grid(3) 0;
    text-align: center;
    width: 100%;
  }

  .tags {
    width: 100%;

    &.grid {
      display: grid;
      grid-gap: grid(3);
      grid-template-columns: repeat(7, 1fr);

      @include mq ($until: small) {
        grid-template-columns: repeat(6, 1fr);
      }

      @include mq ($until: xsmall) {
        grid-template-columns: repeat(5, 1fr);
      }
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
