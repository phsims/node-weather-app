const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const searchLocation = document.querySelector("#searchLocation");
const decription = document.querySelector("#decription");
const current = document.querySelector("#current");
const humidity = document.querySelector("#humidity");
const errorMsg = document.querySelector("#errorMsg");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearFields();

  fetch(`/weather?address=${search.value}`).then((res) => {
    res.json().then((data) => {
      if (data.error) errorMsg.textContent = data.error;
      else
        (searchLocation.textContent = data.location),
          (decription.textContent = data.forcast.decription),
          (current.textContent = data.forcast.current),
          (humidity.textContent = data.forcast.humidity);
    });
  });
});

function clearFields() {
  searchLocation.textContent = null;
  decription.textContent = null;
  current.textContent = null;
  humidity.textContent = null;
  errorMsg.textContent = null;
}
