
/* Global Variables */
const apiKey = "&appid=3dd6822b4a27c10c36dc730057180df8&units=imperial";
const apiUrl = "http://localhost:4800/";


const zipCodeElement = document.getElementById('zip');

const feelingsCodeElement = document.getElementById('feelings');

const dateElement = document.getElementById('date');

const tempElement = document.getElementById('temp');

const contentElement = document.getElementById('content');


const catchError = (error) => console.error('Some ErrorHas Been => ', error);




document.getElementById('generate').addEventListener('click', onGenerate);



function onGenerate() {
    let data = {
        zipCode: zipCodeElement.value,
        content: feelingsCodeElement.value,
        date: new Date()
    };


    

    getZipCodeInformation(data.zipCode).then(zipInfo => {
        
        
        if (zipInfo.cod != 200)
            return alert(zipInfo.message)

            

                data.temp = zipInfo.main.temp;

        postDateToServer(data);
    }).catch(catchError);
};



async function getZipCodeInformation(zipCode) {
    return await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`)).json()
}




async function postDateToServer(data)
{
    let response = await fetch(`${apiUrl}postData`, 
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    try {
        if (!response.ok) 
        {
            alert('Process Not Successfuly');
            return;
        }
       
        response.json().then(data => 
            {
            if (response.ok)
                updateUI();
            else
                alert('Process Not Successfuly');
        }).catch(catchError);

    } catch (error) 
    {
        catchError(error);
    }
}



async function updateUI() 
{
    let response = await fetch(`${apiUrl}getAll`);
    try {
        response.json().then(data =>
             {
            dateElement.innerHTML = `Date Is: ${data.date}`;
            tempElement.innerHTML = `Temp Is: ${data.temp}`;
            contentElement.innerHTML = `My Feelings Is: ${data.content}`;
        }).catch(catchError);
    } catch (error) {
        catchError(error);
    }
}
