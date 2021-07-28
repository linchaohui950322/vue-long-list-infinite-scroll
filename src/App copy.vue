<template>
  <div id="app">
    <input
      ref="input"
      v-model="val"
      type="text"
      @keyup="keyup"
    >
    {{ pos }}
  </div>
</template>

<script>
function toOrign (val) {
  return val.replace(/\s/g,'')
}
function toTarget (val) {
  return val.replace(/(.{4})/g,"$1 ").trim()
}

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      ref: null,
      val: '',
      pos: 0,
      cache: ''
    }
  },
  methods: {
    getPos () {
      const { ref } = this
      let pos = -1;
      if (typeof ref.selectionStart !== 'undefined') {
        pos = ref.selectionStart;
      } else { // IE
        const range = document.selection.createRange();
        range.moveStart("character", -ref.value.length);
        pos = range.text.length;
      }
      return pos
    },
    keyup (e) {
      const { keyCode } = e
      const { val, cache } = this
      let pos = this.getPos()
      const isNotEnd = pos !== val.length

      this.pos = pos
      
      const o_val = toOrign(val)
      const t_val = toTarget(o_val)

      if (keyCode === 8) {
        const o_cache = toOrign(cache)
        let _val = t_val
        if (o_val === o_cache) {
          const _cache = val.split('')
          _cache[pos - 1] = ''
          _val = toTarget(toOrign(_cache.join('')))
          pos = pos - 1
        } else if (pos % 5 === 0) {
          pos = pos - 1
        }
        this.val = _val
        this.cache = _val
      } else if (keyCode >= 48 && keyCode <= 57) {
        this.val = t_val
        this.cache = t_val
      }

      if (isNotEnd) {
        this.$nextTick(() => {
          this.$refs.input.setSelectionRange(pos, pos)
        })
      }
    }
  },
  mounted () {
    this.ref = this.$refs.input
  }
}
</script>

<style>

</style>
