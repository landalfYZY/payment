<template>
    <transition name="el-fade-in-linear">
        <div>
            <div class="panel-between">
                <div class="panel-start">
                    <ButtonGroup>
                        <Button type="ghost" ><Icon type="trash-a"></Icon> 删除</Button>
                        <Button type="ghost" @click="navTo('/payAdd')"><Icon type="android-add"></Icon> 添加缴费项</Button>
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
                        <Select v-model="search4" placeholder="缴费状态 查找" @on-change="search('need',3),changePageSize()"  @keydown.enter.native="changePageSize()">
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
            <Table border :columns="columns" :data="data" style="margin-top:15px"></Table>
            <div class="panel-end" style="margin-top:15px">
                <Page :total="total" size="small" show-total show-elevator :page-size="query.pages.size" :on-change="changePage"></Page>
            </div>
            
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
      search1: "",search2: "",search3: "",search4: "",
      total: 0,
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
        { title: "应缴费用统计", key: "totalAmount" },
        { title: "应缴人数统计", key: "totalNumber" },
        {
          title: "状态",
          key: "start",
          render: (h, params) => {
            var sl = "warning";
            if (params.row.need) {
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
                      console.log(params);
                    }
                  }
                },
                ""
              ),
              h(
                "Button",
                {
                  props: { type: "ghost", icon: "reply" },
                  on: {
                    click: () => {
                      that.$router.push({
                        path: "/orderlist",
                        query: { id: params.row.sunwouId }
                      });
                    }
                  }
                },
                "查"
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
            value: JSON.parse(sessionStorage.getItem('user')).appid ? 'appid':'parentId',
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
    changePageSize() {
      this.getList();
    },
    clearFilter() {
      var li = ["describe", "jzTime", "need", "start"];
      for (var i = 0; i < 5; i++) {
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
        this.query.wheres.push({
          value: tag,
          opertionType: "like",
          opertionValue: this["search" + num]
        });
      } else {
        this.query.wheres[temp].opertionValue = this["search" + num];
      }
    },
    getList() {
      $.ajax({
        url: sessionStorage.getItem("API") + "goods/find",
        data: { query: JSON.stringify(this.query) },
        method: "post",
        dataType: "json",
        success(res) {
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
