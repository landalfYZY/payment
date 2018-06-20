<template>
    <transition name="el-fade-in-linear">
        <div style="width:100%">
            <div style="width:100%;text-align:center;margin-top:50px"> 
                <img src="../../assets/logo/logo.png" width="50px" alt="">
                <div class="font-title bold">大家地理后台管理系统</div>
            </div>
            <div class="login-panel" >
                <div style="width:100%;text-align:Center" class="font-title-mini">登录后台开始你的工作</div>
                <Input v-model="login.phone" size="large" style="margin-top:15px" placeholder="手机号" />
                <Input v-model="login.password" size="large" style="margin-top:15px" placeholder="密码" />
                <div class="panel-between" style="margin-top:15px"> 
                    <Checkbox >记住密码</Checkbox>
                    <Checkbox >自动登录</Checkbox>
                </div>
                <Button type="primary" size="large" style="margin-top:15px" long>登录</Button>
                <div class="panel-between" style="margin-top:15px">
                    <a href="#" @click="showModal = true" >忘记密码?</a>
                    <a href="#" @click="regModal = true">注册</a>
                </div>
            </div>
            <div style="width:100%;text-align:center;margin-top:40px" class="font-grey">version 2018 版权归 浙江大家地理信息科技有限公司 所有</div>
            <div style="width:100%;text-align:center;margin-top:5px" class="font-grey" @click="showModal = true"><a href="#" >联系开发人员</a></div>

            <Modal v-model="showModal" title="温馨提示" width="400">
                <p>开发人员太辛苦</p>
                <p><img src="../../assets/img/wxp.jpg" width="100%" alt=""></p>
            </Modal>

            <Modal v-model="regModal" title="注册" width="400" ok-text="立即注册" @on-cancel="registReset('register')" @on-ok="registSubmit('register')">
                <Form ref="register" :model="register" :rules="ruleRegister" :label-width="80" :loading="registLoading" :mask-closable="false">
                    <FormItem label="账号类型" prop="type">
                        <Select v-model="register.type" size="large"  placeholder="账号类型">
                            <Option value="员工" >员工</Option>
                            <Option value="缴费平台" >缴费平台</Option>
                            <Option value="达咖平台" >达咖平台</Option>
                            <Option value="民宿平台" >民宿平台</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="手机号" prop="phone">
                        <Input v-model="register.phone" size="large" placeholder="手机号" />
                    </FormItem>
                    <FormItem label="密码" prop="password">
                        <Input v-model="register.password" size="large" placeholder="密码"  />
                    </FormItem>
                    <FormItem label="确认密码" prop="repwd">
                        <Input v-model="register.repwd" size="large" placeholder="确认密码"  />
                    </FormItem>
                </Form>
            </Modal>
        </div>
    </transition>
</template>
<style>
body {
  background: #f3f3f3;
}
</style>

<script>
export default {
  data() {
    return {
      login: {
        phone: "",
        password: ""
      },
      registLoading:false,
      regModal: false,
      showModal: false,
      register: {
        type: "",
        phone: "",
        password: "",
        repwd: ""
      },
      ruleRegister: {
        type: [{ required: true, message: "账号类型必填", trigger: "change" }],
        phone: [{ required: true, message: "手机号必填", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        repwd: [
          { required: true, message: "确认密码不能为空", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    registSubmit(name) {
      this.registLoading = true
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    registReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

