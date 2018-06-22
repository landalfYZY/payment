<template>
    <transition name="el-fade-in-linear">
        <div>
            <Tree ref="tree" :data="schoolList" :load-data="loadData" show-checkbox @on-check-change="getSchoolList"></Tree>
        </div>
    </transition>
</template>
<script>
var that;
export default {
  data() {
    return {
      schoolList: []
    };
  },
  mounted() {
    that = this;
    this.getSchool();
  },
  methods: {
    getSchoolList(e){
        var li = JSON.parse(JSON.stringify(that.schoolList))
        // for(var i in li){
        //     if(li[i].checked){
        //         delete li[i].children
        //     }else{
        //         for(var j in li[i].children){
        //             if(li[i].children[j].checked){
        //                 delete li[i].children[j].children
        //             }else{
        //                 for(var k in li[i].children[j].children){
        //                     if(!li[i].children[j].children[k].checked){

        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        sessionStorage.setItem('tempPay',JSON.stringify(that.schoolList))
    },
    loadData(item, callback) {
      if (item.name) {
        this.getMsg("schoolId", item.sunwouId, "schoolTime", function(res) {
          for (var i in res) {
            res[i].title = res[i]._id;
            res[i].loading = false;
            res[i].children = [];
          }
          callback(res);
        });
      } else if (item._id) {
        this.getMsg("schoolTime", item._id, "cl", function(res) {
          for (var i in res) {
            res[i].title = res[i]._id;
          }
          callback(res);
        });
      }
    },
    getSchool() {
      $.ajax({
        url: sessionStorage.getItem("API") + "school/find",
        data: {
          query: JSON.stringify({
            fields: ["name"],
            wheres: [
              { value: "isDelete", opertionType: "equal", opertionValue: false }
            ],
            sorts: [{ value: "createTime", asc: true }],
            pages: {
              currentPage: 1,
              size: 10000
            }
          })
        },
        method: "post",
        dataType: "json",
        success(res) {
          if (res.code) {
            for (var i in res.params.msg) {
              res.params.msg[i].title = res.params.msg[i].name;
              res.params.msg[i].loading = false;
              res.params.msg[i].children = [];
            }
            that.schoolList = res.params.msg;
            sessionStorage.setItem('tempPay',JSON.stringify(that.schoolList))
          }
        }
      });
    },
    getMsg(label, value, val, cb) {
      $.ajax({
        url: sessionStorage.getItem("API") + "school/group",
        data: {
          query: JSON.stringify({
            fields: [],
            wheres: [
              { value: label, opertionType: "equal", opertionValue: value }
            ],
            sorts: [{ value: "createTime", asc: true }],
            pages: {
              currentPage: 1,
              size: 10000
            }
          }),
          value: val
        },
        dataType: "json",
        method: "post",
        success(res) {
          if (res.code) {
            cb(res.params.msg);
          } else {
            that.$message.error(res.msg);
          }
        }
      });
    }
  }
};
</script>
