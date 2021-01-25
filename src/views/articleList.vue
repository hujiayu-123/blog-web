<template>
  <div class="list">
    <div class="bg"></div>
    <div class="article">
      <h3>{{ titleList[title] }}篇</h3>
      <p style="color:red;margin-top:20px">{{ warning }}</p>
      <el-card
        class="box-card"
        v-for="item in articleList"
        :key="item._id"
        v-loading="isReady"
      >
        <div slot="header" class="clearfix">
          <div class="title" @click="handleDetail(item)">{{ item.title }}</div>
          <div class="author" @click="handleToList(item)">
            {{ item.author }}
          </div>
        </div>
        <div class="text item">
          <div class="info">
            <div class="time">{{ item.timeCreate }}</div>
            <div
              class="del"
              @click="handleDel(item.ids)"
              v-if="item.author === userName"
            >
              删除
            </div>
          </div>
          <div class="aircontent">{{ item.article | filterEditor }}</div>
        </div>
      </el-card>
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
      warning: '',
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
      this.warning = ''
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
          } else {
            this.warning = '该栏目暂未发表文章'
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
.list .bg {
  width: 100%;
  height: 350px;
  background: url(../assets/bg.jpg) no-repeat center bottom;
  background-attachment: fixed;
  text-align: center;
  background-size: cover;
}
.box-card {
  margin-bottom: 20px;
  .el-card__header {
    padding: 0;
  }
  .clearfix {
    display: flex;
    justify-content: space-between;
    line-height: 50px;
    height: 50px;
    padding: 0 20px;
    .title {
      cursor: pointer;
      width: calc(100% - 60px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        color: #e6a23c;
      }
    }
    .author {
      font-size: 14px;
      cursor: pointer;
      color: #e6a23c;
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
      &:hover {
        color: #e6a23c;
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
}
</style>
