<template>
  <!-- 选择题答案 -->
  <div v-if="choose">
    <el-form-item label="难度" prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio class="el-radio-img">
          A:
          <el-input style="width: 200px"></el-input>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            上传图片
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-radio>
        <br />
        <el-radio class="el-radio-img">
          B:
          <el-input style="width: 200px"></el-input>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            上传图片
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-radio>
        <br />
        <el-radio class="el-radio-img">
          C:
          <el-input style="width: 200px"></el-input>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            上传图片
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-radio>
        <br />
        <el-radio class="el-radio-img">
          D:
          <el-input style="width: 200px"></el-input>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            上传图片
          </el-upload>
          <el-dialog
            :visible.sync="dialogVisible"
            style="width: 80px; height: 60px"
          >
            <img :src="dialogImageUrl" alt="" width="100%" />
          </el-dialog>
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="danger" :disabled="doubleChoose"
        >+增加选项和答案</el-button
      >
    </el-form-item>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
</style>
