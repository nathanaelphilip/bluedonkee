<template lang="html">
  <section
    class="filters-toggle"
    :style="{'height': `${$store.state.app.innerHeight}px`}"
    >
    <header class="header">
      <button @click.prevent="clear" class="clear">
        Clear All
      </button>
      <h2 class="heading">Filter Results</h2>
    </header>
    <div class="boxed">
      <Toggles>
        <TogglesBox :visible="visible" @toggle="_uid => visible = _uid" heading="Location">
          <div class="remote">
              Include remote positions <Toggle :checked="remote" @toggled="remote = !remote" />
            </div>
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
      <ButtonPrimary @click.native.prevent="apply" class="apply full">Apply Filters</ButtonPrimary>
    </div>
  </section>
</template>

<script>
import ButtonPrimary from '@/components/atoms/ButtonPrimary'
import CheckTag from '@/components/forms/CheckTag'
import Toggles from '@/components/molecules/Toggles'
import TogglesBox from '@/components/atoms/TogglesBox'
import Toggle from '@/components/forms/Toggle'

export default {
  components: { ButtonPrimary, CheckTag, Toggle, Toggles, TogglesBox },

  data () {
    return {
      selected: {
        categories: [],
        locations: [],
        types: []
      },

      remote: false,
      visible: false
    }
  },

  mounted () {
    this.$store.dispatch('app/modalOpen', true)
    this.selected.categories = JSON.parse(JSON.stringify(this.$store.getters['filters/accepted']('categories')))
    this.selected.locations = JSON.parse(JSON.stringify(this.$store.getters['filters/accepted']('locations')))
    this.selected.types = JSON.parse(JSON.stringify(this.$store.getters['filters/accepted']('types')))
    this.remote = this.$store.getters['filters/accepted']('remote')
  },

  destroyed () {
    this.$store.dispatch('app/modalOpen', false)
  },

  methods: {
    clear () {
      this.$store.dispatch('filters/clear')
      this.remote = false
      this.selected = {
        categories: [],
        locations: [],
        types: []
      }
    },

    async apply () {
      const entries = Object.entries(this.selected)

      await this.$store.dispatch('filters/accept', { key: 'remote', value: this.remote })

      for (const [key, value] of entries) {
        await this.$store.dispatch('filters/accept', { key, value })
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

  .heading {
    font-size: 19px;
    font-weight: 900;
    margin: grid(6) 0 grid(3) 0;
  }

  .boxed {
    overflow: auto;
    flex: 1;
  }

  .remote {
    @include Flex;
    background: $BLUELIGHT;
    border-radius: grid(1);
    font-size: 15px;
    font-weight: 500;
    margin-bottom: grid(6);
    padding: grid(3) grid(5);
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

  .actions {
    border-top: 1px solid $GREY;
    @include mq ($until: xsmall) {
      padding: grid(4);
    }
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
