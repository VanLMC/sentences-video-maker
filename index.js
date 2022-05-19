
import input from './services/input.js'
import text from './services/text.js'
import audio from './services/audio.js'
import video from './services/video.js'
import image from './services/image.js'


async function start(){
    await input()
    await text()
    // await audio()
    // await image()
    // await video()
}


start()