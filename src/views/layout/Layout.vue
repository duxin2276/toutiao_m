<template>
  <div>
      <router-view></router-view>
      <!-- 底部标签栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/home">
        <i slot="icon" class="iconfont toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/video">
        <i slot="icon" class="iconfont toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/my">
        <i slot="icon" class="iconfont toutiao-wode"></i>
        <span class="text">{{$store.state.user?'我的':'未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {

  },
  data () {
    return {
      active: 0
    }
  },
  mounted () {

  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.iconfont {
    font-size: 40px;
}
.text {
    font-size: 20px;
}
</style>
