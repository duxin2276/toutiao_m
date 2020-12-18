<template>
  <div class="update-gender">
    <van-picker
      title="修改性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
      :default-index="this.value"
    />
  </div>
</template>

<script>
import { updateNickname } from '@/api/user'
export default {
  name: 'UpdateGender',
  components: {

  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      message: this.value
    }
  },
  mounted () {

  },
  created () {

  },
  methods: {
    async onConfirm () {
      // 加载
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true,
        duration: 0 // 持续展示 toast
      })
      try {
        const { data } = await updateNickname({
          gender: this.message
        })
        console.log(data)
        // 关闭弹出层
        this.$emit('close')
        // 更新视图
        this.$emit('input', this.message)
        // 提示更新成功
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    },
    onChange (picker, values, index) {
      // console.log(index)
      this.message = index
    }
  }
}
</script>

<style lang="less" scoped>
</style>
