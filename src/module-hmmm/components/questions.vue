<template>
  <div>
    <el-card>
      <div class="top">
        <span class="text">说明：目前支持学科和关键字筛选</span>
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          class="newques"
          >新增试题</el-button
        >
      </div>
      <el-row>
        <el-col :span="6">
          <el-form label-width="80px">
            <el-form-item label="学科">
              <el-select v-model="form.subjectID" placeholder="请选择">
                <el-option label="区域一"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form label-width="80px">
            <el-form-item label="二级目录">
              <el-select v-model="form.catalogID" placeholder="请选择">
                <el-option label="区域一"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form label-width="80px">
            <el-form-item label="标签">
              <el-select v-model="form.tags" placeholder="请选择">
                <el-option label="区域一"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form label-width="80px">
            <el-form-item label="关键字">
              <el-input v-model="form.keyword"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form label-width="80px">
            <el-form-item label="试题类型">
              <el-select
                v-model="form.questionType"
                placeholder="请选择"
              >
                <el-option label="区域一"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form label-width="80px">
            <el-form-item label="难度">
              <el-select v-model="form.difficulty" placeholder="请选择">
                <el-option label="区域一"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form label-width="80px">
            <el-form-item label="方向">
              <el-select v-model="form.direction" placeholder="请选择">
                <el-option label="区域一"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form label-width="80px">
            <el-form-item label="录入人">
              <el-select v-model="form.creatorID" placeholder="请选择">
                <el-option label="区域一"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form label-width="80px">
            <el-form-item label="题目备注">
              <el-input v-model="form.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form label-width="80px">
            <el-form-item label="企业简称">
              <el-input v-model="form.shortName"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form label-width="80px">
            <el-form-item label="城市">
              <el-select v-model="value" placeholder="请选择" class="short">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select v-model="value1" placeholder="请选择" class="short1">
                <el-option
                  v-for="item in options1"
                  :key="item.value1"
                  :label="item.label"
                  :value="item.value1"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" class="butright">
          <el-button type="plain">清除</el-button>
          <el-button type="primary">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      form: {
        subjectID: '',
        catalogID: '',
        tags: '',
        keyword: '',
        questionType: '',
        difficulty: '',
        direction: '',
        creatorID: '',
        remarks: '',
        shortName: '',
        city: '',
        province: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      value: '',
      value1: '',
      options1: [{
        value1: '选项1',
        label: '黄金糕'
      }, {
        value1: '选项2',
        label: '双皮奶'
      }]
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.text {
  color: pink;
  font-size: 12px;
}
/deep/ .el-input__inner {
  width: 270px;
}
/deep/.short .el-input__inner {
  width: 125px !important;
  // margin-right: 20px;
}
/deep/.short1 .el-input__inner {
  width: 125px !important;
  margin-left: 20px;
}
.butright {
  padding-left: 200px;
}
.newques {
  margin-left: 1185px;
}
.top {
  height: 40px;
  width: 100%;
  line-height: 40px;
  margin-bottom: 20px;
}
</style>
