<template>
    <div class="bar-wrap abs">
        <van-swipe
            :autoplay="3000"
            :show-indicators="false"
            :vertical="true"
            class="height-100"
        >
            <van-swipe-item
                :key="index"
                class="item"
                v-for="(item,index) in list"
            >{{ item.nickname }}获得{{item.prizeName}}</van-swipe-item>
        </van-swipe>
    </div>
</template>
<script>
import { Swipe, SwipeItem } from "vant";
export default {
    components: {
        "van-swipe": Swipe,
        "van-swipe-item": SwipeItem,
    },
    data() {
        return {
            list: [],
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            var res = {
                result: [
                    { price: 10, prizeName: '大米', nickname: '火警' },
                    { price: 4, prizeName: '面包', nickname: '小宏', type: 0 },
                    { price: 43, prizeName: '手机', nickname: '张三', type: 0 },
                    { price: 20, prizeName: '电脑', nickname: '李四' },
                ]
            }
            this.list = res.result.map(item => {
                // item.nickname = "**" + item.nickname.substring(1);
                if (item.type === 0) {
                    item.prizeName = `一张${item.price}元${item.prizeName}`;
                }

                return item;
            });
        },
    },
};
</script>
<style scoped lang="less">
.bar-wrap {
    width: 4.1rem;
    height: 0.48rem;
    background: linear-gradient(180deg, #f9eef6 0%, #fbebf6 42%, #efd9f0 100%);
    border-radius: 0.12rem;
    border: 1px solid #fff;
    left: 50%;
    transform: translateX(-50%);
    top: 3.28rem;
    font-size: 0.24rem;
    color: #f43b98;

    .item {
        padding-left: 0.2rem;
        line-height: 0.44rem;
        overflow: hidden;
    }
}
</style>