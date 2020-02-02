<template>
  <div class="avatar" @drop.prevent="addFile" @dragover.prevent>
    <figure class="image">
      <Avatar :src="src" />
    </figure>
    <div class="content">
      We recommend using at least a 500x500px (1:1 ratio) image that's no larger than 2MB.
    </div>
    <button class="button" @click.prevent="removeFile">Remove Avatar</button>
  </div>
</template>

<script>
import Avatar from '@/components/atoms/Avatar'

export default {
  components: { Avatar },

  data () {
    return {
      src: require(`@/assets/logo.svg`),
      files: []
    }
  },

  methods: {
    addFile (event) {
      const { files } = event.dataTransfer

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
  }

  .image {
    margin: 0 auto 10px auto;
    height: 90px;
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
