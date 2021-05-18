/* Global Variables */
// var apiKey = 'b217d2265dedb691d8948c5003af02c2';
var apiKey = 'b217d2265dedb691d8948c5003af02c2&units=imperial';
const zip = document.getElementById('zip');
const feeling = document.getElementById('feelings');
const submitBtn = document.getElementById('generate');
const dateToday = document.getElementById('date');
const content = document.getElementById('content');
const tempToday = document.getElementById('temp');
const dateElement = document.createElement('p');
const tempElement = document.createElement('p');
const responseElement = document.createElement('p');

submitBtn.addEventListener('click', () => {
    if(zip.value === '' && feeling.value === '') {
        alert('please fill up zipcode and feelings!!');
        return;
    }
    console.log(zip.value)
    getWeatherData(`http://api.openweathermap.org/data/2.5/weather?zip=${zip.value}&APPID=${apiKey}`);

})

const postReq = async(url = '', data = {}) => {
    console.log(data);
    console.log(url)
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({data}),
    });
    try{
        const postData = await response.json();
        console.log(postData);
    }catch(error) {
        console.log(error);
    }
}

const getWeatherData = async(url = '') => {
    const d = new Date();
    
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
    })
    try{
        const waetherData = await response.json();
        console.log(waetherData.main.temp);
   let temperature = waetherData?.main?.temp; 
   var date = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
   var userResponse = feeling.value;

   var data = {date,temperature,userResponse};

   
   postReq('http://localhost:3000/post', data).then(()=>{
       getData();
   })
   
}catch(error) {
    console.log(error);
}
}
async function getData() {
    dateElement.innerText = " ";
    tempElement.innerText = " ";
    responseElement.innerText = " ";
    const response = await axios.get('http://localhost:3000/getAll');
    let {data} =await response;
    console.log(data.length)
    let item = data;
    console.log('response',item)
// for (var item of data){
//   console.log(item)
    dateElement.innerHTML = 'date today: ' + item.date;
    dateToday.append(dateElement);
    tempElement.innerHTML = 'temprature today: ' + item.temperature + ' F';
    tempToday.append(tempElement);
    responseElement.innerHTML = 'feelings: ' + item.userResponse;
    content.append(responseElement);
}
// }
