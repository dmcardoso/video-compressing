const processVideo = require('./src/video-compress');
const notifier = require('./src/notifier');
const routine = require('./src/routine');

const path = require('path');
const {input} = require('./src/res/paths');

const start = async () => {
    const missingVideos = routine.sync();

    // processVideo('Página Inicial - Prefeitura de Silvânia - Mozilla Firefox 2019-05-27 14-06-33.mp4', (res) => console.log(res));
    missingVideos.forEach(async (v, i) => {
        await processVideo(v, (res) => notifier(res));
    });
};

start().then(res => {
    routine.watchFiles(processVideo);
});

// start();