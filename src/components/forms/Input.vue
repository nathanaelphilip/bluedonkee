<template>
  <div class="input">
    <label class="label" v-if="label">{{ label }}</label>
    <div class="box">
      <slot name="prefix"></slot>
      <input
        @input="handleInput"
        @invalid="handleInvalid"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly"
        :type="type"
        :value="value"
        class="text"
        :class="{error}"
       />
    </div>
    <div class="meta" v-if="instructions || error">
      <div class="instructions" v-if="instructions">
        {{ instructions }}
      </div>
      <div class="error" v-if="error">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'label',
    'instructions',
    'placeholder',
    'prefix',
    'readonly',
    'required',
    'type',
    'value'
  ],

  data () {
    return {
      error: false,
      errorMessage: 'This field is required.'
    }
  },

  methods: {
    handleInput (event) {
      const value = event.target.value
      this.$emit('input', value)

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
    display: flex;

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  .prefix {
    align-items: center;
    align-self: stretch;
    display: flex;
    border: 1px solid $GREY;
    border-right: none;
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
    color: $GREY2;
    font-size: 15px;
    line-height: 1;
    padding: 0 10px;

    & + .text {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .icon {
    align-items: center;
    align-self: stretch;
    background: $WHITE;
    display: flex;
    border: 1px solid $GREY;
    border-right: none;
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
    padding: 0 0 0 10px;

    svg {fill: $GREY4}

    & + .text {
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .text {
    @include Input;
  }

  .meta {
    @include Flex;
  }

  .error {
    color: $RED;
    font-size: 13px;
  }

  .instructions {
    color: $GREY2;
    font-size: 13px;
    font-weight: 600;
  }
</style>
