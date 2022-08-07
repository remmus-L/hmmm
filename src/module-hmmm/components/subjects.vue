<template>
  <div>
    <el-card>
      <!-- 头部区域 -->
      <div class="title">
        <div class="left">
          <h3>学科名称</h3>
          <el-input
            v-model="input"
            placeholder="请输入内容"
            type="text"
            size="small"
            style="width: 230px; padding: 0 20px"
          ></el-input>
          <el-button size="small" @click="input = ''">清除</el-button>
          <el-button size="small" type="primary" @click="searchHandle"
            >搜索</el-button
          >
        </div>
        <div class="righ">
          <el-button
            type="success"
            icon="el-icon-edit"
            size="small"
            @click="dialogVisible = true"
            >新增学科</el-button
          >
        </div>
      </div>
      <!-- 提示信息 -->
      <el-alert
        :title="`数据一共${total}条`"
        type="info"
        show-icon
        :closable="false"
        style="margin-bottom: 15px"
      >
      </el-alert>
      <!-- 表格数据 -->
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        :header-cell-style="{ background: '#fafafa', color: '#909399' }"
      >
        <el-table-column label="序号" type="index"> </el-table-column>
        <el-table-column prop="subjectName" label="学科名称"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column label="创建时间" width="150">
          <template v-slot="scope">
            {{ scope.row.addDate | parseTimeByString }}
          </template>
        </el-table-column>
        <el-table-column label="前台是否显示">
          <template v-slot="scope">
            {{ scope.row.isFrontDisplay | frontShow }}
          </template>
        </el-table-column>
        <el-table-column prop="twoLevelDirectory" label="二级目录">
        </el-table-column>
        <el-table-column prop="tags" label="标签"> </el-table-column>
        <el-table-column prop="totals" label="题目数量"> </el-table-column>
        <el-table-column label="操作" width="240">
          <template v-slot="scope">
            <el-button type="text" @click="$router.push('/subjects/directorys')"
              >学科分类</el-button
            >
            <el-button type="text" @click="$router.push('/subjects/tags')"
              >学科标签</el-button
            >
            <el-button
              type="text"
              @click="editProject(scope.row.subjectName, scope.row.id)"
              >修改</el-button
            >
            <el-button type="text" @click="deleteProject(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部分页-->
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="10"
          layout="prev,pager,next,sizes,jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 新建学科弹窗 -->
    <el-dialog
      title="新增学科"
      :visible.sync="dialogVisible"
      placeholder="请输入学科名称"
      width="26%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="学科名称" prop="subjectName">
          <el-input
            v-model="ruleForm.subjectName"
            placeholder="请输入学科名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="isShow">
          <el-switch
            v-model="ruleForm.isFrontDisplay"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDialogData">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑学科弹窗 -->
    <el-dialog
      title="修改学科"
      :visible.sync="editDialogVisible"
      placeholder="请输入学科名称"
      width="26%"
    >
      <el-form
        :model="editRuleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="学科名称" prop="subjectName">
          <el-input
            v-model="editRuleForm.subjectName"
            placeholder="请输入学科名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="isShow">
          <el-switch
            v-model="editRuleForm.isFrontDisplay"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditDialogData"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCourseData, submitDialogData, editDialogData, deleteCurrentRowData } from '@/api/cousemanger/course'
export default {
  created () {
    // 获取表格数据
    this.getCourseData()
  },
  data () {
    return {
      // 输入框内容
      input: '',
      // 信息总数
      total: 0,
      // 请求数据
      data: {
        subjectName: '',
        pagesize: 10,
        page: 1
      },
      // 表格数据
      tableData: [],
      // 设置底部分页默认显示页
      currentPage: 1,
      // 控制弹窗是否显示
      dialogVisible: false,
      // 弹窗表单数据
      ruleForm: {
        subjectName: '',
        isFrontDisplay: true
      },
      rules: {
        subjectName: [
          { required: true, message: '请输入学科名称', trigger: 'blur' }
        ]
      },
      // 编辑学科弹窗显示
      editDialogVisible: false,
      editRuleForm: {
        id: '',
        subjectName: '',
        isFrontDisplay: true
      }
    }
  },
  methods: {
    // 获取表格数据
    async getCourseData () {
      const { data: res } = await getCourseData(this.data)
      // console.log(res)
      this.total = res.counts
      this.tableData = res.items
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.data.pagesize = val
      this.getCourseData()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.data.page = val
      this.getCourseData()
    },
    // 搜索功能
    searchHandle () {
      this.data.subjectName = this.input
      this.getCourseData()
    },
    // 提交弹窗数据
    async submitDialogData () {
      this.ruleForm.id = null
      // 处理开关状态
      if (this.ruleForm.isFrontDisplay) {
        this.ruleForm.isFrontDisplay = 1
      } else {
        this.ruleForm.isFrontDisplay = 0
      }
      // 提交数据
      await submitDialogData(this.ruleForm)
      // 重置数据
      this.ruleForm.isFrontDisplay = true
      this.ruleForm.subjectName = ''
      this.dialogVisible = false
      this.getCourseData()
    },
    // 点击修改按钮触发
    editProject (name, id) {
      this.editRuleForm.subjectName = name
      this.editRuleForm.id = id
      this.editDialogVisible = true
    },
    // 提交修改数据
    async submitEditDialogData () {
      // 处理开关状态
      if (this.editRuleForm.isFrontDisplay) {
        this.editRuleForm.isFrontDisplay = 1
      } else {
        this.editRuleForm.isFrontDisplay = 0
      }
      await editDialogData(this.editRuleForm)
      // 重置数据
      this.editRuleForm.isFrontDisplay = true
      this.$message.success('修改成功')
      this.editDialogVisible = false
      this.getCourseData()
    },
    // 删除学科
    deleteProject (data) {
      delete data.username
      // 弹窗确认是否删除
      this.$confirm('此操作将永久删除该学科, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteCurrentRowData(data)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getCourseData()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  computed: {},
  watch: {},
  filters: {
    frontShow (val) {
      if (val === 0) {
        return '否'
      } else {
        return '是'
      }
    }
  },
  components: {}
}
</script>

<style scoped lang='scss'>
.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.left {
  display: flex;
  align-items: center;
}
.block {
  display: flex;
  justify-content: end;
}
</style>
