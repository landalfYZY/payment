var nav = {
    config:{},
    items:[
        {icon:'speakerphone',label:'通知广告',zt:true,children:[
            {label:'广告列表',path:'/carousel'},
            {label:'公告列表',path:'/notice'},
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
        {icon:'record',label:'款项记录',children:[
            {label:'订单记录',path:'/orderRecord'},
            {label:'退款记录',path:'/bankCardAdd'},
            {label:'提现记录',path:'/bankCardAdd'}
        ]},
        // {icon:'ios-paper',label:'日志',children:[
        //     {label:'操作日志',path:'#'},
        //     {label:'系统日志',path:'#'},
        //     {label:'系统更新日志',path:'#'},
        //     {label:'异常分析',path:'#'}
        // ]},
        {icon:'ios-gear',label:'权限设置',zt:true,children:[
            {label:'权限列表',path:'/power'},
            {label:'角色列表',path:'/role'},
            {label:'角色新增',path:'/roleAdd'}
        ]},
    ]
}

module.exports = {
    nav:nav
}