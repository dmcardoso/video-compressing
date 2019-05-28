const watch = require('node-watch');
const path = require('path');
const fs = require('fs');
const notifier = require('./notifier');

const {input, output} = require('./res/paths');


const getVideosFromFolder = (folder) => {
    const files = fs.readdirSync(path.resolve(folder));

    return files.filter(founded => founded.match(/.*\.(mp4|avi)/gi));
};

const sync = () => {
    const origin = getVideosFromFolder(input);
    const dest = getVideosFromFolder(output);

    const missingVideos = [];
    origin.forEach((v, i) => {
        if (!dest.includes(v)) {
            missingVideos.push(v);
        }
    });

    return missingVideos;
};

const watchFiles = (call, notify) => {
    watch(path.resolve(input), {recursive: false}, function (evt, name) {
        if (evt === 'update' && name.match(/.*\.(mp4|avi)/gi)) {
            const video = name.split('\\');
            call(video[video.length - 1], notify);
        }
    });
};

module.exports = {watchFiles, sync};
