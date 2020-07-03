<template>
  <form @submit.prevent class="form" :class="{'»open' : open}">
    <div class="box">
      <IconSearch class="icon-search" width="16" height="16" />
      <input
        @focus="open = true"
        @keyup="search"
        v-model="input"
        type="text"
        class="input"
        placeholder="Job Title or Keyword"
        />
      <button @click.prevent="open = false" class="close">
        <IconClose height="9" width="9" />
      </button>
    </div>
    <div
    class="results"
    v-if="$store.getters['jobs/getFetched']('search').length && open"
    >
      <SearchResults
        v-if="$store.getters['jobs/getFetched']('search').length"
        heading="Jobs"
        type="jobs"
        :results="$store.getters['jobs/getFetched']('search').slice(0, 3)"
        @close="$store.dispatch('app/mobileSearchToggle', false)"
        />
    </div>
  </form>
</template>

<script>
import IconClose from '@/components/icons/Close'
import IconSearch from '@/components/icons/Search'
import SearchResults from '@/components/molecules/SearchResults'

const pageSize = 20

export default {
  components: { IconClose, IconSearch, SearchResults },

  data () {
    return {
      open: false
    }
  },

  computed: {
    input: {
      get () {
        return this.$store.state.search.query
      },

      set (value) {
        this.$store.dispatch('search/updateQuery', value)
      }
    }
  },

  methods: {
    async search () {
      await this.$store.dispatch('jobs/clear', 'search')
      await this.$store.dispatch('jobs/fetch', {
        id: 'search',
        params: {
          filterByFormula: `AND(OR({Status} = 'Active', {Status} = 'Promoted'), SEARCH("${this.$store.getters['search/query']}", {Title}))`,
          pageSize,
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
    padding: 0 grid(3);

    .»open & {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .input {
    border: none;
    color: $BLACK;
    font-size: 15px;
    flex: 1;
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

    &:hover { cursor: pointer; }

    .»open & {
      @include Show;
    }
  }

  .results {
    background: $WHITE;

    @include mq ($from: small) {
      border: 1px solid $GREY;
      border-top: none;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      padding: grid(4);
      position: absolute;
      height: 300px;
      overflow: auto;
      top: 100%;
      width: 100%;
    }

    @include mq ($until: small) {
      padding: grid(4) 0;
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
