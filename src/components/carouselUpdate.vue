<template>
    <transition name="el-fade-in-linear">
        <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" >
                <FormItem label="标题" >
                    <Row :gutter="20">
                      <Col :span="12">
                        <Input v-model="formValidate.title" placeholder="标题" />
                      </Col>
                      <Col :span="4" style="text-align:right">序号</Col>
                      <Col :span="7">
                         <Input v-model="formValidate.sort" placeholder="序号" />
                      </Col>
                    </Row>
                </FormItem>
                <FormItem label="联系人">
                    <Row :gutter="20">
                      <Col :span="12">
                        <Input v-model="formValidate.concat" placeholder="联系人" />
                      </Col>
                      <Col :span="4" style="text-align:right">电话</Col>
                      <Col :span="7">
                         <Input v-model="formValidate.phone" placeholder="电话" />
                      </Col>
                    </Row>
                </FormItem>
                <FormItem label="到期时间" >
                    <DatePicker v-model="formValidate.jzTime" type="date" style="width:300px" placeholder="到期时间" ></DatePicker>
                </FormItem>
                <FormItem label="图片" >
                    <Upload :action="api+'file/fileup'" :data="{userId:user.sunwouId}" :on-success="fileSuccess">
                        <Button type="ghost" icon="ios-cloud-upload-outline">点击上传</Button>
                    </Upload>
                </FormItem>
                <FormItem label="广告提供商">
                    <Input v-model="formValidate.shopName" placeholder="广告提供商" />
                </FormItem>
                
                <FormItem label="富文本编辑" prop="desc">
                    <quill-editor style="height:300px" v-model="formValidate.richText"
                            ref="myQuillEditor"
                            :options="editorOption">
                      <div id="toolbar" slot="toolbar">
                        <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-italic"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-underline"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-strike"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-code-block"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-header" value="1"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-header" value="2"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-script" value="sub"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-script" value="super"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-indent" value="-1"></button></span>
                        <span class="ql-formats"><button type="button" class="ql-indent" value="+1"></button></span>
                        <span class="ql-formats"> <button type="button" class="ql-direction" value="rtl"></button></span>
                        <span class="ql-formats"><select class="ql-size">
                          <option value="small"></option>
                          <option selected></option>
                          <option value="large"></option>
                          <option value="huge"></option>
                        </select></span>
                        <span class="ql-formats"><select class="ql-header">
                          <option value="1"></option>
                          <option value="2"></option>
                          <option value="3"></option>
                          <option value="4"></option>
                          <option value="5"></option>
                          <option value="6"></option>
                          <option selected="selected"></option>
                        </select></span>
                        <span class="ql-formats"><select class="ql-color">
                          <option selected="selected"></option>
                          <option value="#e60000"></option>
                          <option value="#ff9900"></option>
                          <option value="#ffff00"></option>
                          <option value="#008a00"></option>
                          <option value="#0066cc"></option>
                          <option value="#9933ff"></option>
                          <option value="#ffffff"></option>
                          <option value="#facccc"></option>
                          <option value="#ffebcc"></option>
                          <option value="#ffffcc"></option>
                          <option value="#cce8cc"></option>
                          <option value="#cce0f5"></option>
                          <option value="#ebd6ff"></option>
                          <option value="#bbbbbb"></option>
                          <option value="#f06666"></option>
                          <option value="#ffc266"></option>
                          <option value="#ffff66"></option>
                          <option value="#66b966"></option>
                          <option value="#66a3e0"></option>
                          <option value="#c285ff"></option>
                          <option value="#888888"></option>
                          <option value="#a10000"></option>
                          <option value="#b26b00"></option>
                          <option value="#b2b200"></option>
                          <option value="#006100"></option>
                          <option value="#0047b2"></option>
                          <option value="#6b24b2"></option>
                          <option value="#444444"></option>
                          <option value="#5c0000"></option>
                          <option value="#663d00"></option>
                          <option value="#666600"></option>
                          <option value="#003700"></option>
                          <option value="#002966"></option>
                          <option value="#3d1466"></option>
                        </select></span>
                        <span class="ql-formats"> <select class="ql-background">
                          <option value="#000000"></option>
                          <option value="#e60000"></option>
                          <option value="#ff9900"></option>
                          <option value="#ffff00"></option>
                          <option value="#008a00"></option>
                          <option value="#0066cc"></option>
                          <option value="#9933ff"></option>
                          <option selected="selected"></option>
                          <option value="#facccc"></option>
                          <option value="#ffebcc"></option>
                          <option value="#ffffcc"></option>
                          <option value="#cce8cc"></option>
                          <option value="#cce0f5"></option>
                          <option value="#ebd6ff"></option>
                          <option value="#bbbbbb"></option>
                          <option value="#f06666"></option>
                          <option value="#ffc266"></option>
                          <option value="#ffff66"></option>
                          <option value="#66b966"></option>
                          <option value="#66a3e0"></option>
                          <option value="#c285ff"></option>
                          <option value="#888888"></option>
                          <option value="#a10000"></option>
                          <option value="#b26b00"></option>
                          <option value="#b2b200"></option>
                          <option value="#006100"></option>
                          <option value="#0047b2"></option>
                          <option value="#6b24b2"></option>
                          <option value="#444444"></option>
                          <option value="#5c0000"></option>
                          <option value="#663d00"></option>
                          <option value="#666600"></option>
                          <option value="#003700"></option>
                          <option value="#002966"></option>
                          <option value="#3d1466"></option>
                        </select></span>
                        <span class="ql-formats"><select class="ql-font">
                          <option selected="selected"></option>
                          <option value="serif"></option>
                          <option value="monospace"></option>
                        </select></span>
                        <span class="ql-formats">
                          <select class="ql-align">
                          <option selected="selected"></option>
                          <option value="center"></option>
                          <option value="right"></option>
                          <option value="justify"></option>
                        </select>
                        </span>
                        <span class="ql-formats">
                            <button type="button" class="ql-clean"></button>
                        </span>
                        <span class="ql-formats">
                            <button type="button" class="ql-link"></button>
                        </span>
                        <span class="ql-formats">
                            <button type="button" @click="studentModel = true">
                              <Icon type="image"  size="18"></Icon>
                            </button>
                        </span>
                        <!-- <span class="ql-formats">
                            <button type="button"><Icon type="ios-film" size="18"></Icon></button>
                        </span> -->
                      </div>
                  </quill-editor>
                </FormItem>
                <div style="height:100px"></div>
                <FormItem>
                    <Button type="primary" @click="submitForm('formValidate')">保存提交</Button>
                </FormItem>
            </Form>
            <el-dialog title="添加图片" :visible.sync="studentModel" width="300px" >
                <Form  label-position="top">
                    <FormItem label="上传图片" >
                        <Upload :action="api+'file/fileup'" :data="{userId:user.sunwouId}" :on-success="fileSuccess2">
                            <Button type="ghost" icon="ios-cloud-upload-outline">点击上传</Button>
                        </Upload>
                    </FormItem>
                </Form>
                <span slot="footer" class="dialog-footer">
                    <Button @click="studentModel = false">取 消</Button>
                    <Button type="primary"  @click="importPho()">确 定</Button>
                </span>
            </el-dialog>
        </div>
    </transition>
</template>
<script>
export default {
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  data() {
    return {
      studentModel:false,
      user: JSON.parse(sessionStorage.getItem("user")),
      api:sessionStorage.getItem("API"),
      editorOption: {
        modules: {
          toolbar: "#toolbar"
        }
      },
      formValidate: {
        appid:JSON.parse(sessionStorage.getItem('user')).sunwouId,
        type:1,
        pic: "",
        title: "",
        richText: "",
        sort: 0,
        concat: "",
        jzTime: "",
        shopName: "",
        phone: ""
      },
      ruleValidate: {
        name: [ { required: true, message: "The name cannot be empty", trigger: "blur" } ],
        
      },
      tempImage:""
      
    };
  },
  mounted(){
    this.formValidate = JSON.parse(this.$route.query.msg)
  },
  methods: {
    submitForm(){
      var that = this;
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
      $.ajax({
        url:sessionStorage.getItem("API") + "ad/update",
        data:this.formValidate,
        dataType:'json',
        method:'post',
        success(res){
          if(res.code){
            that.$router.push({path:'/carousel'})
          }
        }
      })
    },
    importPho(){
      this.editor.insertEmbed(1, "image", this.tempImage);
      this.studentModel = false;
    },
    fileSuccess2(e){
      this.tempImage = e.msg
    },
    fileSuccess(e) {
      this.formValidate.pic = e.msg;
    },

  }
};
</script>