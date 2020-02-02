<template>
  <form @submit.prevent="process">
    <fieldset class="fieldset">
      <div>
        <legend class="legend">Job Description</legend>
        <div class="row">
          <div class="full">
            <Input
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
            <Input
              label="Application Url"
              prefix="https://"
              instructions="Full URL where users can apply for this position."
              @input="value => form['Job Application URL'] = value"
              :required="true"
            />
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
          <div class="half">
            <Input
              label="City"
              placeholder="New York"
              :required="true"
            />
          </div>
          <div class="half">
            <Select
              label="State"
              placeholder="Select State"
            >
              <option value="HI">Hawaii</option>
            </Select>
          </div>
        </div>
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
              :options="$store.state.workTypes.repository"
              />
          </div>
        </div>
        <div class="row">
          <div class="full">
            <CheckList
              heading="Work Levels"
              @change="value => form['Job Work Level'] = value"
              :options="$store.state.workLevels.repository"
            />
          </div>
        </div>
        <div class="row">
          <div class="full">
            <CheckList
              heading="Work Categories"
              @change="value => form['Job Work Category'] = value"
              :options="$store.state.workCategories.repository"
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
            <Input
              label="Company"
              placeholder="WorkBlue"
              @input="value => form['Company Name'] = value"
              :required="true"
            />
          </div>
        </div>
        <div class="row">
          <div class="half">
            <Input
              label="Website"
              prefix="https://"
              @input="value => form['Company Website'] = value"
              :required="true"
            />
          </div>
          <div class="half">
            <Input
              label="Twitter"
              prefix="@"
              @input="value => form['Company Twitter'] = value"
            />
          </div>
        </div>
        <div class="row">
          <div class="half">
            <Input
              label="City"
              placeholder="New York"
              :required="true"
            />
          </div>
          <div class="half">
            <Select
              label="State"
              placeholder="Select State"
            >
              <option value="HI">Hawaii</option>
            </Select>
          </div>
        </div>
        <div class="action">
          <ButtonPrimary>
            <Processing :processing="status === 'processing'">Post Job</Processing>
          </ButtonPrimary>
        </div>
      </div>
    </fieldset>

    <portal to="flash">
       <Flash @close="status = false" :open="status === 'success'">
         🏄‍♀️ Surfing into success!
       </Flash>
       <Flash @close="status = false" :open="status === 'error'">
         😱Something went wrong
       </Flash>
    </portal>
  </form>
</template>

<script>
import * as filestack from 'filestack-js'
import { postJobSubmission } from '@/api'

import Avatar from '@/components/forms/Avatar'
import ButtonPrimary from '@/components/atoms/ButtonPrimary'
import CheckList from '@/components/forms/CheckList'
import Flash from '@/components/molecules/Flash'
import Input from '@/components/forms/Input'
import Select from '@/components/forms/Select'
import Processing from '@/components/forms/Processing'
import TextArea from '@/components/forms/TextArea'

const client = filestack.init(process.env.VUE_APP_FILESTACK_API_KEY)

export default {
  name: 'form-post-job',
  components: { Avatar, ButtonPrimary, CheckList, Flash, Input, Select, Processing, TextArea },

  data () {
    return {
      status: false,
      file: false,
      form: {
        'Job Title': '',
        'Job Description': '',
        'Job Application URL': '',
        'Job Location': [],
        'Job Work Type': [],
        'Job Work Level': [],
        'Job Work Category': [],
        'Company Avatar': '',
        'Company Name': '',
        'Company Website': '',
        'Company Twitter': '',
        'Company Location': []
      }
    }
  },

  computed: {
    jobLocation () {
      return this.form['Job Location'].length ? this.form['Job Location'].join('') : ''
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
      return this.form['Company Location'].length ? this.form['Company Location'].join(', ') : ''
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
    async process () {
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
    background: $BLUELIGHT;
    border-radius: 12px;
    display: block;
    padding: 32px;

    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  .legend {
    display: block;
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 22px;
  }

  .row {
    display: grid;
    grid-template-columns: repeat(2, minmax(50%, 1fr));
    grid-column-gap: 16px;

    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  .full {
    grid-column: span 2;
  }

  .avatar {
    margin: 0 auto;
    max-width: 320px;
  }

  .action {
    display: flex;
    justify-content: flex-end;
  }
</style>
