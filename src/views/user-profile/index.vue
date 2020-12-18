<template>
  <div class="user-Profile">
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    >
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 个人信息 -->
    <input type="file" hidden ref="file" @change="onFileChange">
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        class="avatar"
        round
        width="30"
        height="30"
        :src="user.photo"
      />
    </van-cell>
    <van-cell
     title="昵称"
     :value="user.name"
     is-link
     @click="updateNickname=true"
    ></van-cell>
    <van-cell title="性别" :value="user.gender===0? '男': '女'" is-link @click="updateGender = true"></van-cell>
    <van-cell title="生日" :value="user.birthday" is-link @click="isUpdateBirthdayShow = true"></van-cell>
    <!-- /个人信息 -->

    <!-- 编辑昵称弹出层 -->
    <van-popup
     v-model="updateNickname"
     position="bottom"
     style="height: 100%;background: #f5f7f9"
    >
      <update-nickname
        v-if="updateNickname"
        @close="updateNickname=false"
        v-model="user.name"
      ></update-nickname>
    </van-popup>
    <!-- /编辑昵称弹出层 -->

    <!-- 修改性别弹出层 -->
    <van-popup
     v-if="updateGender"
     v-model="updateGender"
     position="bottom"
    >
    <update-gender
      v-model="user.gender"
      @close="updateGender=false"
    ></update-gender>
    </van-popup>
    <!-- /修改性别弹出层 -->

    <!-- 修改生日弹出层 -->
    <van-popup
     v-model="isUpdateBirthdayShow"
     position="bottom"
    >
    <update-birthday
      v-if="isUpdateBirthdayShow"
      v-model="user.birthday"
      @close="isUpdateBirthdayShow=false"
    ></update-birthday>
    </van-popup>
    <!-- /修改生日弹出层 -->

    <!-- 修改头像弹出层 -->
    <van-popup
     v-model="isUpdatePhotoShow"
     position="top"
     style="height: 100%"
    >
    <update-photo
      v-if="isUpdatePhotoShow"
      :img="img"
      @close="isUpdatePhotoShow=false"
      @update-photo="user.photo = $event"
    ></update-photo>
    </van-popup>
    <!-- /修改头像弹出层 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
// 导入编辑昵称组件
import updateNickname from '@/views/user-profile/components/update-nickname'
// 导入修改昵称组件
import updateGender from '@/views/user-profile/components/update-gender'
// 导入修改生日组件
import updateBirthday from '@/views/user-profile/components/update-birthday'
// 导入修改头像组件
import updatePhoto from '@/views/user-profile/components/update-photo'
export default {
  name: 'userProfile',
  components: {
    updateNickname,
    updateGender,
    updateBirthday,
    updatePhoto
  },
  data () {
    return {
      user: {}, // 用户信息对象
      updateNickname: false, // 控制更新昵称弹出层
      updateGender: false,
      isUpdateBirthdayShow: false, //  控制修改生日弹出层
      isUpdatePhotoShow: false,
      img: null // 想要修改后的图片
    }
  },
  mounted () {

  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        // console.log(data)
        this.user = data.data
      } catch (error) {

      }
    },
    // 选择头像
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文章对象获取  blob   数据
      this.img = window.URL.createObjectURL(file)
      // 显示弹出层
      this.isUpdatePhotoShow = true
      // file-input  如果选了同一个文件不会触发  change  事件
      //  解决办法就是每次使用完毕， 把它的 value  清空
      this.$refs.file.value = null
    }
  }
}
</script>

<style lang="less" scoped>
 .user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
  background-color: #f5f7f9 !important;
}
}
</style>
