<template>
    <transition name="el-fade-in-linear">
        <div>
            <div class="panel-between">
                <div class="panel-start item-center">
                    <ButtonGroup>
                        <Button type="ghost" ><Icon type="trash-a"></Icon> 删除</Button>
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
                        <Input v-model="search1" placeholder="卡号 查找" @input="search('number',1)"  @keydown.enter.native="changePageSize()" />
                    </Col>
                    <Col :span="4">
                        <ButtonGroup>
                            <Button @click="changePageSize()">搜索</Button>
                            <Button @click="clearFilter()">清除筛选</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </div>
            <Table border :columns="columns" :data="data" style="margin-top:15px" :loading="tableLoading"></Table>
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
      search1:'',
      tableLoading: false,
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
        { title: "卡主体", key: "ztName" },
        { title: "开卡银行", key: "bankName" },
        { title: "银行编号", key: "code" },
        { title: "银行卡号", key: "number" },
        { title: "开卡人", key: "name" },
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
                "编辑"
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
            value: JSON.parse(sessionStorage.getItem("user")).appid ? "appid":"parentid",
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
    that.getList();
  },
  methods: {
    clearFilter() {
      var li = ["number"];
      for (var i = 0; i < 5; i++) {
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
      this.tableLoading = true;
      $.ajax({
        url: sessionStorage.getItem("API") + "bank/find",
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
