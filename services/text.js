
const axios = require('axios')
const cheerio = require('cheerio')
const url = 'https://www.pensador.com/';
const state = require('./state.js')

async function textService() {

    const content = state.load()

    content.quotes = await getQuotes(content)
    state.save(content)
    
    async function getQuotes(content){
        const parsedSearchTerm = content.searchTerm.replace(/\s/g, '_')
        const {data} = await axios.get(`${url}${parsedSearchTerm}`);
        const quotes = [];
        const $ = cheerio.load(data);
    
        $('#phrasesList .thought-card').each((i, element) => {
            const text = $(element).find('.frase').text().replace('\n', '');
            const autor = $(element).find('.autor>a').text();
            if(text.length > 1000) return
            quotes.push({text: text, author: autor})
        });

        const sortedQuotes = quotes.sort(function(a, b){
            return a.text.length - b.text.length;
          });

        return sortedQuotes;
    }


    
}




module.exports = textService;