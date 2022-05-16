

// const services  = {
//     text: require('./services/text'),
//     input: require('./services/input'),
//     audio: require('./services/audio'),
//     video: require('./services/video')
// }
import input from './services/input.js'
import text from './services/text.js'
import audio from './services/audio.js'
import video from './services/video.js'


async function start(){

    await input()
    await text()
    await audio()
    await video()
 
}


start()