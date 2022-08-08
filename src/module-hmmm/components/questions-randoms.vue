<template>
  <el-card class="card">
    <el-row>
      <el-col :span="20"
        ><div style="display: flex">
          <p style="margin: 8px 10px 0 0; font-weight: 700">关键字</p>
          <el-input
            style="width: 500px"
            placeholder="根据编号搜索"
            v-model="keyWord"
          ></el-input></div
      ></el-col>
      <el-col :span="4"
        ><div style="float: right">
          <el-button>清除</el-button>
          <el-button type="primary">搜索</el-button>
        </div></el-col
      >
    </el-row>
    <el-alert
      :title="`数据一共${num}条`"
      type="info"
      show-icon
      style="margin: 10px 0"
    >
    </el-alert>
    <!-- 表格数据 -->
    <el-table :data="tableData" style="width: 100%" stripe>
      <el-table-column prop="date" label="编号" width="180"> </el-table-column>
      <el-table-column prop="name" label="题型" width="180"> </el-table-column>
      <el-table-column prop="address" label="题目编号"> </el-table-column>
      <el-table-column prop="address" label="录入时间"> </el-table-column>
      <el-table-column prop="address" label="答题时间(S)"> </el-table-column>
      <el-table-column prop="address" label="正确率(%)"> </el-table-column>
      <el-table-column prop="address" label="录入人"> </el-table-column>
      <el-table-column label="操作" width="60">
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      :total="1000"
      layout=" prev, pager, next,sizes, jumper"
      :page-sizes="[20, 30, 50, 100]"
      style="float: right; margin: 10px 0"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { randoms } from '@/api/hmmm/questions'
export default {
  created () {
    this.randoms()
  },
  data () {
    return {
      keyWord: '',
      num: 178,
      list: {
        page: 1,
        pagesize: 10
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    async randoms () {
      const res = await randoms()
      console.log(res)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.card {
  margin: 0 20px;
}
</style>
