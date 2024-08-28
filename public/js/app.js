const h1Element = document.querySelector('h1');
h1Element.style.backgroundColor = 'lightgreen';
h1Element.style.paddingInlineStart = '50px';
h1Element.style.border = '1px solid black'
h1Element.style.borderRadius = '10px';

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form Submitting');
    console.log(search.value);
    fetch(`http://localhost:10000/weather?address=${search.value}`).then((response) => {
        response.json()
            .then((data) => {
                console.log(data);
            });
    });
});




