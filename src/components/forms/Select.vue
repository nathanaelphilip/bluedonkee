<template>
  <div class="input">
    <label class="label" v-if="label">{{ label }}</label>
    <div class="box">
      <IconChevronDown class="icon" />
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
import IconChevronDown from '@/components/icons/ChevronDown'

export default {
  components: { IconChevronDown },

  props: ['label', 'placeholder', 'value'],

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
    position: relative;

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  .icon {
    fill: #A0AEC0;
    height: 6px;
    pointer-events: none;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
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
