<template>
  <form
    @submit.prevent="submit"
    class="newsletter"
    :class="{'»full': !simple}"
    >
    <portal to="flash">
      <Flash :open="status === 'failure'" @close="status = false">
        {{ messages.error }}
      </Flash>
      <Flash :open="status === 'success'" @close="status = false">
        {{ messages.success }}
      </Flash>
    </portal>
    <template v-if="!simple">
      <h4 class="heading">Stay in the know</h4>
      <div class="content">Get our weekly email newsletter.</div>
    </template>
    <div class="grid">
      <Input
        @input="value => form.email = value"
        required
        placeholder="Email Address"
        type="email"
        :value="form.name"
      />
      <ButtonPrimary :full="true">
        <Processing :processing="status === 'processing'">Sign Up</Processing>
      </ButtonPrimary>
    </div>
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

  props: {
    simple: {
      type: Boolean,
      default: false
    }
  },

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
          const invalidEmail = '👀 Invalid email. Please try again'
          const alreadySubscribed = '👍 You are already signed up'

          if (msg.includes('already subscribed')) {
            this.messages.error = alreadySubscribed
          }

          if (msg.includes('a different email address')) {
            this.messages.error = invalidEmail
          }

          this.status = 'failure'
        }

        if (result === 'success') {
          this.status = 'success'
          this.messages.success = `📬 ${msg}`

          window.analytics.identify({
            email: this.form.email
          })
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
    &.»full {
      background: $BLUELIGHT;
      border-radius: grid(2);
      padding: grid(6);
    }
  }

  .heading {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: grid(2);
  }

  .grid {
    align-items: start;
    display: grid;
    grid-template-columns: 1fr 100px;
    grid-column-gap: grid(2);
  }

  .content {
    font-size: 15px;
    margin-bottom: grid(4);
  }
</style>
