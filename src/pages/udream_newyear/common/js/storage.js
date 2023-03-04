

export const getLocalStorage = (key) => {
    let time = new Date().getTime();
    let data = localStorage.getItem(key);
    if (data) {
        if (typeof data === 'string' && data.indexOf('{') !== -1) {
            data = JSON.parse(data);
        }
        if (data.expire - time > 0) {
            return data.value;
        } else {
            localStorage.removeItem(key);
            return '';
        }
    } else {
        return '';
    }
}

export const setLocalStorage = (key, value, maxTime = 0) => {
    // const parseValue = typeof value === 'object' ? JSON.stringify(value) : value;
    let data = {
        expire: new Date().getTime() + parseInt(maxTime),
        value: value
    };
    data = JSON.stringify(data);

    localStorage.setItem(key, data);
}