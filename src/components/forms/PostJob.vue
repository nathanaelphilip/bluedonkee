<template>
  <form>
    <fieldset class="fieldset">
      <div>
        <legend class="legend">Job Description</legend>
        <div class="row">
          <div class="full">
            <Input
              label="Job Title"
              placeholder="Senior Policy Advisor"
            />
          </div>
        </div>
        <div class="row">
          <div class="full">
            <TextArea
              label="Job Description"
              placeholder="Provide a brief description of the role"
            />
          </div>
        </div>
        <div class="row">
          <div class="full">
            <Input
              label="Application Url"
              prefix="https://"
              instructions="Full URL where users can apply for this position."
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
            />
          </div>
          <div class="half">
            <Select
              label="State"
              placeholder="Select State"
            />
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
            <CheckList :options="$store.state.workTypes.repository" heading="Work Type" />
          </div>
        </div>
        <div class="row">
          <div class="full">
            <CheckList :options="$store.state.workLevels.repository" heading="Work Levels" />
          </div>
        </div>
        <div class="row">
          <div class="full">
            <CheckList :options="$store.state.workCategories.repository" heading="Work Categories" />
          </div>
        </div>
      </div>
    </fieldset>

    <fieldset class="fieldset">
      <div>
        <legend class="legend">Company Information</legend>
        <div class="row">
          <div class="full">
            <Input
              label="Company"
              placeholder="WorkBlue"
            />
          </div>
        </div>
        <div class="row">
          <div class="half">
            <Input
              label="Website"
              prefix="https://"
            />
          </div>
          <div class="half">
            <Input
              label="Twitter"
              prefix="@"
            />
          </div>
        </div>
        <div class="row">
          <div class="half">
            <Input
              label="City"
              placeholder="New York"
            />
          </div>
          <div class="half">
            <Select
              label="State"
              placeholder="Select State"
            />
          </div>
        </div>
        <div class="action">
          <ButtonPrimary>
            <Processing>Post Job</Processing>
          </ButtonPrimary>
        </div>
      </div>
    </fieldset>

    <portal target="flash">
       <Flash>
       </Flash>
    </portal>
  </form>
</template>

<script>
import ButtonPrimary from '@/components/atoms/ButtonPrimary'
import CheckList from '@/components/forms/CheckList'
import Flash from '@/components/molecules/Flash'
import Input from '@/components/forms/Input'
import Select from '@/components/forms/Select'
import Processing from '@/components/forms/Processing'
import TextArea from '@/components/forms/TextArea'

export default {
  name: 'form-post-job',
  components: { ButtonPrimary, CheckList, Flash, Input, Select, Processing, TextArea },

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

  .action {
    display: flex;
    justify-content: flex-end;
  }
</style>