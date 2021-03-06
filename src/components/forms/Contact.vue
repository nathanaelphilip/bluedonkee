<template>
  <form @submit.prevent="submit" class="form-contact">
    <portal to="flash">
      <Flash :open="status === 'success'" @close="status = false">
        🎉 Success. We will be in touch!
      </Flash>
    </portal>
    <div class="header">
      <h3 class="heading">Contact Us</h3>
    </div>
    <div class="row">
      <div class="half">
        <Input
          label="Your Name"
          @input="value => form.name = value"
          required
          placeholder="Jane Doe"
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
          label="Organization"
          @input="value => form.organization = value"
          required
          placeholder="WorkBlue"
          :value="form.organization"
         />
      </div>
      <div class="half">
        <Select
          label="Contact Reason"
          placeholder="Select Reason"
          @change="value => form.reason = value"
          :value="form.reason"
         >
          <option>Feedback</option>
          <option>General Inquiry</option>
          <option>Opportunities</option>
          <option>Partnership</option>
          <option>Press</option>
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
  </form>
</template>

<script>
import { postContactForm } from '@/api'

import Flash from '@/components/molecules/Flash'
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
  components: { Flash, ButtonPrimary, Input, Processing, Select, TextArea },

  data () {
    return {
      status: false,
      form: { ...form }
    }
  },

  methods: {
    reset () {
      this.form = { ...form }
    },

    async submit () {
      this.status = 'processing'

      try {
        const { data } = await postContactForm({
          fields: {
            'Full Name': this.form.name,
            'Email Address': this.form.email,
            'Organization Name': this.form.organization,
            'Contact Reason': this.form.reason,
            Message: this.form.message
          }
        })

        if (data) {
          this.status = 'success'
          this.reset()
        }

        if (!data) {
          this.status = 'failure'
        }
      } catch (e) {

      } finally {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-contact {
    background: $BLUELIGHT;
    border-radius: grid(3);
    padding: grid(8);

    @include mq ($until: small) {
      padding: grid(4);
    }
  }

  .header {
    margin-bottom: grid(8);
  }

  .heading {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: grid(4);
  }

  .subheading {
    font-size: 18px;

    a { color: $BLUE; }
  }

  .row {
    @include FormRow;
  }

  .action {
    @include FormAction;
  }
</style>
