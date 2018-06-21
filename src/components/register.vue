<template>
    <transition name="el-fade-in-linear">
        <div style="width:100%">
            <div style="width:100%;text-align:center;margin-top:50px"> 
                <img src="../assets/logo/logo.png" width="50px" alt="">
                <div class="font-title bold">大家地理后台管理系统</div>
            </div>
            <div class="login-panel" >
                <div style="width:100%;text-align:Center" class="font-title-mini">注册</div>
                <Input v-model="data.userName" size="large" style="margin-top:15px" placeholder="用户名" />
                <Input v-model="data.passWord" type="password" size="large" style="margin-top:15px" placeholder="密码" />
                <Input v-model="data.rep" type="password" size="large" style="margin-top:15px" placeholder="确认密码" />
                <Input v-model="data.appid" size="large" style="margin-top:15px" placeholder="APPID" />
                <Input v-model="data.secertWX" size="large" style="margin-top:15px" placeholder="APP SECRET" />
                <Input v-model="data.mch_id" size="large" style="margin-top:15px" placeholder="商户号" />
                <Input v-model="data.payKeyWX" size="large" style="margin-top:15px" placeholder="商户密钥" />
                <Upload :action="api + 'file/fileup'" style="margin-top:15px"  :data="{userId:data.appid}" :on-success="fileSuccess">
                    <Button type="ghost" icon="ios-cloud-upload-outline">上传证书</Button>
                </Upload>
                <Button type="primary" size="large" style="margin-top:15px" long :loading="registLoading" @click="registSubmit()">立即注册</Button>
                <div class="panel-between" style="margin-top:15px">
                    <router-link to="/login"><a href="#" @click="regModal = true">返回登录</a></router-link>
                </div>
            </div>
            <div style="width:100%;text-align:center;margin-top:40px" class="font-grey">version 2018 版权归 浙江大家地理信息科技有限公司 所有</div>
            <div style="width:100%;text-align:center;margin-top:5px" class="font-grey" @click="showModal = true"><a href="#" >联系开发人员</a></div>

            <Modal v-model="showModal" title="温馨提示" width="400">
                <p>开发人员太辛苦</p>
                <p><img src="../assets/img/wxp.jpg" width="100%" alt=""></p>
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
var that;
export default {
  data() {
    return {
      api:sessionStorage.getItem('API'),
      data: {
        userName: "",
        passWord: "",
        rep:'',
        appid:'',
        secertWX:'',
        mch_id:'',
        payKeyWX:'',
        apiclient_cert:''
      },
      registLoading:false,
      regModal: false,
      showModal: false,
      
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
  mounted() {
      that = this;
  },
  methods: {
    registSubmit() {
      this.registLoading = true;
      if(this.data.passWord == this.data.rep){
          $.ajax({
              url:sessionStorage.getItem('API') + 'app/add',
              data:this.data,
              dataType:'json',
              method:'post',
              success(res){
                  that.registLoading = false;
                    if(res.code){
                        that.$Message.success('注册成功');
                        that.$router.push('/login')
                    }else{
                        this.$Message.error(res.msg);
                    }
              }
          })
      }else{
          this.$Message.error('密码不一致');
          
      }
    },
    fileSuccess(e){
        that.data.apiclient_cert = e.msg
    }
  }
};
</script>

