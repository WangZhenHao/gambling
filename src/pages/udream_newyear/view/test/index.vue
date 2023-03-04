<template>
    <div>
        <canvas id="canvas"></canvas>
    </div>
</template>
<script>
import parseAPNG from "./index";
import img1 from  '@images/udream_newyear/home/handle.png'
function getImgBuffer(url) {
  return new Promise(async resolve => {
    const blob = await fetch(url).then(res => { 
       return res.blob() 
    });
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onload = () => {
      resolve(reader.result);
    };
  });
}

async function createApngPlayer(url, ctx, options = {}) {
  const imgBuffer = await getImgBuffer(url);
  const apng = parseAPNG(imgBuffer);
  console.log(apng)
  Object.keys(options).forEach(key => {
    apng[key] = options[key];
  });
  const player = await apng.getPlayer(ctx);
  return player;
}

export default {
    data() {
        return {

        }
    },
    async mounted() {
        // const canvas = document.querySelector('#canvas')
        // canvas.width = 52;
        // canvas.height = 176;
        // // canvas.style = 'zoom: 0.75';
        // const ctx = canvas.getContext('2d');


        // const player2 = await createApngPlayer(img1, ctx);

        // player2.play();
        var img = new Image();
        img.src = img1
        img.onload = function(e) {
            console.log(e)
            
        }
        // setInterval(() => {
        //     player2.play();
        // }, 2000)
    }
}
</script>
<style lang="less" scoped>
#canvas {
    width: 0.48rem;
    height: 1.72rem;
}
</style>