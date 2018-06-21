<template>
    <transition name="el-fade-in-linear">
        <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="单位名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="单位名称" />
                </FormItem>
                <FormItem label="管理员登录名" prop="userName">
                    <Input v-model="formValidate.userName" placeholder="管理员登录名" />
                </FormItem>
                <FormItem label="密码" prop="passWord">
                    <Input v-model="formValidate.passWord" type="password" placeholder="密码" />
                </FormItem>
                <FormItem label="确认密码" prop="pwd">
                    <Input v-model="formValidate.pwd" type="password" placeholder="确认密码" />
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