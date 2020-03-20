<template>
  <div class="filters">
    <div class="actions">
      <div class="group">
        <ButtonSecondary @click.native.prevent="modal = 'location'">Location</ButtonSecondary>
        <ButtonSecondary @click.native.prevent="modal = 'category'">Category <span class="bug" v-if="selected.categories.length">{{ selected.categories.length }}</span></ButtonSecondary>
        <ButtonSecondary @click.native.prevent="modal = 'type'">Work Type</ButtonSecondary>
      </div>
      <button class="clear">
        Clear <div class="reset"><IconClose width="10" height="10" /></div>
      </button>
    </div>
    <portal to="modal" multiple>
      <Modal @close="modal = false" :open="modal === 'location'" heading="Location">
        <div class="modalBox">
          <CheckTags
            :options="$store.state.states.repository"
            keyLabel="Abbreviation"
            keyValue="Slug"
            @cancel="modal = false"
            layout="grid"
          />
        </div>
      </Modal>
      <Modal @close="modal = false" :open="modal === 'category'" heading="Category">
        <div class="modalBox">
          <CheckTags
            :options="$store.getters['workCategories/sortAlphabetically']"
            keyLabel="Name"
            keyValue="Slug"
            @cancel="modal = false"
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
      modal: false,
      selected: {
        categories: []
      }
    }
  },

  methods: {
    toggle (type, slug) {
      const index = this.selected[type].findIndex((internal) => {
        return internal === slug
      })

      if (index !== -1) {
        this.$delete(this.selected[type], index)
      }

      if (index === -1) {
        this.selected[type].push(slug)
      }
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

  .bug {
    $d: grid(6);
    @include Flex($display: inline-flex, $justify: center);
    background: $BLUE;
    border-radius: 100%;
    color: $WHITE;
    font-size: 12px;
    font-weight: 800;
    height: $d;
    width: $d;
  }

  .modalBox {
    width: 400px;
  }
</style>
