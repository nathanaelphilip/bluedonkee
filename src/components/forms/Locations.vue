<template>
  <div class="locations">
    <template v-for="(location, index) in locations">
      <div :key="index" class="row">
        <div class="half">
          <Input
            label="City"
            placeholder="New York"
            @input="value => updateCity(index, value)"
            :value="location.city"
            :required="true"
          />
        </div>
        <div class="half">
          <Select
            label="State"
            placeholder="Select State"
            @change="value => updateState(index, value)"
            :value="location.state"
          >
            <option
              v-for="state in $store.getters['states/sortAlphabetically']"
              :value="state.fields.Name"
              :key="state.id">
              {{ state.fields.Name }}
            </option>
          </Select>
        </div>
      </div>
    </template>
    <div class="actions" v-if="multiple">
      <div class="action">
        <button class="remove" @click.prevent="remove" v-if="locations.length > 1">Remove</button>
      </div>
      <div class="action">
        <button class="add" @click.prevent="add">Add Location</button>
      </div>
    </div>
  </div>
</template>

<script>
import Input from '@/components/forms/Input'
import Select from '@/components/forms/Select'

export default {
  props: ['locations', 'multiple'],
  components: { Input, Select },

  mounted () {
    this.add()
  },

  methods: {
    updateCity (index, value) {
      this.locations[index].city = value
      this.$emit('update:locations', this.locations)
    },

    updateState (index, value) {
      this.locations[index].state = value
      this.$emit('update:locations', this.locations)
    },

    add () {
      this.locations.push({ city: '', state: '' })
    },

    remove () {
      const locations = [ ...this.locations ]
      locations.pop()

      this.$emit('update:locations', locations)
    }
  }
}
</script>

<style lang="scss" scoped>
  .row {
    @include FormRow;
  }

  .actions {
    display: flex;
    justify-content: space-between;
  }

  .remove, .add {
    @include Button;
    background: none;
    font-size: 15px;
  }

  .add { color: $BLUE; }
  .remove { color: $RED; }
</style>
