<template>
  <div class="list">
    <HeaderTitle />
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
          <span>{{ item.title }}</span>
          <el-button
            @click="handleDel(item._id)"
            style="float: right; padding: 3px 0;margin-left:10px;backgroup:white"
            type="primary"
            icon="el-icon-delete"
          >
          </el-button>
          <el-button style="float: right; padding: 3px 0" type="text">{{
            item.author
          }}</el-button>
        </div>
        <div class="text item" @click="handleDetail(item)">
          <p style="color:#999AAA;font-size:14px;margin-bottom:8px">
            {{ item.timeCreate }}
          </p>
          <p v-html="item.article"></p>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import HeaderTitle from '../components/headerTitle'
import moment from 'moment'
export default {
  data() {
    return {
      moment,
      isReady: true,
      titleList: { zl: '专栏', js: '技术', sh: '生活' },
      title: '',
      articleList: [],
      warning: '',
    }
  },
  created() {
    this.handleSource()
  },
  methods: {
    handleSource() {
      this.title = this.$route.params.type
      this.warning = ''
      this.articleList = []
      this.$axios
        .post('http://localhost:3000/blog/article', this.$route.params)
        .then((res) => {
          this.isReady = false
          console.log(res)
          if (res.data.errCode == '0') {
            this.articleList = res.data.article
          } else {
            this.warning = res.data.errMsg
          }
        })
    },
    handleDel(id) {
      this.$axios
        .post('http://localhost:3000/blog/delete', {
          id: id,
        })
        .then((res) => {
          console.log(res)
          if (res.data.errCode == '0') {
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
      this.$router.push(`/detail/${item._id}`)
    },
  },
  watch: {
    $route() {
      // 监听路由变化，加载相应的数据
      this.handleSource()
    },
  },
  components: {
    HeaderTitle,
  },
}
</script>
<style>
.el-button--primary {
  background: transparent;
  color: #606266;
  border: 0;
}
.el-card__body {
  max-height: 120px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.list {
  text-align: left;
}
.article {
  width: 90%;
  margin: 20px auto;
}
</style>
