<template>
    <transition name="el-fade-in-linear">
        <div>
            <div class="panel-between">
                <div class="panel-start">
                    <ButtonGroup>
                        <Button type="ghost" ><Icon type="trash-a"></Icon> 删除</Button>
                        <Button type="ghost" ><Icon type="android-arrow-down" color="#ff9933"></Icon> 下架</Button>
                        <Button type="ghost" ><Icon type="android-arrow-up" color="#009966"></Icon> 上架</Button>
                        <Button type="ghost" @click="navTo('/carouselAdd')"><Icon type="android-add"></Icon> 添加广告</Button>
                    </ButtonGroup>
                </div>
                <div class="panel-end">
                    <Input v-model="searchText" placeholder="关键字搜索" style="width:200px">
                        <Button slot="append" icon="ios-search" ></Button>
                    </Input>
                    <Select v-model="pageSize" style="width:100px;margin-left:20px">
                        <Option v-for="item in pageSizeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </div>
            <Table border :columns="columns" :data="data" style="margin-top:15px"></Table>
            <div class="panel-end" style="margin-top:15px">
                <Page :total="15230" size="small" show-total show-elevator :page-size="pageSize"></Page>
            </div>
            
        </div>
    </transition>
</template>

<script>
import carAdd from './carouselAdd.vue'
export default {
  components:{
    carAdd
  },
  data() {
    return {
      carouselModel:false,
      pageSize: 10,
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
        { title: "排序", key: "name" },
        { title: "封面", key: "name" },
        { title: "标题", key: "age" },
        {
          title: "状态",
          key: "age",
          filters: [
            { label: "Greater than 25", value: 1 },
            { label: "Less than 25", value: 2 }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.age > 25;
            } else if (value === 2) {
              return row.age < 25;
            }
          }
        },
        { title: "创建时间", key: "name" },
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
              ),
              h("Button", {
                props: { type: "ghost", icon: "ios-trash-outline" },
                on: {
                  click: () => {
                    console.log(params);
                  }
                }
              })
            ]);
          }
        }
      ],
      data: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        }
      ]
    };
  },
  methods:{
      navTo(path){
          this.$router.push({path:path})
      }
  }
};
</script>
