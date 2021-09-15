<template>
  <div class="userlist">
    <div class="bg"></div>
    <div class="author">{{ author }}</div>
    <div class="section">
      <transition name="el-zoom-in-center">
        <div class="list" v-if="articleList.length !== 0">
          <div class="item" v-for="item in articleList" :key="item.ids">
            <div class="title" @click="handleToDetail(item)">
              {{ item.title }}
            </div>
            <div class="content">
              <a class="content-img">
                <img :src="image[item.type]" alt="" />
              </a>
              {{ item.article | filterEditor }}
            </div>
            <div class="look">
              <el-divider
                @click="handleToDetail(item)"
                content-position="left"
                class="continue"
                >继续阅读</el-divider
              >
              <div class="info">
                <div class="label">
                  <div class="label-txt label-type">
                    {{ filterType(item.type) }}
                  </div>
                  <div class="label-txt" v-for="i in item.label" :key="i">
                    {{ i }}
                  </div>
                </div>
                <div class="look-num">
                  <i class="el-icon-user-solid icon"></i>
                  {{ item.hits }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="list" v-if="articleList.length === 0"></div>
      <div class="catalog">
        <div class="catalog-lay">
          <div class="search">
            <el-input
              v-model="keywords"
              placeholder="输入关键字搜索"
              @keyup.enter.native="handleKeyWord"
            ></el-input>
          </div>
          <div class="typelist">
            <div
              class="item"
              :class="!activeType ? 'active-item' : ''"
              @click="handleType()"
            >
              全部文章
            </div>
            <div
              class="item"
              :class="activeType === item.value ? 'active-item' : ''"
              v-for="item in articleType"
              @click="handleType(item.value)"
              :key="item.value"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { filterEditor, articleType } from '../utils'
export default {
  data() {
    return {
      articleList: [],
      author: '',
      warning: '',
      articleType,
      keywords: '',
      activeType: '',
      image: {
        sh: require('../assets/images/life.jpg'),
        js: require('../assets/images/technology.jpg'),
        zl: require('../assets/images/column.jpg'),
      },
    }
  },
  filters: {
    filterEditor(value) {
      return filterEditor(value)
    },
  },
  mounted() {
    this.author = this.$route.query.author
    this.handelList()
  },
  methods: {
    handleKeyWord() {
      this.handleType(this.activeType)
    },
    handleType(type) {
      this.activeType = type
      this.articleList = []
      this.$serve
        .article({
          type: type ? type : undefined,
          author: this.author,
          keywords: this.keywords ? this.keywords : undefined,
        })
        .then((res) => {
          if (res.errCode === '0') {
            this.articleList = res.article
          }
        })
    },
    handleToDetail(item) {
      let routeUrl = this.$router.resolve({
        path: `/detail/${item.ids}`,
      })
      window.open(routeUrl.href, '_blank')
    },
    filterType(value) {
      return this.articleType.find((v) => v.value === value).name
    },
    handelList() {
      this.$serve.article({ author: this.author }).then((res) => {
        if (res.errCode === '0') {
          this.articleList = res.article
        } else {
          this.warning = '该作者暂无文章'
        }
      })
    },
  },
}
</script>
<style lang="less">
.userlist {
  overflow: hidden;
  .bg {
    z-index: -1;
    width: 100%;
    height: 100%;
    background: url(../assets/images/bg.jpg) no-repeat center center;
    background-attachment: fixed;
    background-size: cover;
    position: fixed;
  }
  .author {
    width: 100%;
    height: 60px;
    background: rgba(0, 0, 0, 0.16);
    position: fixed;
    top: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 10%;
    box-sizing: border-box;
    z-index: 9;
  }
  .section {
    width: 80%;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    margin-top: 70px;
    .list {
      flex: 1;
      .item {
        background: #fff;
        margin-bottom: 20px;
        padding: 20px;
        .title {
          display: flex;
          height: 35px;
          justify-content: space-between;
          border-bottom: 1px solid #e8e9e7;
          cursor: pointer;
          &:hover {
            color: @themeColor;
          }
        }
        .content {
          margin: 20px 0 0 0;
          line-height: 28px;
          position: relative;
          overflow: hidden;
          min-height: 170px;
          max-height: 220px;
          .content-img {
            width: 300px;
            overflow: hidden;
            float: left;
            margin-right: 20px;
            img {
              width: 100%;
            }
          }
        }
        .continue {
          .el-divider__text {
            font-weight: bold;
            cursor: pointer;
            &:hover {
              color: @themeColor;
            }
          }
        }
        .info {
          display: flex;
          justify-content: space-between;
          .label {
            display: flex;
            .label-txt {
              font-size: 12px;
              padding: 1px 4px;
              background: #fff;
              border: 1px solid #eaeaef;
              color: #5094d5;
              border-radius: 4px;
              margin-right: 5px;
            }
            .label-type {
              border: 1px solid #ddc7a7;
              color: @themeColor;
            }
          }
          .look-num {
            color: #787977;
          }
        }
      }
    }
    .catalog {
      width: 300px;
      margin-left: 20px;
      position: relative;
      .catalog-lay {
        position: fixed;
        width: 300px;
        background: #fff;
        .search {
          padding: 20px;
          background: @themeColor;
        }
      }
      .typelist {
        padding: 20px 0;
        .item {
          width: 100%;
          height: 40px;
          line-height: 40px;
          padding: 0 20px;
          box-sizing: border-box;
          cursor: pointer;
          &:hover {
            border-right: 5px solid @themeColor;
            background: rgba(230, 162, 60, 0.3);
          }
        }
        .active-item {
          border-right: 5px solid @themeColor;
          background: rgba(230, 162, 60, 0.3);
        }
      }
    }
  }
}
</style>
