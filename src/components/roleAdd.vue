<template>
    <transition name="el-fade-in-linear">
        <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="角色名称" prop="role">
                    <Input v-model="formValidate.role" style="width: 250px" placeholder="角色名称" />
                </FormItem>
                <FormItem label="描述" prop="des">
                  <Input v-model="formValidate.des" style="width: 250px" placeholder="描述" />
                </FormItem>
               
                <FormItem label="缴费名单选择" prop="query">
                       <Button type="ghost" @click="dialogVisible = true">点击选择权限</Button><span v-if="formValidate.permissionId != ''"> 已选</span>
                       <el-dialog title="选择权限" :visible.sync="dialogVisible"  width="800px" >
                            <role></role>
                            <span slot="footer" class="dialog-footer">
                                <Button @click="dialogVisible = false">取 消</Button>
                                <Button type="primary" @click="getMsgs(),dialogVisible = false">确 定</Button>
                            </span>
                        </el-dialog>
                </FormItem>
                <FormItem>
                    <Button type="primary" :loading="loading" @click="handleSubmit('formValidate')">保存提交</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </div>
    </transition>
</template>
<script>
import role from "./power.vue";
var that;
export default {
  components: {
    role
  },
  data() {
    return {
      dialogVisible: false,
      loading:false,
      formValidate: {
        groupId: JSON.parse(sessionStorage.getItem("user")).sunwouId,
        des: "",
        role: "",
        permissionId: ""
      },
      ruleValidate: {
        des: [
          { required: true, message: "描述不能为空", trigger: "blur" }
        ],
        role: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
        permissionId: [{ required: true, message: "请选择权限" }]
      }
    };
  },
  mounted() {
    that = this;
  },
  methods: {
    getMsgs() {
      this.formValidate.permissionId = sessionStorage.getItem("power");
    },
    handleSubmit(name) {
      this.loading = true;
      this.$refs[name].validate(valid => {
        if (valid) {
          
            $.ajax({
              url: sessionStorage.getItem("API") + "role/add",
              data: that.formValidate,
              dataType: "json",
              method: "post",
              success(res) {
                that.loading = false
                if (res.code) {
                  that.$Notice.success({
                    title: "权限添加成功",
                    desc: that.formValidate.des
                  });
                  that.$router.push({path:'/role'})
                } else {
                  that.$message.error(res.msg);
                }
              }
            });
       
        } else {
          that.loading = false
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>