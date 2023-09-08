const baseURL = `http://api.openweathermap.org/data/2.5/forecast?zip=`;
const apiKey = '&appid=8deaed0915891cc9f03f768b4cebd421&units=imperial';

const generateButton = document.getElementById('generate');
const zipCode =  document.getElementById('zip');
const feelings =  document.getElementById('feelings');

generateButton.addEventListener('click', performAction);

function performAction(){  

  getCity(baseURL,zipCode.value, apiKey);

}

const getCity = async (baseURL, zip, key)=>{

  const res = await fetch(baseURL+zip+key);

  try {

    const data = await res.json();
    const newDate = data.list[0].dt_txt ;
    const regex = /\d{4}-\d{2}-\d{2}/;
    const dt = newDate.match(regex)[0];
    console.log(`Data from OpenWeatherMap API :`);
    console.log(data);
    /*
    console.log(`Your Date: ${dt}`);
    console.log(`Your Temperature: ${data.list[0].main.temp}`);
    console.log(`I feel: ${feelings.value}`);*/

    const newData = {"date":dt,"temperature":data.list[0].main.temp,"response":feelings.value};

    console.log(`Data i send it to my server :`);
    console.log(newData);

    postData('/add',newData);
    updateUI();

  }  catch(error) {
    // appropriately handle the error
    console.log("error", error);
  }
}


//Post data to server
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
  });
}


//Get Data from server and update UI

const updateUI =  async () =>{
  const res = await fetch('/get');
  try {
    // Transform into JSON
    const allData = await res.json();
    console.log(`Data i got it from my server :`);
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('date').innerHTML =`Your Date : ${allData.date}`;
    document.getElementById('temp').innerHTML = `Your Temperature : ${allData.temperature} Celsius`;
    document.getElementById('content').innerHTML = `I feel : ${allData.response}`;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}