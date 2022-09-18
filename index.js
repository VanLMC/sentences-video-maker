
import input from './services/input.js'
import text from './services/text.js'
import audio from './services/audio.js'
import video from './services/video.js'
import image from './services/image.js'

//1 integrate with api
//2 create shorts or  long videos depending on the day of the week
//3 create formatting type for short videos
//4 create upload to youtube
//5 create service to upload automatically
//5 create upload to tiktok
//6 create upload to kwai (optional)

//temas:
//esporte, fofoca, politica, mundo, cultura pop, finanças


async function start(){
    // await input()
    await text()
    await image()
    // await audio()

    // await video()
}


start()