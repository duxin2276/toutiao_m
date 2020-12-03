<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-all-history')">全部删除</span>
        &nbsp;&nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete" @click="isDeleteShow = true"/>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="deleteHistory(item,index)"
    >
      <van-icon name="close" v-if="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {

  },
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false // 控制删除的显示与隐藏
    }
  },
  mounted () {

  },
  created () {

  },
  methods: {
    // 删除历史记录
    deleteHistory (item, index) {
      // 删除状态
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        // 搜索状态
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
