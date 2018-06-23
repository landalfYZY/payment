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
        var scl = []
        for(var i in li){
          if(li[i].checked){
            scl.push({label:li[i].name,value:li[i].sunwouId})
          }else{
            var tempo = {label:li[i].name,value:li[i].sunwouId,children:[]}
            for(var j in li[i].children){
              if(li[i].children[j].checked){
                tempo.children.push({label:li[i].children[j]._id,value:li[i].children[j]._id})
              }else{
                var tmo = {label:li[i].children[j]._id,value:li[i].children[j]._id,children:[]}
                for(var k in li[i].children[j].children){
                  if(li[i].children[j].children[k].checked){
                    tmo.children.push({label:li[i].children[j].children[k]._id,value:li[i].children[j].children[k]._id})
                  }
                }
                tempo.children.push(tmo)
              }
              
            }
            scl.push(tempo)
          }
          
        }
        sessionStorage.setItem('tempPay',JSON.stringify(scl))
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
      var query = {
            fields: [],
            wheres: [
              { value: "isDelete", opertionType: "equal", opertionValue: false }
            ],
            sorts: [{ value: "createTime", asc: false }],
            pages: {
              currentPage: 1,
              size: 10000
            }
          }
      if(!JSON.parse(sessionStorage.getItem('user')).appid){
        query.wheres.push({value:'sunwouId',opertionType:'equal',opertionValue:JSON.parse(sessionStorage.getItem('user')).sunwouId})
      }
      $.ajax({
        url: sessionStorage.getItem("API") + "school/find",
        data: {
          query: JSON.stringify(query)
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
