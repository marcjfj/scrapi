import 'regenerator-runtime/runtime'
const field = document.querySelector('.blank-field');
const submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('click', async () => {
  const url = field.value.replace('https://', '').replace(/\//g, '~');
  const response = await fetch(`http://localhost:3000/${url}`);
  const title = await response.json();
  console.log(title);
  alert(title);
  
})