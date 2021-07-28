<template>
  <div>
    child2
    <slot v-for="item in list" name="child2slot" v-bind="item">
      <div :key="item.id">
        child2slot {{ item.id }}
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Child2',
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
