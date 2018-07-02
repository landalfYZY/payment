<template>
    <transition name="el-fade-in-linear">
        <div>
            <div class="panel-between">
                <div class="panel-start item-center">
                    <ButtonGroup>
                    </ButtonGroup>
                </div>
                
            </div>
           
            <Table ref="selection" border :columns="columns" :data="data" style="margin-top:15px" @on-selection-change="getMsgs" :loading="tableLoading"></Table>


            
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
        { label: "每页 1000 条", value: 1000 },
        { label: "每页 5000 条", value: 5000 },
        { label: "每页 10000 条", value: 10000 }
      ],
      search1: "",search2: "",search3: "",search4: "",search5: "",search6:'',
      classList: [],
      columns: [
        { type: "selection", width: 60, align: "center" },
        { title: "权限名称", key: "des" },
        { title: "接口", key: "permission" },
        { title: "编码", key: "sunwouId" },
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

   
    fileSuccess(e) {
      that.excelUrl = e.msg;
    },
    getMsgs(e){
        var str = [];
        for(var i in e){
            str.push(e.sunwouId)
        }
        sessionStorage.setItem("power",str.toString())
    },
    changePageSize() {
      this.getList();
    },
    changePage(e) {
      this.query.pages.currentPage = e;
      this.getList();
    },
    search(tag,num) {
      var temp = -1;
      for (var i in this.query.wheres) {
        if (this.query.wheres[i].value == tag) {
          temp = i;
        }
      }
      if (temp == -1) {
        this.query.wheres.push({
          value: tag,
          opertionType: typeof this['search'+num] == 'boolean' ? "equal":'like',
          opertionValue: this['search'+num]
        });
      } else {
        this.query.wheres[temp].opertionValue = this['search'+num];
      }
    },
    getList() {
      this.tableLoading = true
      $.ajax({
        url: sessionStorage.getItem("API") + "role/perm/find",
        method: "post",
        dataType: "json",
        success(res) {
          that.tableLoading = false
          if (res.code) {
            that.data = res.params.msg;
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
