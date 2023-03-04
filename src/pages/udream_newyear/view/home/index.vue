<template>
    <div>
        <div
            class="wrap rel"
            v-img="resoureMap.bg"
        >
            <div
                class="bg-title abs"
                v-img="resoureMap.bgTitle"
            ></div>
            <div
                class="title"
                v-img="resoureMap.title"
            ></div>
            <div
                class="content rel"
                v-img="resoureMap.mechine"
            >
                <!-- <div
                    :key="i"
                    :style="{
                       transition: resetIng ? 'none' : `background-position-y ${ duration }ms ease ${ (i - 1) * interval }ms`,
                       backgroundPositionY: `${ scrollHResult[ i - 1 ] }px`,
                    }"
                    class="animate-wrap abs"
                    v-for="i in colNum"
                >
                  <img ref="img" src="~@images/udream_newyear/home/prize.png" />
                </div>-->
                <div
                    class="light abs"
                    v-img="resoureMap.light"
                ></div>
                <!-- v-img="resoureMap.handle" -->
                <div class="handle abs">
                    <canvas
                        class="width-100 height-100"
                        height="176"
                        id="handle"
                        width="52"
                    ></canvas>
                </div>
                

                <div class="a-wrap abs">
                    <div class="flex-box width-100 height-100">
                        <div
                            :key="i"
                            class="img-wrap flex-1"
                            v-for="i in colNum"
                        >
                            <img
                                :src="resoureMap.prize"
                                class="img-block"
                                ref="img"
                            />
                            <div
                                :style="{
                                 transition: resetIng ? 'none' : `background-position-y ${ duration }ms ease ${ (i - 1) * interval }ms`,
                                 backgroundPositionY: `${ scrollHResult[ i - 1 ] }px`,
                                 backgroundImage: 'url(' + resoureMap.prize + ')'
                                }"
                                class="img height-100 abs"
                            ></div>
                        </div>
                    </div>
                </div>
                <div
                    class="hand abs"
                    v-img="resoureMap.hand"
                    v-if="!loadding"
                ></div>
                <div class="btn-wrap abs">
                    <div v-if="loadding" class="btn-start" v-img="resoureMap.btn"></div>
                    <div
                         v-else
                        @click="draw"
                        class="btn-start"
                        v-img="resoureMap.btnStart"
                    ></div>
                    
                </div>

                <bar ref="bar"></bar>

                <div class="prize-page abs">
                    <div class="prize-page__bg"></div>
                    <transition name="prize-page">
                        <div
                            class="prize-page__img"
                            v-img="resoureMap.page"
                            v-show="showPager"
                        ></div>
                    </transition>
                </div>

                <div
                    @click="ruleHandle"
                    class="btn btn-left"
                >活动规则</div>
                <div
                    @click="myPrizeHandle"
                    class="btn btn-right"
                >我的奖品</div>
            </div>
        </div>
        <bModal ref="modal"></bModal>
        <rulePop ref="rulePop"></rulePop>
        <loading
            @success="loadSuccess"
            ref="loading"
        ></loading>
    </div>
</template>
<script>
// import wxShare from '@assets/js/wxShare'
import bar from "./components/bar.vue";
import bModal from "./components/bModal.vue";
import rulePop from "./components/rulePop.vue";
import loading from "./components/loading.vue";
import { addOptRecord } from "@pages/udream_newyear/api/home";
import { createApngPlayer } from "./js/pausePhoto.js";

export default {
    components: {
        bar,
        bModal,
        rulePop,
        loading,
    },
    data() {
        return {
            duration: 2500,
            interval: 200,
            scrollHResult: [0, 0, 0],
            colNum: 3,
            resetIng: false,
            loadding: false,
            resoureMap: {},
            showPager: false,
        };
    },
    directives: {
        img: {
            componentUpdated(el, binding) {
                if (binding.value) {
                    el.style.backgroundImage = "url(" + binding.value + ")";
                }
            },
        },
    },
    mounted() {
        document.body.style.background = '#ffb6d1';
    },
    methods: {
        loadSuccess(resoureMap) {
            this.resoureMap = resoureMap;
            this.calDom();
            setTimeout(() => {
                this.resetAnimate();
            }, 10);

            createApngPlayer(this.resoureMap.handle, "#handle").then(res => {
                this.handle = res;
            });

            this.$refs.modal.init(this.resoureMap);
        },
        myPrizeHandle() {
            // wx.miniProgram.navigateTo({ url: "/pagesSub/pages_coupon/newyear2023Record/index" });
        },
        calDom() {
            /**
            必须要把px放到style，这样子运动的位置就可以精确，不然在不同的手机，运动会不一致
           */
            const imgWrap = document.querySelector(".wrap .img-wrap");
            const img = document.querySelectorAll(".wrap .img");
            const imgBlock = document.querySelectorAll(".wrap .img-block");
            console.log(imgWrap);

            for (let i = 0; i < img.length; i++) {
                img[i].style.width = imgWrap.offsetWidth - 10 + "px";
                img[i].style.height = imgWrap.offsetHeight + "px";
                imgBlock[i].style.width = imgWrap.offsetWidth - 10 + "px";
            }
        },
        ruleHandle() {
            this.addOptRecord(15);
            this.$refs.rulePop.show();
        },
        addOptRecord(operationType) {
            // addOptRecord({
            //     userId: this.$route.query.uid,
            //     operationType,
            // });
        },
        async draw() {

            if (this.loadding) {
                return;
            }
           
            this.handle.play();
            this.addOptRecord(13);
            this.loadding = true;
            // this.$axios
            //     .get(
            //         "/market/newyear/draw",
            //         { openid: this.$route.query.openid },
            //         { showLoading: true },
            //     )
            //     .then(async res => {
                    const res = {
                        "result" : {
                            "deliveryInfo" : {
                            "recordId" : 0,
                            "address" : "string",
                            "nickName" : "string",
                            "mobile" : "string",
                            "userName" : "string",
                            "userId" : 0
                            },
                            "prizeItem" : {
                            "recordId" : 0,
                            "image" : "http://udream-test.oss-cn-shenzhen.aliyuncs.com/2022/09/05/17/d45adbb3414d4b9aa4753c295d1df6ab.png?imgWidth=330&imgHeight=290",
                            "prizeName" : "中奖了",
                            "price" : 12.89,
                            "startTime" : "string",
                            "endTime" : "string",
                            "type" : 0,
                            "prizeId" : 0
                            },
                            "type" : Math.random() > 0.5 ? 1 : 0,
                            "needAddress" : 0,
                            "status" :  Math.random() > 0.5 ? 1 : 0
                        },
                        "success" : true,
                        "retCode" : "string",
                        "retMsg" : "string"
                    };

                    try {
                        await this.startAnimate(res.result.status);

                        this.$refs.bar.init();
                        await this.$refs.modal
                            .show(res.result)
                            .then(() => {
                                this.addOptRecord(14);
                                this.resetAnimate();
                            })
                            .catch(() => {
                                this.resetAnimate();
                            });
                    } catch (e) {
                        this.loadding = false;
                        console.log(e);
                    }
                // }).catch(() => {
                //     this.resetAnimate();
                // })
        },
        resetAnimate() {
            this.showPager = false;
            this.resetIng = true;
            this.loadding = false;
            const img = this.$refs.img[0];
            const height = Math.floor(img.offsetHeight / 4);

            this.$nextTick(() => {
                this.scrollHResult = [0, height * 1, height * 2];

                setTimeout(() => {
                    this.resetIng = false;
                }, 100);
            });
        },
        startAnimate(type) {
            return new Promise((resolve, reject) => {
                let duration = this.duration + this.colNum * this.interval;
                
                const img = this.$refs.img[0];
                const height = Math.floor(img.offsetHeight / 4);
                let index = 0;
                let arrIndex = [];
                // console.log("宽度: " + img.offsetWidth, "长度: " + img.offsetHeight / 4);
                // 中奖了

                if (type === 1) {
                    index = Math.ceil(Math.random() * 4);
                    arrIndex = [index, index, index];
                }
                // 没有中奖
                else {
                    index = Math.ceil(Math.random() * 4);
                    arrIndex = [index, index + 1, Math.ceil(Math.random() * 4)];
                }

                this.scrollHResult = [
                    img.offsetHeight * 8 + height * arrIndex[0] - 2,
                    img.offsetHeight * 8 + height * arrIndex[1] - 2,
                    img.offsetHeight * 8 + height * arrIndex[2] - 2,
                ];

                setTimeout(() => {
                    this.showPager = true;
                }, this.duration - 500)

                setTimeout(() => {
                    resolve();
                    console.log(this.scrollHResult);
                }, duration);
            });

            // setTimeout(() => {
            //     alert('抽奖完成')
            // }, duration)
        },
    },
};
</script>
<style>
/* body {
    background: #ffb6d1;
} */
</style>
<style lang="less" scoped>
.wrap {
    height: 14.48rem;
    background: linear-gradient(
        180deg,
        #ffb5d1 0%,
        #ffdce9 8%,
        #f9fbfc 71%,
        #ffb6d1 100%,
        #ffb5d1 100%
    );
    // background-image: url("~@images/udream_newyear/home/bg.png");
    background-size: 100% 100%;
    overflow: hidden;

    .bg-title {
        width: 3.46rem;
        height: 2.86rem;
        left: 4.04rem;
        top: 0.96rem;
        // background-image: url("~@images/udream_newyear/home/bg-tiltle.png");
        background-size: cover;
    }
    .title {
        width: 6.5rem;
        height: 1.5rem;
        // background-image: url("~@images/udream_newyear/home/title.png");
        background-size: 100% 100%;
        // margin: 1.72rem auto 0;
        margin: 3.44rem auto 0;
    }

    .content {
        width: 7.1rem;
        height: 8.28rem;
        // background-image: url("~@images/udream_newyear/home/mechine.png");
        background-size: 100% 100%;
        margin: 0 auto;

        .light {
            width: 5.64rem;
            height: 3.2rem;
            // background-image: url("~@images/udream_newyear/home/light.png");
            background-size: 100% 100%;
            top: 0.06rem;
            left: 0.72rem;
        }

        .handle {
            width: 0.48rem;
            height: 1.72rem;
            // background-image: url("~@images/udream_newyear/home/handle.png");
            background-size: 100% 100%;
            top: 0.14rem;
            left: 6.66rem;
        }
        .hand {
            width: 1.26rem;
            height: 1.26rem;
            // background-image: url("~@images/udream_newyear/home/hand.png");
            background-size: 100% 100%;
            top: 4.46rem;
            left: 5.2rem;
            z-index: 2;
        }
        .btn-wrap {
            width: 4.56rem;
            height: 1.26rem;
            left: 50%;
            transform: translateX(-50%);
            top: 4rem;
        }

        .btn-start {
            // background-image: url("~@images/udream_newyear/home/btn-start.png");
            background-size: 100% 100%;
            height: 100%;
            width: 100%;
        }
        .btn {
            width: 1.72rem;
            height: 0.64rem;
            background: linear-gradient(180deg, #f9eef6 0%, #fbebf6 42%, #efd9f0 100%);
            border-radius: 0.64rem;
            border: 0.02rem solid #fff;
            position: absolute;
            left: 1.24rem;
            bottom: 1.28rem;
            color: #fd2a76;
            text-align: center;
            line-height: 0.62rem;
            font-size: 0.28rem;
            &.btn-right {
                left: 4.2rem;
                // left: 100px;
            }
        }

        .prize-page {
            width: 4.12rem;
            // height: 0rem;
            // background: red;
            height: 2.42rem;
            left: 50%;
            transform: translateX(-50%);
            top: 5.8rem;
            z-index: 3;
            transition: height 2s;
            overflow: hidden;
            pointer-events: none;
            
            .prize-page__bg {
                background-image: url("~@images/udream_newyear/home/page_bg.png");
                background-size: 100% 100%;
                background-position: left top;
                background-repeat: no-repeat;
                width: 4.12rem;
                height: .1rem;
                z-index: 2;
                position: absolute;
                left: 0;
                top: 0;
            }
            .prize-page__img {
                width: 4.12rem;
                height: 2.42rem;
                background-size: cover;
                // position: absolute;
                // left: 0;
                // top: 0;
            }
            
        }

        .prize-page-enter-active {
            // top: -2.42rem;
            transform: translateY(-2.42rem);
            transition: transform 1s;
        }
        .prize-page-enter-to {
            transform: translateY(0rem);
        }

        .prize-page-leave-active {
            transition: opacity 1s;
        }
        .prize-page-leave-to {
            opacity: 0;
        }
    }

    // .animate-wrap {
    //     width: 1.32rem;
    //     height: 1.3rem;
    //     // width: 66px;
    //     // height: 65px;
    //     // background: pink;
    //     // left: 76px;
    //     left: 1.5rem;
    //     top: 50px;
    //     background-image: url("~@images/udream_newyear/home/prize.png");
    //     background-size: 100% auto;
    //     background-position-y: 0px;
    //     transition: background-position-y 2000ms ease 0ms;
    //     img {
    //         width: 100%;
    //         height: auto;
    //         display: block;
    //         visibility: hidden;
    //     }
    //     // overflow: hidden;
    // }

    // .animate-wrap:nth-child(2) {
    //     // left: 145px;
    //     left: 2.9rem;
    // }

    // .animate-wrap:nth-child(3) {
    //     // left: 214px;
    //     left: 4.28rem;
    // }

    .a-wrap {
        width: 4.24rem;
        height: 1.3rem;
        // background: pink;
        left: 50%;
        transform: translateX(-50%);
        top: 1rem;

        img {
            width: 100%;
            height: auto;
            display: block;
            visibility: hidden;
            // width: 65px;
        }

        .img-wrap {
            padding: 0 5px;

            position: relative;
        }

        .img {
            left: 50%;
            top: 0;
            width: calc(100% - 10px);
            // width: 65px;
            transform: translateX(-50%);
            // background-image: url("~@images/udream_newyear/home/prize.png");
            background-size: 100% auto;
            background-position-y: 0px;
            transition: background-position-y 2000ms ease 0ms;
        }
    }
}
</style>