<template>

    <div class="b-modal-wrap">
        <van-popup v-model="showModal" :close-on-click-overlay="false">
            <div class="modal-wrap" :class="{'animate__animated animate__zoomInDown': modalWrapShow}">
                <div style="display:flex;justify-content:center;padding-top:1.22rem;">
                    <div class="title not" v-if="nonePrize"></div>
                    <div class="title" v-else></div>
                </div>

                <div class="modal-content">
                    <div class="none" v-if="nonePrize">
                        <div
                            style="width:4.3rem;font-size: 0.3rem;font-weight: 400;color: #010101;line-height: 0.42rem;">
                            {{ prizeItem.prizeName }}</div>
                    </div>
                    <div v-else
                        style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
                        <div style="width:2.3rem;height:2.3rem;position: relative;">
                            <div v-if="isPrizeCoupon && prizeItem.price"
                                style="position:absolute;left:50%;transform: translateX(-50%);top:0.2rem; font-weight: bold;color: #FF397E;line-height: 1;">
                                <span style="font-size: 0.5rem;">￥</span>
                                <span style="font-size: 0.9rem;font-weight: bold;">{{ prizeItem.price }}</span>
                            </div>
                            <img :src="prizeItem.image" style="height:100%;width:100%;" />
                        </div>
                        <div
                            style="font-size: 0.28rem;font-weight: 400;color: #010101;line-height: 1;margin-top: 0.3rem;">
                            {{ prizeItem.prizeName }}</div>
                    </div>
                </div>


                <div class="modal-footer">
                    <div class="btn" @click="handleOk">
                        {{ nonePrize ? '邀请好友一起玩' : '再玩一次' }}</div>
                    <div style="font-size: 0.24rem;font-weight: 400;color: #FFFFFF;line-height: 0.24rem;">
                        {{ nonePrize ? '很遗憾本次未中奖，再接再厉哟' : '获得的奖品可在“我的奖品”查看' }}
                    </div>
                </div>

                <div class="modal-close" @click="handleClose"></div>
            </div>
            <div v-show="showCircle">
                <div class="circle animate__animated animate__circle"></div>
                <div class="circle animate__animated animate__circle animate__circle2"></div>
            </div>
        </van-popup>
        <canvas v-show="showHua" id="hua" class="hua" width="750" height="810"></canvas>
        <div v-if="shareGuide" class="index-page-wrap__share-guide" :class="{'mini-app': true}" @touchmove.stop.prevent @click="hideShareGuide">
            <img class="share-guide__img--arrow" src="@images/udream_newyear/share_arrow.png" alt="分享指引箭头">
            <img class="share-guide__img--guide" src="@images/udream_newyear/home/share_tips.png" alt="朋友圈分享指引">
            <p class="share-guide__text">邀请好友，再中奖一次</p>
        </div>
    </div>

</template>

<script>
// const hua = require('@images/udream_newyear/home/hua.png');
import { createApngPlayer } from "../js/pausePhoto.js";

export default {
    components: {},
    props: {},
    data() {
        return {
            showModal: false,
            nonePrize: false,

            prizeItem: {
                // image (string, optional): 奖品图片 ,
                // price (number, optional): 奖品价值 ,
                // prizeId (integer, optional): 奖品id ,
                // prizeName (string, optional): 奖品名称 ,
                // recordId (integer, optional): 记录id ,
                // type (integer, optional): 奖品价值类型（0：金额 | 1：折扣）
            },
            isPrizeCoupon: false,
            modalWrapShow: false,
            shareGuide: false,
            showCircle: false,
            showHua: false
        };
    },
    mounted() {
        // this.show();
        // createApngPlayer(hua, '#hua').then((res) => {
        //     this.play = res;
        //     // this.play.play()
        // })
    },
    methods: {
        hideShareGuide() {
            this.shareGuide = false;
        },
        init(resoureMap) {
            createApngPlayer(resoureMap.hua, '#hua').then((res) => {
                this.play = res;
            })
        },
        show(opt = {}) {
            return new Promise((resolve, reject) => {
                this._resolve = resolve;
                this._reject = reject;

                const { prizeItem, type, status } = opt;
                this.showModal = true;
                // status (integer, optional): 中奖状态（0：否 | 1：是） ,
                this.nonePrize = status === 0;
                this.prizeItem = prizeItem || {};

                // type (integer, optional): 中奖类型（-1：无 | 0：优惠券 | 1：UVIP | 2：实物）
                this.isPrizeCoupon = type === 0;
                this.modalWrapShow = true;
                this.showHua = true;
                
                setTimeout(() => {
                    this.showCircle = true;
                }, 400)
                setTimeout(() => {
                    this.play && this.play.play();
                    this.play.on('end', () => {
                        this.showHua = false;
                    })
                }, 600)

                // setTimeout(() => {
                //     this.showCircle = true;
                // }, 800)
            });
        },
        _resolve(e) {
            if (typeof this._resolve !== 'function') return;
            this._resolve(e);
        },
        _reject(e) {
            if (typeof this._reject !== 'function') return;
            this._reject(e)
        },
        handleClose() {
            this.showModal = false;
            this.modalWrapShow = false;
            this.showCircle = false;
            this._reject();
        },
        handleOk() {
            this._resolve();
            this.modalWrapShow = false;
            this.showModal = false;
            this.shareGuide = true;
            this.showCircle = false;
        }
    },
};
</script>
<style lang="less" scoped>
@import './animate.css';
.modal-wrap {
    background-image: url("~@images/udream_newyear/home/modal_bg.png");
    background-size: 100% 100%;
    height: 8.06rem;
    width: 5.7rem;
    position: relative;
    margin-top: -2rem;
    z-index: 2;
    .title {
        background-image: url("~@images/udream_newyear/home/modal_title.png");
        background-size: 100% 100%;
        width: 4.2rem;
        height: 0.92rem;

        &.not {
            background-image: url("~@images/udream_newyear/home/modal_title_not.png");
        }
    }


    .modal-content {
        display: flex;
        justify-content: center;
        padding-top: 0.32rem;

        .none {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            // .icon {
            //     background-image: url("~@images/udream_newyear/home/icon_none.png");
            //     background-size: 100% 100%;
            //     width: 1.6rem;
            //     height: 1.58rem;
            // }
        }
    }

    .modal-footer {
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 0.38rem;

        .btn {
            width: 4.9rem;
            height: 0.88rem;
            background: #FFFFFF;
            border-radius: 0.44rem;
            font-size: 0.28rem;
            font-weight: bold;
            color: #FE3A7F;
            line-height: 0.28rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 0.2rem;
        }
    }


    .modal-close {
        background-image: url("~@images/udream_newyear/home/mode_close.png");
        background-size: 100% 100%;
        height: 0.72rem;
        width: 0.72rem;

        position: absolute;
        bottom: -1.32rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2222;
    }


}

.b-modal-wrap {
    position: relative;

}

.b-modal-wrap ::v-deep .van-popup {
    background-color: transparent !important;
    overflow-y: visible !important;
}

.hua {
    position: fixed;
    left: 50%;
    top: 40%;
    transform: translate3d(-50%, -50%, 0);
    height: 8.1rem;
    pointer-events: none;
    z-index: 999999;
} 
.index-page-wrap__share-guide {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;

        width: 100vw;
        height: 100vh;

        padding: .3rem;
        
        background-color: rgba(0, 0, 0, .6);
        text-align: right;

        display: flex;
        flex-direction: column;
        align-items: flex-end;

        &.mini-app {
            padding-right: 1.2rem;
        }

        .share-guide__img {

            &--arrow {
                margin-bottom: .3rem;
                margin-right: 38px;
                width: .72rem;
                height: 1.14rem;
                animation: opacity_toggle 1.5s linear infinite;
            }
            
            &--guide {
                margin-right: 18px;
                margin-bottom: .3rem;
                width: 1.84rem;
                height: 1.80rem;
            }
        }

        .share-guide__text {
            margin-right: .2rem;
            font-size: .24rem;
            color: #fff;
        }

        @keyframes opacity_toggle {
            0% {
                opacity: .3;
            }
            50% {
                opacity: 1;
            }
        }
    }

    .circle {
        width: 0px;
        height: 0px;
        border: 30px solid rgba(255, 255, 255, .2);
        border-radius: 50%;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        z-index: 1;
    }
</style>