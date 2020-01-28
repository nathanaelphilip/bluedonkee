<template>
  <form @submit.prevent="submit" class="form-contact">
    <div class="header">
      <h3 class="heading">Send A Note</h3>
      <div class="subheading">Doubt <span>Mitch McConnell</span> will listen, but we will.</div>
    </div>
    <div class="row">
      <div class="half">
        <Input
          label="Your Name"
          @input="value => form.name = value"
          required
          placeholder="Type your name"
          :value="form.name"
          />
      </div>
      <div class="half">
        <Input
          label="Email Address"
          @input="value => form.email = value"
          required
          placeholder="jane@example.com"
          type="email"
          :value="form.email"
        />
      </div>
    </div>
    <div class="row">
      <div class="half">
        <Input
          label="Organization Name"
          @input="value => form.organization = value"
          required
          placeholder="WorkBlue"
          :value="form.organization"
         />
      </div>
      <div class="half">
        <Select
          label="Contact Reason"
          placeholder="Saying Hello"
          @change="value => form.reason = value"
          :value="form.reason"
         >
          <option>Saying Hello</option>
          <option>Something Else...</option>
        </Select>
      </div>
    </div>
    <div class="row">
      <div class="full">
        <TextArea
          label="Message"
          placeholder="Type message"
          @input="value => form.message = value"
          :value="form.message"
         />
      </div>
    </div>
    <div class="action">
      <ButtonPrimary :disabled="status">
        <Processing :processing="status === 'processing'">Submit</Processing>
      </ButtonPrimary>
    </div>
    <portal to="banner">
      <Banner :open="status === 'success'" @close="status = false">
        👍 Form Submission Successful
      </Banner>
    </portal>
  </form>
</template>

<script>
import { postContactForm } from '@/api'

import Banner from '@/components/molecules/Banner'
import Input from '@/components/forms/Input'
import Select from '@/components/forms/Select'
import Processing from '@/components/forms/Processing'
import ButtonPrimary from '@/components/atoms/ButtonPrimary'
import TextArea from '@/components/forms/TextArea'

const form = {
  name: '',
  email: '',
  organization: '',
  reason: '',
  message: ''
}

export default {
  components: { Banner, ButtonPrimary, Input, Processing, Select, TextArea },

  data () {
    return {
      status: false,
      form
    }
  },

  methods: {
    async submit () {
      this.status = 'processing'

      try {
        const { data } = await postContactForm({
          'fields': {
            'Full Name': this.form.name,
            'Email Address': this.form.email,
            'Organization Name': this.form.organization,
            'Contact Reason': this.form.reason,
            'Message': this.form.message
          }
        })

        if (data) {
          this.status = 'success'

          setTimeout(() => {
            this.status = false
          }, 5000)
        }

        if (!data) {
          this.status = 'failure'
        }
      } catch (e) {
        console.log(e)
      } finally {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-contact {
    background: $BLUELIGHT;
    border-radius: 12px;
    padding: 32px;
  }

  .header {
    margin-bottom: 35px;
  }

  .heading {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 15px;
  }

  .subheading {
    font-size: 18px;

    span { color: $BLUE; }
  }

  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 16px;

    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  .full {
    grid-column: span 2;
  }

  .action {
    display: flex;
    justify-content: flex-end;
  }
</style>
