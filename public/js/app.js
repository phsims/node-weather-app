const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  fetch(`http://localhost:3000/weather?address=${search.value}`).then((res) => {
    res.json().then((data) => {
      if (data.error) messageOne.textContent = data.error;
      else messageOne.textContent = data.location,messageTwo.textContent = data.forcast;
    });
  });
});
