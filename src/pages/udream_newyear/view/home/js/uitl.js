export function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;

        img.onload = function() {
            resolve(img);
        }

        img.onerror = function(e) {
            reject(e)
        }
    })
}

 