<template>
  <div
    :class="`avatar ${status}`"
    @drop.prevent="addFile"
    @dragover.prevent
    @dragenter="status = 'dragging'"
    @dragexit="status = 'notdragging'"
    @dragend="status = 'notdragging'"
    >
    <figure class="image">
      <Avatar :src="src" />
    </figure>
    <div class="content">
      We recommend using at least a 500x500px (1:1 ratio) image that's no larger than 2MB.
    </div>
    <button v-if="files.length" class="button" @click.prevent="removeFile">Remove Avatar</button>
  </div>
</template>

<script>
import Avatar from '@/components/atoms/Avatar'

export default {
  components: { Avatar },

  data () {
    return {
      src: require(`@/assets/logo.svg`),
      status: 'resting',
      files: []
    }
  },

  methods: {
    addFile (event) {
      const { files } = event.dataTransfer
      this.status = 'resting'

      if (!files) { return }

      this.files = files

      const reader = new FileReader()

      reader.addEventListener('load', (event) => {
        this.src = reader.result
      })

      reader.readAsDataURL(this.files[0])

      this.$emit('change', this.files[0])
    },

    removeFile (event) {
      this.src = require(`@/assets/logo.svg`)
      this.files = []
      this.$emit('change', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  .avatar {
    text-align: center;

    &.dragging {
      .image {
        transform: scale(1.1);
      }
    }
  }

  .image {
    margin: 0 auto 10px auto;
    height: 90px;
    transition: transform .25s ease-out;
    width: 90px;
  }

  .content {
    font-size: 14px;
    line-height: 1.4;
    margin-bottom: 10px;
  }

  .button {
    @include Button;
    background: none;
    color: $RED;
    font-size: 15px;
    font-weight: 500;
  }
</style>
