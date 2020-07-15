<template>
  <div>
    <div class="hidden-xs-only">
      <div class="release"></div>
      <Header />
      <el-form ref="form" :model="form" label-width="70px" class="article1">
        <el-form-item label="文章标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="选择分类">
          <el-select v-model="form.type" placeholder="请选择分类">
            <el-option label="专栏" value="zl"></el-option>
            <el-option label="技术" value="js"></el-option>
            <el-option label="生活" value="sh"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="edit_container">
        <!--  新增时输入 -->
        <div class="article-content">文章内容</div>
        <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)" @change="onEditorChange($event)">
        </quill-editor>
        <!-- 从数据库读取展示 -->
        <div v-html="str" class="ql-editor">
          {{ str }}
        </div>
      </div>
      <div style="width:80%;margin:0 auto;heigth:50px">
        <el-button style="float:right" @click="handlePut" :loading="isReady" type="warning">发布</el-button>
      </div>
    </div>
    <div class="hidden-sm-and-up sorry">
      <el-image :src="require('@/assets/sorry.jpg')">
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </el-image>
      <p>手机端无法进行文章发布，打开电脑发布吧</p>
      <p style="color:red;margin-top:10px;font-size:14px;cursor: pointer;" @click="handleToHome">
        点击我返回首页
      </p>
    </div>
  </div>
</template>
<script>
import Header from '../components/header'
import { quillEditor } from 'vue-quill-editor' //调用编辑器
import quillConfig from '../components/quill-config.js'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  components: {
    quillEditor,
    Header,
  },
  data () {
    return {
      isReady: false,
      content: ``,
      str: '',
      editorOption: quillConfig,
      form: {
        title: '',
        type: '',
        article: '',
      },
    }
  },
  methods: {
    onEditorReady () {
      // 准备编辑器
    },
    onEditorBlur () { }, // 失去焦点事件
    onEditorFocus () { }, // 获得焦点事件
    // 内容改变事件
    onEditorChange (str) {
      this.form.article = str.html
    },
    // 转码
    escapeStringHTML (str) {
      str = str.replace(/&lt;/g, '<')
      str = str.replace(/&gt;/g, '>')
      return str
    },
    // 上传图片
    handleUpdate (file) {
      if (file.includes('<img src="')) {
        let dataurl = file.match(/<img src="(\S*)">/)[1];
        var bytes = window.atob(dataurl.split(',')[1]);
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
        }
        console.log(new Blob([ab], { type: 'image/png' }))
      }

    },
    // 发布
    handlePut () {
      this.isReady = true
      if (
        this.form.title == '' ||
        this.form.type == '' ||
        this.form.article == ''
      ) {
        this.isReady = false
        this.$message({
          type: 'warning',
          message: '以下发布内容缺一不可哦！',
        })
      } else {
        this.handleUpdate(this.form.article)
        let author = JSON.parse(sessionStorage.getItem('userinfo')).name
        let vlaue = { ...this.form, author: author }
        this.$axios
          .post('http://localhost:3000/blog/put', vlaue)
          .then((res) => {
            this.isReady = false
            console.log(res)
            if (res.data.errCode == '0') {
              this.$alert('发布成功，快去看看吧', '提示', {
                confirmButtonText: '知道了',
                // callback: (action) => {
                //   this.$message({
                //     type: 'info',
                //     message: `action: ${action}`,
                //   })
                // },
              })
            } else {
              this.$message.erroe('请联系管理员,他可能崩了')
            }
          })
      }
    },
    handleToHome () {
      this.$router.push('/')
    },
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    },
  },
  mounted () {
    let content = '' // 请求后台返回的内容字符串
    this.str = this.escapeStringHTML(content)
  },
}
</script>
<style>
.el-select {
  width: 100%;
}
.release {
  z-index: -1;
  width: 100%;
  height: 100%;
  filter: alpha(opacity=50);
  -moz-opacity: 0.5;
  -khtml-opacity: 0.5;
  opacity: 0.5;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-attachment: fixed;
  background-size: cover;
  position: fixed;
}
.article1 {
  width: 80%;
  margin: 60px auto;
}
.edit_container {
  width: 80%;
  height: auto;
  text-align: center;
  margin: 0 auto;
}
.article-content {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.quill-editor {
  width: calc(100% - 70px);
  min-height: 300px;
  float: left;
  background: white;
}
.ql-container.ql-snow {
  border: 0;
}
.sorry {
  text-align: center;
  padding-top: 20%;
  box-sizing: border-box;
}
.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px" !important;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px" !important;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px" !important;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px" !important;
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6" !important;
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体" !important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体" !important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体" !important;
}
</style>
