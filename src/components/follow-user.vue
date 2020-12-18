<template>
    <van-button
      v-if="!isFollowed"
      class="follow-btn"
      round
      size="small"
      :loading="followLoading"
      loading-type="spinner"
      @click="onFollow"
      >已关注</van-button
    >
    <van-button
      v-else
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      :loading="followLoading"
      loading-type="spinner"
      @click="onFollow"
      >关注</van-button
    >
</template>

<script>
import { addFollow, cancelFollow } from '@/api/user'
export default {
  name: 'followUser',
  components: {

  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [String, Object, Number],
      required: true
    }
  },
  data () {
    return {
      followLoading: false
    }
  },
  mounted () {

  },
  created () {

  },
  methods: {
    // 关注用户   取消关注
    async onFollow () {
      // 打开loading
      this.followLoading = true
      try {
        if (this.isFollowed) {
          // 取消关注
          await cancelFollow(this.userId)
        } else {
          // 点击关注
          await addFollow(this.userId)
        }
        // 更新视图
        this.$emit('update-follow', !this.isFollowed)
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$toast('自己不能关注自己')
        }
      }
      // 关闭loading
      this.followLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
