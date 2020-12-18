<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateNickname } from '@/api/user'
import dayJs from 'dayjs'
export default {
  name: 'UpdateBirthday',
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
      minDate: new Date(2019, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.value)
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
        const currentDate1 = dayJs(this.currentDate).format('YYYY-MM-DD')
        await updateNickname({
          birthday: currentDate1
        })
        // 关闭弹出层
        this.$emit('close')
        // 更新视图
        this.$emit('input', currentDate1)
        // 提示更新成功
        this.$toast.success('修改成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('修改失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
