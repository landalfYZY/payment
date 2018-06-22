<template>
    <transition name="el-fade-in-linear">
        <div>
            <Row :gutter="20">
                <Col :span="3"><div class="font-grey font-title-mini">用户名</div></Col>
                <Col :span="4"><div class="font-title-mini">{{user.userName}}</div></Col>
            </Row>
            <br>
            <Row :gutter="20">
                <Col :span="3"><div class="font-grey font-title-mini">用户ID</div></Col>
                <Col :span="4"><div class="font-title-mini">{{user.sunwouId}}</div></Col>
            </Row>
            <br>
            <Row :gutter="20">
                <Col :span="3"><div class="font-grey font-title-mini">APP ID</div></Col>
                <Col :span="4"><div class="font-title-mini">{{user.appid}}</div></Col>
            </Row>
            <br>
            <Row :gutter="20">
                <Col :span="3"><div class="font-grey font-title-mini">APP SECRET</div></Col>
                <Col :span="4"><div class="font-title-mini">{{user.secertWX}}</div></Col>
            </Row>
            <br>
            <Row :gutter="20">
                <Col :span="3"><div class="font-grey font-title-mini">商户号</div></Col>
                <Col :span="4"><div class="font-title-mini">{{user.mch_id}}</div></Col>
            </Row>
            <br>
            <Row :gutter="20">
                <Col :span="3"><div class="font-grey font-title-mini">商户密钥</div></Col>
                <Col :span="4"><div class="font-title-mini">{{user.payKeyWX}}</div></Col>
            </Row>
            <br>
            <Row :gutter="20">
                <Col :span="3"><div class="font-grey font-title-mini">证书路径</div></Col>
                <Col :span="11"><div class="font-title-mini">{{user.apiclient_cert}}</div></Col>
            </Row>
        </div>
    </transition>
</template>

<script>
export default {
    data(){
        return {
            user:''
        }
    },
    mounted(){
        this.user = JSON.parse(sessionStorage.getItem('user'))
    }
}
</script>
