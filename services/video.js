
const shell = require('shelljs')

async function videoService() {

    createSlideShow();

    async function createSlideShow() {
        shell.exec('renderVideos.bat')
    }
}

 module.exports = videoService;