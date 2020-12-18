<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="commentList.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{commentList.aut_name}}</div>
      <van-button
        :class="{liked: commentList.is_liking}"
        :icon="commentList.is_liking? 'good-job':'good-job-o'"
        @click="addCommentLike"
        :loading="commentLoading"
        round
      >{{commentList.like_count || '赞'}}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{commentList.content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{commentList.pubdate|relativeTime}}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('btn-reply', commentList)"
        >回复 {{commentList.reply_count}}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, cancelCommentLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    commentList: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      commentLoading: false // 加载loading
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 点赞  取消点赞
    async addCommentLike () {
      this.commentLoading = true
      try {
        if (this.commentList.is_liking) {
          // 已点赞  取消点赞
          await cancelCommentLike(this.commentList.com_id)
          this.commentList.like_count--
        } else {
          // 取消点赞
          await addCommentLike(this.commentList.com_id)
          this.commentList.like_count++
        }
        this.commentList.is_liking = !this.commentList.is_liking
      } catch (error) {

      }
      this.commentLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    // width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.liked {
      color: #e5645f;
    }
  }
}
</style>
