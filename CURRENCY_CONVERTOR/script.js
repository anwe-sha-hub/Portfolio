import{currencyToFlagCode} from './currency-to-flag-code.js'
 const inputSourceCurrency=document.getElementById('inputSourceCurrency');

const currencySelectElements=document.querySelectorAll('.Currency-Converter-select select');

 const imageSourceCurrency=document.getElementById('imageSourceCurrency');
const selectSourceCurrency=document.getElementById('selectSourceCurrency');

const imageTargetCurrency=document.getElementById('imageTargetCurrency');
const selectTargetCurrency=document.getElementById('selectTargetCurrency');

const buttonSwap=document.getElementById('buttonSwap');

const exchangeRateText=document.getElementById('exchangeRateText');
const buttonConvert=document.getElementById('buttonConvert');



let isFetching=false;
let conversionRate=0;
let sourceCurrencyValue=0;
let targetCurrencyValue=0;

buttonSwap.addEventListener('click',()=>{
  [selectSourceCurrency.value,selectTargetCurrency.value]
  =
  [selectTargetCurrency.value,selectSourceCurrency.value] ;

  [imageSourceCurrency.src,imageTargetCurrency.src]
  =
  [imageTargetCurrency.src,imageSourceCurrency.src];

  inputSourceCurrency.value=targetCurrencyValue;
  if(isFetching){
    conversionRate=1/conversionRate;
  }
  updateExchangeRate();
})

inputSourceCurrency.addEventListener('input',event =>{
    if (isFetching && inputSourceCurrency.value>0) {
        updateExchangeRate();
    }
})
buttonConvert.addEventListener('click',async ()=>{

    if(inputSourceCurrency.value <=0){
alert('Please enter a valid amount')
return;
    }
    exchangeRateText.textContent='Fetching exchange rate, please wait....';


    const selectSourceCurrencyValue=selectSourceCurrency.value;
    const selectTargetCurrencyValue=selectTargetCurrency.value;
    try{
       const response=
         await fetch(`https://v6.exchangerate-api.com/v6/ec7f8522b9bf4c3189bc6a3a/pair/${selectSourceCurrencyValue}/${selectTargetCurrencyValue}`);
    
    const data= await response.json();

    conversionRate=data.conversion_rate;
  isFetching=true;
    updateExchangeRate();
    }
    catch(error){
        console.log('Error fetching exchnage rate !',error);
        exchangeRateText.textContent='Error Fetching';
    }

});

function updateExchangeRate()  {
sourceCurrencyValue=parseFloat(inputSourceCurrency.value).toFixed(2);
targetCurrencyValue=(sourceCurrencyValue* conversionRate).toFixed(2);

exchangeRateText.textContent=
`${formatCurrency(sourceCurrencyValue)} ${selectSourceCurrency.value}
=
${formatCurrency(targetCurrencyValue)} ${selectTargetCurrency.value}`;
}



currencySelectElements.forEach(selectElement => {
    // ✅ Properly close the for loop with a }
    for (const [currency, flag] of Object.entries(currencyToFlagCode)) {
        const newOptionElement = document.createElement('option');
        newOptionElement.value = currency;
        newOptionElement.textContent = currency;
        selectElement.appendChild(newOptionElement);
    }

    selectElement.addEventListener('change', () => {
        inputSourceCurrency.value=0;
        isFetching=false;
        updateExchangeRate();
        changeFlag(selectElement);
    });

    if(selectElement.id==='selectTargetCurrency'){
        selectElement.value='IDR';
    }
})

function changeFlag(selectElement){
    const selectValue= selectElement.value;
    const selectId= selectElement.id;
    const flagCode= currencyToFlagCode[selectValue];
    if(selectId==='selectSourceCurrency'){
    imageSourceCurrency.src=`https://flagcdn.com/w640/${flagCode}.png` ;
    }else{
     imageTargetCurrency.src=`https://flagcdn.com/w640/${flagCode}.png` ;
}
}


function formatCurrency(number){
    return new Intl.NumberFormat().format(number);
}
