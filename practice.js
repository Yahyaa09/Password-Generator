
const symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~€£¥¢§©®™¶†‡°±¼½¾÷∑∞≈≠≤≥≪≫«»⊗√∆";

const slider = document.querySelector("#slider");
const passwordDisplay = document.querySelector("[data-lengthNumber]");

function genRandInt(min , max)
{
    return Math.floor(Math.random() * (max-min)) + min
}

function generateLowercase()
{
    return String.fromCharCode(genRandInt(97,123));
}
function generateUppercase()
{
    return String.fromCharCode(genRandInt(65,90));
}
function generateSymbol()
{
    let rand = genRandInt(0,symbols.length);
    return symbols.charAt(rand);
}

function generateNumber()
{
    return genRandInt(0,9);
}

let passwordLength =10;
let password = "";

handleSlider();

function handleSlider()
{
    passwordDisplay.innerText = passwordLength;
}


slider.addEventListener('input' ,(event)=>{
    passwordLength = event.target.value;
    handleSlider();

});







