import gm from "gm";
import path from "path";
import state from "./state.js";
import fs from "fs";
import axios from "axios";
import canvas from "canvas";

const im = gm.subClass({ imageMagick: true });
const __dirname = path.resolve();
async function imagesService() {
  const content = state.load();
  await downloadNewsImages(content);
  await createShortVideoNewsSentences(content);


  async function createAllSentenceImages(content) {
    for (let quoteIndex = 0; quoteIndex < content.quotes.length; quoteIndex++) {
      await createSentenceImage(quoteIndex, content.quotes[quoteIndex]);
    }
  }

  async function createSentenceImage(quoteIndex, quote) {
    return new Promise((resolve, reject) => {
      const outputFile = path.join(
        __dirname,
        "content",
        "images",
        `${quoteIndex}-sentence.png`
      );

      const text =
        quoteIndex === 0 || quoteIndex + 1 === quotesLength
          ? quote.text
          : `"${quote.text}"`;
      const author = quote.author ? " - " + quote.author : "";

      const parsedSentence = `${text}\n${author}`;
      im()
        .out("-size", "800x720")
        .out("-gravity", "center")
        .out("-background", "black")
        .out("-fill", "white")
        .out("-kerning", "-1")
        .font("Arial", 30)
        .in("-weight", "900")
        .out(`caption:${parsedSentence}`)
        .write(outputFile, (error) => {
          if (error) {
            return reject(error);
          }

          console.log(`Sentence created: ${outputFile}`);
          resolve();
        });
    });
  }

  async function createThumbNail(content) {
    return new Promise((resolve, reject) => {
      const image = path.join(
        __dirname,
        "overlay",
        `old-man-${randomNumber}.jpg`
      );
      const outputFile = path.join(
        __dirname,
        "content",
        "output",
        "thumbnail.png"
      );

      const longText = content.quotes[10].text;
      const text = longText.slice(0, 20) + "...";

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

      context.font = "Arial";
      context.textAlign = "center";
      context.fillStyle = "#fff";
      context.fillText(text, 800, 300);

      canvas.loadImage(image).then((image) => {
        const { w, h, x, y } = imagePosition;
        context.drawImage(image, x, y, w, h);

        const buffer = c.toBuffer("image/png");
        fs.writeFileSync(outputFile, buffer);
      });

      resolve();
    });
  }

  async function createVideoBackground(content) {
    return new Promise((resolve, reject) => {
      const image = path.join(
        __dirname,
        "overlay",
        `old-man-${randomNumber}.jpg`
      );
      const outputFile = path.join(
        __dirname,
        "overlay",
        "background-image.png"
      );

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
    });
  }


  async function createShortVideoNewsImages(content){
    for (let newsIndex = 0; newsIndex < content.news.length; newsIndex++) {
      await createSentenceImage(newsIndex, content.news[newsIndex]);
    }
  }

  async function createShortVideoNewsSentences(newsIndex, news) {
    if(!news) return;
    return new Promise((resolve, reject) => {
      const outputFile = path.join(
        __dirname,
        "content",
        "images",
        `${newsIndex}-sentence.png`
      );

      im()
        .out("-size", "1080x1920")
        .out("-gravity", "center")
        .out("-background", "black")
        .out("-fill", "white")
        .out("-kerning", "-1")
        .font("Arial", 30)
        .in("-weight", "900")
        .out(`caption:${news.title}`)
        .write(outputFile, (error) => {
          if (error) {
            return reject(error);
          }

          console.log(`Sentence created: ${outputFile}`);
          resolve();
        });
    });
  }

  async function downloadNewsImages(content){
    for (let newsIndex = 0; newsIndex < content.news.length; newsIndex++) {
      const outputLocationPath = path.join(
        __dirname,
        "content",
        "images",
        `${newsIndex}-sentence.png`
      );
      const imageUrl = content.news[newsIndex].urlToImage;
      if(!imageUrl) return;
      await downloadImage(imageUrl, outputLocationPath);
    }

  }

  async function downloadImage(fileUrl, outputLocationPath){
      const writer = fs.createWriteStream(outputLocationPath);
    
      return axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
      }).then(response => {
    
        return new Promise((resolve, reject) => {
          response.data.pipe(writer);
          let error = null;
          writer.on('error', err => {
            error = err;
            writer.close();
            reject(err);
          });
          writer.on('close', () => {
            if (!error) {
              resolve(true);
            }
          });
        });
      })
      .catch((err) => {
        console.log(err)
      });
  }
}

export default imagesService;
