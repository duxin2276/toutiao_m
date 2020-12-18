<template>
  <div :class="attitude===1 ? 'liked':''">
    <van-icon
     :name="attitude===1 ? 'good-job' : 'good-job-o'"
     :loading="loading"
     @click="onLike"
    />
  </div>
</template>

<script>
// 导入接口方法
import { addLike, cancelLike } from '@/api/user'
export default {
  name: 'likeArticle',
  components: {

  },
  props: {
    attitude: {
      type: Number,
      required: true
    },
    likeTargetId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  mounted () {

  },
  created () {

  },
  methods: {
    async onLike () {
      // 开启加载
      this.loading = true
      let status = 0
      try {
        if (this.attitude === 1) {
          await cancelLike(this.likeTargetId)
        } else {
          await addLike(this.likeTargetId)
          status = 1
        }
        this.$emit('update-like', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast.fail('操作失败，请稍后重试')
      }
      // 关闭加载
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.liked {
    .van-icon {
        color: #e5645f;
    }
}
</style>
