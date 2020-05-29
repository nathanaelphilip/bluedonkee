<template>
  <form @submit.prevent="process">
    <portal to="flash">
       <Flash @close="status = false" :open="status === 'success'">
         🇺🇸 Posting successfully submitted!
       </Flash>
       <Flash @close="status = false" :open="status === 'error'">
         😱 Something went wrong
       </Flash>
    </portal>
    <fieldset class="fieldset">
      <div>
        <legend class="legend">Job Description</legend>
        <div class="row">
          <div class="full">
            <TextInput
              label="Job Title"
              placeholder="Senior Policy Advisor"
              @input="value => form['Job Title'] = value"
              :required="true"
            />
          </div>
        </div>
        <div class="row">
          <div class="full">
            <TextArea
              label="Job Description"
              placeholder="Provide a brief description of the role"
              @input="value => form['Job Description'] = value"
              :required="true"
            />
          </div>
        </div>
        <div class="row">
          <div class="full">
            <TextInput
              label="Application Url"
              instructions="Full URL where users can apply for this position."
              @input="value => form['Job Application URL'] = value"
              :required="true"
            >
              <template #prefix>
                <div class="prefix">https://</div>
              </template>
            </TextInput>
          </div>
        </div>
      </div>
    </fieldset>

    <fieldset class="fieldset">
      <div>
        <legend class="legend">
          Job Location
        </legend>
        <div class="row">
          <div class="full remote">
            <CheckBox
              label="This role is available to remote work"
              id="remote"
              :checked="form['Job Location Remote']"
              @change="form['Job Location Remote'] = !form['Job Location Remote']"
            />
          </div>
        </div>
        <Locations :locations.sync="form['Job Location']" :multiple="true" />
      </div>
    </fieldset>

    <fieldset class="fieldset">
      <div>
        <legend class="legend">
          Job Details
        </legend>
        <div class="row">
          <div class="full">
            <CheckList
              heading="Work Type"
              @change="value => form['Job Work Type'] = value"
              :options="$store.getters['workTypes/sortAlphabetically']"
              />
          </div>
        </div>
        <div class="row">
          <div class="full">
            <CheckList
              heading="Work Levels"
              @change="value => form['Job Work Level'] = value"
              :options="$store.getters['workLevels/sortAlphabetically']"
            />
          </div>
        </div>
        <div class="row">
          <div class="full">
            <CheckList
              heading="Work Categories"
              @change="value => form['Job Work Category'] = value"
              :options="$store.getters['workCategories/sortAlphabetically']"
            />
          </div>
        </div>
      </div>
    </fieldset>

    <fieldset class="fieldset">
      <div>
        <legend class="legend">Company Information</legend>
        <div class="row">
          <div class="full">
            <Avatar
              @change="(value) => file = value"
            />
          </div>
        </div>
        <div class="row">
          <div class="full">
            <TextInput
              label="Company"
              placeholder="WorkBlue"
              @input="value => form['Company Name'] = value"
              :required="true"
            />
          </div>
        </div>
        <div class="row">
          <div class="half">
            <TextInput
              label="Website"
              @input="value => form['Company Website'] = value"
              :required="true"
            >
              <template #prefix>
                <div class="prefix">https://</div>
              </template>
            </TextInput>
          </div>
          <div class="half">
            <TextInput
              label="Twitter"
              placeholder="@twitter"
              @input="value => form['Company Twitter'] = value"
            >
              <template #prefix>
                <div class="icon">
                  <IconTwitter width="19" height="16" />
                </div>
              </template>
            </TextInput>
          </div>
        </div>

        <Locations :locations.sync="form['Company Location']" />

        <div class="action">
          <ButtonPrimary :disabled="status === 'processing'">
            <Processing :processing="status === 'processing'">Post Job</Processing>
          </ButtonPrimary>
        </div>
      </div>
    </fieldset>
  </form>
</template>

<script>
import * as filestack from 'filestack-js'
import { postJobSubmission } from '@/api'

import Avatar from '@/components/forms/Avatar'
import ButtonPrimary from '@/components/atoms/ButtonPrimary'
import CheckBox from '@/components/forms/CheckBox'
import CheckList from '@/components/forms/CheckList'
import Flash from '@/components/molecules/Flash'
import Locations from '@/components/forms/Locations'
import Processing from '@/components/forms/Processing'
import TextInput from '@/components/forms/Input'
import TextArea from '@/components/forms/TextArea'

import IconTwitter from '@/components/icons/Twitter'

const client = filestack.init(process.env.VUE_APP_FILESTACK_API_KEY)

const form = {
  'Job Title': '',
  'Job Description': '',
  'Job Application URL': '',
  'Job Location': [],
  'Job Location Remote': false,
  'Job Work Type': [],
  'Job Work Level': [],
  'Job Work Category': [],
  'Company Avatar': '',
  'Company Name': '',
  'Company Website': '',
  'Company Twitter': '',
  'Company Location': []
}

export default {
  name: 'form-post-job',
  components: {
    Avatar,
    ButtonPrimary,
    CheckBox,
    CheckList,
    Flash,
    IconTwitter,
    TextInput,
    Locations,
    Processing,
    TextArea
  },

  data () {
    return {
      status: false,
      file: false,
      form: JSON.parse(JSON.stringify(form))
    }
  },

  computed: {
    jobLocation () {
      return this.form['Job Location'].length ? this.form['Job Location'].map((item) => {
        return `${item.city}, ${item.state}`
      }).join(' / ') : ''
    },

    jobWorkType () {
      return this.form['Job Work Type'].length ? this.form['Job Work Type'].map((item) => {
        return item.fields.Name
      }).join(', ') : ''
    },

    jobWorkLevel () {
      return this.form['Job Work Level'].length ? this.form['Job Work Level'].map((item) => {
        return item.fields.Name
      }).join(', ') : ''
    },

    jobWorkCategory () {
      return this.form['Job Work Category'].length ? this.form['Job Work Category'].map((item) => {
        return item.fields.Name
      }).join(', ') : ''
    },

    companyLocation () {
      return this.form['Company Location'].length ? this.form['Company Location'].map((item) => {
        return `${item.city}, ${item.state}`
      }).join(' / ') : ''
    }
  },

  async mounted () {
    if (!this.$store.state.workCategories.repository.length) {
      await this.$store.dispatch('workCategories/fetch')
    }

    if (!this.$store.state.workLevels.repository.length) {
      await this.$store.dispatch('workLevels/fetch')
    }

    if (!this.$store.state.workTypes.repository.length) {
      await this.$store.dispatch('workTypes/fetch')
    }
  },

  methods: {
    async process (event) {
      this.status = 'processing'

      const computed = {
        'Job Location': this.jobLocation,
        'Job Work Type': this.jobWorkType,
        'Job Work Level': this.jobWorkLevel,
        'Job Work Category': this.jobWorkCategory,
        'Company Location': this.companyLocation
      }

      if (this.file) {
        const {
          filename,
          url
        } = await client.upload(this.file)

        const attachment = {
          url,
          filename
        }

        computed['Company Avatar'] = [attachment]
      }

      const fields = { ...this.form, ...computed }

      try {
        const { data } = await postJobSubmission(fields)

        if (data) {
          this.status = 'success'
          this.form = JSON.parse(JSON.stringify(form))
          event.target.reset()
        }
      } catch (e) {
        this.status = 'error'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .fieldset {
    @include FormFieldset;
  }

  .legend {
    @include FormLegend;
  }

  .remote {
    background: $GREY3;
    border-radius: 3px;
    padding: 5px;
  }

  .row {
    @include FormRow;
  }

  .locations {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  .avatar {
    margin: 0 auto;
    max-width: 320px;
  }

  .action {
    @include FormAction;

    @include mq ($until: xsmall) {
      flex-direction: column;
    }
  }
</style>
