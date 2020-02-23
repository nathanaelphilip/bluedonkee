<template>
  <div class="input">
    <label class="label" v-if="label">{{ label }}</label>
    <div class="box">
      <select
        @change="handleChange"
        @invalid="handleInvalid"
        class="select"
        required
        :value="value"
        :class="{error}"
        >
         <option value="" disabled selected hidden>{{ placeholder }}</option>
         <slot></slot>
      </select>
    </div>
    <div class="meta" v-if="error">
      <div class="error" v-if="error">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'label', 'placeholder', 'value' ],

  data () {
    return {
      error: false,
      errorMessage: 'This field is required.'
    }
  },

  methods: {
    handleChange (event) {
      const value = event.target.value
      this.$emit('change', value)

      if (value) {
        this.error = false
      }
    },
    handleInvalid (value) {
      this.error = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .label {
    @include Label;
    margin-bottom: 8px;
  }

  .box {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  .select {
    @include Select;
    width: 100%;
  }

  .error {
    color: $RED;
    font-size: 13px;
  }
</style>
