<template>
  <form @submit.prevent="submit" class="newsletter">
    <h4 class="heading">Stay in the know</h4>
    <div class="content">Get our weekly email newsletter.</div>
    <div class="input-container">
      <Input
        @input="value => form.email = value"
        required
        placeholder="Email Address"
        type="email"
        :value="form.name"
      />
    </div>
    <ButtonPrimary :full="true">
      <Processing :processing="status === 'processing'">Sign Up</Processing>
    </ButtonPrimary>
    <portal to="flash">
      <Flash :open="status === 'failure'" @close="status = false">
        👎 {{ messages.error }}
      </Flash>
      <Flash :open="status === 'success'" @close="status = false">
        👍 {{ messages.success }}
      </Flash>
    </portal>
  </form>
</template>

<script>
import qs from 'qs'
import { postNewsletterForm } from '@/api'

import Flash from '@/components/molecules/Flash'
import ButtonPrimary from '@/components/atoms/ButtonPrimary'
import Input from '@/components/forms/Input'
import Processing from '@/components/forms/Processing'

const form = {
  email: ''
}

export default {
  name: 'components-molecules-newsletter',
  components: { Flash, ButtonPrimary, Input, Processing },

  data () {
    return {
      status: false,
      messages: {
        error: 'There was an error',
        success: 'Newsletter Subscribed'
      },
      form
    }
  },

  methods: {
    async submit () {
      this.status = 'processing'

      try {
        const params = qs.stringify({
          u: process.env.VUE_APP_MAILCHIMP_USER_ID,
          id: process.env.VUE_APP_MAILCHIMP_LIST_ID,
          EMAIL: this.form.email
        })

        const { result, msg } = await postNewsletterForm(params)

        if (result === 'error') {
          this.status = 'failure'
          this.messages.error = msg
        }

        if (result === 'success') {
          this.status = 'success'
          this.messages.success = msg
        }
      } catch (e) {
        this.status = 'failure'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .newsletter {
    background: $BLUELIGHT;
    padding: 24px;
  }

  .heading {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 7px;
  }

  .content {
    font-size: 15px;
    margin-bottom: 20px;
  }

  .input-container {margin-bottom: 10px;}
</style>
