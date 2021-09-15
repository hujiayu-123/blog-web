<template>
  <div class="release">
    <div class="hidden-xs-only">
      <div class="title">
        <div class="left">
          <el-input
            class="title-input"
            type="text"
            placeholder="请输入内容"
            v-model="title"
            maxlength="100"
            show-word-limit
          />
        </div>
        <div>
          <el-button type="warning" @click="handleShowDialog" round
            >发布文章</el-button
          >
        </div>
      </div>
      <div>
        <mavonEditor
          v-model="formData.content"
          @imgAdd="$imgAdd"
          ref="mavonEditor"
        />
      </div>
    </div>
    <div class="hidden-sm-and-up sorry">
      <el-image :src="require('@/assets/images/sorry.jpg')">
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </el-image>
      <p>手机端无法进行文章发布，打开电脑发布吧</p>
      <p
        style="color:red;margin-top:10px;font-size:14px;cursor: pointer;"
        @click="handleToHome"
      >
        点击我返回首页
      </p>
    </div>
    <el-dialog
      title="发布文章"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item label="文章类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择文章类型">
            <el-option
              v-for="item in articleType"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="文章标签" prop="label">
          <el-select
            v-model="ruleForm.label"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择文章标签"
          >
            <el-option
              v-for="item in articleLabel"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button plain @click="dialogVisible = false">取 消</el-button>
        <el-button type="warning" @click="handleRelease">发布</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import 'element-ui/lib/theme-chalk/display.css'
// 导入组件 及 组件样式
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { articleType, testUrl } from '../utils'
export default {
  components: {
    mavonEditor,
  },
  data() {
    return {
      title: '',
      formData: {
        content: '',
      },
      baseUrl: testUrl,
      dialogVisible: false,
      id: '',
      ruleForm: {
        type: '',
        label: [],
      },
      rules: {
        type: [
          { required: true, message: '请选择文章类型', trigger: 'change' },
        ],
        label: [
          { required: true, message: '请输入文章标签', trigger: 'change' },
        ],
      },
      articleType,
      articleLabel: [
        {
          name: 'HTML',
          value: 'HTML',
        },
        {
          name: 'CSS',
          value: 'CSS',
        },
        {
          name: 'JavaScript',
          value: 'JavaScript',
        },
      ],
    }
  },
  mounted() {
    let editDetail = localStorage.getItem('editDetail')
    if (editDetail) {
      this.handleDetail(editDetail)
      localStorage.removeItem('editDetail')
    }
    this.$nextTick(() => {
      let input = document.querySelector('.op-image .dropdown-item input')
      input.setAttribute('name', 'file')
    })
  },
  methods: {
    handleDetail(editDetail) {
      let detail = JSON.parse(editDetail)
      this.formData.content = detail.articleText
      this.title = detail.title
      this.ruleForm.type = detail.type
      this.ruleForm.label = detail.label
      this.id = detail.ids
    },
    // 将图片上传至服务器，返回地址添加到url中
    $imgAdd(pos, $file) {
      let formdata = new FormData()
      formdata.append('file', $file)
      this.$serve.upload(formdata).then((res) => {
        if (res.errCode === '0') {
          this.$refs.mavonEditor.$img2Url(pos, this.baseUrl + '/' + res.imgUrl)
        }
      })
    },
    handleShowDialog() {
      if (!this.title) {
        this.$message({
          message: '请注意填写标题哦！',
          type: 'warning',
        })
        return
      }
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleRelease() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
          let url = ''
          if (this.id) {
            url = 'edit'
          } else {
            url = 'put'
          }
          let params = {
            title: this.title,
            type: this.ruleForm.type,
            label: this.ruleForm.label,
            articleText: this.$refs.mavonEditor.d_value,
            article: this.$refs.mavonEditor.d_render,
            author: userinfo.name,
            id: this.id,
          }
          this.$serve[url](params).then((res) => {
            if (res.errCode === '0') {
              this.dialogVisible = false
              params.id = res.id
              this.$router.push({
                name: '发布成功',
                params: {
                  detail: JSON.stringify(params),
                },
              })
            }
          })
        }
      })
    },
    handleToHome() {
      this.$router.push('/')
    },
  },
}
</script>
<style lang="less">
.release {
  .title {
    padding: 0 20px;
    height: 60px;
    background: #f3f3f3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      width: 100%;
      .title-input {
        width: 80%;
        .el-input__inner {
          border-radius: 50px;
        }
      }
    }
  }
  .v-note-wrapper {
    height: calc(100vh - 60px);
  }
  .demo-ruleForm {
    .el-select {
      width: 90%;
    }
  }
}

.sorry {
  text-align: center;
  padding-top: 20%;
  box-sizing: border-box;
}
</style>
