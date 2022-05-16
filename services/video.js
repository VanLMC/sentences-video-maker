
import shell from 'shelljs'

async function videoService() {

    console.log('start video service')

    await createSlideShow();
    await addOverlay();
    async function createSlideShow() {
        shell.exec('createSlideShow.bat')
    }
    async function addOverlay() {
        shell.exec('addOverlay.bat')
    }
}

export default videoService;