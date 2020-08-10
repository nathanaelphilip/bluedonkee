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
    v-if="$store.getters['search/query'] && open"
    >
      <Spinner v-if="loading" />
      <SearchResults
        v-if="$store.getters['jobs/getFetched']('search').length"
        heading="Jobs"
        type="jobs"
        :results="$store.getters['jobs/getFetched']('search').slice(0, 3)"
        @close="$store.dispatch('app/mobileSearchToggle', false)"
        />
      <SearchResults
        v-if="$store.getters['campaigns/getFetched']('search').length"
        heading="Campaigns"
        type="campaigns"
        :results="$store.getters['campaigns/getFetched']('search').slice(0, 3)"
        @close="$store.dispatch('app/mobileSearchToggle', false)"
        />
      <SearchResults
        v-if="$store.getters['groups/getFetched']('search').length"
        heading="Groups"
        type="groups"
        :results="$store.getters['groups/getFetched']('search').slice(0, 3)"
        @close="$store.dispatch('app/mobileSearchToggle', false)"
        />
        <template v-if="!results && !loading">
          <div class="no-results">
            <h3>No Results Found</h3>
            <p>Please try something else.</p>
          </div>
        </template>
    </div>
  </form>
</template>

<script>
import IconClose from '@/components/icons/Close'
import IconSearch from '@/components/icons/Search'
import SearchResults from '@/components/molecules/SearchResults'
import Spinner from '@/components/atoms/Spinner'

import { debounce } from 'lodash'

const pageSize = 20

export default {
  components: { IconClose, IconSearch, SearchResults, Spinner },

  data () {
    return {
      loading: false,
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
    },

    results () {
      return this.$store.getters['jobs/getFetched']('search').length || this.$store.getters['campaigns/getFetched']('search').length || this.$store.getters['groups/getFetched']('search').length
    }
  },

  methods: {
    close (event) {
      this.open = false
    },

    search: debounce(async function () {
      this.loading = true

      await this.$store.dispatch('jobs/clear', 'search')
      await this.$store.dispatch('campaigns/clear', 'search')
      await this.$store.dispatch('groups/clear', 'search')

      if (!this.$store.getters['search/query']) return

      await this.$store.dispatch('jobs/fetch', {
        id: 'search',
        params: {
          filterByFormula: `AND(OR({Status} = 'Active', {Status} = 'Promoted'), SEARCH(LOWER("${this.$store.getters['search/query']}"), LOWER({Title}&'')))`,
          pageSize,
          sort: [{ field: 'Post Date', direction: 'desc' }]
        }
      })

      if (this.$store.getters['jobs/getFetched']('search').length) { this.loading = false }

      await this.$store.dispatch('campaigns/fetch', {
        id: 'search',
        params: {
          filterByFormula: `AND(OR({Status} = 'Active'), SEARCH(LOWER("${this.$store.getters['search/query']}"), LOWER({Name}&'')))`,
          pageSize,
          sort: [{ field: 'Name', direction: 'asc' }]
        }
      })

      if (this.$store.getters['campaigns/getFetched']('search').length) { this.loading = false }

      await this.$store.dispatch('groups/fetch', {
        id: 'search',
        params: {
          filterByFormula: `SEARCH(LOWER("${this.$store.getters['search/query']}"), LOWER({Name}&''))`,
          pageSize,
          sort: [{ field: 'Name', direction: 'asc' }]
        }
      })

      this.loading = false
    }, 500)
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

    @include mq ($until: small) {
      padding: grid(2);
    }

    .»open & {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .input {
    border: none;
    color: $BLACK;
    font-size: 15px;

    @include mq ($from: small) {
      padding: grid(2);
      width: grid(46);
    }

    @include mq ($until: small) {
      border-left: 1px solid $GREY;
      flex: 1;
      margin-left: grid(3);
      padding: 0 grid(2);
    }

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
      max-height: 420px;
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

  .search-results {
    &:not(:last-child) {
      margin-bottom: grid(6);
    }
  }

  .no-results {
    h3 {
      color: $BLACK;
      font-size: 18px;
      font-weight: 800;
      margin-bottom: grid(1);
    }

    p {
      color: $BLUEGREY;
      font-size: 15px;
      font-weight: 500;
    }
  }
</style>
