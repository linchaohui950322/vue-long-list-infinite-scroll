<template>
  <div id="app">
    <ul class="ul">
      <li ref="top" :style="liStyle(0)" data-pos="top" class="li">{{ vList[0] }}</li>
      <template v-if="vList.length > 2">
        <li
          v-for="(item, idx) in vList.slice(1, vList.length - 1)"
          :key="item"
          :style="liStyle(idx + 1)"
          class="li"
        >
          {{ item }}
        </li>
      </template>
      <li ref="bottom" :style="liStyle(vList.length - 1)" data-pos="bottom" class="li">{{ vList[vList.length - 1] }}</li>
      <!-- <li
        v-for="item in list"
        :key="item"
        class="li-list"
      >
        {{ item }}
      </li> -->
    </ul>
  </div>
</template>

<script>
const list = []
for (let i = 0; i < 1000000; i++) {
  list.push(i + 1)
}

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      list,
      vList: [],
      idx: 0,
      start: 0,
      end: 15,
      ob: null,
      height: 100,
      step: 15
    }
  },
  watch: {
    start: {
      handler(val) {
        this.getVList(val)
      },
      immediate: true
    }
  },
  methods: {
    getVList() {
      this.vList = this.list.slice(this.start, this.end)
    },
    cb(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.dataset.pos === 'top') {
          if (this.start === 0) {
            return
          }
          const num = this.start >= 5 ? 5 : this.start
          this.start = this.start - num
          this.end = this.end - num
        }
        if (entry.isIntersecting && entry.target.dataset.pos === 'bottom') {
          if (this.end >= this.list.length) {
            return
          }
          const num = this.list.length - this.end >= 5 ? 5 : this.list.length - this.end
          this.start = this.start + num
          this.end = this.end + num
        }
      })
    },
    liStyle(idx) {
      return {
        top: `${this.height * (this.start + idx)}px`
      }
    },
    setStart(start) {
      this.start = start
      this.end = start + this.step
    }
  },
  mounted () {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    this.ob = new IntersectionObserver(this.cb, options)
    this.$nextTick(() => {
      this.ob.observe(this.$refs.top)
      this.ob.observe(this.$refs.bottom)
      this.setStart(30000)
      this.$nextTick(() => {
        this.$refs.top.scrollIntoView({
          behavior: 'instant',
          block: 'center',
          inline: 'nearest'
        })
      })
    })
  },
  beforeDestroy() {
    this.ob && this.ob.unobserve(this.$refs.top)
    this.ob && this.ob.unobserve(this.$refs.bottom)
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.ul {
  position: relative;
  width: 100%;
}
.li {
  height: 100px;
  width: 100%;
  border: 1px solid #000;
  position: absolute;
  display: block;
  list-style: none;
  box-sizing: border-box;
}
.li-list {
  height: 100px;
  width: 100%;
  border: 1px solid #000;
  position: relative;
  display: block;
  list-style: none;
  box-sizing: border-box;
}
</style>
