<template>
    <transition name="el-fade-in-linear">
        <div>
            <div class="panel-between">
                <div class="panel-start item-center">
                    <ButtonGroup>
                        <Button type="ghost" @click="deletestu()"><Icon type="trash-a"></Icon> 删除</Button>
                        <Button type="ghost" @click="navTo('/roleAdd')"><Icon type="android-add"></Icon> 添加角色</Button>
                    </ButtonGroup>
                    <span class="font-grey" style="margin-left:10px">可以按回车进行筛选</span>
                </div>
               
            </div>
            
            <Table ref="selection" border :columns="columns" :data="data" style="margin-top:15px"  :loading="tableLoading"></Table>
 

    
            
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
      asloading:false,
      tempValue:{
        ids:'',
        schoolTime:'',
        name:'',
        cl:''
      },
      stuModel:false,
      selection:[],
      user: JSON.parse(sessionStorage.getItem("user")),
      tableLoading:false,
      api: sessionStorage.getItem("API"),
      schoolId: "",
      schoolList: [],
      excelUrl: "",
      studentModel: false,
      total: 0,
      carouselModel: false,
      pageSizeList: [
        { label: "每页 10 条", value: 10 },
        { label: "每页 20 条", value: 20 },
        { label: "每页 30 条", value: 30 },
        { label: "每页 50 条", value: 50 },
        { label: "每页 100 条", value: 100 },
        { label: "每页 500 条", value: 500 },
      ],
      search1: "",search2: "",search3: "",search4: "",search5: "",search6:'',
      classList: [],
      columns: [
        { type: "selection", width: 60, align: "center" },
        { title: "角色", key: "des" },
        { title: "创建时间", key: "createTime" },
      ],
      data: [],
      
    };
  },
  mounted() {
    that = this;
    that.getList();
  },
  methods: {

    handleClose() {
      this.studentModel = false;
    },
    clearFilter(){
      var li = ['name','sunwouId','gender','schoolTime','cl','schoolId']
      for(var i=0;i<6;i++){
          this['search'+parseInt(i+1)] = '';
          this.search(li[i],parseInt(i+1))
      }
      this.getList();
    },

    fileSuccess(e) {
      that.excelUrl = e.msg;
    },

    getList() {
      this.tableLoading = true
      $.ajax({
        url: sessionStorage.getItem("API") + "role/find",
        data: { groupId:JSON.parse(sessionStorage.getItem('user')).sunwouId},
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
