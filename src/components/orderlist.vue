<template>
    <transition name="el-fade-in-linear">
        <div>
            <div class="panel-between">
                <div class="panel-start item-center">
                    <ButtonGroup>
                        <Button type="ghost" @click="navTo('/payList')"><Icon type="ios-arrow-left"></Icon> 返回</Button>
                        <Button type="ghost" @click="sModel = true"><Icon type="ios-upload-outline"></Icon> 退款</Button>
                    </ButtonGroup>
                    <span class="font-grey" style="margin-left:10px">可以按回车进行筛选</span>
                </div>
                <div class="panel-end">
                    <Select v-model="query.pages.size" style="width:100px;margin-left:20px" @on-change="changePageSize()">
                        <Option v-for="item in pageSizeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </div>
            <div style="margin-top:15px" >
                <Row :gutter="5">
                    <Col :span="4">
                        <Input v-model="search1" placeholder="单号 查找" @input="search('sunwouId',1)"  @keydown.enter.native="changePageSize()" />
                    </Col>
                    <Col :span="4">
                        <Select v-model="search2" placeholder="状态 查找" @on-change="search('status',2),changePageSize()"  @keydown.enter.native="changePageSize()">
                            <Option value="待付款" >待付款</Option><Option value="已付款" >已付款</Option><Option value="已取消" >已取消</Option>
                        </Select>
                    </Col>
                    <Col :span="4">
                        <ButtonGroup>
                            <Button @click="changePageSize()">搜索</Button>
                            <Button @click="clearFilter()">清除筛选</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </div>
            <Table ref="selection" border :columns="columns" :data="data" style="margin-top:15px" :loading="tableLoading" @on-selection-change="getSelected"></Table>
            <div class="panel-end" style="margin-top:15px">
                <Page :total="total" size="small" show-total show-elevator :page-size="query.pages.size" @on-change="changePage"></Page>
            </div>
            <el-dialog title="退款" :visible.sync="sModel" width="400px" >
                <Form  label-position="top">
                    <FormItem label="退款金额" >
                        <Input placeholder="退款金额"  v-model="tempValue.amount" />
                        <span>合计退款: ￥{{tempValue.amount*selection.length}}</span>
                    </FormItem>
                    <FormItem label="密码">
                        <Input placeholder="密码" type="password" v-model="tempValue.passWord" />
                    </FormItem>
                </Form>
                <span slot="footer" class="dialog-footer">
                    <Button @click="sModel = false,tempValue.passWord = ''">取 消</Button>
                    <Button type="primary" @click="checkToken()">确认退款</Button>
                </span>
            </el-dialog>
        </div>
    </transition>
</template>

<script>
var that;
import carAdd from "./carouselAdd.vue";
export default {
  components: {
    carAdd
  },
  data() {
    return {
      selection: [],
      sModel: false,
      tempValue: {
        orderId: "",
        userName: JSON.parse(sessionStorage.getItem("user")).userName,
        amount: 0,
        tokenId: sessionStorage.getItem("token"),
        passWord: ""
      },
      search1: "",
      search2: "",
      tableLoading: false,
      total: 0,
      carouselModel: false,
      pageSizeList: [
        { label: "每页 10 条", value: 10 },
        { label: "每页 20 条", value: 20 },
        { label: "每页 30 条", value: 30 },
        { label: "每页 50 条", value: 50 },
        { label: "每页 100 条", value: 100 },
        { label: "每页 500 条", value: 500 },
        { label: "每页 1000 条", value: 1000 },
        { label: "每页 5000 条", value: 5000 },
        { label: "每页 10000 条", value: 10000 }
      ],
      searchText: "",
      columns: [
        { type: "selection", width: 60, align: "center" },
        { title: "单号", key: "sunwouId" },
        {
          title: "学生姓名",
          key: "user.name",
          render: (h, params) => {
            return h("span", params.row.user.name);
          }
        },
        {
          title: "年级",
          key: "user.schoolTime",
          render: (h, params) => {
            return h("span", params.row.user.schoolTime);
          }
        },
        {
          title: "班级",
          key: "need",
          render: (h, params) => {
            return h("span", params.row.user.cl);
          }
        },
        { title: "缴费金额", key: "amount" },
        {
          title: "退款金额",
          key: "refund",
          render: (h, params) => {
            return h("span", params.row.refund ? params.row.refund : 0);
          }
        },
        {
          title: "状态",
          key: "start",
          render: (h, params) => {
            var sl = "warning";
            if (params.row.status == "已付款") {
              sl = "success";
            } else if (params.row.status == "已取消") {
              sl = "info";
            } else if (params.row.status == "已退款") {
              sl = "danger";
            }
            return h(
              "el-tag",
              {
                props: {
                  type: sl,
                  size: "small"
                }
              },
              params.row.status
            );
          }
        }
      ],
      data: [],
      query: {
        fields: [],
        wheres: [
          { value: "goodsId", opertionType: "equal", opertionValue: "" },
          {
            value: JSON.parse(sessionStorage.getItem("user")).appid
              ? "appid"
              : "schoolId",
            opertionType: "equal",
            opertionValue: JSON.parse(sessionStorage.getItem("user")).sunwouId
          }
        ],
        sorts: [{ value: "createTime", asc: false }],
        pages: {
          currentPage: 1,
          size: 10
        }
      }
    };
  },
  mounted() {
    that = this;
    this.query.wheres[0].opertionValue = this.$route.query.id;
    that.getList();
  },
  methods: {
    checkToken() {
      if (sessionStorage.getItem("time") > 120) {
        that.getToken();
      } else {
        that.backMoney();
      }
    },
    getToken() {
      $.ajax({
        url: sessionStorage.getItem("API") + "app/login",
        data: {
          userName: this.user.userName,
          passWord: localStorage.getItem("tempPwd")
        },
        dataType: "json",
        method: "post",
        success(res) {
          if (res.code) {
            that.tempValue.tokenId = res.params.token;
            that.backMoney();
          }
        }
      });
    },
    backMoney() {
      this.tempValue.orderId = this.selection.toString();
      if (this.tempValue.orderId == "") {
        this.$Message.error("请选择一张银行卡");
      } else if (this.tempValue.passWord == "") {
        this.$Message.error("密码不能为空");
      } else {
        $.ajax({
          url: sessionStorage.getItem("API") + "order/tk",
          data: this.tempValue,
          dataType: "json",
          method: "post",
          success(res) {
            that.tempValue.passWord = "";
            that.sModel = false;
            if (res.code) {
              that.$Notice.success({
                title: res.msg
              });
              that.getList();
            } else {
              that.$Notice.error({
                title: "退款失败"
              });
            }
          }
        });
      }
    },
    getSelected(e) {
      var li = [];
      for (var i in e) {
        li.push(e[i].sunwouId);
      }
      that.selection = li;
    },
    clearFilter() {
      this.query.pages.currentPage = 1;
      var li = ["sunwouId", "status"];
      for (var i = 0; i < 2; i++) {
        this["search" + parseInt(i + 1)] = "";
        this.search(li[i], parseInt(i + 1));
      }
      this.getList();
    },
    changePageSize() {
      this.getList();
    },
    changePage(e) {
      this.query.pages.currentPage = e;
      this.getList();
    },
    search(tag, num) {
      var temp = -1;
      for (var i in this.query.wheres) {
        if (this.query.wheres[i].value == tag) {
          temp = i;
        }
      }

      if (temp == -1) {
        if (this["search" + num] != "") {
          this.query.wheres.push({
            value: tag,
            opertionType:
              this["search" + num] == "false" || this["search" + num] == "true"
                ? "equal"
                : "like",
            opertionValue: this["search" + num]
          });
        }
      } else {
        if (this["search" + num] == "") {
          this.query.wheres.splice(temp);
        } else {
          this.query.wheres[temp].opertionValue = this["search" + num];
        }
      }
    },
    getList() {
      this.tableLoading = true;
      $.ajax({
        url: sessionStorage.getItem("API") + "order/find",
        data: { query: JSON.stringify(this.query) },
        method: "post",
        dataType: "json",
        success(res) {
          that.tableLoading = false;
          if (res.code) {
            that.data = res.params.msg;
            that.total = res.params.total;
          }
        }
      });
    },
    navTo(path) {
      this.$router.push({ path: path });
    }
  }
};
</script>
