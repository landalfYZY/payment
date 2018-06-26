<template>
    <transition name="el-fade-in-linear">
        <div>
            <div class="panel-between">
                <div class="panel-start">
                    <ButtonGroup>
                        <!-- <Button type="ghost" ><Icon type="trash-a"></Icon> 删除</Button> -->
                        <Button type="ghost" @click="navTo('/schoolAdd')"><Icon type="android-add"></Icon> 添加单位</Button>
                    </ButtonGroup>
                </div>
                <div class="panel-end">
                    <Input v-model="searchText" placeholder="关键字搜索" style="width:200px" @keydown.enter.native="search()">
                        <Button slot="append" icon="ios-search" @click="search()"></Button>
                    </Input>
                    <Select v-model="query.pages.size" style="width:100px;margin-left:20px" @change="changePageSize()">
                        <Option v-for="item in pageSizeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </div>
            <Table border :columns="columns" :data="data" style="margin-top:15px" :loading="tableLoading"></Table>
            <div class="panel-end" style="margin-top:15px">
                <Page :total="total" size="small" show-total show-elevator :page-size="query.pages.size" @on-change="changePage"></Page>
            </div>
            <el-dialog title="修改信息" :visible.sync="studentModel" width="400px" >
                <Form  label-position="top">
                    <FormItem label="单位名称">
                        <Input placeholder="单位名称" v-model="tempValue.name" />
                    </FormItem>
                    <FormItem label="登录名" >
                        <Input placeholder="登录名" v-model="tempValue.userName" />
                    </FormItem>
                    <FormItem label="密码" >
                        <Input placeholder="密码" type="password" v-model="tempValue.passWord" />
                    </FormItem>
                </Form>
                <span slot="footer" class="dialog-footer">
                    <Button @click="studentModel = false">取 消</Button>
                    <Button type="primary" @click="updateSchool()">保存修改</Button>
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
      studentModel: false,
      tempIndex: 0,
      tempValue: {
        name: "",
        userName: "",
        sunwouId: "",
        passWord: ""
      },
      total: 0,
      tableLoading: false,
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
        { title: "ID", key: "sunwouId" },
        { title: "单位名称", key: "name" },
        { title: "登录名", key: "userName" },
        { title: "创建时间", key: "createTime" },
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
                  props: { type: "ghost", icon: "ios-compose-outline" },
                  on: {
                    click: () => {
                      that.studentModel = true;
                      that.tempValue = {
                        name: params.row.name,
                        sunwouId: params.row.sunwouId,
                        userName: params.row.userName
                      };
                    }
                  }
                },
                "编辑"
              ),
              h("Button", {
                props: { type: "ghost", icon: "ios-trash-outline" },
                on: {
                  click: () => {
                    that
                      .$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                      })
                      .then(() => {
                        $.ajax({
                          url: sessionStorage.getItem("API") + "school/update",
                          data: {
                            sunwouId: params.row.sunwouId,
                            isDelete: true
                          },
                          dataType: "json",
                          method: "post",
                          success(res) {
                            if (res.code) {
                              that.$Notice.success({
                                title: "删除成功"
                              });
                              that.getList();
                            } else {
                              that.$Notice.error({
                                title: "删除失败"
                              });
                            }
                          }
                        });
                      })
                      .catch(() => {
                        this.$message({
                          type: "info",
                          message: "已取消删除"
                        });
                      });
                  }
                }
              })
            ]);
          }
        }
      ],
      data: [],
      query: {
        fields: [],
        wheres: [
          {
            value: "appId",
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
    updateSchool() {
      if (this.tempValue.passWord == "") {
        delete this.tempValue.passWord;
      }
      $.ajax({
        url: sessionStorage.getItem("API") + "school/update",
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
    changePage(e) {
      this.query.pages.currentPage = e;
      this.getList();
    },
    search() {
      var temp = -1;
      for (var i in this.query.wheres) {
        if (this.query.wheres[i].value == "name") {
          temp = i;
        }
      }

      if (temp == -1) {
        this.query.wheres.push({
          value: "name",
          opertionType: "like",
          opertionValue: this.search
        });
      } else {
        this.query.wheres[temp].opertionValue = this.search;
      }
      this.getList();
    },
    getList() {
      this.tableLoading = true;
      $.ajax({
        url: sessionStorage.getItem("API") + "school/find",
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
