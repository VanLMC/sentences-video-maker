
var path = require('path');
const state = require('./state.js')
const fs = require('fs')
var gtts = require('node-gtts')('pt-br');

async function audioService() {

        const content = state.load()
        content.quotes = await generateAudio(content)
        // state.save(content)

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
}

// async function deleteIfExistent() {

// }

module.exports = audioService;