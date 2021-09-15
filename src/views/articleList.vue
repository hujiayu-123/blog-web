<template>
  <div class="list">
    <div class="bg"></div>
    <div class="article">
      <p class="tip" v-show="articleList.length === 0">
        该栏目暂未发表文章哦，去别处看看吧
      </p>
      <el-timeline>
        <el-timeline-item
          :timestamp="item.timeCreate"
          placement="top"
          v-for="item in articleList"
          :key="item._id"
        >
          <el-card class="box-card">
            <div class="clearfix">
              <h4 class="title" @click="handleDetail(item)">
                {{ item.title }}
              </h4>
              <div class="info">
                <div
                  class="del"
                  @click="handleDel(item.ids)"
                  v-if="item.author === userName"
                >
                  删除
                </div>
                <div class="author" @click="handleToList(item)">
                  {{ item.author }}
                </div>
              </div>
            </div>
            <p class="mat20">{{ item.article | filterEditor }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { filterEditor } from '../utils'
export default {
  data() {
    return {
      moment,
      isReady: true,
      titleList: { zl: '专栏', js: '技术', sh: '生活' },
      title: '',
      articleList: [],
      userName: '',
    }
  },
  created() {
    this.handleSource()
    if (JSON.parse(sessionStorage.getItem('userinfo'))) {
      this.userName = JSON.parse(sessionStorage.getItem('userinfo')).name
    }
  },
  filters: {
    filterEditor(value) {
      return filterEditor(value)
    },
  },
  methods: {
    handleSource() {
      this.title = this.$route.params.type
      this.articleList = []
      let param = this.$route.params
      this.$serve
        .article({
          ...param,
        })
        .then((res) => {
          this.isReady = false
          if (res.errCode == '0') {
            this.articleList = res.article
          }
        })
    },
    handleDel(id) {
      this.$serve
        .delete({
          id: id,
        })
        .then((res) => {
          if (res.errCode == '0') {
            this.handleSource()
            this.$message({
              type: 'success',
              message: '删除成功',
            })
          } else {
            this.$message.error('')
          }
        })
    },
    handleDetail(item) {
      let routeUrl = this.$router.resolve({
        path: `/detail/${item.ids}`,
      })
      window.open(routeUrl.href, '_blank')
    },
    handleToList(item) {
      let routeUrl = this.$router.resolve({
        path: `/userlist`,
        query: {
          author: item.author,
        },
      })
      window.open(routeUrl.href, '_blank')
    },
  },
  watch: {
    $route() {
      // 监听路由变化，加载相应的数据
      this.handleSource()
    },
  },
}
</script>
<style lang="less">
.mat20 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.list .bg {
  width: 100%;
  height: 350px;
  background: url(../assets/images/bg.jpg) no-repeat center bottom;
  background-attachment: fixed;
  text-align: center;
  background-size: cover;
}
.box-card {
  .el-card__header {
    padding: 0;
  }
  .clearfix {
    display: flex;
    justify-content: space-between;
    .title {
      cursor: pointer;
      width: calc(100% - 100px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        color: @themeColor;
      }
    }
    .author {
      font-size: 14px;
      cursor: pointer;
      color: @themeColor;
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    height: 30px;
    align-items: center;
    font-size: 14px;
    color: #999aaa;
    .del {
      display: none;
      cursor: pointer;
      margin-right: 10px;
      &:hover {
        color: @themeColor;
      }
    }
  }
}
.aircontent {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.el-button--primary {
  background: transparent;
  color: #606266;
  border: 0;
}
.el-card__body {
  max-height: 120px;
  &:hover {
    .del {
      display: block;
    }
  }
}
.list {
  text-align: left;
}
.article {
  width: 90%;
  margin: 20px auto;
  padding: 10px 0 0;
  h3 {
    margin-bottom: 20px;
  }
  .tip {
    font-size: 20px;
    color: red;
    margin-top: 20px;
  }
}
</style>
