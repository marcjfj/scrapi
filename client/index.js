import 'regenerator-runtime/runtime'
const field = document.querySelector('.blank-field');
const submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('click', async () => {
  const fullUrl = field.value;
  const url = encodeURIComponent(field.value);
  const response = await fetch(`http://localhost:1337/?url=${url}`);
  const title = await response.json();
  console.log(title);
  alert(title);
  
})