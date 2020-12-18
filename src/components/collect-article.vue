<template>
  <div :class="value ? 'collected' : ''">
      <van-icon
        :name="value? 'star' : 'star-o'"
        :loading="false"
        @click="onCollect"
      />
  </div>
</template>

<script>
// 导入请求方法
import { addCollect, cancelCollect } from '@/api/user'
export default {
  name: 'collectArticle',
  components: {

  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    targetId: {
      type: [String, Number, Object],
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
    // 点击收藏  或者取消收藏
    async onCollect () {
      // 开启加载圈
      this.loading = true
      try {
        if (!this.value) {
          // 还没有收藏  点击收藏
          const { data } = await addCollect(this.targetId)
          console.log(data)
          this.$toast('收藏成功')
        } else {
          // 已经收藏 点击取消收藏
          const { data } = await cancelCollect(this.targetId)
          console.log(data)
          this.$toast('取消收藏')
        }
        this.$emit('update-star', !this.value)
      } catch (error) {
        this.$toast('收藏失败')
      }
      // 关闭加载圈
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.collected {
    .van-icon {
        color: #ffa500;
    }
}
</style>
