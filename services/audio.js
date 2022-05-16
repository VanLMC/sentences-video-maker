
import path from 'path'
import state from './state.js'
import fs from 'fs'
import gtts from 'node-gtts'

const __dirname = path.resolve();

async function audioService() {
    const content = state.load()


    await generateAudio(content)

    async function generateAudio(content){

          content.quotes.forEach((quote, i) => {
                    
                var filepath = path.join(__dirname, `../content/audios/${i}.mp3`);

                if (fs.existsSync(filepath)) {
                    fs.unlink(filepath, err => {
                        if (err) throw err;
                    });
                }

                 gtts('pt-br').save(filepath, quote.text, function() {
                   console.log(`saving audio: ${i}.mp3`);
                })
            })
    
    }
}



export default audioService;