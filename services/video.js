
import shell from 'shelljs'

async function videoService() {

    console.log('start video service')

    createSlideShow();

    async function createSlideShow() {
        shell.exec('renderVideos.bat')
    }
}

export default videoService;