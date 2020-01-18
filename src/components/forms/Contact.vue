<template>
  <form class="form-contact">
    <h3 class="heading">Send A Note</h3>
    <div class="row">
      <Input label="Your Name" placeholder="Type your name" />
    </div>
    <div class="row">
      <TextArea label="Your Name" placeholder="Type your name" />
    </div>
    <div class="row">
      <Input label="Your Name" placeholder="Type your name" />
    </div>
    <div class="action">
      <ButtonPrimary>Submit</ButtonPrimary>
    </div>
  </form>
</template>

<script>
import Input from '@/components/forms/Input'
import ButtonPrimary from '@/components/atoms/ButtonPrimary'
import TextArea from '@/components/forms/TextArea'

export default {
  components: { Input, ButtonPrimary, TextArea }
}
</script>

<style lang="scss" scoped>
  .form-contact {
    background: $BLUELIGHT;
    border-radius: 12px;
    padding: 32px;
  }

  .heading {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 24px;
  }

  .row {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  .action {
    display: flex;
    justify-content: flex-end;
  }
</style>
