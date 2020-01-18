<template>
  <form class="newsletter">
    <h4 class="heading">Stay in the know</h4>
    <div class="content">Get our weekly email newsletter.</div>
    <Input placeholder="Email Address" />
    <ButtonPrimary :full="true">Sign Up</ButtonPrimary>
  </form>
</template>

<script>
import ButtonPrimary from '@/components/atoms/ButtonPrimary'
import Input from '@/components/forms/Input'

export default {
  name: 'components-molecules-newsletter',
  components: { ButtonPrimary, Input }
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

  .input {margin-bottom: 10px;}
</style>
