
var path = require('path');
const state = require('./state.js')
const fs = require('fs')
var gtts = require('node-gtts')('pt-br');
const {getAudioDurationInSeconds} = require('get-audio-duration')

async function audioService() {
    const content = state.load()


     await generateAudio(content)
    await saveFullVideoDuration(content)

    async function generateAudio(content){
          content.quotes.forEach((quote, i) => {
                    
                var filepath = path.join(__dirname, `../content/audios/${i}.mp3`);

                if (fs.existsSync(filepath)) {
                    fs.unlink(filepath, err => {
                        if (err) throw err;
                    });
                }

                 gtts.save(filepath, quote.text, function() {
                   console.log(`saving audio: ${i}.mp3`);
                })
            })
    }



    async function saveFullVideoDuration(content){
      
        content.quotes.forEach((quote, i) => {
            getAudioDurationInSeconds(`./content/audios/${i}.mp3`)
            .then((duration) => {
                console.log(`adding duration ${duration}`)
                if(!content.videoDuration){
                    content.videoDuration = 0
                }
                content.videoDuration = content.videoDuration  + duration
                state.save(content)
              })
        })


    }
}



module.exports = audioService;