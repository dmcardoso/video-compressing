const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const FFmpeg = require('fluent-ffmpeg');
FFmpeg.setFfmpegPath(ffmpeg.path);

const {videoDuration, calcPercent} = require('./video-util');
const cliProgress = require('cli-progress');
const colors = require('colors');

const {input, output} = require('./res/paths');

const path = require('path');

const wmimage = 'src/res/watermark.png';

const processVideo = async (input_video, call) => {

    const progressBar = new cliProgress.Bar({
        fps: 5,
        stream: process.stdout,
        barsize: 50,
        format: 'Processando ' + colors.cyan('[{bar}]') + '{percentage}% | ETA: {eta}s | {value}/{total}',
        position: 'center'
    }, cliProgress.Presets.shades_grey);

    const video_duration = await videoDuration(path.resolve(input, input_video));

    const proc = await new FFmpeg({source: path.resolve(input, input_video)}).addOption('-vf', 'movie=' + wmimage + ' [watermark]; [in] [watermark] overlay=(main_w-overlay_w)-20:(main_h-overlay_h)-20 [out]')
        .on('start', function (commandLine) {
            console.log('Comando gerado: ' + commandLine);
            progressBar.start(100, 0);
        })
        .videoCodec('libx264')
        .noAudio()
        .on('progress', function (progress) {
            const percent = calcPercent(video_duration, progress.timemark);
            progressBar.update(percent);
            // console.log(percent + '% concluído');
        })
        .on('error', function (err, stdout, stderr) {
            progressBar.stop();
            console.log('ERROR: ' + err.message);
            console.log('STDERR:' + stderr);
        })
        .saveToFile(path.resolve(output, input_video))
        .on('end', function () {
            progressBar.update(100);
            progressBar.stop();
            call(path.resolve(output, input_video));
        });
};

// processVideo('test.mp4');

module.exports = processVideo;