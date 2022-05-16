import readLine from  'readline-sync'
import state from './state.js'

async function InputService() {
    const content = {}
    content.searchTerm = askAndReturnSearchTerm()
    state.save(content)
    function askAndReturnSearchTerm() {
        return readLine.question('Digite o termo da pesquisa: ') 
    }
}


export default InputService
