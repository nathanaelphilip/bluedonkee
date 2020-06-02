<template>
  <div class="filters">
    <div class="actions">
      <button
        class="button"
        @click.prevent="modal = 'locations'"
        :class="{'bugged': $store.getters['filters/accepted']('locations').length}"
      >
        Location
        <IconPlus width="10" height="10" class="icon-plus" v-if="!$store.getters['filters/accepted']('locations').length" />
        <Count v-if="$store.getters['filters/accepted']('locations').length">
          {{ $store.getters['filters/accepted']('locations').length }}
        </Count>
      </button>
      <button
        class="button"
        @click.prevent="modal = 'category'"
        :class="{'bugged': $store.getters['filters/accepted']('categories').length}"
       >
        Category
        <IconPlus width="10" height="10" class="icon-plus" v-if="!$store.getters['filters/accepted']('categories').length" />
        <Count v-if="$store.getters['filters/accepted']('categories').length" class="bug">
          {{ $store.getters['filters/accepted']('categories').length }}
        </Count>
      </button>
      <button
        class="button"
        @click.prevent="modal = 'types'"
        :class="{'bugged': $store.getters['filters/accepted']('types').length}"
        >
        Work Type
        <IconPlus width="10" height="10" class="icon-plus" v-if="!$store.getters['filters/accepted']('types').length" />
        <Count v-if="$store.getters['filters/accepted']('types').length" class="bug">
          {{ $store.getters['filters/accepted']('types').length }}
        </Count>
      </button>
      <button @click.prevent="$store.dispatch('filters/clear')" class="clear">
        Clear Filters
      </button>
    </div>
    <portal to="modal" multiple>
      <Modal @close="modal = false" :open="modal === 'locations'" heading="Location">
        <div class="modalBox">
          <div class="remote">
            Include remote positions <Toggle :checked="remote" @toggled="remote = !remote" />
          </div>
          <CheckTags
            :accepted="$store.getters['filters/accepted']('locations')"
            :options="$store.getters['states/sortAlphabetically']"
            keyLabel="fields.Abbreviation"
            keyValue="id"
            @cancel="modal = false"
            @apply="items => apply('locations', items)"
            layout="grid"
          />
        </div>
      </Modal>
      <Modal @close="modal = false" :open="modal === 'category'" heading="Category">
        <div class="modalBox »large">
          <CheckTags
            :accepted="$store.getters['filters/accepted']('categories')"
            :options="$store.getters['workCategories/sortAlphabetically']"
            keyLabel="fields.Name"
            keyValue="fields.Name"
            @cancel="modal = false"
            @apply="items => apply('categories', items)"
            layout="flex"
          />
        </div>
      </Modal>
      <Modal @close="modal = false" :open="modal === 'types'" heading="Work Type">
        <CheckTags
          :accepted="$store.getters['filters/accepted']('types')"
          :options="$store.getters['workTypes/sortAlphabetically']"
          keyLabel="fields.Name"
          keyValue="fields.Name"
          @cancel="modal = false"
          @apply="items => apply('types', items)"
          layout="grid-column"
        />
      </Modal>
    </portal>
  </div>
</template>

<script>
import Count from '@/components/atoms/Count'
import CheckTags from '@/components/forms/CheckTags'
import IconPlus from '@/components/icons/Plus'
import Modal from '@/components/molecules/Modal'
import Toggle from '@/components/forms/Toggle'

export default {
  components: { CheckTags, Count, IconPlus, Modal, Toggle },

  data () {
    return {
      modal: false,
      remote: false
    }
  },

  methods: {
    async apply (key, value) {
      await this.$store.dispatch('filters/accept', { key: 'remote', value: this.remote })
      await this.$store.dispatch('filters/accept', { key, value })
      this.modal = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .filters {
    background: $WHITE;
    padding: grid(2) 0;
    margin-bottom: grid(18);

    #sticky-filters.»stuck & {
      border-bottom: 1px solid $GREY;
    }
  }

  .actions {
    @include Flex ($justify: center);
  }

  .clear {
    @include ButtonSimple;
    color: $BLUEGREY;
    margin: 0 grid(3);

    &:hover { background: none; }
  }

  .reset {
    @include ButtonClose;
    margin-left: grid(2);
  }

  .button {
    @include ButtonSimple;
    margin: 0 grid(3);

    .bug {
      position: relative;
      top: -1px;
    }
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

  .bugged {
    padding-bottom: 5px;
    padding-top: 6px;
  }

  .icon-plus {
    fill: $BLACK;
    margin-left: grid(1);
    position: relative;
    top: -1px
  }

  .modalBox {
    width: 400px;

    &.»large {
      width: 600px;
    }
  }
</style>
