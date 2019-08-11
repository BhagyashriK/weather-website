const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

const getWeather = (searchTerm) => {
  messageOne.textContent="Loading ...";
  messageTwo.textContent = "";
  fetch(`/weather?address=${searchTerm}`).then(repsonse => {
    repsonse.json().then(data => {
      if(data.error) {
        messageOne.textContent="";
        messageTwo.textContent = data.error;
        console.log(data.error);
      } else {
        messageOne.textContent=data.location;
        messageTwo.textContent = data.forcast;
        console.log(data);
      }
    });
  });
}

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  getWeather(location);
});

// getWeather('pune');