<template>
    <transition name="el-fade-in-linear">
        <div>
            <div class="panel-between">
                <div class="panel-start">
                    <ButtonGroup>
                        <Button type="ghost" ><Icon type="trash-a"></Icon> 删除</Button>
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
            <Table border :columns="columns" :data="data" style="margin-top:15px"></Table>
            <div class="panel-end" style="margin-top:15px">
                <Page :total="total" size="small" show-total show-elevator :page-size="query.pages.size" :on-change="changePage"></Page>
            </div>
            
        </div>
    </transition>
</template>

<script>
var that;
import carAdd from './carouselAdd.vue'
export default {
  components:{
    carAdd
  },
  data() {
    return {
      total:0,
      carouselModel:false,
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
      data: [],
      query:{
          fields:[],
          wheres:[
              {value:'isDelete',opertionType:'equal',opertionValue:false},
          ],
          sorts:[
              {value:'createTime',asc:false}
          ],
          pages:{
              currentPage:1,
              size:10
          }
      }
    };
  },
  mounted(){
      that = this;
      that.getList()
  },
  methods:{
      changePageSize(){
          this.getList()
      },
      changePage(e){
           this.query.pages.currentPage = e;
           this.getList()
      },
      search(){
          var temp = -1;
          for(var i in this.query.wheres){
              if(this.query.wheres[i].value == 'name'){
                  temp = i;
              }
          }

          if(temp == -1){
              this.query.wheres.push({value:'name',opertionType:'like',opertionValue:this.search})
          }else{
               this.query.wheres[temp].opertionValue = this.search
          }
          this.getList()
      },
      getList(){
          $.ajax({
              url:sessionStorage.getItem('API') + 'school/find',
              data:{query:JSON.stringify(this.query)},
              method:'post',
              dataType:'json',
              success(res){
                  if(res.code){
                      that.data = res.params.msg;
                      that.total = res.params.total
                  }
              }
          })
      },
      navTo(path){
          this.$router.push({path:path})
      }
  }
};
</script>
