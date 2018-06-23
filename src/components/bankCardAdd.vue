<template>
    <transition name="el-fade-in-linear">
        <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="开户银行" prop="bankName">
                    <Select  @on-change="chooseBank" style="width:250px">
                        <Option v-for="item in bankList" :value="item.label+item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="银行卡号" prop="number">
                    <Input v-model="formValidate.number" style="width:250px" placeholder="银行卡号" />
                </FormItem>
                <FormItem label="开卡人姓名" prop="name">
                    <Input v-model="formValidate.name" style="width:250px" placeholder="开卡人姓名" />
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
var that;
export default {
  data() {
    return {
      bankList: [
        { label: "工商银行", value: "1002" },
        { label: "农业银行", value: "1005" },
        { label: "中国银行", value: "1026" },
        { label: "建设银行", value: "1003" },
        { label: "招商银行", value: "1001" },
        { label: "邮储银行", value: "1066" },
        { label: "交通银行", value: "1020" },
        { label: "浦发银行", value: "1004" },
        { label: "民生银行", value: "1006" },
        { label: "兴业银行", value: "1009" },
        { label: "平安银行", value: "1010" },
        { label: "中信银行", value: "1021" },
        { label: "华夏银行", value: "1025" },
        { label: "广发银行", value: "1027" },
        { label: "光大银行", value: "1022" },
        { label: "北京银行", value: "1032" },
        { label: "宁波银行", value: "1056" }
      ],
      formValidate: {
        appid:JSON.parse(sessionStorage.getItem("user")).appid ?  JSON.parse(sessionStorage.getItem("user")).sunwouId:JSON.parse(sessionStorage.getItem("user")).appId,
        name: "",
        bankName: "",
        number: "",
        code: "",
        ztName:JSON.parse(sessionStorage.getItem("user")).userName,
        parentid: JSON.parse(sessionStorage.getItem("user")).sunwouId
      },
      ruleValidate: {
        name: [
          { required: true, message: "开卡人姓名 不能为空", trigger: "blur" }
        ],
        bankName: [{ required: true, message: "本选项必选", trigger: "blur" }],
        number: [{ required: true, trigger: "blur", message: "卡号必填" }]
      }
    };
  },
  mounted() {
    that = this;
  },
  methods: {
    chooseBank(e) {
      this.formValidate.bankName = e.substring(0, 4);
      this.formValidate.code = e.substring(4, 8);
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          
            $.ajax({
              url: sessionStorage.getItem("API") + "bank/add",
              data: that.formValidate,
              dataType: "json",
              method: "post",
              success(res) {
                if (res.code) {
                  that.$Notice.success({
                    title: "银行卡添加成功",
                    desc: that.formValidate.name
                  });
                  that.$router.push({ path: "/bankCard" });
                } else {
                  that.$message.error(res.msg);
                }
              }
            });
          
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