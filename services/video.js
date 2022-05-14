
// const videoShow = require('videoshow')
const shell = require('shelljs')
// const state = require('./state.js')
async function videoService() {
    // const content = state.load()

    createSlideShow();

    async function createSlideShow() {
        shell.exec('renderVideos.sh')
    }
}

 module.exports = videoService;