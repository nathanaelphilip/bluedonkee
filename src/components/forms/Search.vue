<template>
  <form @submit.prevent class="form" :class="{'»open' : open}" v-click-outside="close">
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
    close (event) {
      this.open = false
    },

    async search () {
      await this.$store.dispatch('jobs/clear', 'search')
      await this.$store.dispatch('jobs/fetch', {
        id: 'search',
        params: {
          filterByFormula: `AND(OR({Status} = 'Active', {Status} = 'Promoted'), SEARCH(LOWER("${this.$store.getters['search/query']}"), LOWER({Title}&'')))`,
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
    padding: grid(2);
    width: grid(46);

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
      border-radius: grid(1);
      box-shadow: 0 3px 7px rgba($BLACK, .15);
      padding: grid(4);
      position: absolute;
      height: 420px;
      overflow: auto;
      top: 100%;
      right: 0;
      top: calc(100% + 16px);
      width: 400px;
      z-index: 2;
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
