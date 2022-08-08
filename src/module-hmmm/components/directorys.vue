<template>
  <div>
    <el-card>
      <!-- 头部区域 -->
      <div class="title">
        <div class="left">
          <h3>目录名称</h3>
          <el-input
            v-model="input"
            placeholder="请输入内容"
            type="text"
            size="small"
            style="width: 230px; padding: 0 20px"
          ></el-input>
          <h3 style="margin: 0 15px 0 25px">状态</h3>
          <el-select
            v-model="titleSelectValue"
            placeholder="请选择"
            style="margin-right: 10px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
            @click="addDirectory"
            >新增目录</el-button
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
      <!-- 表格 -->
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        :header-cell-style="{ background: '#fafafa', color: '#909399' }"
      >
        <el-table-column label="序号" type="index"> </el-table-column>
        <el-table-column prop="subjectName" label="所属学科"> </el-table-column>
        <el-table-column prop="directoryName" label="目录名称">
        </el-table-column>
        <el-table-column label="创建者" width="150" prop="username">
        </el-table-column>
        <el-table-column label="创建日期">
          <template v-slot="scope">
            {{ scope.row.addDate | parseTimeByString }}
          </template>
        </el-table-column>
        <el-table-column prop="totals" label="面试题数量"> </el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            {{ scope.row.state === 0 ? "未启用" : "已启用" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template v-slot="scope">
            <el-button
              type="text"
              @click="changeState(scope.row.state, scope.row.id)"
              >{{ scope.row.state === 1 ? "禁用" : "启用" }}</el-button
            >
            <el-button
              :disabled="scope.row.state === 1 ? true : false"
              type="text"
              @click="
                editProject(
                  scope.row.subjectID,
                  scope.row.id,
                  scope.row.directoryName
                )
              "
              >修改</el-button
            >
            <el-button
              type="text"
              @click="deleteProject(scope.row)"
              :disabled="scope.row.state === 1 ? true : false"
              >删除</el-button
            >
          </template></el-table-column
        >
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
        <el-card />
      </div>
    </el-card>
    <!-- 新增目录弹窗 -->
    <el-dialog title="新增目录" :visible.sync="dialogVisible" width="26%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="所属学科" prop="option">
          <el-select v-model="dialogSelectValue" placeholder="请选择">
            <el-option
              v-for="item in ruleForm.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目录名称" prop="directoryName">
          <el-input
            v-model.trim="ruleForm.directoryName"
            placeholder="请输入目录名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDialogData">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑学科弹窗 -->
    <el-dialog
      title="修改目录"
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
        <el-form-item label="所属学科" prop="option">
          <el-select
            v-model="dialogSelectValue"
            placeholder="请选择"
            width="100%"
          >
            <el-option
              v-for="item in ruleForm.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目录名称" prop="directoryName">
          <el-input
            v-model="editRuleForm.directoryName"
            placeholder="请输入目录名称"
          ></el-input>
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

import { getDirectorysData, submitDialogData, getOptionData, changeBtnState, editDialogData, deleteCurrentRowData } from '@/api/cousemanger/directorys'
export default {
  created () {
    // 获取表格数据
    this.getDirectorysData()
  },
  data () {
    return {
      // 输入框内容
      input: '',
      // 信息总数
      total: 0,
      // 下拉框的数据
      options: [{
        value: '选项1',
        label: '启用'
      }, {
        value: '选项2',
        label: '禁用'
      }],
      // 头部下拉框的数据
      titleSelectValue: '',
      // 请求数据
      data: {
        directoryName: '',
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
        directoryName: '',
        options: []
      },
      rules: {
        directoryName: [
          { required: true, message: '请输入学科名称', trigger: 'blur' }
        ]
      },
      dialogSelectValue: '', // 弹窗下拉框数据
      // 编辑学科弹窗显示
      editDialogVisible: false,
      editRuleForm: {
        id: '',
        subjectName: '',
        directoryName: ''
      },
      // 按钮状态
      isDisabled: ''
    }
  },
  methods: {
    // 获取表格数据
    async getDirectorysData () {
      const { data: res } = await getDirectorysData(this.data)
      // console.log(res)
      this.total = res.counts
      this.tableData = res.items
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.data.pagesize = val
      this.getDirectorysData()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.data.page = val
      this.getDirectorysData()
    },
    // 搜索功能
    searchHandle () {
      this.data.directoryName = this.input
      this.getDirectorysData()
    },
    // 点击新增目录触发
    async addDirectory () {
      // 将下拉框绑定的值删除
      this.dialogSelectValue = ''
      this.dialogVisible = true
      const res = await getOptionData()
      // 获取弹窗下拉框的数据
      this.ruleForm.options = res.data
    },
    // 提交弹窗数据
    async submitDialogData () {
      const obj = {}
      obj.id = null
      obj.directoryName = this.ruleForm.directoryName
      obj.subjectID = this.dialogSelectValue
      // 提交数据
      await submitDialogData(obj)
      // 重置数据
      this.dialogSelectValue = ''
      this.ruleForm.subjectName = ''
      this.dialogVisible = false
      this.getDirectorysData()
    },
    // 点击修改按钮触发
    async editProject (subjectID, id, directoryName) {
      // 下拉框选中的值
      const res = await getOptionData()
      // 获取弹窗下拉框的数据
      this.ruleForm.options = res.data
      // 下拉框默认显示
      this.dialogSelectValue = subjectID
      // 获取目录名称
      this.editRuleForm.directoryName = directoryName
      this.editRuleForm.id = id
      this.editDialogVisible = true
    },
    // 提交修改数据
    async submitEditDialogData () {
      // 获取选中的学科id
      this.editRuleForm.subjectID = this.dialogSelectValue
      await editDialogData(this.editRuleForm)
      // 重置数据
      this.$message.success('修改成功')
      this.editDialogVisible = false
      this.getDirectorysData()
    },
    // 点击启用/禁用按钮触发
    async changeState (state, id) {
      // console.log(state, id)
      const obj = {}
      obj.id = id
      // 点击改变状态
      if (state === 0) {
        obj.state = 1
      } else {
        obj.state = 0
      }
      await changeBtnState(obj)
      this.tableData.forEach(item => {
        if (item.id === id) {
          item.state = obj.state
        }
      })
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
        this.getDirectorysData()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  computed: {

  },
  watch: {},
  filters: {
    isDisabled (val) {
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
