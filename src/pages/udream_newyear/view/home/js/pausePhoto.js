import parseAPNG from "./parseAPNG.js";

function getImgBuffer(url) {
    return new Promise(async resolve => {
        const blob = await fetch(url).then(res => {
            return res.blob();
        });
        
        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onload = () => {
            resolve(reader.result);
        };
    });
}

function createApngPlayer(url, id) {
    return new Promise(async (resolve) => {
        const canvas = document.querySelector(id);
        // debugger
        const ctx = canvas.getContext("2d");
        
        const imgBuffer = await getImgBuffer(url);
        const apng = parseAPNG(imgBuffer);

        const player = await apng.getPlayer(ctx);
        // return player;
        resolve(player)
    })
    
}

export {
    createApngPlayer
}