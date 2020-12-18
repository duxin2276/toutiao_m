<template>
  <div class="update-photo">
      <img :src="img" alt="" ref="img">
      <div class="toolbar">
        <div class="cancel" @click="$emit('close')">取消</div>
        <div class="confirm" @click="onConfirm">确定</div>
      </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
// 导入接口方法
import { updatePhoto } from '@/api/user'
export default {
  name: 'UpdatePhoto',
  components: {

  },
  // prop数据
  // prop 是受父组件数据影响的
  // 如果是普通数据 (数字、字符串、布尔值)  绝对不能修改
  //  即便改了也不会传导给父组件
  // 如果是引用类型数据 (数组、对象)
  // 可以修改，例如  [].push(xxx),   对象.xxx = xxx
  // 不能重新赋值，xxx = []
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
  },
  created () {

  },
  methods: {
    onConfirm () {
      // 基于服务端的裁切使用  getData()  方法获取裁切参数
      // 纯客户端的裁切使用   getCroppedCanvas  获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updateUserPhoto(blob)
      })
    },
    async updateUserPhoto (blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0 // 持续展示 toast
      })
      try {
        // 准备一个form表单进行提交数据
        const formData = new FormData()
        // 将blob对象添加到表单中
        formData.append('photo', blob)
        // 发送请求
        const { data } = await updatePhoto(formData)
        console.log(data)
        // 关闭弹出层
        this.$emit('close')
        // 更新视图
        this.$emit('update-photo', data.data.photo)
        // 提示更新成功
        this.$toast.success('更新成功')
      } catch (error) {
        // 提示失败
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.update-photo {
  height: 100%;
  background-color: #000;
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    .cancel, .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  max-width: 100%;
}
</style>
