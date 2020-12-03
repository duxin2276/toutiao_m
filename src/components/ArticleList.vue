<template>
  <div class="article-list">
    <!-- List 列表组件：瀑布流滚动加载，用于展示长列表。

      List 组件通过 loading 和 finished 两个变量控制加载状态，
      当组件初始化或滚动到到底部时，会触发 load 事件并将 loading 自动设置成 true，此时可以发起异步操作并更新数据，
      数据更新完毕后，将 loading 设置成 false 即可。
      若数据已全部加载完毕，则直接将 finished 设置成 true 即可。

      - load 事件：
        + List 初始化后会触发一次 load 事件，用于加载第一屏的数据。
        + 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。

      - loading 属性：控制加载中的 loading 状态
        + 非加载中，loading 为 false，此时会根据列表滚动位置判断是否触发 load 事件（列表内容不足一屏幕时，会直接触发）
        + 加载中，loading 为 true，表示正在发送异步请求，此时不会触发 load 事件

      - finished 属性：控制加载结束的状态
        + 在每次请求完毕后，需要手动将 loading 设置为 false，表示本次加载结束
        + 所有数据加载结束，finished 为 true，此时不会触发 load 事件 -->
    <van-pull-refresh
      v-model="isonRefreshLoading"
      :success-text="successText"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell v-for="item in list" :key="item.id" :title="item.title">
        </van-cell> -->
        <article-item v-for="item in list" :key="item.id" :title="item.title" :article="item"></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article.js'
// 导入列表当前项
import ArticleItem from '@/components/articleitem/ArticleItem'
export default {
  props: {
    chancel: {
      type: Object,
      require: true
    }
  },
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [],
      // list: [
      //   {
      //     title: 'Scrapy和Django实现蚌埠医学院手机新闻网站制作',
      //     aut_id: 2,
      //     pubdate: '2018-11-29T15:57:21',
      //     ch_id: 14,
      //     cover: {
      //       type: 0,
      //       images: []
      //     },
      //     is_top: 0,
      //     art_id: 65569,
      //     aut_name: '翔爷',
      //     comm_count: 0,
      //     like_count: 0,
      //     collect_count: 0
      //   },
      //   {
      //     title: 'Scrapy和Django实现蚌埠医学院手机新闻网站制作',
      //     aut_id: 2,
      //     pubdate: '2018-11-29T15:57:21',
      //     ch_id: 14,
      //     cover: {
      //       type: 1,
      //       images: ['https://img.yzcdn.cn/vant/cat.jpeg']
      //     },
      //     is_top: 0,
      //     art_id: 65569,
      //     aut_name: '翔爷',
      //     comm_count: 0,
      //     like_count: 0,
      //     collect_count: 0
      //   },
      //   {
      //     title: 'Scrapy和Django实现蚌埠医学院手机新闻网站制作',
      //     aut_id: 2,
      //     pubdate: '2018-11-29T15:57:21',
      //     ch_id: 14,
      //     cover: {
      //       type: 3,
      //       images: ['https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/cat.jpeg']
      //     },
      //     is_top: 0,
      //     art_id: 65569,
      //     aut_name: '翔爷',
      //     comm_count: 0,
      //     like_count: 0,
      //     collect_count: 0
      //   }
      // ],
      loading: false, // 控制列表是否在加载中
      finished: false, // 控制列表是否加载完成
      timestamp: Date.now(), // 当前页码
      error: false,
      successText: '', // 下拉提示信息
      isonRefreshLoading: false
    }
  },
  mounted () {

  },
  created () {
    this.onLoad()
  },
  methods: {
    // 加载文章列表
    async onLoad () {
      try {
        // 1.请求加载数据
        const { data } = await getArticle({
          channel_id: this.chancel.id,
          timestamp: this.timestamp,
          with_top: 1
        })
        // console.log(data)
        // 2.把请求结果数据放到list数组中
        const result = data.data.results
        console.log(result)
        this.list.push(...result)
        console.log(this.list)
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false
        // 4. 判断数据是否全部加载完成
        if (this.list.length > 0) {
          this.timestamp = data.data.pre_timestamp
        }
        // 没有数据了，将 finished 设置为 true，不再 load 加载更多了
        this.finished = true
      } catch (error) {
        // 展示错误提示状态
        this.error = true
        // 请求失败了，loading 也需要关闭
        this.loading = false
      }
    },
    // 通过下拉事件加载事件
    async onRefresh () {
      try {
        // 1. 请求获取数据
        const { data } = await getArticle({
          channel_id: this.chancel.id, // 频道ID
          timestamp: Date.now(), // 下拉刷线，每次请求获取最新数据，所以传递当前最新时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // 模拟随机失败的情况
        // if (Math.random() > 0.2) {
        //   JSON.parse('dddddssssss')
        // }
        // 2. 将数据追加到列表的顶部
        this.list.push(...data.data.results)
        // 3. 关闭下拉刷新的 loading 状态
        this.isonRefreshLoading = false
        // 更新下拉刷新成功提示的文本
        this.successText = `更新了${data.data.results.length}条数据`
      } catch (error) {
        // 刷新失败
        this.successText = '刷新失败'
        // 关闭下拉刷新的 loading 状态
        this.isonRefreshLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
