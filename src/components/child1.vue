<template>
  <div>
    child1
    <Child2 v-bind="$props">
      <template #child2slot="scoped">
        <slot name="child2slot" v-bind="scoped" />
      </template>
    </Child2>
  </div>
</template>

<script>
import Child2 from './child2.vue'

export default {
  name: 'Child1',
  components: {
    Child2
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
}
</script>

<style scoped>
</style>
