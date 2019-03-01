
//fetch list of country currency symbol
const fetchCurrency = (url) =>{
	const promise = new Promise((resolve, reject)=>{
		fetch(url)
		.then(data =>{
			resolve(data.json());
			reject("Couldn't Fetch data")
		})
	});

	return promise;
}


//currency conversion function call
const convertCurrency = (url) =>{
	const promise = new Promise((resolve, reject)=>{
		fetch(url)
		.then(data =>{
			resolve(data.json());
			reject("Couldn't Fetch data")
		})
	});

	return promise;
}




//currency symbol api
const url = `https://free.currencyconverterapi.com/api/v6/currencies?apiKey=04cac1d57911522c5ad1`;

//get currency entries
fetchCurrency(url)
.then(data => {
	
	let option,
		currencyId,
		currencyName;

	for(const currency of Object.values(data.results)){
		currencyId = currency.id;
		currencyName = currency.currencyName;

		option = document.createElement("option");
		option.innerText = `${currencyId} - ${currencyName}`;
		option.value = currencyId;
		//clone node injects its attributes to values
		document.getElementById("curr1").appendChild(option.cloneNode(true));
		document.getElementById("curr2").appendChild(option);
	}
})
.catch(err =>{console.log(err)})



//click on conversion button to get results
document.getElementById("convert")
.addEventListener("click", ()=> {
	//fetch currency conversion rate from server
	currencyFromServer();
})



	//fetch cuurency conversion rate from server
const currencyFromServer = () => {

	//input amount to convert
	const money_to_convert = document.getElementById("moneyInput");
	if(!isNaN(money_to_convert)) {
		return false;
	}

	//selected currency pairs to convert
	const curr_from = document.getElementById("curr1").value;
	const curr_to = document.getElementById("curr2").value;	

	
		//displays result of conversion rate
	const moneyConverted = document.getElementById("moneyConverted");


	const xchangeUrl = `https://free.currencyconverterapi.com/api/v6/convert?q=${curr_from}_${curr_to}&compact=ultra&apiKey=04cac1d57911522c5ad1`;
	
	moneyConverted.innerText = "Converting..."

	//currency conversion function call returns a promise
	convertCurrency(xchangeUrl)
	.then(data => {
		for(const currency of Object.values(data.results)){
			let answer = parseFloat(money_to_convert.value);
			moneyConverted.innerText = `${ currency.to }  ${(answer * currency.val).toFixed(4)}`;
		}						
	})
	.catch(err => {console.log(err)})

//end currencyFromServer function call
}
