<template>
  <div class="success">
    <div class="box">
      <div class="mylist">
        <i class="el-icon-arrow-left"></i>
        管理博文
      </div>
      <div class="content">
        <div class="title">{{ detail.title }}</div>
        <div class="section">{{ content }}</div>
      </div>
      <div class="link">
        <div @click="handleToDetail">
          <i class="el-icon-success icon"></i>发布成功并查看文章<i
            class="el-icon-arrow-right"
          ></i>
        </div>
        <div class="again" @click="hanldeToRelease">再写一篇</div>
      </div>
    </div>
  </div>
</template>
<script>
import { filterEditor } from '../utils'
export default {
  data() {
    return {
      detail: {},
      content: '',
    }
  },
  mounted() {
    console.log(this.$route)
    this.detail = JSON.parse(this.$route.params.detail)
    this.content = filterEditor(this.detail.article)
  },
  methods: {
    handleToDetail() {
      this.$router.push(`/detail/${this.detail.id}`)
    },
    hanldeToRelease() {
      this.$router.push('/release')
    },
  },
}
</script>
<style lang="less" scoped>
.success {
  width: 100%;
  height: 100vh;
  background: #f4f4f4;
  overflow: hidden;
  .box {
    width: 600px;
    height: 380px;
    margin: calc(50vh - 190px) auto;
    background: white;
    border-radius: 4px;
    padding: 20px;
    .mylist {
      color: @themeColor;
      cursor: pointer;
    }
    .content {
      height: 250px;
      margin: 0 auto;
      background: #f5f6f7;
      margin-top: 20px;
      border-radius: 4px;
      padding: 20px;
      box-sizing: border-box;
      .title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .section {
        color: #999;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
      }
    }
    .link {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        color: #67c23a;
        font-size: 16px;
        margin-right: 3px;
      }
      div {
        cursor: pointer;
        color: @themeColor;
        font-size: 14px;
        &:hover {
          text-decoration: underline;
        }
      }
      .again {
        margin-left: 20px;
        font-size: 12px;
      }
    }
  }
}
</style>
