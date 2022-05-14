

const services  = {
    text: require('./services/text'),
    input: require('./services/input'),
    audio: require('./services/audio')
}
async function start(){

    await services.input()
    await services.text()
    await services.audio()
  
}



start()