<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
  >
    <!-- <van-cell v-for="item in list" :key="''+item.com_id" :title="item.content" > -->
      <comment-item
       :commentList="item"
       v-for="(item,index) in list"
       :key="index" :title="item.content"
       @btn-reply="$emit('click-reply', $event)"
      ></comment-item>
  </van-list>
</template>

<script>
// 导入获取评论或评论回复接口方法
import { getComments } from '@/api/user'
// 导入评论模板组件
import commentItem from '@/views/article/components/comment-item'
export default {
  name: 'commentList',
  components: {
    commentItem
  },
  props: {
    commentId: {
      type: [String, Number, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator: value => ['a', 'c'].includes(value),
      default: 'a'
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  mounted () {

  },
  created () {
    this.loading = true
    // 页面刚刷新就调用onLoad事件
    this.onLoad()
  },
  methods: {
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getComments({
          type: this.type,
          source: this.commentId.toString(),
          offset: this.offset,
          limit: this.list
        })
        // console.log(data)
        // 2. 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)

        // 将数据传给父组件
        this.$emit('updateComment', data.data)
        // 3. 将loading 设置为 false
        this.loading = false
        // 4. 判断是否还有数据
        if (results.length > 0) {
          // 有就更新获取下一页的数据页码
          this.offset = data.data.last_id
        }
        this.finished = true
      } catch (error) {
        this.$toast('获取数据失败')
      }
    }
  }
}
// http://localhost:8080/#/article/139199
</script>

<style lang="less" scoped>
</style>
