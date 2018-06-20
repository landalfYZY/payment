<template>
    <transition name="el-fade-in-linear">
        <div>
            <Row :gutter="16">
                <Col :span="6" >
                    <div class="showDa">
                        <Row :gutter="16">
                            <Col :span="8">
                                <div class="crig bg-primary panel-center item-center"><Icon type="eye" size="30" color="#fff"></Icon></div>
                            </Col>
                            <Col :span="16">
                                <div>
                                    <div class="font-grey" style="font-size:30px">523</div>
                                    <div class="" >今日访问量</div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col :span="6" >
                    <div class="showDa">
                        <Row :gutter="16">
                            <Col :span="8">
                                <div class="crig bg-success panel-center item-center"><Icon type="person" size="30" color="#fff"></Icon></div>
                            </Col>
                            <Col :span="16">
                                <div>
                                    <div class="font-grey" style="font-size:30px">523</div>
                                    <div class="" >用户数量</div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col :span="6" >
                    <div class="showDa">
                        <Row :gutter="16">
                            <Col :span="8">
                                <div class="crig bg-danger panel-center item-center"><Icon type="university" size="30" color="#fff"></Icon></div>
                            </Col>
                            <Col :span="16">
                                <div>
                                    <div class="font-grey" style="font-size:30px">212232</div>
                                    <div class="" >学生数量</div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col :span="6" >
                    <div class="showDa">
                        <Row :gutter="16">
                            <Col :span="8">
                                <div class="crig bg-warning panel-center item-center"><Icon type="social-yen" size="30" color="#fff"></Icon></div>
                            </Col>
                            <Col :span="16">
                                <div>
                                    <div class="font-grey" style="font-size:30px">7852220</div>
                                    <div class="" >缴费总额</div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    </transition>
</template>
<script>
import G2 from "@antv/g2";
import { View } from "@antv/data-set";
export default {
    data(){
        return {

        }
    },
    mounted(){

    },
    methods:{

    }
}
</script>
