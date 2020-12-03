<template>
  <div class="search-box">
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result :searchText="searchText" v-if="searchText && isResultShow"></search-result>
    <!-- 搜索建议 -->
    <search-suggest :searchText="searchText" v-else-if="searchText && !isResultShow"></search-suggest>
    <!-- 搜索历史 -->
    <search-history
     v-else
     :searchHistories="searchHistories"
     @clear-all-history="searchHistories = []"
     @search="onSearch"
     ></search-history>
  </div>
</template>

<script>
import SearchHistory from '@/views/Search/components/search-history'
import SearchSuggest from '@/views/Search/components/search-suggestion'
import SearchResult from '@/views/Search/components/search-result'
// 导入 getItem  setItem  方法
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'Search',
  components: {
    SearchHistory,
    SearchSuggest,
    SearchResult
  },
  data () {
    return {
      searchText: '',
      isResultShow: false,
      // 从本地获取历史记录  数据为空时返回一个空的数组
      searchHistories: getItem('SEARCH_HISTORY') || [] // 用来保存搜索的历史记录
    }
  },
  mounted () {

  },
  created () {

  },
  methods: {
    onSearch (val) {
      if (val) {
        // 更新文本框的内容
        this.searchText = val
      }
      if (this.searchText.trim().length > 0) {
        this.isResultShow = true
      } else {
        this.isResultShow = false
      }
      // 将搜索过的内容存储到数组中
      // 防止数据重复   对数组进行检索  出现相同的元素进行删除
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
    },
    onCancel () {
      this.$router.back()
    }
  },
  watch: {
    searchHistories (val) {
      // 将历史记录存储到本地中
      setItem('SEARCH_HISTORY', val)
    }
  }
}
</script>

<style lang="less" scoped>
.van-search__action {
  color: #fff;
}
.search-form {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
.search-box {
  padding-top: 100px;
}
</style>
