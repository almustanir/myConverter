// fetching the symbol data from API endpoint
const getCurrencyOptions = async () => {
    const optionsUrl = 'https://api.exchangerate.host/symbols';
    const response = await fetch(optionsUrl);

    const json = await response.json();
   
    return json.symbols;
}
 getCurrencyOptions().then(console.log)

// Fetching the currency rates (convert endPoint result) data from Api endpoint.
const getCurrencyRates = async (fromCurrency,  toCurrency) => {
    const currencyConvertUrl = new URL ('https://api.exchangerate.host/convert');
    currencyConvertUrl.searchParams.append('from', fromCurrency);
    currencyConvertUrl.searchParams.append('to', toCurrency);

    const response = await fetch(currencyConvertUrl);

    const json = await response.json();

    return json.result;
}

//this function will create new option element and create it for the select element being pass an argument

const appendOptionsElToSelect = (selectEl, optionItem) => {
  const optionElement =  document.createElement('option');
  optionElement.value = optionItem.code;
  optionElement.textContent = optionItem.description;

  selectEl.appendChild(optionElement);
}

const populateSelectEl = (selectEl, optionList) => {
    optionList.forEach((optionItem) => {
        appendOptionsElToSelect(selectEl, optionItem);
    })
}

// set up currencies and make refrence to the DOM elements

const setUpCurrencies = async () => {
 const fromCurrency =   document.querySelector('#fromCurrency')
  const toCurrency =  document.querySelector('#toCurrency')

  const CurrencyOptions = await getCurrencyOptions()
 const currencies =  Object.keys(CurrencyOptions).map(CurrencyKeys =>CurrencyOptions[CurrencyKeys] )

 // populate the select element using the previous function
  populateSelectEl(fromCurrency, currencies)
  populateSelectEl(toCurrency, currencies)
};

// This function will let us setUp the event Listner in a seperate function and call the function individual
// setting up event listner for our form

const setupEventListner = () => {
    const formEl = document.getElementById('converterForm')
    formEl.addEventListener('submit', async event => {
        event.preventDefault();
        const fromCurrency = document.querySelector('#fromCurrency');
        const toCurrency = document.querySelector('#toCurrency');
        const amount = document.querySelector ('#amount');
        const convertResultEl = document.querySelector('#convertResult');

        try {
            const rate = await getCurrencyRates(fromCurrency.value, toCurrency.value);
            const amountValue = +amount.value;
            const conversionRate = +amountValue * rate.toFixed(2);
            convertResultEl.textContent = `${amountValue}  ${fromCurrency.value} = ${conversionRate} ${toCurrency.value}`
        }
         catch(err) {
            convertResultEl.textContent = `❌❌There is an error fetching data [${err.message}]`
            convertResultEl.classList.add('error')
        }
    } )
}


setUpCurrencies();
setupEventListner ();

console.log(10)
console.log(Number(10))
