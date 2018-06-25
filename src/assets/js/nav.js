var nav = {
    config:{},
    items:[
        {icon:'speakerphone',label:'通知广告',zt:true,children:[
            {label:'广告列表',path:'/carousel'},
            {label:'公告列表',path:'#'},
        ]},
        {icon:'network',label:'组织单位',zt:true,children:[
            {label:'所有单位',path:'/school'},
            {label:'新增单位',path:'/schoolAdd'},
            {label:'用户管理',path:'/wxuser'},
        ]},
        {icon:'ios-book',label:'学生管理',children:[
            {label:'学生列表',path:'/student'},
            {label:'新增学生',path:'/studentAdd'},
        ]},
        {icon:'social-hackernews',label:'缴费管理',children:[
            {label:'缴费项列表',path:'/payList'},
            {label:'新增缴费项',path:'/payAdd'}
        ]},
        {icon:'social-python',label:'银行卡管理',children:[
            {label:'银行卡列表',path:'/bankCard'},
            {label:'添加银行卡',path:'/bankCardAdd'}
        ]},
        // {icon:'ios-paper',label:'日志',children:[
        //     {label:'操作日志',path:'#'},
        //     {label:'系统日志',path:'#'},
        //     {label:'系统更新日志',path:'#'},
        //     {label:'异常分析',path:'#'}
        // ]},
        // {icon:'ios-gear',label:'系统设置',children:[
        //     {label:'个人操作设置',path:'#'},
        //     {label:'系统基础设置',path:'#'}
        // ]},
    ]
}

module.exports = {
    nav:nav
}