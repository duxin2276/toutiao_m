<template>
  <div class="article-item">
      <van-cell
       class="article-item"
       :to="{
         name: 'article',
         params:{
           articleId: article.art_id
         }
       }"
       >
      <div slot="title" class="van-multi-ellipsis--l2">{{article.title}}</div>
      <van-image class="right-cover" v-if="article.cover.type === 1" slot="default" width="100" height="100" :src="article.cover.images[0]" fit="cover"/>
      <div slot="label" class="cover-wrap" v-if="article.cover.type === 3">
          <van-image class="cover-itema" slot="default" width="100" v-for="(img,index) in article.cover.images" :key="index" height="100" :src="img" fit="cover"/>
      </div>
       <div class="label-info-wrap" slot="label">
          <span>{{article.aut_name}}</span>
          <span>{{article.comm_count}} 评论</span>
          <span>{{article.pubdate|relativeTime}}</span>
      </div>
      </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  components: {

  },
  data () {
    return {

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
 .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
   .right-cover {
    width: 100%;
    height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }

</style>
