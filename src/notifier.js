const notifier = require('node-notifier');
const path = require('path');

const notificate = (compressedVideo) => {

    const {output} = require('./res/paths');

    notifier.notify(
        {
            title: 'Novo vídeo comprimido',
            message: `Novo vídeo comprimido: ${compressedVideo}`,
            icon: path.join(__dirname, '\\res\\watermark.png'), // Absolute path (doesn't work on balloons)
            sound: true, // Only Notification Center or Windows Toasters
            wait: true, // Wait with callback, until user action is taken against notification
            open: path.resolve(output, compressedVideo)
        },
        function (err, response) {
            // Response is response from notification
            if (err) console.log(err);
        }
    );

    notifier.on('click', function (notifierObject, options) {
        require('child_process').exec(`explorer /select,"${options.open}"`);
    });

};

module.exports = notificate;