<template>
  <div id="app">
    <LongListScroll>
      <template v-slot="message">
        <div>{{ message.content }}</div>
      </template>
    </LongListScroll>
    <!-- <div ref="ListContainer" class="list-container" @scroll="handleOnScroll">
      <div :style="innerStyle" class="inner-list">
        <div v-for="item in sliceList" :key="item" class="list-item">
          {{ item }}
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import LongListScroll from './components/scoll'

export default {
  name: 'App',
  components: {
    LongListScroll
  },
  data() {
    return {
    }
  }
}
</script>

<style>
.list-container {
  width: 600px;
  height: 300px;
  border: 1px solid #000;
  overflow: hidden auto;
}
.inner-list {
  width: 100%;
  /* height: 5000px; */
}
.list-item {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  box-sizing: border-box;
  border: 1px solid #000;
}
</style>
