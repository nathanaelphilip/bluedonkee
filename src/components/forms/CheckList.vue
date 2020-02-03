<template>
  <div class="checklist">
    <div class="header">
      <h5 class="heading">{{ heading }}</h5>
      <div class="action">
        <button @click.prevent="all" class="button">Select all that apply</button>
      </div>
    </div>
    <div class="box">
      <ul class="list">
        <li
          v-for="option in options"
          :key="option.id"
          class="item"
        >
          <CheckBox
            :id="option.id"
            :label="option.fields.Name"
            :checked="checked.includes(option.id)"
            @change="check"
            @all="all"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CheckBox from '@/components/forms/CheckBox'

export default {
  props: ['heading', 'options'],
  components: { CheckBox },

  data () {
    return {
      checked: []
    }
  },

  computed: {
    selected () {
      return this.options.filter((option) => {
        return this.checked.includes(option.id)
      })
    }
  },

  methods: {
    all () {
      if (this.options.length === this.checked.length) {
        this.checked = []
      } else {
        this.checked = this.options.map((option) => {
          return option.id
        })
      }
    },

    check (value) {
      const isChecked = this.checked.includes(value)

      if (isChecked) {
        const index = this.checked.findIndex((id) => {
          return id === value
        })

        this.checked.splice(index, 1)
      }

      if (!isChecked) {
        this.checked.push(value)
      }

      this.$emit('change', this.selected)
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  .box {
    background: $WHITE;
    border: 1px solid $GREY;
    border-radius: 4px;
    padding: 12px 10px;
  }

  .input:hover {
    background: $BLUELIGHT;
  }

  .button {
    appearance: none;
    background: none;
    border: none;
    color: $GREY2;
    font-size: 13px;
    font-weight: 500;
    padding: 0;
  }
</style>
