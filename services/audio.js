
import path from 'path'
import state from './state.js'
import fs from 'fs'
import gtts from 'node-gtts'
const gttsTranslated = gtts('pt-br')
const __dirname = path.resolve()

async function audioService() {
    const content = state.load()


    await generateAudio(content)

    async function generateAudio(content){

          content.quotes.forEach((quote, i) => {
                    
                var filepath = path.join(__dirname, 'content', 'audio', `${i}.mp3`);

                if (fs.existsSync(filepath)) {
                    fs.unlink(filepath, err => {
                        if (err) throw err;
                    });
                }

                gttsTranslated.save(filepath, quote.text, function() {
                   console.log(`saving audio: ${i}.mp3`);
                })
            })
    
    }
}



export default audioService;