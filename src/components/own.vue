<template>
    <transition name="el-fade-in-linear">
        <div>
            <Row :gutter="20">
                <Col :span="3"><div class="font-grey font-title-mini">用户名</div></Col>
                <Col :span="4"><div class="font-title-mini">{{user.userName}}</div></Col>
                <!-- <Col :span="4"><Button type="success" size="small" @click="stuModel = true">修改</Button></Col> -->
            </Row>
            <br>
            <Row :gutter="20">
                <Col :span="3"><div class="font-grey font-title-mini">用户ID</div></Col>
                <Col :span="4"><div class="font-title-mini">{{user.sunwouId}}</div></Col>
            </Row>
            <br>
            <Row :gutter="20">
                <Col :span="3"><div class="font-grey font-title-mini">APP ID</div></Col>
                <Col :span="4"><div class="font-title-mini">{{user.appid}}</div></Col>
            </Row>
            <br>
            <Row :gutter="20">
                <Col :span="3"><div class="font-grey font-title-mini">APP SECRET</div></Col>
                <Col :span="4"><div class="font-title-mini">{{user.secertWX}}</div></Col>
            </Row>
            <br>
            <Row :gutter="20">
                <Col :span="3"><div class="font-grey font-title-mini">商户号</div></Col>
                <Col :span="4"><div class="font-title-mini">{{user.mch_id}}</div></Col>
            </Row>
            <br>
            <Row :gutter="20">
                <Col :span="3"><div class="font-grey font-title-mini">商户密钥</div></Col>
                <Col :span="4"><div class="font-title-mini">{{user.payKeyWX}}</div></Col>
            </Row>
            <br>
            <Row :gutter="20">
                <Col :span="3"><div class="font-grey font-title-mini">证书路径</div></Col>
                <Col :span="11"><div class="font-title-mini">{{user.apiclient_cert}}</div></Col>
                <Col :span="10"><Button type="success" size="small" @click="studentModel = true">修改</Button></Col>
            </Row>
            
            <!-- <el-dialog title="修改用户名" :visible.sync="studentModel" width="30%" >
                <Form  label-position="top">
                    <FormItem label="用户名修改" >
                        <Input placeholder="" />
                    </FormItem>
                </Form>
                <span slot="footer" class="dialog-footer">
                    <Button @click="studentModel = false">取 消</Button>
                    <Button type="primary" @click="updateZs()">确 定</Button>
                </span>
            </el-dialog> -->

            <el-dialog title="修改证书" :visible.sync="studentModel" width="30%" >
                <Form  label-position="top">
                    <FormItem label="上传证书" >
                        <Upload :action="api+'file/fileup'" :data="{userId:user.sunwouId}" :on-success="fileSuccess">
                            <Button type="ghost" icon="ios-cloud-upload-outline">点击上传</Button>
                        </Upload>
                    </FormItem>
                </Form>
                <span slot="footer" class="dialog-footer">
                    <Button @click="studentModel = false">取 消</Button>
                    <Button type="primary" @click="updateZs()">确 定</Button>
                </span>
            </el-dialog>
        </div>
    </transition>
</template>

<script>
var that;
export default {
  data() {
    return {
      stuModel:false,
      api:sessionStorage.getItem('API'),
      studentModel: false,
      user: "",
      path_cert: ""
    };
  },
  mounted() {
    that = this;
    this.user = JSON.parse(sessionStorage.getItem("user"));
  },
  methods: {
    fileSuccess(e) {
      this.path_cert = e.msg;
    },
    updateZs() {
      $.ajax({
        url: sessionStorage.getItem("API") + "app/update",
        data: {
          sunwouId: this.user.sunwouId,
          apiclient_cert: this.path_cert
        },
        method: "post",
        dataType: "json",
        success(res) {
          that.studentModel = false
          if (res.code) {
            that.user.apiclient_cert = that.path_cert;
            sessionStorage.setItem("user",JSON.stringify(that.user))
            that.$Notice.success({
              title: "修改成功"
            });
          }
        }
      });
    }
  }
};
</script>
