<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="isLoading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>

          <!-- 关注按钮组件 -->
          <follow-user
            class="follow-btn"
            :isFollowed="article.is_followed"
            :userId="article.aut_id"
            @update-follow="article.is_followed = $event"
          ></follow-user>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          ref="articleContent"
          class="article-content markdown-body"
          v-html="article.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论详情 -->
        <comment-list
         :commentId="article.art_id"
         :list="commentList"
         @updateComment="totalComment = $event.total_count"
         @click-reply="replyComment"
         ></comment-list>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small"
          @click="showPost = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="totalComment" color="#777" />
          <!-- 收藏功能组件 -->
          <collect-article
           v-model="article.is_collected"
           :targetId="article.art_id"
           @update-star="article.is_collected = $event"
           > </collect-article>
           <!-- 点赞组件 -->
          <like-article
           :attitude="article.attitude"
           :likeTargetId="article.art_id"
           @update-like="article.attitude=$event"
           ></like-article>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errorStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button @click="getArticleDetails" class="retry-btn"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论弹出层 -->
    <van-popup v-model="showPost" position="bottom" :style="{ height: '30%' }">
      <comment-post
       :target="article.art_id"
       @post-success="onPostComment"
       ></comment-post>
    </van-popup>

    <!-- 评论回复弹出层 -->
    <van-popup
     v-model="showReply"
     position="bottom"
     :style="{ height: '100%' }"
    >
      <comment-reply
        v-if="showReply"
        :comment="commentReplyObj"
        @close="showReply = false"
      ></comment-reply>
    </van-popup>
  </div>
</template>

<script>
// 导入组件
import followUser from '@/components/follow-user'
import { getArticleInfo } from '@/api/article'
import './github-markdown.css'
import { ImagePreview } from 'vant'
// 导入收藏组件功能
import collectArticle from '@/components/collect-article'
// 导入点赞组件功能
import likeArticle from '@/components/like-article'
// 导入评论详情页组件
import commentList from '@/components/comment-list'
import commentPost from '@/views/article/components/comment-post'
// 导入评论回复弹出层
import commentReply from '@/views/article/components/comment-reply'
export default {
  name: 'ArticleIndex',
  components: {
    followUser,
    collectArticle,
    likeArticle,
    commentList,
    commentPost,
    commentReply
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  data () {
    return {
      article: {}, // 展示文章的数据
      isLoading: true, // 控制loading加载
      errorStatus: 0, // 失败状态码
      followLoading: false,
      totalComment: 0, // 评论数量
      showPost: false,
      commentList: [],
      showReply: false, // 控制评论回复弹出层
      commentReplyObj: {} // 当前评论项数据对象
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticleDetails()
  },
  mounted () {},
  methods: {
    // 获取文章详情
    async getArticleDetails () {
      // 开启loading
      this.isLoading = true
      try {
        const { data } = await getArticleInfo(this.articleId)
        // 测试代码
        // if (Math.random() > 0.5) {
        //   JSON.parse('jksdjfksdjfksdjkfsd')
        // }
        this.article = data.data
        // 获取对象的时候  视图还没有更新 dom节点还没生成  所以要用到定时器
        // $refs不是响应式的
        setTimeout(() => {
          // 触发预览图片事件
          this.previewImage()
        }, 0)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errorStatus = 404
          console.log(this.errorStatus)
        }
      }
      // 无论成功还是失败都关闭loading
      this.isLoading = false
    },
    // 获取图片  预览模式
    previewImage () {
      // 挂载在$refs上面的对象
      const imgAll = this.$refs.articleContent
      // 获取img节点
      const imgs = imgAll.querySelectorAll('img')
      // 存储图片路径的数组
      const images = []
      // 遍历获取到的图片节点
      imgs.forEach((t, i) => {
        images.push(t.src)
        t.onclick = () => {
          ImagePreview({
            // 预览的图片地址数组
            images,
            // 起始位置，从0开始
            startPosition: i
          })
        }
      })
    },
    onPostComment (data) {
      // console.log(data)
      // 关闭弹出层
      this.showPost = false
      // 将新的评论加到顶部
      this.commentList.unshift(data.new_obj)
    },
    // 回复评论
    replyComment (data) {
      this.showReply = true
      this.commentReplyObj = data
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
