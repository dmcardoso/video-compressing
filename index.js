const processVideo = require('./src/video-compress');
const notifier = require('./src/notifier');
const routine = require('./src/routine');

const notify = (res) => notifier(res);

const start = async () => {
    const missingVideos = routine.sync();

    if (missingVideos.length > 0) {
        await processVideo(missingVideos[0], notify, missingVideos);
    }
};

start()
    .then(res => {
        routine.watchFiles(processVideo, notify);
    })
    .catch(reason => {
        console.log(reason);
        process.exit();
    });

// start();