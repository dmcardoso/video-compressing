const {getVideoDurationInSeconds} = require('get-video-duration');
const moment = require('moment');
const path = require('path');

const videoDuration = async (input) => {
    return await getVideoDurationInSeconds(path.resolve(__dirname, input));
};

const calcPercent = (total, uploaded) => ((moment.duration(uploaded).asSeconds() / total) * 100).toFixed(2);


function sec2time(timeInSeconds) {
    var pad = function (num, size) {
            return ('000' + num).slice(size * -1);
        },
        time = parseFloat(timeInSeconds).toFixed(3),
        hours = Math.floor(time / 60 / 60),
        minutes = Math.floor(time / 60) % 60,
        seconds = Math.floor(time - minutes * 60),
        milliseconds = time.slice(-3);

    return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) + ',' + pad(milliseconds, 3);
}

module.exports = {
    videoDuration,
    calcPercent
};
