<template>
    <transition name="el-fade-in-linear">
        <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="缴费项标题" prop="describe">
                    <Input v-model="formValidate.describe" style="width: 250px" placeholder="缴费项标题" />
                </FormItem>
                <FormItem label="缴费金额" prop="amount">
                  <Input v-model="formValidate.amount" style="width: 250px" placeholder="缴费金额" />
                </FormItem>
                <FormItem label="是否是必缴费用" prop="need">
                        <el-switch v-model="formValidate.need" active-text="是" inactive-text="否"> </el-switch>
                </FormItem>
                <FormItem label="截至日期" >
                       <DatePicker  v-model="formValidate.jzTime" type="date" placeholder="截至日期" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="缴费名单选择" prop="query">
                       <Button type="ghost" @click="dialogVisible = true">点击选择缴费名单</Button><span v-if="formValidate.query != ''"> 已选</span>
                       <el-dialog title="选择缴费名单" :visible.sync="dialogVisible"  width="400px" >
                            <payFilter></payFilter>
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
import payFilter from "./payFilter.vue";
var that;
export default {
  components: {
    payFilter
  },
  data() {
    return {
      dialogVisible: false,
      loading:false,
      formValidate: {
        appid: JSON.parse(sessionStorage.getItem('user')).appid ? JSON.parse(sessionStorage.getItem("user")).sunwouId:JSON.parse(sessionStorage.getItem("user")).appId,
        describe: "",
        need: false,
        amount: 0,
        jzTime: "",
        query: "",
        name:JSON.parse(sessionStorage.getItem("user")).userName,
        parentId:JSON.parse(sessionStorage.getItem("user")).sunwouId
      },
      ruleValidate: {
        describe: [
          { required: true, message: "缴费项不能为空", trigger: "blur" }
        ],
        amount: [
          { required: true, message: "缴费金额不能为空", trigger: "blur" }
        ],
        need: [{ required: true }],
        jzTime: [{ required: true, message: "您还没选截至时间" }],
        query: [{ required: true, message: "您还没选缴费名单" }]
      }
    };
  },
  mounted() {
    that = this;
  },
  methods: {
    getMsgs() {
      this.formValidate.query = sessionStorage.getItem("tempPay");
    },
    handleSubmit(name) {
      this.loading = true
      Date.prototype.Format = function(fmt) {
        //author: meizz
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };
      this.formValidate.jzTime = new Date(this.formValidate.jzTime).Format("yyyy-MM-dd");
      this.$refs[name].validate(valid => {
        if (valid) {
          if (that.formValidate.passWord == that.formValidate.pwd) {
            $.ajax({
              url: sessionStorage.getItem("API") + "goods/add",
              data: that.formValidate,
              dataType: "json",
              method: "post",
              success(res) {
                that.loading = false
                if (res.code) {
                  that.$Notice.success({
                    title: "缴费项添加成功",
                    desc: that.formValidate.describe
                  });
                  that.$router.push({path:'/payList'})
                } else {
                  that.$message.error(res.msg);
                }
              }
            });
          } else {
            that.loading = false
            this.$Message.error("密码不一致!");
          }
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