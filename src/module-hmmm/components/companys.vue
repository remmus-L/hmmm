<template>
  <div>
    <el-card>
      <!-- 表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
       <el-form-item label="标签名称">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
       </el-form-item>
      <el-form-item label="城市">
        <el-select v-model="formInline.region" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="地区">
        <el-select v-model="formInline.region" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业简称">
        <el-input v-model="formInline.user"></el-input>
       </el-form-item>
        <el-form-item label="状态">
        <el-select v-model="formInline.region" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
         <el-button @click="onSubmit">清除</el-button>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
      </el-form>

      <!-- 提示文案 -->
   <el-alert title="共条记录" type="info" show-icon>{{total}}</el-alert>

   <!-- 表格 -->
   <el-table :data="tableDate" style="width: 100%;">
      <el-table-column prop="id" label="序号" width="150"></el-table-column>
      <el-table-column prop="number" label="企业编号" width="180"></el-table-column>
      <el-table-column prop="shortName" label="企业简称" width="100"></el-table-column>
      <el-table-column prop="tags" label="标签" width="100"></el-table-column>
      <el-table-column prop="creatorID" label="创建者" width="100"></el-table-column>
      <el-table-column prop="addDate" label="创建日期" width="180"></el-table-column>
      <el-table-column prop="remarks" label="备注" width="180"></el-table-column>
      <el-table-column prop="state" label="状态" width="100">
        <template v-slot="scope">
           {{scope.row.state===0 ? '启用' : '禁用'}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" plain icon="el-icon-edit" circle @click="editDialog(scope.row)"></el-button>
          <el-button type="success" plain icon="el-icon-check" circle></el-button>
          <el-button type="danger" plain icon="el-icon-delete" circle @click="del(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.page"
      :page-sizes="[5, 7, 9, 10]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="form.pagesize"
      :total="total">
    </el-pagination>

    <!-- 编辑Dialog -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
     <el-form label-width="130px">
      <el-form-item label="企业名称">
        <el-input style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="所属公司">
        <el-input style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="城市地区">
        <el-select v-model="value" placeholder="请选择" style="margin-right:20px;width:190px">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
       </el-select>
       <el-select v-model="value" placeholder="请选择" style="width:190px">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
       </el-select>
      </el-form-item>
      <el-form-item label="方向(企业标签)">
        <el-input style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="备注" style="margin-left:30px">
        <el-input style="width:400px" type="textarea" :autosize="{ minRows: 2, maxRows: 1000}" placeholder="请输入内容" v-model="textarea1">
</el-input>
      </el-form-item>
     </el-form>
    <div slot="footer" class="footerDiv">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="edit">确 定</el-button>
    </div>
    </el-dialog>

    </el-card>
  </div>
</template>

<script>
import {list,remove} from '@/api/hmmm/companys'
export default {
  created () { 
    this.list()
  },
  data () {
    return {
       formInline: {
          user: '',
          region: ''
        },
        form:{
          page:1,
          pages:1,
          pagesize:7,
        },
        tableDate: [],
        id:'',
        total:null,
        dialogFormVisible: false,
        textarea1:'',
         options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
    }
  },
  methods: {
    onSubmit() {
        console.log('submit!');
      },
      handleCurrentChange(page) {
        this.form.page=page
        this.list()
      },
      handleSizeChange(pagesize) {
        this.form.pagesize=pagesize
        this.list()
      },
      // 获取企业列表数据
      async list(){
        const res=await list(this.form)
        // console.log(res);
        this.tableDate=res.data.items
        this.total=res.data.counts
      },
      // 删除企业列表
      del(id){
        // console.log(id);  
        this.id=id
        // console.log(this.id);
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res1=await remove({id:this.id})
          console.log(res1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
      },
      // 弹出编辑框
      editDialog(){
        this.dialogFormVisible=true
      },
      // 编辑框
      edit(){
        this.dialogFormVisible=false

      }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-form-item{
   margin-left: 30px;
}
.el-form-item:nth-child(5){
  margin-left: 60px;
}
.el-input{
  width: 220px;
}
.el-table-column{
  text-align: center;
}
.footerDiv{
  text-align: center;
}
</style>
