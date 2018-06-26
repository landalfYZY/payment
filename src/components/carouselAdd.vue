<template>
    <transition name="el-fade-in-linear">
        <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" style="width:800px">
                <FormItem label="标题" prop="name">
                    <Input v-model="formValidate.name" placeholder="标题" />
                </FormItem>
                <FormItem label="序号" prop="mail">
                    <Input v-model="formValidate.mail" placeholder="序号" />
                </FormItem>
                <FormItem label="图片" prop="city">
                    <Upload type="drag" action="//jsonplaceholder.typicode.com/posts/">
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>Click or drag files here to upload</p>
                        </div>
                    </Upload>
                </FormItem>
                <FormItem label="到期时间" prop="date">
                    <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                </FormItem>
                <FormItem label="广告提供商" prop="gender">
                    <Input v-model="formValidate.mail" placeholder="广告提供商" />
                </FormItem>
                <FormItem label="联系人" prop="interest">
                    <Input v-model="formValidate.mail" placeholder="联系人" />
                </FormItem>
                <FormItem label="联系电话" prop="interest">
                    <Input v-model="formValidate.mail" placeholder="联系电话" />
                </FormItem>
                <FormItem label="Desc" prop="desc">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
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
export default {
  data() {
    return {
      formValidate: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
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