import gm from "gm"
import path from 'path'
import state from './state.js'
import fs from 'fs';
import canvas from 'canvas'


const im = gm.subClass({ imageMagick: true })
const __dirname = path.resolve();
async function imagesService() {
    const content = state.load()
    const quotesLength = content.quotes.length;
    await createAllSentenceImages(content)
    await createThumbNail(content);
    await createVideoBackground();

    async function createAllSentenceImages(content){
        for (let quoteIndex = 0; quoteIndex < content.quotes.length; quoteIndex++) {
            await createSentenceImage(quoteIndex, content.quotes[quoteIndex])
          }
    } 

    async function createSentenceImage(quoteIndex, quote) {
        return new Promise((resolve, reject) => {
          const outputFile = path.join(__dirname, 'content', 'images', `${quoteIndex}-sentence.png`)
    
          const text = quoteIndex === 0 || quoteIndex + 1 === quotesLength ? quote.text : `"${quote.text}"`
          const author = quote.author ? ' - ' + quote.author: ''

          const parsedSentence = `${text}\n${author}`
          im()
            .out('-size','800x720')
            .out('-gravity', 'center')
            .out('-background', 'black')
            .out('-fill', 'white')
            .out('-kerning', '-1')
            .font('Arial', 30) 
            .in('-weight', '900')
            .out(`caption:${parsedSentence}`)
            .write(outputFile, (error) => {
              if (error) {
                return reject(error)
              }
    
              console.log(`Sentence created: ${outputFile}`)
              resolve()
            })
        })
    }

    async function createThumbNail(content) {
      return new Promise((resolve, reject) => {

        const randomNumber = Math.round(Math.random() * (3 - 1) + 1);
        const image = path.join(__dirname, 'overlay', `old-man-${randomNumber}.jpg`)
        const outputFile = path.join(__dirname, 'content', 'output', 'thumbnail.png')

        const longText = content.quotes[5].text
        const text  = longText.slice(0, 30) + '...'

        const width = 1280;
        const height = 720;
        const imagePosition = {
          w: 440,
          h: 620,
          x: 0,
          y: 5,
        };

        const c = canvas.createCanvas(width, height);
        const context = c.getContext("2d");
        
        context.fillStyle = "#000";
        context.fillRect(0, 0, width, height);
        
        context.font = 'Arial';
        context.textAlign = "center";
        context.fillStyle = "#fff";

        context.font = "35pt 'PT Sans'";
        context.fillText(text, 800, 300);
      
        canvas.loadImage(image).then((image) => {
          const { w, h, x, y } = imagePosition;
          context.drawImage(image, x, y, w, h);
        
          const buffer = c.toBuffer("image/png");
          fs.writeFileSync(outputFile, buffer);
        });


        resolve();
      })
  }

  async function createVideoBackground(content) {
    return new Promise((resolve, reject) => {

      const randomNumber = Math.round(Math.random() * (3 - 1) + 1);
      const image = path.join(__dirname, 'overlay', `old-man-${randomNumber}.jpg`)
      const outputFile = path.join(__dirname, 'overlay', 'background-image.png')

      const width = 1280;
      const height = 720;
      const imagePosition = {
        w: 440,
        h: 620,
        x: 0,
        y: 5,
      };

      const c = canvas.createCanvas(width, height);
      const context = c.getContext("2d");
      
      context.fillStyle = "#000";
      context.fillRect(0, 0, width, height);
    
      canvas.loadImage(image).then((image) => {
        const { w, h, x, y } = imagePosition;
        context.drawImage(image, x, y, w, h);
      
        const buffer = c.toBuffer("image/png");
        fs.writeFileSync(outputFile, buffer);
      });


      resolve();
    })
  }



}


export default imagesService;