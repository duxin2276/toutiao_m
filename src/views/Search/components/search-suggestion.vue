<template>
  <div class="search-suggestion">
    <van-cell  icon="search" v-for="(item,index) in suggestList"
    :key="index" @click="$emit('search', item)">
    <div slot="title" v-html="highLight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
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
      suggestList: []
    }
  },
  mounted () {

  },
  created () {

  },
  methods: {
    highLight (val) {
      var reg = new RegExp(this.searchText, 'ig')
      return val.replace(reg, '<span style="color:red">' + this.searchText + '</span>')
    }
  },
  watch: {
    searchText: {
      handler: debounce(async function (val) {
        // console.log(val)
        const { data: { data: { options } } } = await getSuggestions(val)
        options.forEach((t, i, l) => {
          this.suggestList = options
        })
        // console.log(this.suggestList)
      }, 300),
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
</style>
