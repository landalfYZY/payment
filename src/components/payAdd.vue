<template>
    <transition name="el-fade-in-linear">
        <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="缴费项标题" prop="describe">
                    <Input v-model="formValidate.describe" placeholder="缴费项标题" />
                </FormItem>
                <FormItem label="缴费金额" prop="amount">
                    <Input v-model="formValidate.amount" placeholder="缴费金额" />
                </FormItem>
                <FormItem label="是否是必缴费用" prop="need">
                        <el-switch v-model="formValidate.need" active-text="是" inactive-text="否"> </el-switch>
                </FormItem>
                <FormItem label="截至日期" >
                       <DatePicker v-model="formValidate.jzTime" type="date" placeholder="截至日期" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="缴费名单选择" prop="query">
                       <Button type="ghost" @click="dialogVisible = true">点击选择缴费名单</Button><span v-if="formValidate.query != ''"> 已选</span>
                       <el-dialog title="选择缴费名单" :visible.sync="dialogVisible"  width="400px" >
                            <payFilter></payFilter>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="getMsgs(),dialogVisible = false">确 定</el-button>
                            </span>
                        </el-dialog>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">保存提交</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </div>
    </transition>
</template>
<script>
import payFilter from './payFilter.vue'
var that;
export default {
  components:{
      payFilter
  },
  data() {
    return {
        dialogVisible:false,
      formValidate: {
        appid: JSON.parse(sessionStorage.getItem("user")).sunwouId,
        describe: "",
        need:false,
        amount:0,
        jzTime:'',
        query:''
      },
      ruleValidate: {
        describe: [
          { required: true, message: "缴费项不能为空", trigger: "blur" }
        ],
        amount: [
          { required: true, message: "缴费金额不能为空", trigger: "blur" }
        ],
        need: [
          { required: true}
        ],
        query: [
          { required: true}
        ],
        
      }
    };
  },
  mounted() {
    that = this;
  },
  methods: {
    getMsgs(){
        console.log(sessionStorage.getItem('tempPay'))
        this.formValidate.query = sessionStorage.getItem('tempPay')
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (that.formValidate.passWord == that.formValidate.pwd) {
            $.ajax({
              url: sessionStorage.getItem("API") + "goods/add",
              data: that.formValidate,
              dataType: "json",
              method: "post",
              success(res) {
                if (res.code) {
                  that.$Notice.success({
                    title: "缴费项添加成功",
                    desc: that.formValidate.describe
                  });
                  
                } else {
                  that.$message.error(res.msg);
                }
              }
            });
          } else {
            this.$Message.error("密码不一致!");
          }
        } else {
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