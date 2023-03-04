<template>
    <div class="loading" v-if="loading">
        <div class="width-100 height-100 flex-box align-center justify-cneter flex-wrap">
            <div>
                <p>加载中... <span v-if="progress">{{ progress }}%</span></p>
                <div class="progress">
                    <div class="progress-bg" :style="{ width: progress + '%' }"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { loadImage } from '../js/uitl'

export default {
    data() {
        return {
            progress: 0,
            resoureList: [
                {
                    key: "bg",
                    src: require("@images/udream_newyear/home/bg.png"),
                },
                {
                    key: "bgTitle",
                    src: require("@images/udream_newyear/home/bg-tiltle.png"),
                },
                {
                    key: "title",
                    src: require("@images/udream_newyear/home/title.png"),
                },
                {
                    key: "mechine",
                    src: require("@images/udream_newyear/home/mechine.png"),
                },
                {
                    key: "handle",
                    src: require("@images/udream_newyear/home/handle.png"),
                },
                {
                    key: "hand",
                    src: require("@images/udream_newyear/home/hand.png"),
                },
                {
                    key: "btnStart",
                    src: require("@images/udream_newyear/home/btn-start.png"),
                },
                {
                    key: "prize",
                    src: require("@images/udream_newyear/home/prize.png"),
                },
                {
                    key: 'page',
                    src: require('@images/udream_newyear/home/page.png')
                },
                {
                    key: 'hua',
                    src: require('@images/udream_newyear/home/hua.png')
                },
                {
                    key: 'light',
                    src: require('@images/udream_newyear/home/light.png')
                },
                {
                    key: 'modalBg',
                    src: require('@images/udream_newyear/home/modal_bg.png')
                },
                {
                    key: 'btn',
                    src: require('@images/udream_newyear/home/btn.png')
                }
            ],
            loading: false
        };
    },
    created() {
        this.index = 0;
        this.resoureMap = {}
        
        this.load();
    },
    methods: {
        load() {
            const item = this.resoureList[this.index];
            
            if(!item) {
                setTimeout(() => {
                    this.loading = false
                    this.$emit('success', this.resoureMap)
                }, 1000)
                return ;
            }

            this.loading = true;
            loadImage(item.src).then((res) => {
                console.log(res, res.width, res.height)

                this.resoureMap[item.key] = item.src;
                this.index++;
                this.progress = Math.floor((this.index / (this.resoureList.length)) * 100)
                this.load();
            })
        }
    },
};
</script>
<style lang="less" scoped>
.loading {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #000;
    color: #fff;
    font-size: .24rem;
    z-index: 10;

    .progress {
        width: 2.4rem;
        height: .2rem;
        border: 1px solid #fff;
        border-radius: .2rem;
        margin-top: .14rem;
        
        .progress-bg {
            height: 100%;
            background: #fff;
            transition: width 1s;
        }
    }
}
.align-center {
    align-items: center;
}
.justify-cneter {
    justify-content: center;
}
.flex-wrap {
    flex-wrap: wrap;
    text-align: center;
}
</style>