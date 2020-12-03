<template>
  <div class="home-container">
    <!-- 导航栏 start -->
    <van-nav-bar class="page-nva-bar" fixed>
      <van-button
        class="search-btn"
        icon="search"
        slot="title"
        type="info"
        to="/search"
        round
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 导航栏 end -->

    <!-- 标签栏 start -->
    <van-tabs v-model="active" swipeable animated class="channel-tabs">
      <van-tab :title="item.name" v-for="item in channelsList" :key="item.id"
        ><article-list :chancel="item"></article-list
      ></van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="ischanelShowDialog = true"
      >
        <i class="iconfont toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 标签栏 end -->

    <!-- 弹出层 start -->
    <van-popup
      v-model="ischanelShowDialog"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit
      :myChannels="channelsList"
      :active="active"
      @update-active="updateActive"
      ></channel-edit>
    </van-popup>
    <!-- 弹出层 end -->
  </div>
</template>

<script>
// 导入列表子组件
import ArticleList from '@/components/ArticleList.vue'
import { getUserChannel } from '@/api/user.js'
// 导入编辑弹出层子组件
import ChannelEdit from '@/views/home/components/ChannelEdit'
import { getItem } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channelsList: [], // 定义的数据
      ischanelShowDialog: false // 控制弹出层的显示
    }
  },
  mounted () {

  },
  created () {
    this.getUserChannels()
  },
  methods: {
    async getUserChannels () {
      let channles = []
      const localChannels = getItem('TOUTIAO_CHANNELS')
      if (this.user || !localChannels) {
        // 登录 或者 本地没有存储 获取后端数据
        const { data: { data: { channels } } } = await getUserChannel()
        // console.log(channels)
        this.channelsList = channels
        return false
      } else {
        // 未登录并且本地没有数据
        channles = localChannels
      }
      this.channelsList = channles
    },
    updateActive (index, showChannelEditDialog = false) {
      this.active = index
      // 关闭弹出层
      this.ischanelShowDialog = showChannelEditDialog
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
  }
}

.van-icon {
  color: #fff;
}
.home-container {
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .van-nav-bar {
    background-color: #3296fa;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
}
/deep/ .channel-tabs {
  // .van-tabs__wrap {
  //   position: fixed;
  //   top: 92px;
  //   z-index: 1;
  //   left: 0;
  //   right: 0;
  //   height: 82px;
  // }

  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    font-size: 30px;
    color: #777777;
  }

  .van-tab--active {
    color: #333333;
  }

  .van-tabs__nav {
    padding-bottom: 0;
  }

  .van-tabs__line {
    bottom: 8px;
    width: 31px !important;
    height: 6px;
    background-color: #3296fa;
  }
}
.placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}

.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  background-color: rgba(255, 255, 255, 0.902);
  i.toutiao {
    font-size: 33px;
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 58px;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
</style>
