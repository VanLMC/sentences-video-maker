

const services  = {
    text: require('./services/text'),
    input: require('./services/input'),
    audio: require('./services/audio'),
    video: require('./services/video')
}
async function start(){

    // await services.input()
    // await services.text()
    // await services.audio()
    await services.video()
  
}



start()