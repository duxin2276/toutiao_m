<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
      v-for="(item,index) in list"
      :key="index"
      :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
// 导入获取搜索结果接口方法
import { getResults } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {

  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 页数
      per_page: 20 // 每页显示多少条数据
    }
  },
  mounted () {

  },
  created () {

  },
  methods: {
    async onLoad () {
      try {
      // 1. 请求获取数据
        const { data: { data: { results } } } = await getResults({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        // console.log(results)
        // 2. 将数据添加到数组列表中
        this.list.push(...results)
        // 3. 将本次加载中的loading 关闭
        this.loading = false
        // 4. 判断是否还有数据
        if (results.length > 0) {
          //  如果有，则更新获取下一个数据的页码
          this.page++
        } else {
          //  如果没有，则将加载状态  finished 设置为结束
          this.finished = true
        }
      } catch (error) {
        this.$toast('刷新失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
