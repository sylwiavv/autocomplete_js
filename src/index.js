import "./style.scss";

const inputAutoComplete = document.querySelector('#input');
const text = document.querySelector('.text');
const resultListAutoComplete = document.querySelector('.result-list__autocomplete');
// const resultItemsAutoComplete = document.querySelectorAll('.result-item__autocomplete');
const selectedItemsAutoComplete = document.querySelectorAll('.selected-item__autocomplete');
const closeIcon = document.querySelectorAll('.close-icon');
let newArray = [];
let selectedItemsArray = [];

const technologies = [
    'Java Script', 'React', 'Next.js', 'HTML', 'scs', 'less', 'Vue', 'Vanilla'
];

const searchFunction = (inputElement, arrElement) => {
    inputAutoComplete.addEventListener("input", function (e) {
        newArray = [];
        resultListAutoComplete.textContent = '';
        technologies.forEach((technology) => {
            inputElement = e.target.value.toLowerCase();
            arrElement = technology.toLowerCase();
            let matchesWord = arrElement.match(inputElement);
            if (matchesWord !== null && inputElement !== '') {
                newArray.push(technology);
            }
        });

        newArray.forEach(arrElement => {
            renderElement(arrElement, 'result-item__autocomplete', '.result-list__autocomplete');
        });

        const elements = document.querySelectorAll('.result-item__autocomplete');
        elements.forEach(element => {
            element.addEventListener('click', (e)=> {
                const span = document.createElement('span');
                span.classList.add('close-icon');

                const clickedElement = element.innerHTML;
                selectedItemsArray.push(clickedElement);
                renderElement(clickedElement, 'selected-item__autocomplete', '.selected-list__autocomplete');
                const resultItemsAutoComplete = document.querySelectorAll('.selected-item__autocomplete');
                resultItemsAutoComplete.forEach(element => {
                    console.log(resultItemsAutoComplete)
                    element.appendChild(span);
                });
            })
        })
    });
}

//TODO
inputAutoComplete.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {

    }
});

const renderElement = (arrElement, liElementClass, ulElementClass) => {
    const fragment = document.createDocumentFragment();
    const ul = document.querySelector(ulElementClass);
    const li = document.createElement('li');

    li.classList.add(liElementClass);
    li.innerHTML = arrElement;
    fragment.appendChild(li);
    ul.appendChild(fragment);
}


searchFunction();