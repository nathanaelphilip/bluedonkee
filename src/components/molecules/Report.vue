<template>
  <aside class="report">
    <h6 class="heading">Something off with this post?</h6>
    <button class="button" @click.prevent="open.modal = true">Flag Posting</button>
    <portal to="modal">
      <Modal @close="open.modal = false" :open="open.modal" heading="Flag Posting">
        <OptionsList
          :options="options"
          :status="status"
          :accepted="accepted"
          keyLabel="label"
          keyValue="id"
          @close="open.modal = false"
          @process="report"
        >
          <TextArea
            v-if="accepted === 4"
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
        :open="open.flash">{{ message }}
      </Flash>
    </portal>
  </aside>
</template>

<script>
import { postFlagged } from '@/api'

import Flash from '@/components/molecules/Flash'
import Modal from '@/components/molecules/Modal'
import OptionsList from '@/components/forms/OptionsList'
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

  components: { Flash, Modal, OptionsList, TextArea },

  data () {
    return {
      message: message.success,
      open: {
        flash: false,
        modal: false
      },
      options,
      note: '',
      accepted: false,
      status: false
    }
  },

  methods: {
    async report (option) {
      this.status = 'processing'
      this.accepted = option

      try {
        const { data } = await postFlagged({
          Reason: this.accepted.label,
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
    background: $GREY3;
    border-radius: 4px;
    font-size: 15px;
    padding: 15px 16px;
    grid-template-columns: 1fr auto;
  }

  .heading {
    color: $GREY2;
  }

  .button {
    appearance: none;
    background: none;
    border: none;
    color: $BLUE;

    &:hover {cursor: pointer}
  }
</style>
