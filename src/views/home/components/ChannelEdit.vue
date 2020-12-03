<template>
  <div class="channel-edit">
      <!-- 我的频道区域 start-->
    <van-cell title="我的频道" :border="false">
      <van-button
        class="edit-btn"
        slot="default"
        type="danger"
        size="mini"
        round
        plain
        @click="isEdit = !isEdit"
        >{{isEdit ? '完成': '编辑'}}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in myChannels"
        :key="index"
        :text="item.name"
        :icon="isEdit && !fixChannels.includes(item.id) ? 'clear': ''"
        :class="{active: active === index}"
        @click="onMychannelClick(item,index)"
      />
    </van-grid>
    <!-- 我的频道区域 end-->

    <!-- 推荐频道区域 -->
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="grid-item"
        v-for="(value, index) in backChannelList"
        :key="index"
        icon="plus"
        :text="value.name"
        @click="addItem(value)"
      />
    </van-grid>
    <!-- 推荐频道区域 -->
  </div>
</template>

<script>
import { getChannelMethod, addUserChannels, deleteUserChannels } from '@/api/channels'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {

  },
  // 接收父组件传过来的数据
  props: {
    // 通过接收父组件属性的方式接收这个数据
    myChannels: {
      type: Array,
      required: true
    },
    // 控制选项卡高亮
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      channelList: [], // 获取到的所有数据
      isEdit: false, // 是否是编辑状态
      fixChannels: [0] // 不能被编辑的频道ID
    }
  },
  mounted () {

  },
  created () {
    this.getChannelList()
  },
  methods: {
    // 发送请求 获取数据
    async getChannelList () {
      try {
        const { data } = await getChannelMethod()
        // console.log(data)
        this.channelList = data.data.channels
        console.log(this.channelList)
      } catch (error) {

      }
    },
    async onMychannelClick (channel, index) {
      if (this.isEdit) {
        // 删除
        // 不在固定频道
        if (!this.fixChannels.includes(index)) {
          this.myChannels.splice(index, 1)
          if (index <= this.active) {
            this.$emit('update-active', this.active - 1, true)
          }
        }
        if (this.user) {
          // 发送请求
          await deleteUserChannels(channel.id)
        } else {
          // 存储本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } else {
        // 通知父组件
        this.$emit('update-active', index)
      }
    },
    // 添加到我的频道
    async addItem (item) {
      this.myChannels.push(item)
      if (this.user) {
        await addUserChannels({
          id: item.id,
          seq: this.myChannels.length
        })
      } else {
        // 存本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    }
  },
  // 计算属性会观测内部依赖数据的变化
  // 如果依赖的数据发生变化, 则计算属性会重新执行
  computed: {
    ...mapState(['user']),
    // 把我的频道中的选项卡筛选出来
    backChannelList () {
      //   调用数组filter方法  返回一个新的数组
      // 数组的filter 方法：遍历数组，把符合条件的元素存储到新数组中
      return this.channelList.filter(channel => {
        // 数组的find  方法：遍历数组，把符合条件的第一个元素返回
        return !this.myChannels.find(item => {
          return item.id === channel.id
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .van-cell__title {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    &.active {
        .van-grid-item__content .van-grid-item__text {
            color: red !important;
        }
    }
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
