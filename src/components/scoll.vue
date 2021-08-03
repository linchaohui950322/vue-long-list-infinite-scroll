<template>
  <div class="div" @scroll="(()=>throttle(handleOnScroll, 100))()">
    <ul :style="innerStyle" class="ul">
      <!-- <li ref="top" :style="liStyle(0)" data-pos="top" class="li">
        <slot :content="vList[0]" />
      </li> -->
      <!-- <template v-if="vList.length > 2"> -->
        <!-- v-for="(item, idx) in vList.slice(1, vList.length - 1)" -->
      <li
        v-for="(item, idx) in vList"
        :key="item"
        :style="liStyle(idx)"
        class="li"
      >
        <slot :content="item" />
      </li>
      <!-- </template> -->
      <!-- <li ref="bottom" :style="liStyle(vList.length - 1)" data-pos="bottom" class="li">
        <slot :content="vList[vList.length - 1]" />
      </li> -->
    </ul>
  </div>
</template>

<script>
import { throttle } from 'lodash'

const list = []
for (let i = 0; i < 100000; i++) {
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
      height: 50,
      step: 15,
      scrollTop: 0,
      throttle,
    }
  },
  computed: {
    innerStyle() {
      const { list, height } = this
      return {
        height: `${list.length * height}px`
      }
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
    // cb(entries) {
    //   entries.forEach(entry => {
    //     if (entry.isIntersecting && entry.target.dataset.pos === 'top') {
    //       if (this.start === 0) {
    //         return
    //       }
    //       const num = this.start >= 5 ? 5 : this.start
    //       this.start = this.start - num
    //       this.end = this.end - num
    //     }
    //     if (entry.isIntersecting && entry.target.dataset.pos === 'bottom') {
    //       if (this.end >= this.list.length) {
    //         return
    //       }
    //       const num = this.list.length - this.end >= 5 ? 5 : this.list.length - this.end
    //       this.start = this.start + num
    //       this.end = this.end + num
    //     }
    //   })
    // },
    liStyle(idx) {
      return {
        top: `${this.height * (this.start + idx)}px`
      }
    },
    setStart(start) {
      this.start = start
      this.end = start + this.step
    },

    handleOnScroll (e) {
      const { scrollTop, offsetHeight } = e.target
      if (
        this.start * this.height - scrollTop > this.height ||
        this.end * this.height - scrollTop - offsetHeight < 0
      ) {
        const idx = scrollTop / (this.list.length * this.height) * this.list.length
        this.start = idx - 5 > 0 ? idx - 5 : 0
        this.end = this.start + 15
      }
    }
  },
  // beforeDestroy() {
  //   this.ob && this.ob.unobserve(this.$refs.top)
  //   this.ob && this.ob.unobserve(this.$refs.bottom)
  // }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.div {
  width: 600px;
  height: 300px;
  overflow-y: auto;
  border: 1px solid #000;
  box-sizing: border-box;
}
.ul {
  position: relative;
  width: 100%;
  /* height: 300px; */
}
.li {
  height: 50px;
  width: 100%;
  border: 1px solid #000;
  position: absolute;
  display: block;
  list-style: none;
  box-sizing: border-box;
}
</style>
