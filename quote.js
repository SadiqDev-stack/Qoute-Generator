
const $ = ele => ele.includes('*') ?
  document.querySelectorAll(ele.replace('*', '')) :
  document.querySelector(ele);
  
const display = $('.quoteDisplay');
const generateBtn = $('.generateBtn');
const copyBtn = $('.copyBtn');
const defaultText = "Click Here To Generate quote..."

const endpoint = "https://random-quotes-freeapi.vercel.app/api/random"
display.textContent = defaultText;
let typing = false;
const typingSpeed = 30

const type = (text,ele) => {
  let index = 0;
  ele.textContent = '';
  typing = true;
  
   const typer = setInterval(e => {
     if(ele.textContent.length < text.length){
       ele.textContent += text.charAt(index);
       index++
     }else{
       clearInterval(typer);
       typing = false
     }
   },typingSpeed)
}

let currentQuote = defaultText
type(currentQuote,display)

const getQuote = e => {
  if(!typing){
  generateBtn.disabled = true;
  generateBtn.textContent = 'Generating Quote...'
  typing = true // for loading
  fetch(endpoint)
  .then(res => res.json())
  .then(data => currentQuote = data.quote)
  .catch(er => currentQuote = "Error Loading Quote Check Your Connection And Try Again...")
  .finally(e => {
    type(currentQuote,display)
    generateBtn.disabled = false;
    generateBtn.textContent = 'Generate Quote';
  })
  }
}

const copyQuote = e => {
  copyBtn.textContent = "Copying Quote"
  navigator.clipboard.writeText(currentQuote)
  .catch(e => {
    copyBtn.textContent = 'Error / No Permission'
    setTimeout(e => copyBtn.textContent = "Copy Quote",500)
   })
  .then(e => {
    copyBtn.textContent = "Quote copied"
    setTimeout(e => copyBtn.textContent = "Copy Quote",500)
  })
}

copyQuote()

generateBtn.onclick = getQuote
copyBtn.onclick = copyQuote

