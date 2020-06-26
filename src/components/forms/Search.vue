<template>
  <form @submit.prevent class="form" :class="{'»open' : open}">
    <div class="box">
      <IconSearch class="icon-search" width="16" height="16" />
      <input
        @focus="open = true"
        @blur="open = false"
        @keyup="search"
        v-model="input"
        type="text"
        class="input"
        placeholder="Job Title or Keyword"
        />
      <button class="close">
        <IconClose height="9" width="9" />
      </button>
    </div>
    <div class="results">
      <div v-if="$store.getters['jobs/getFetched']('search').length">
        <div :key="item.id" v-for="item in $store.getters['jobs/getFetched']('search')">
          {{ item.fields.Title }}
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import IconClose from '@/components/icons/Close'
import IconSearch from '@/components/icons/Search'

export default {
  components: { IconClose, IconSearch },

  data () {
    return {
      open: false,
      input: ''
    }
  },

  methods: {
    async search () {
      await this.$store.dispatch('jobs/clear', 'search')
      await this.$store.dispatch('jobs/fetch', {
        id: 'search',
        params: {
          filterByFormula: `AND(OR({Status} = 'Active', {Status} = 'Promoted'), SEARCH("${this.input}", {Title}))`,
          pageSize: 3,
          sort: [{ field: 'Post Date', direction: 'desc' }]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .form {
    position: relative;
  }

  .box {
    @include Flex;
    border: 1px solid $GREY;
    border-radius: 4px;
    padding: grid(1) grid(3);

    .»open & {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .input {
    border: none;
    color: $BLACK;
    font-size: 15px;
    padding: grid(2);

    &:focus { outline: none; }
    &::placeholder {
      color: $GREY5;
      opacity: 1;
    }
  }

  .close {
    @include Hide;
    @include Flex ($justify: center);
    background: $BLUELIGHT;
    border: none;
    border-radius: 100%;
    height: grid(6);
    width: grid(6);

    .»open & {
      @include Show;
    }
  }

  .results {
    background: $WHITE;
    border: 1px solid $GREY;
    border-top: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    display: none;
    overflow: auto;
    position: absolute;
    height: 300px;
    top: 100%;
    width: 100%;

    .»open & {
      display: block;
    }
  }

  .icon-search {
    fill: $GREY5;

    .form.»open &,
    .form:hover & {
      fill: $BLACK;
    }
  }
</style>
