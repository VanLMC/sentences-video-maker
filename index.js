

const services  = {
    text: require('./services/text'),
    input: require('./services/input')
}
async function start(){

    await services.input()
    await services.text()
  
}



start()