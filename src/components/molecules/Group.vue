<template>
  <article @click.prevent="go" class="group">
    <div class="box">
      <Avatar :src="group.fields.Avatar[0].url" />
    </div>
    <div class="box">
      <h2 class="heading">
        <router-link :to="{ name: 'group', params: { slug: group.fields.Slug } }">
          {{ group.fields.Name }}
        </router-link>
      </h2>
      <div class="meta">
        <template v-if="categories.length">
          <router-link
            @click.native="$event.stopImmediatePropagation()"
            :to="{
              name: 'groupCategory',
              params: { slug: categories[0].fields.Slug }
            }"
            >
            {{ categories[0].fields.Name }}
          </router-link>
        </template>
        <template v-if="categories.length && locations.length">
          <div class="meta-divider">•</div>
        </template>
        <template v-if="locations.length">
          <Locations
            :locations="locations"
            route="locationGroup"
          />
        </template>
      </div>
    </div>
  </article>
</template>

<script>
import { getByIds } from '@/store/helpers'

import Avatar from '@/components/atoms/Avatar'
import Locations from '@/components/molecules/Locations'

export default {
  name: 'components-molecules-group',
  props: ['group'],
  components: { Avatar, Locations },

  data () {
    return {
      categories: [],
      locations: []
    }
  },

  async mounted () {
    this.categories = this.group.fields['Groups Categories'].length ? await getByIds({
      ids: this.group.fields['Groups Categories'],
      type: 'groupCategories'
    }) : []

    this.locations = this.group.fields.Location ? await getByIds({
      ids: this.group.fields.Location,
      type: 'locations'
    }) : []
  },

  methods: {
    go () {
      return this.$router.push({ name: 'group', params: { slug: this.group.fields.Slug } })
    }
  }
}
</script>

<style lang="scss" scoped>
  .group {
    align-items: center;
    border: 1px solid transparent;
    border-radius: grid(2);
    display: grid;
    grid-template-columns: grid(15) 1fr;
    grid-column-gap: 16px;
    padding: grid(6);

    @include mq($until: small) {
      grid-template-columns: grid(12) 1fr;
      padding: grid(6) grid(6);
    }

    @include mq($until: xsmall) {
      grid-template-columns: 48px 1fr;
    }

    &:hover {
      background: $BLUELIGHT;
      border-color: $GREY3;
      cursor: pointer;
    }
  }

  .heading {
    font-size: 18px;
    font-weight: 800;
    margin-bottom: grid(1);

    @include mq ($until: xsmall) {
      font-size: 15px;
    }
  }

  .meta {
    @include Flex ($justify: flex-start);
    color: $BLUE;
    font-size: 15px;

    a:hover { text-decoration: underline; }
  }

  .meta-divider { margin: 0 grid(1); }
</style>
