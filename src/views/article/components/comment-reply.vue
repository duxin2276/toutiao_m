<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" size="18" @click="$emit('close')" />
    </van-nav-bar>

    <div class="scroll-wrap">
      <!-- 当前回复评论项 -->
      <comment-item :commentList="comment"></comment-item>

      <!-- 全部评论 -->
      <van-cell title="全部评论"></van-cell>
      <comment-list
       :commentId="comment.com_id"
        type="c"
        :list="commentPostList"
        ></comment-list>
      <!-- /全部评论 -->
    </div>

    <!-- 写评论 -->
    <div class="post-wrap">
      <van-button
        class="post-btn"
        size="small"
        round
        @click="showPostComment = true"
        >写评论</van-button
      >
    </div>
    <!-- /写评论 -->

    <!-- 发布评论 -->
    <van-popup
      v-model="showPostComment"
      position="bottom"
      :style="{ height: '20%' }"
    >
      <comment-post
       :target="comment.com_id"
       @post-success="onPostComment"
      >
      </comment-post>
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import commentItem from '@/views/article/components/comment-item'
import commentList from '@/components/comment-list'
import commentPost from '@/views/article/components/comment-post'
export default {
  name: 'CommentReply',
  components: {
    commentItem,
    commentList,
    commentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showPostComment: false,
      commentPostList: []
    }
  },
  mounted () {

  },
  created () {

  },
  methods: {
    onPostComment (data) {
      // 关闭弹层
      this.showPostComment = false
      // 更新回复条数
      this.comment.reply_count++
      // 将最新的回复添加到最前面
      this.commentPostList.unshift(data.new_obj)
    }
  }
}
</script>

<style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>
