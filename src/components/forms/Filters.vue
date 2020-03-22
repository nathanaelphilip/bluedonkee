<template>
  <div class="filters">
    <div class="actions">
      <div class="group">
        <ButtonSecondary
          @click.native.prevent="modal = 'locations'"
          :class="{'bugged': $store.getters['filters/accepted']('locations').length}"
        >
          Location
          <span v-if="$store.getters['filters/accepted']('locations').length" class="bug">
            {{ $store.getters['filters/accepted']('locations').length }}
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
        <ButtonSecondary
          @click.native.prevent="modal = 'types'"
          :class="{'bugged': $store.getters['filters/accepted']('types').length}"
          >
          Work Type
          <span v-if="$store.getters['filters/accepted']('types').length" class="bug">
            1
          </span>
        </ButtonSecondary>
      </div>
      <button @click="$store.dispatch('filters/clear')" class="clear">
        Clear <div class="reset"><IconClose width="10" height="10" /></div>
      </button>
    </div>
    <portal to="modal" multiple>
      <Modal @close="modal = false" :open="modal === 'locations'" heading="Location">
        <div class="modalBox">
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
        <div class="modalBox">
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
          layout="flex"
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

export default {
  components: { ButtonSecondary, CheckTags, IconClose, Modal },

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
