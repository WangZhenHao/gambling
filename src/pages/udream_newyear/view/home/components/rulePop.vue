<template>
    <van-popup class="popup" v-model="popupState" position="bottom" lock-scroll round closeable safe-area-inset-bottom @close="hidePopup">
        <!-- <div class="bg-wrap"></div> -->
        <div>
            <p class="rule-title color-black">活动规则</p>

            <ul class="rule-content">
                <li>
                    <h6 class="color-black">活动时间</h6>
                    <p>2023.01.06 - 2023.02.05</p>
                </li>
                <li>
                    <h6 class="color-black">活动规则</h6>
                    <p>1、每个用户最多中奖2次，首次获奖后，再分享游戏页面给朋友，即可再获得一次中奖机会</p>
                    <p>2、如获得优惠券，立即消费即可抵扣对应优惠金额</p>
                    <p>3、如获得奖品，请根据提醒填写邮寄地址，我们会在活动结束后统一安排邮寄</p>
                </li>
            </ul>

            <p class="power-of-interpretation">优剪对本活动拥有最终解释权</p>

            <div class="btn-close" @click="hidePopup">知道了</div>
        </div>
    </van-popup>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            popupState: false
        }
    },

    methods: {
        show() {
            this.popupState = true;
        },
        hidePopup() {
            this.popupState = false;
        }
    },
}
</script>

<style lang="less" scoped>
.popup {
    background: linear-gradient(180deg, #FFDDEA 0%, #F9FBFC 26%);
    border-radius: .2rem .2rem 0 0;
    /deep/ .van-icon {
        top: 20px;
        color: #333;
        font-size: 18px;
    }

    // .bg-wrap {
    //     position: absolute;
    //     left: 0;
    //     top: 0;
    //     width: 100%;
    //     height: 100px;
    //     background: linear-gradient(180deg, #FFDDEA 0%, #F9FBFC 100%);
    // }
}

.color-black {
    color: #333333;
}
.rule-title{
    height: 1.12rem;
    line-height: 1.12rem;

    text-align: center;

    font-weight: bold;
    font-size: .32rem;
}

.rule-content{
    padding: 0 .5rem;
    h6 {
        padding: .2rem 0 .12rem 0;
        font-weight: bold;
        font-size: .28rem;
    }
    p {
        line-height: 1.5em;
        font-size: .24rem;
        color: #666;
        margin-bottom: .12rem;
    }
}

.power-of-interpretation{
    padding: .2rem 0 .6rem 0;
    text-align: center;
    font-size: .24rem;
    color: #999;
}

.btn-close {
    margin: 0 auto;
    margin-bottom: .58rem;

    width: 6.7rem;
    height: .92rem;
    line-height: .92rem;
    text-align: center;

    border-radius: .46rem;
    background: linear-gradient(180deg, #FF5F98 0%, #FE2571 100%);

    font-size: .28rem;
    color: #fff;
}

</style>

