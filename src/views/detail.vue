<template>
  <div class="detail">
    <div class="release"></div>
    <div
      class="content"
      v-loading="isReady"
      element-loading-text="拼命加载中"
      element-loading-background="rgba(0, 0, 0, 0.4)"
    >
      <h1>{{ detail.title }}</h1>
      <div class="auth-info">
        <div class="left">
          <div>
            <el-image :src="require('@/assets/images/original.png')"></el-image>
            <a
              style="display: inline-block;position: absolute;margin: 9px 20px 20px; color:#409eff;font-size:14px"
              ><span class="author" @click="handleToList">{{
                detail.author
              }}</span
              ><span style="margin-left:30px;color:#999AAA">{{
                detail.timeCreate
              }}</span>
              <i class="el-icon-user-solid icon"></i
              ><span class="lookName">{{ detail.hits }}</span></a
            >
          </div>
          <div class="des">
            <div>文章类型：</div>
            <div class="label">{{ detail.type }}</div>
            <div class="label-txt">文章标签：</div>
            <div class="label" v-for="item in detail.label" :key="item">
              {{ item }}
            </div>
          </div>
        </div>
        <div class="right" @click="handleToRelease" v-if="isShow">
          编辑
        </div>
      </div>
      <div
        style="margin-top:15px"
        class="markdown-body"
        v-html="detail.article"
      ></div>
    </div>
  </div>
</template>
<script>
import { articleType } from '../utils'
export default {
  data() {
    return {
      detail: {},
      isReady: true,
      isShow: false,
      articleType,
    }
  },
  mounted() {
    this.handleHits()
    this.getDetail()
  },
  methods: {
    // 添加文章点击量
    handleHits() {
      this.$serve.hits({ id: this.$route.params.id }).then((res) => {
        console.log(res)
      })
    },
    // 获取详情数据
    getDetail() {
      this.$serve
        .detail({
          id: this.$route.params.id,
        })
        .then((res) => {
          if (res.errCode == '0') {
            this.detail = res.article
            this.detail.type = articleType.find(
              (v) => v.value === this.detail.type
            ).name
            this.handleIsRole()
            this.isReady = false
          }
        })
    },
    // 判断是否登录
    handleIsRole() {
      let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
      if (userinfo) {
        if (this.detail.author === userinfo.name) {
          this.isShow = true
        } else {
          this.isShow = false
        }
      } else {
        this.isShow = false
      }
    },
    // 编辑文章
    handleToRelease() {
      let routeUrl = this.$router.resolve({
        path: `/release`,
      })
      localStorage.setItem('editDetail', JSON.stringify(this.detail))
      window.open(routeUrl.href, '_blank')
    },
    // 跳转用户列表
    handleToList() {
      let routeUrl = this.$router.resolve({
        path: `/userlist`,
        query: {
          author: this.detail.author,
        },
      })
      window.open(routeUrl.href, '_blank')
    },
  },
}
</script>
<style lang="less">
.detail {
  overflow: hidden;
  .content .el-image__inner {
    width: 40px;
  }
  .el-loading-parent--relative {
    position: static !important;
  }
  .content {
    width: 80%;
    margin: 0 auto;
    box-sizing: border-box;
    text-align: left;
    margin-top: 80px;
    background: white;
    border-radius: 6px;
    padding: 20px;
    min-height: calc(100vh - 80px);
  }
  .release {
    z-index: -1;
    width: 100%;
    height: 100%;
    background: url(../assets/images/bg.jpg) no-repeat center center;
    background-attachment: fixed;
    background-size: cover;
    position: fixed;
  }
  .auth-info {
    background: #f0f0f0;
    padding: 5px;
    border-radius: 4px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .author {
      cursor: pointer;
      &:hover {
        color: rgb(65, 119, 255);
      }
    }
    .des {
      margin-left: 58px;
      display: flex;
      font-size: 14px;
      color: #999aaa;
      .label-txt {
        margin-left: 20px;
      }
      .label {
        font-size: 12px;
        padding: 1px 4px;
        background: #fff;
        border: 1px solid #eaeaef;
        color: #5094d5;
        border-radius: 4px;
        margin-right: 5px;
      }
    }
    .icon {
      margin-left: 20px;
      color: #999aaa;
    }
    .lookName {
      color: #999aaa;
      margin-left: 5px;
    }
    .right {
      margin-right: 10px;
      cursor: pointer;
      font-size: 13px;
      color: #8fb0c9;
      &:hover {
        color: @themeColor;
      }
    }
  }
}
</style>
