<template>
  <aside class="report">
    <h6 class="heading">Something off with this post?</h6>
    <ButtonSecondary @click.native.prevent="open.modal = true">Flag Posting</ButtonSecondary>
    <portal to="modal">
      <Modal @close="open.modal = false" :open="open.modal" heading="Flag Posting">
        <OptionsList
          :options="options"
          :status="status"
          :selected="selected"
          keyLabel="label"
          keyValue="id"
          @selected="value => selected = value"
          @close="open.modal = false"
          @process="report"
        >
          <TextArea
            v-if="selected === 4 || selected === 3"
            placeholder="Leave note"
            @input="value => note = value"
            :value="note"
          />
        </OptionsList>
      </Modal>
    </portal>
    <portal to="flash">
      <Flash
        @close="open.flash = false"
        :open="open.flash">
        {{ message }}
      </Flash>
    </portal>
  </aside>
</template>

<script>
import { postFlagged } from '@/api'

import Flash from '@/components/molecules/Flash'
import Modal from '@/components/molecules/Modal'
import OptionsList from '@/components/forms/OptionsList'
import ButtonSecondary from '@/components/atoms/ButtonSecondary'
import TextArea from '@/components/forms/TextArea'

const options = [{
  id: 1,
  label: 'No longer active'
}, {
  id: 2,
  label: 'Contains offensive content'
}, {
  id: 3,
  label: 'Contains inaccurate information'
}, {
  id: 4,
  label: 'Other'
}]

const message = {
  success: '🙋🏽‍♀️ Feedback received. Thank you!'
}

export default {
  props: ['id'],

  components: { ButtonSecondary, Flash, Modal, OptionsList, TextArea },

  data () {
    return {
      message: message.success,
      open: {
        flash: false,
        modal: false
      },
      options,
      note: '',
      selected: false,
      status: false
    }
  },

  computed: {
    reason () {
      return this.options.find((option) => {
        return option.id === this.selected
      }).label
    }
  },

  methods: {
    async report (value) {
      this.status = 'processing'

      try {
        const { data } = await postFlagged({
          Reason: this.reason,
          Note: this.note,
          Jobs: [this.id]
        })

        if (data && data.id) {
          this.open.flash = true
          this.message = message.success
          this.open.modal = false
        }

        if (!data) {
          this.open.flash = true
          this.message = '👎 there was an error'
        }

        this.status = false
      } catch (e) {
        this.open.flash = true
        this.message = '👎 there was an error'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .report {
    align-items: center;
    display: grid;
    background: $BLUELIGHT;
    border-radius: grid(1);
    border: 1px solid $GREY;
    font-size: 16px;
    font-weight: 500;
    padding: grid(3) grid(4);
    grid-template-columns: 1fr auto;

    @include mq ($until: small) {
      align-items: stretch;
      grid-template-columns: 1fr;
      grid-row-gap: grid(3);
      padding: grid(4) grid(4);
      text-align: center;
    }
  }
</style>
