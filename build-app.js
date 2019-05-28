const {compile} = require('nexe');

compile({
    input: './index.js',
    build: true, //required to use patches
    patches: [
        async (compiler, next) => {
            await compiler.setFileContentsAsync(
                'src/**/*',
            );
            return next()
        }
    ],
    // name: 'NGCompress',
    resources: ['./src/**/*'],
    asset: './src/res/**/*',
    // clean: true,
    ico: './src/res/icon.png',
    python: 'C:\\Python27',
    verbose: true
}).then(() => {
    console.log('success')
});