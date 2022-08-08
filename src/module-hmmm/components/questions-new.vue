<template>
  <el-card style="margin: 0 20px">
    <template #header>试题录入</template>
    <!-- 表单数据 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="学科" prop="name">
        <el-select
          v-model="ruleForm.name"
          placeholder="请选择"
          style="width: 400px"
          @change="subjectInfo"
        >
          <el-option
            :label="item.subjectName"
            :value="item.id"
            v-for="item in subject"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="目录" prop="region">
        <el-select
          v-model="ruleForm.region"
          placeholder="请选择"
          style="width: 400px"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="item in directory"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="date1">
        <el-select
          v-model="ruleForm.date1"
          placeholder="请选择"
          style="width: 400px"
        >
          <el-option
            :label="item.company"
            :value="item.company"
            v-for="item in infoList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 城市选择 -->
      <div style="display: flex">
        <el-form-item label="城市" prop="data2">
          <el-select
            v-model="ruleForm.data2"
            placeholder="请选择"
            style="width: 200px"
            @change="changeCity"
          >
            <el-option
              :label="item"
              :value="item"
              v-for="(item, index) in company"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="data3" label-width="0">
          <el-select
            v-model="ruleForm.date3"
            placeholder="请选择"
            style="width: 200px"
          >
            <el-option
              :label="item"
              :value="item"
              v-for="(item, index) in company1"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>

      <!-- 城市选择 -->

      <el-form-item label="方向" prop="direction">
        <el-select
          v-model="ruleForm.direction"
          placeholder="请选择"
          style="width: 400px"
        >
          <el-option
            :label="item"
            :value="item"
            v-for="(item, index) in direction"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="题型" prop="resource">
        <el-radio-group v-model="ruleForm.resource" @change="radio">
          <el-radio label="单选"></el-radio>
          <el-radio label="多选"></el-radio>
          <el-radio label="简答"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty">
        <el-radio-group v-model="ruleForm.difficulty">
          <el-radio label="简单"></el-radio>
          <el-radio label="一般"></el-radio>
          <el-radio label="困难"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="题干" prop="region">
        <div class="local-quill-editor">
          <quill-editor
            ref="myLQuillEditor"
            v-model="content"
            :options="editorOption"
            class="editor"
            @blur="onEditorBlur"
            @focus="onEditorFocus"
            @change="onEditorChange"
          >
            >
          </quill-editor>
        </div>
      </el-form-item>
      <!-- 选择题答案 -->

      <div v-if="choose">
        <el-form-item label="难度" prop="selects" v-if="isRadio">
          <el-radio-group v-model="ruleForm.chose">
            <el-radio
              class="el-radio-img"
              :label="item.label"
              v-for="(item, index) in chose"
              :key="index"
              style="display: block; margin-top: 60px"
              v-if="length > index"
            >
              {{ item.label }}:
              <el-input style="width: 200px" v-model="item.value"></el-input>
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="item.imgsrc" :src="item.imgsrc" class="avatar" />
                <p
                  class="avatar-uploader-icon"
                  v-else
                  @click="uploadImg(index)"
                >
                  上传图片
                </p>
              </el-upload>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 多选 -->
        <el-form-item label="难度" prop="chose" v-else>
          <el-checkbox-group v-model="ruleForm.chose">
            <el-checkbox
              class="el-radio-img"
              :label="item.label"
              v-for="(item, index) in chose"
              :key="index"
              style="display: block; margin-top: 60px"
              v-if="length > index"
            >
              {{ item.label }}:
              <el-input style="width: 200px" v-model="item.value"></el-input>
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="item.imgsrc" :src="item.imgsrc" class="avatar" />
                <p
                  class="avatar-uploader-icon"
                  v-else
                  @click="uploadImg(index)"
                >
                  上传图片
                </p>
              </el-upload>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" :disabled="doubleChoose" @click="addChoose"
            >+增加选项和答案</el-button
          >
        </el-form-item>
      </div>
      <!-- 选择题答案 -->

      <el-form-item label="解析视频">
        <el-input v-model="ruleForm.video"></el-input>
      </el-form-item>
      <el-form-item label="答案解析" prop="region">
        <div class="local-quill-editor">
          <quill-editor
            ref="myLQuillEditor"
            v-model="answerContent"
            :options="editorOption"
            class="editor"
            @blur="onEditorBlur"
            @focus="onEditorFocus"
            @change="onEditorChange"
          >
            >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item label="题目备注" prop="desc">
        <el-input
          type="textarea"
          v-model="ruleForm.desc"
          :autosize="{ minRows: 4, maxRows: 6 }"
          style="width: 40%"
        ></el-input>
      </el-form-item>
      <el-form-item label="试题标签" prop="tags">
        <el-select
          v-model="ruleForm.tags"
          multiple
          placeholder="请选择活动区域"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="item in tags"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确认提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { list } from '@/api/hmmm/subjects'
import { simple } from '@/api/hmmm/directorys'
import { list as list1 } from '@/api/hmmm/companys'
import { simple as simple1 } from '@/api/hmmm/tags'
import { provinces, citys } from '@/api/hmmm/citys'
import { direction } from '@/api/hmmm/constants'
import { add } from '@/api/hmmm/questions'
// 富文本编辑框
// 引入样式和quillEditor
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
const toolbarOptions = [
  // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ['bold', 'italic', 'underline', 'strike'],
  // 引用  代码块-----['blockquote', 'code-block']
  ['blockquote', 'code-block'],
  // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
  [{ header: 1 }, { header: 2 }],
  // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ list: 'ordered' }, { list: 'bullet' }],
  // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  [{ script: 'sub' }, { script: 'super' }],
  // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  [{ indent: '-1' }, { indent: '+1' }],
  // 文本方向-----[{'direction': 'rtl'}]
  [{ direction: 'rtl' }],
  // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
  [{ size: ['small', false, 'large', 'huge'] }],
  // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{ color: [] }, { background: [] }],
  // 字体种类-----[{ font: [] }]
  [{ font: [] }],
  // 对齐方式-----[{ align: [] }]
  [{ align: [] }],
  // 清除文本格式-----['clean']
  ['clean'],
  // 链接、图片、视频-----['link', 'image', 'video']
  ['image', 'video']
]

export default {
  created () {
    this.simple()
    this.list1()
    this.company = provinces() // 所有城市进行渲染
    this.direction = direction
  },
  data () {
    return {
      imageUrl: '',
      uploadIndex: null,
      // 判断出现单选还是复选康
      isRadio: true,
      // 富文本
      answerContent: '',
      content: '',
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        },
        theme: 'snow',
        placeholder: '请输入正文'
      },
      // 富文本
      // 选择渲染
      chose: [{ label: 'A', value: '', imgsrc: '', isRight: false }, { label: 'B', value: '', imgsrc: '', isRight: false }, { label: 'C', value: '', imgsrc: '', isRight: false }, { label: 'D', value: '', imgsrc: '', isRight: false }, { label: 'E', value: '', imgsrc: '', isRight: false }, { label: 'F', value: '', imgsrc: '', isRight: false }, { label: 'G', value: '', imgsrc: '', isRight: false }],
      length: 4,
      choose: true,
      doubleChoose: true,
      editContent: '',
      subject: [],
      directory: [], // 目录列表
      infoList: [], // 信息列表包括企业等信息
      company: [], // 一级城市
      company1: [], // 二级城市
      direction: [], // 方向
      tags: [], // 试题标签
      ruleForm: {
        name: 10, // 学科
        region: 10, // 目录
        date1: 10, // 企业
        date2: '', // 一级城市
        date3: '', // 二级城市
        delivery: false,
        difficulty: '', // 选择难度
        direction: '',
        type: [],
        resource: '',
        resource2: '',
        desc: '', // 题目备注
        video: '',
        tags: '', // 试题标签
        selects: '', // 单选
        chose: []// 复选
      },
      dialogImageUrl: '',
      dialogVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'change' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        date3: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        direction: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    async list1 () {
      const res = await list1({ pagesize: 100000 })
      // console.log(res)
      this.infoList = res.data.items
      console.log(this.infoList)
    },

    async simple () {
      const res = await list({ page: 1, pagesize: 100 })
      // console.log(res)
      this.subject = res.data.items
    },

    // 整体提交
    async submitForm () {
      this.chose.forEach((item, index) => {
        if (this.ruleForm.chose.length > 1) {
          this.ruleForm.chose.forEach(item1 => { if (item1 === item.label) { item.isRight = true } })
        } else {
          if (item.label === this.ruleForm.chose) {
            item.isRight = true
          }
        }
      })
      this.chose = this.chose.map(item => ({ code: item.label, img: item.imgsrc, title: item.value, isRight: item.isRight }))
      console.log(this.chose)
      const res = await add({
        answer: this.answerContent,
        question: this.content,
        city: this.ruleForm.date3,
        // province: this.ruleForm.date2,
        // difficulty: this.ruleForm.selects,
        questionType: this.ruleForm.resource,
        catalogID: this.ruleForm.region,
        subjectID: this.ruleForm.name,
        enterPriseID: this.ruleForm.date1,
        direction: this.ruleForm.direction,
        videoURL: this.ruleForm.video,
        options: this.chose
      })
      console.log(res)
    },
    async subjectInfo (value, label) {
      const List = []
      this.subject.forEach(item => {
        if (item.subjectName === this.ruleForm.name) {
          List.push(item)
        }
      })
      const res = await simple({ subjectID: value })
      res.data ? this.directory = res.data : this.directory = []
      // console.log(this.directory)
      this.$forceUpdate()
      const res1 = await simple1({ subjectID: value })
      this.tags = res1.data
      console.log(this.tags)
    },

    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    changeCity (value, label) {
      this.company1 = citys(value)
    },
    radio (value) {
      if (value === '单选') {
        this.choose = true
        this.doubleChoose = false
        this.isRadio = true
      } else if (value === '多选') {
        this.choose = true
        this.doubleChoose = false
        this.isRadio = false
      } else {
        this.choose = false
      }
    },
    // 富文本
    // 失去焦点事件
    onEditorBlur (e) {
      console.log('onEditorBlur: ', e)
    },
    // 获得焦点事件
    onEditorFocus (e) {
      console.log('onEditorFocus: ', e)
    },
    // 内容改变事件
    onEditorChange (e) {
      console.log('onEditorChange: ', e)
    },
    addChoose () {
      this.length++
      if (this.length > 7) {
        alert('无法添加了')
      }
    },
    handleAvatarSuccess (res, file) {
      this.chose.forEach((item, index) => { if (index === this.uploadIndex) { item.imgsrc = URL.createObjectURL(file.raw) } })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    uploadImg (index) {
      this.uploadIndex = index
      console.log(this.uploadIndex)
    }
  },
  computed: {},
  watch: {
    directory () {
      this.ruleForm.region = ''
    },
    company1 () {
      this.ruleForm.date3 = ''
    },
    resource () {
      console.log(this.ruleForm.resource)
    }
  },
  filters: {},
  components: {
    quillEditor
  },
  mounted () { }
}
</script>

<style scoped lang='less'>
.el-radio-img {
  margin: 20px 0 10px 10px;
  width: 340px;
  position: relative;
}
/deep/ .el-upload {
  width: 80px;
  height: 60px;
  line-height: 60px;
  position: absolute;
  right: 0;
  top: -15px;
}
/deep/.el-upload-list__item {
  width: 80px;
  height: 60px;
}
.editor {
  height: 100px;
  width: 60%;
  margin-bottom: 80px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 16px;
  color: #8c939d;
  width: 80px;
  height: 60px;
  line-height: 56px;
  text-align: center;
  border: 2px solid black;
}
.avatar {
  width: 80px;
  height: 60px;
  display: block;
}
</style>
