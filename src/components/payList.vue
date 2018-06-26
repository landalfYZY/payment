<template>
    <transition name="el-fade-in-linear">
        <div>
            <div class="panel-between">
                <div class="panel-start">
                    <ButtonGroup>
                        <Button type="ghost" @click="deleteJf()"><Icon type="trash-a"></Icon> 删除</Button>
                        <Button type="ghost" @click="outputData()"><Icon type="ios-upload-outline"></Icon> 导出数据</Button>
                        <Button type="ghost" @click="navTo('/payAdd')"><Icon type="android-add"></Icon> 添加缴费项</Button>
                    </ButtonGroup>
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
                        <Input v-model="search1" placeholder="缴费项 查找" @input="search('describe',1)"  @keydown.enter.native="changePageSize()" />
                    </Col>
                    <Col :span="4">
                        <Input v-model="search2" placeholder="截至日期 查找" @input="search('jzTime',2)" @keydown.enter.native="changePageSize()" />
                    </Col>
                    <Col :span="4">
                        <Select v-model="search3" placeholder="是否必缴 查找" @on-change="search('need',3),changePageSize()"  @keydown.enter.native="changePageSize()">
                            <Option value="false" >选缴</Option><Option value="true" >必缴</Option>
                        </Select>
                    </Col>
                    <Col :span="4">
                        <Select v-model="search4" placeholder="缴费状态 查找" @on-change="search('start',4),changePageSize()"  @keydown.enter.native="changePageSize()">
                            <Option value="false" >关闭</Option><Option value="true" >开启</Option>
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
            <Table border ref="selection"  :columns="columns" :data="data" style="margin-top:15px" @on-selection-change="getSelected" :loading="tableLoading"></Table>
            <div class="panel-end" style="margin-top:15px">
                <Page :total="total" size="small" show-total show-elevator :page-size="query.pages.size" :on-change="changePage"></Page>
            </div>
            <el-dialog title="修改信息" :visible.sync="studentModel" width="400px" >
                <Form  label-position="top">
                    <FormItem label="缴费项名称">
                        <Input placeholder="缴费项名称" v-model="tempValue.describe" />
                    </FormItem>
                    <FormItem label="截止时间" >
                        <DatePicker v-model="tempValue.jzTime" type="date" format="yyyy-MM-dd" placeholder="截止时间" ></DatePicker>
                    </FormItem>
                    <FormItem label="状态" >
                        <el-switch
                          v-model="tempValue.start"
                          active-text="开启缴费"
                          inactive-text="关闭缴费">
                        </el-switch>
                    </FormItem>
                </Form>
                <span slot="footer" class="dialog-footer">
                    <Button @click="studentModel = false">取 消</Button>
                    <Button type="primary" @click="updateJf()">保存修改</Button>
                </span>
            </el-dialog>

            <el-dialog title="提现" :visible.sync="sModel" width="400px" >
                <Form  label-position="top">
                    <FormItem label="选择银行卡" >
                        <Select v-model="tempCard.bankId" >
                          <Option v-for="(item,index) in bankList" :key="index" :value="item.sunwouId" :label="item.bankName">
                              <span>{{item.bankName}}</span>
                              <span>{{item.name}}</span>
                              <span>{{item.code}}</span>
                              <span style="float:right;">{{item.number}}</span>
                          </Option>
                      </Select>
                    </FormItem>
                    <FormItem label="密码">
                        <Input placeholder="密码" type="password" v-model="tempCard.passWord" />
                    </FormItem>
                </Form>
                <span slot="footer" class="dialog-footer">
                    <Button @click="sModel = false,tempCard.passWord = ''">取 消</Button>
                    <Button type="primary" @click="chargeMoney()">确认提现</Button>
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
      sModel: false,
      tableLoading:false,
      selection: [],
      tempValue: {
        goodsId: "",
        describe: "",
        jzTime: "",
        start: ""
      },
      tempIndex: 0,
      studentModel: false,
      search1: "",
      search2: "",
      search3: "",
      search4: "",
      total: 0,
      bankList: [],
      tempCard: {
        bankId: "",
        tokenId: sessionStorage.getItem("token"),
        userName: JSON.parse(sessionStorage.getItem("user")).userName,
        passWord: ""
      },
      carouselModel: false,
      pageSizeList: [
        { label: "每页 10 条", value: 10 },
        { label: "每页 20 条", value: 20 },
        { label: "每页 30 条", value: 30 },
        { label: "每页 50 条", value: 50 },
        { label: "每页 100 条", value: 100 }
      ],
      searchText: "",
      columns: [
        { type: "selection", width: 60, align: "center" },
        { title: "缴费主体", key: "name" },
        { title: "缴费项", key: "describe" },
        { title: "截止时间", key: "jzTime" },
        {
          title: "是否必缴",
          key: "need",
          render: (h, params) => {
            var sl = "success";
            if (params.row.need) {
              sl = "primary";
            }
            return h(
              "el-tag",
              {
                props: {
                  type: sl,
                  size: "small"
                }
              },
              params.row.need ? "必缴" : "选缴"
            );
          }
        },
        { title: "缴费金额", key: "amount" },
        { title: "应缴费用", key: "totalAmount" },
        { title: "应/选缴人数", key: "totalNumber" },
        { title: "不缴人数", key: "noNeed" },
        { title: "已缴人数", key: "realNumber" },
        { title: "已缴费", render:(h,params)=>{
          return h("span",params.row.realNumber*params.row.amount)
        } },
        {
          title: "状态",
          key: "start",
          render: (h, params) => {
            var sl = "warning";
            if (params.row.start) {
              sl = "success";
            }
            return h(
              "el-tag",
              {
                props: {
                  type: sl,
                  size: "small"
                }
              },
              params.row.start ? "缴费中" : "已关闭"
            );
          }
        },
        { title: "创建日期", key: "createDate" },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("ButtonGroup", [
              h(
                "Button",
                {
                  props: {
                    type: "ghost",
                    icon: "ios-compose-outline",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      that.studentModel = true;
                      that.tempIndex = params.index;
                      that.tempValue = {
                        goodsId: params.row.sunwouId,
                        describe: params.row.describe,
                        jzTime: params.row.jzTime,
                        start: params.row.start
                      };
                    }
                  }
                },
                ""
              ),
              h(
                "Button",
                {
                  props: { type: "ghost", size: "small" },
                  on: {
                    click: () => {
                      that.$router.push({
                        path: "/orderlist",
                        query: { id: params.row.sunwouId }
                      });
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: { type: "ghost", size: "small" },
                  on: {
                    click: () => {
                      that.sModel = true;
                      that.getBank();
                    }
                  }
                },
                "提现"
              )
            ]);
          }
        }
      ],
      data: [],
      query: {
        fields: [],
        wheres: [
          {
            value: JSON.parse(sessionStorage.getItem("user")).appid
              ? "appid"
              : "parentId",
            opertionType: "equal",
            opertionValue: JSON.parse(sessionStorage.getItem("user")).sunwouId
          },
          { value: "isDelete", opertionType: "equal", opertionValue: false }
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
    that.getList();
  },
  methods: {
    chargeMoney() {
      if (this.tempCard.bankId == "") {
        this.$Message.error("请选择一张银行卡");
      } else if (this.tempCard.passWord == "") {
        this.$Message.error("密码不能为空");
      } else {
        $.ajax({
          url: sessionStorage.getItem("API") + "goods/tx",
          data: this.tempCard,
          dataType: "json",
          method: "post",
          success(res) {
            that.tempCard.passWord = ""
            that.sModel = false;
            if (res.code) {
              that.$Notice.success({
                title: "提现成功"
              });
              that.getList();
            } else {
              that.$Notice.error({
                title: "提现失败"
              });
            }
          }
        });
      }
    },
    getBank() {
      $.ajax({
        url: sessionStorage.getItem("API") + "bank/find",
        data: {
          query: JSON.stringify({
            fields: [],
            wheres: [
              {
                value: "parentid",
                opertionType: "equal",
                opertionValue: JSON.parse(sessionStorage.getItem("user"))
                  .sunwouId
              }
            ],
            sorts: [{ value: "createTime", asc: false }],
            pages: {
              currentPage: 1,
              size: 10000
            }
          })
        },
        method: "post",
        dataType: "json",
        success(res) {
          that.tableLoading = false;
          if (res.code) {
            that.bankList = res.params.msg;
          }
        }
      });
    },
    outputData() {
      this.$refs.selection.exportCsv({
        filename:
          "jf-" +
          new Date().getFullYear() +
          (new Date().getMonth() + 1) +
          new Date().getDate(),
        columns: this.columns,
        data: this.data
      });
    },
    getSelected(e) {
      var li = [];
      for (var i in e) {
        li.push(e[i].sunwouId);
      }
      that.selection = li;
    },
    deleteJf() {
      if (this.selection.length == 0) {
        this.$Notice.warning({
          title: "请选择删除项"
        });
      } else {
        that.$Modal.confirm({
          title: "警告",
          content: "<p>此操作将永久删除改信息，是否继续？</p>",
          onOk() {
            $.ajax({
              url: sessionStorage.getItem("API") + "goods/update",
              data: {
                goodsId: that.selection.toString(),
                isDelete: true
              },
              dataType: "json",
              method: "post",
              success(res) {
                that.studentModel = false;
                if (res.code) {
                  that.$Notice.success({
                    title: res.msg
                  });
                  that.getList();
                } else {
                  that.$Notice.error({
                    title: res.msg
                  });
                }
              }
            });
          },
          onCancel() {
            that.$Message.info("已取消");
          }
        });
      }
    },
    updateJf() {
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
      this.tempValue.jzTime = new Date(this.tempValue.jzTime).Format(
        "yyyy-MM-dd"
      );
      $.ajax({
        url: sessionStorage.getItem("API") + "goods/update",
        data: this.tempValue,
        dataType: "json",
        method: "post",
        success(res) {
          that.studentModel = false;
          if (res.code) {
            that.$Notice.success({
              title: "修改成功"
            });
            that.getList();
          } else {
            that.$Notice.error({
              title: "修改失败"
            });
          }
        }
      });
    },
    changePageSize() {
      this.getList();
    },
    clearFilter() {
      var li = ["describe", "jzTime", "need", "start"];
      for (var i = 0; i < 4; i++) {
        this["search" + parseInt(i + 1)] = "";
        this.search(li[i], parseInt(i + 1));
      }
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
      this.tableLoading = true
      $.ajax({
        url: sessionStorage.getItem("API") + "goods/find",
        data: { query: JSON.stringify(this.query) },
        method: "post",
        dataType: "json",
        success(res) {
          that.tableLoading = false
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
