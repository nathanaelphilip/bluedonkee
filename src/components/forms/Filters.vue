<template>
  <div class="filters">
    <div class="actions">
      <div class="group">
        <ButtonSecondary
          @click.native.prevent="modal = 'location'"
          :class="{'bugged': $store.getters['filters/accepted']('location').length}"
        >
          Location
          <span v-if="$store.getters['filters/accepted']('location').length" class="bug">
            {{ $store.getters['filters/accepted']('location').length }}
          </span>
        </ButtonSecondary>
        <ButtonSecondary
          @click.native.prevent="modal = 'category'"
          :class="{'bugged': $store.getters['filters/accepted']('categories').length}"
         >
          Category
          <span v-if="$store.getters['filters/accepted']('categories').length" class="bug">
            {{ $store.getters['filters/accepted']('categories').length }}
          </span>
        </ButtonSecondary>
        <ButtonSecondary @click.native.prevent="modal = 'type'">Work Type</ButtonSecondary>
      </div>
      <button @click="$store.dispatch('filters/clear')" class="clear">
        Clear <div class="reset"><IconClose width="10" height="10" /></div>
      </button>
    </div>
    <portal to="modal" multiple>
      <Modal @close="modal = false" :open="modal === 'location'" heading="Location">
        <div class="modalBox">
          <CheckTags
            :accepted="$store.getters['filters/accepted']('location')"
            :options="$store.state.states.repository"
            keyLabel="Abbreviation"
            keyValue="Slug"
            @cancel="modal = false"
            @apply="items => apply('categories', items)"
            layout="grid"
          />
        </div>
      </Modal>
      <Modal @close="modal = false" :open="modal === 'category'" heading="Category">
        <div class="modalBox">
          <CheckTags
            :accepted="$store.getters['filters/accepted']('categories')"
            :options="$store.getters['workCategories/sortAlphabetically']"
            keyLabel="Name"
            keyValue="Name"
            @cancel="modal = false"
            @apply="items => apply('categories', items)"
            layout="flex"
          />
        </div>
      </Modal>
      <Modal @close="modal = false" :open="modal === 'type'" heading="Work Type">
        <OptionsList
          :options="$store.getters['workTypes/sortAlphabetically']"
          keyLabel="fields.Name"
          keyValue="fields.Slug"
          @close="modal = false"
        />
      </Modal>
    </portal>
  </div>
</template>

<script>
import ButtonSecondary from '@/components/atoms/ButtonSecondary'
import CheckTags from '@/components/forms/CheckTags'
import IconClose from '@/components/icons/Close'
import Modal from '@/components/molecules/Modal'
import OptionsList from '@/components/forms/OptionsList'

export default {
  components: { ButtonSecondary, CheckTags, IconClose, Modal, OptionsList },

  data () {
    return {
      modal: false
    }
  },

  methods: {
    async apply (key, items) {
      await this.$store.dispatch('filters/accept', { key, items })
      this.modal = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .filters {
    border-top: 1px solid $GREY;
    padding: grid(4) grid(8);
  }

  .actions {
    @include Flex;
  }

  .clear {
    @include ButtonStripped;
    @include Flex($justify: flex-end);
  }

  .reset {
    @include ButtonClose;
  }

  .group {
    @include Flex;

    > *:not(:last-child) {
      margin-right: grid(3);
    }
  }

  .bugged {
    padding-bottom: 4px;
    padding-top: 7px;
  }

  .bug {
    $d: grid(6);
    @include Flex($display: inline-flex, $justify: center);
    background: $BLUE;
    border-radius: 100%;
    color: $WHITE;
    font-size: 12px;
    font-weight: 800;
    margin-left: grid(1);
    position: relative;
    top: -1px;
    height: $d;
    width: $d;
  }

  .modalBox {
    width: 400px;
  }
</style>
