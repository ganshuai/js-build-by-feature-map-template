<template>
  <div>
    <h1 class="title">this is vue page</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fn: () => alert('test')
    }
  },

  mounted() {
    console.log('此处调用箭头函数')
    this.fn()
  }
}
</script>

<style scoped>
  .title{
    color: red;
    font-size: 30px;
  }
</style>