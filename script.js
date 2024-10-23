const inputSlider = document.querySelector("#slider");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("#Password");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copymsg]");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#special_characters");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-button");
const allcheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~€£¥¢§©®™¶†‡°±¼½¾÷∑∞≈≠≤≥≪≫«»⊗√∆";

let password = "";
let passwordLength = 10;
let checkCount = 0;
setIndicator("#ccc");

handleSlider();

function handleSlider() {
    lengthDisplay.innerText = passwordLength;
}

inputSlider.addEventListener('input', (event) => {
    passwordLength = event.target.value;
    handleSlider();
});

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0 0 10px ${color}`;
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateNumber() {
    return String.fromCharCode(getRandomInteger(48, 58)); // ASCII codes for '0' to '9'
}

function generateLowercase() {
    return String.fromCharCode(getRandomInteger(97, 123));
}

function generateUppercase() {
    return String.fromCharCode(getRandomInteger(65, 91)); // Corrected range to include 'Z'
}

function generateSymbol() {
    const randNum = getRandomInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = uppercase.checked;
    let hasLower = lowercase.checked;
    let hasSymbol = symbolsCheck.checked;
    let hasNumber = numbers.checked;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if ((hasLower || hasUpper) && (hasSymbol || hasNumber) && passwordLength >= 6) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    } catch (e) {
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

copyBtn.addEventListener('click', () => {
    if (password.length > 0) {
        copyContent();
    }
});

function handleCheckboxChange() {
    checkCount = 0;
    allcheckBox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;
        }
    });
}

allcheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange);
});

generateBtn.addEventListener('click', () => {
    if (checkCount === 0) {
        return;
    }

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    password = "";

    let funcArray = [];
    if (uppercase.checked) {
        funcArray.push(generateUppercase);
    }
    if (lowercase.checked) {
        funcArray.push(generateLowercase);
    }
    if (symbolsCheck.checked) {
        funcArray.push(generateSymbol);
    }
    if (numbers.checked) {
        funcArray.push(generateNumber);
    }

    // Compulsory addition
    for (let i = 0; i < funcArray.length; i++) {
        password += funcArray[i]();
    }

    // Remaining characters
    for (let i = 0; i < passwordLength - funcArray.length; i++) {
        let randNum = getRandomInteger(0, funcArray.length);
        password += funcArray[randNum]();
    }

    // Shuffling password
    password = shufflePassword(Array.from(password)).join('');

    passwordDisplay.value = password;

    calcStrength();
});

function shufflePassword(passwordArray) {
    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }
    return passwordArray;
}


