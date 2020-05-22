<template>
  <article @click.prevent="go" class="campaign">
    <div>
      <Avatar :src="avatar" />
    </div>
    <div class="info">
      <h3 class="heading">
        <router-link
          @click.native="$event.stopImmediatePropagation()"
          :to="{
            name: 'campaign',
            params: { slug: campaign.fields.Slug }
          }">
          {{ campaign.fields.Name }}
        </router-link>
      </h3>
      <div class="meta">
        <template v-if="offices.length">
          <router-link
            @click.native="$event.stopImmediatePropagation()"
            :to="{
              name: 'office',
              params: { slug: offices[0].fields.Slug }
            }">
            {{ offices[0].fields.Name }}
          </router-link>
        </template>
        <template v-if="offices.length && locations.length">
          <div class="meta-divider">•</div>
        </template>
        <template v-if="locations.length">
          <Locations
            :locations="locations"
            route="locationCampaign"
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
  props: ['campaign'],
  components: { Avatar, Locations },

  data () {
    return {
      locations: [],
      offices: {}
    }
  },

  computed: {
    avatar () {
      return this.campaign.fields.Avatar ? this.campaign.fields.Avatar[0].url : ''
    }
  },

  async mounted () {
    if (this.campaign.fields.Office && this.campaign.fields.Office.length) {
      this.offices = await getByIds({
        ids: this.campaign.fields.Office,
        type: 'offices'
      })
    }

    this.locations = this.campaign.fields.Location ? await getByIds({
      ids: this.campaign.fields.Location,
      type: 'locations'
    }) : []
  },

  methods: {
    go () {
      return this.$router.push({ name: 'campaign', params: { slug: this.campaign.fields.Slug } })
    }
  }
}
</script>

<style lang="scss" scoped>
  .campaign {
    align-items: center;
    border: 1px solid transparent;
    border-radius: grid(2);
    display: grid;
    grid-template-columns: 60px 1fr;
    grid-column-gap: 12px;
    padding: grid(6);

    &:hover {
      background: $BLUELIGHT;
      border-color: $GREY3;
      cursor: pointer;
    }
  }

  .heading {
    font-weight: 800;
    margin-bottom: 5px;
  }

  .meta {
    @include Flex ($justify: flex-start);
    color: $BLUE;
    font-size: 15px;

    a:hover {text-decoration: underline;}
  }

  .meta-divider {
    margin: 0 grid(1);
  }

  .tags {
    justify-content: flex-end;
  }
</style>
