<template>
    <transition name="el-fade-in-linear">
        <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="身份证号" prop="name">
                    <Input v-model="formValidate.name" placeholder="身份证号" />
                </FormItem>
                <FormItem label="姓名" prop="userName">
                    <Input v-model="formValidate.userName" placeholder="姓名" />
                </FormItem>
                <FormItem label="入学年份" prop="passWord">
                    <Input v-model="formValidate.passWord"  placeholder="入学年份" />
                </FormItem>
                <FormItem label="班级" prop="pwd">
                    <Input v-model="formValidate.pwd"  placeholder="班级" />
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
      formValidate: {
        appId:JSON.parse(sessionStorage.getItem('user')).sunwouId,
        name: "",
        userName:'',
        passWord:'',
        pwd:''
      },
      ruleValidate: {
        name: [
          {  required: true, message: "单位名称不能为空", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "管理员登录名不能为空", trigger: "blur" }
        ],
        passWord:[
            {required: true,trigger: "blur",message: "密码不能为空"}
        ]
        ,
        pwd:[
            {required: true,trigger: "blur",message: "确认密码不能为空"}
        ]
      }
    };
  },
  mounted(){
    that = this
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if(that.formValidate.passWord == that.formValidate.pwd){
              $.ajax({
                  url: sessionStorage.getItem('API') + 'school/add',
                  data:that.formValidate,
                  dataType:'json',
                  method:'post',
                  success(res){
                      if(res.code){
                          that.$Notice.success({
                                title: '单位添加成功',
                                desc:that.formValidate.name
                          });
                          that.$router.push({path:'/school'})
                      }else{
                          that.$message.error(res.msg)
                      }
                  }
              })
          }else{
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