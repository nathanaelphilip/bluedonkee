<template>
  <div
    :class="`avatar ${status}`"
    @drop.prevent="addFile"
    @dragover.prevent
    @dragenter="status = 'dragging'"
    @dragexit="status = 'notdragging'"
    @dragend="status = 'notdragging'"
    >
    <label for="upload-file" class="image">
      <Avatar :src="src" v-if="src" />
      <div class="icon" v-if="!src">
        <IconUpload width="30" />
      </div>
      <input @change="addFile" @click="$event.target.value = null" id="upload-file" type="file" class="input">
    </label>
    <div class="content">
      We recommend using at least a 500x500px (1:1 ratio) image that's no larger than 2MB.
    </div>
    <label v-if="!files.length" class="upload" for="upload-file">Upload Avatar</label>
    <button v-if="files.length" class="remove" @click.prevent="removeFile">Remove Avatar</button>
  </div>
</template>

<script>
import Avatar from '@/components/atoms/Avatar'
import IconUpload from '@/components/icons/Upload'

export default {
  components: { Avatar, IconUpload },

  data () {
    return {
      src: false,
      status: 'resting',
      files: []
    }
  },

  methods: {
    addFile (event) {
      let files = false

      if (event.dataTransfer) {
        files = event.dataTransfer.files
      }

      if (event.target && event.target.files) {
        files = event.target.files
      }

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
      this.src = false
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
      .icon {border-color: $BLUE;}
    }
  }

  .image {
    display: block;
    margin: 0 auto 10px auto;
    height: 90px;
    transition: transform .25s ease-out;
    width: 90px;
  }

  .icon {
    align-items: center;
    border: 1px solid $GREY;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    height: 90px;
    width: 90px;

    &:hover {
      border-color: $BLUE;
      cursor: pointer;
    }
  }

  .content {
    font-size: 14px;
    line-height: 1.4;
    margin-bottom: 10px;
  }

  .upload, .remove {
    @include Button;
    background: none;
    font-size: 15px;
    font-weight: 500;
  }

  .upload {
    color: $BLUE;
    display: block;
    width: 100%;
    text-align: center;
  }

  .remove {
    color: $RED;
  }

  .input {
    height: 0;
    position: absolute;
    left: -99999px;
    width: 0;
  }
</style>
