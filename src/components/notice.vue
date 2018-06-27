<template>
    <transition name="el-fade-in-linear">
        <div>
            <div class="panel-between">
                <div class="panel-start">
                    <ButtonGroup>
                        <!-- <Button type="ghost" ><Icon type="trash-a"></Icon> 删除</Button> -->
                        <Button type="ghost" @click="navTo('/noticeAdd')"><Icon type="android-add"></Icon> 添加公告</Button>
                    </ButtonGroup>
                </div>
                <div class="panel-end">
                  
                    <Select v-model="query.pages.size" style="width:100px;margin-left:20px" @change="changePageSize()">
                        <Option v-for="item in pageSizeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </div>
            <Table border :columns="columns" :data="data" style="margin-top:15px" :loading="tableLoading"></Table>
            <div class="panel-end" style="margin-top:15px">
                <Page :total="total" size="small" show-total show-elevator :page-size="query.pages.size" @on-change="changePage"></Page>
            </div>
            <el-dialog title="排序" :visible.sync="studentModel" width="30%" >
                <Form  label-position="top">

                    <FormItem label="序号">
                        <Input v-model="tempsort" placeholder="序号" />
                    </FormItem>
                    
                </Form>
                <span slot="footer" class="dialog-footer">
                    <Button @click="studentModel = false">取 消</Button>
                    <Button type="primary"  @click="dosort()">确 定</Button>
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
      tempId: "",
      tempsort: 0,
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
        { title: "排序", key: "sort" },

        { title: "标题", key: "title" },
        { title: "联系人", key: "concat" },
        { title: "电话", key: "phone" },
        { title: "到期时间", key: "jzTime" },
        { title: "创建时间", key: "createDate" },
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
                  props: { type: "ghost", size: "small" },
                  on: {
                    click: () => {
                      that.$router.push({
                        path: "/noticeUpdate",
                        query: { msg: JSON.stringify(params.row) }
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: { type: "ghost", size: "small" },
                  on: {
                    click: () => {
                      that.studentModel = true;
                      that.tempId = params.row.sunwouId;
                      that.tempsort = params.row.sort;
                    }
                  }
                },
                "排序"
              ),
              h("Button", {
                props: {
                  type: "ghost",
                  icon: "ios-trash-outline",
                  size: "small"
                },
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
                          url: sessionStorage.getItem("API") + "ad/update",
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
            value: "appid",
            opertionType: "equal",
            opertionValue: JSON.parse(sessionStorage.getItem("user")).sunwouId
          },
          {value: "type", opertionType: "equal", opertionValue: "2"},
          { value: "isDelete", opertionType: "equal", opertionValue: false }
        ],
        sorts: [{ value: "sort", asc: true }],
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
    dosort() {
      $.ajax({
        url: sessionStorage.getItem("API") + "ad/update",
        data: {
          sunwouId: this.tempId,
          sort: this.tempsort
        },
        dataType: "json",
        method: "post",
        success(res) {
          that.studentModel = false
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
        url: sessionStorage.getItem("API") + "ad/find",
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
