<template>
  <div class="update-nickname">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="clickUpdateNickname"
    >
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 输入框 -->
    <div class="filed-wrap">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
    <!-- /输入框 -->
  </div>
</template>

<script>
import { updateNickname } from '@/api/user'
export default {
  name: 'UpdateNickname',
  components: {

  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: this.value
    }
  },
  mounted () {

  },
  created () {

  },
  methods: {
    async clickUpdateNickname () {
      // 加载
      this.$toast.loading({
        message: '更新昵称中...',
        forbidClick: true,
        duration: 0 // 持续展示 toast
      })
      if (!this.message.length) {
        this.$toast('输入的内容不能为空')
        return
      }
      try {
        await updateNickname({
          name: this.message
        })
        // 关闭弹出层
        this.$emit('close')
        // 更新视图
        this.$emit('input', this.message)
        // 提示更新成功
        this.$toast.success('昵称更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.filed-wrap {
    padding: 20px;
}
</style>
