import "./style.scss";

const inputAutoComplete = document.querySelector('#input');
const text = document.querySelector('.text');
const resultListAutoComplete = document.querySelector('.result-list__autocomplete');
const selectedListAutoComplete = document.querySelector('.selected-list__autocomplete');
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
            element.addEventListener('click', (e) => {
                const clickedElement = element.innerHTML;
                const array = selectedItemsArray.filter(selectedElement => selectedElement === clickedElement);
                array.length === 0 ? selectedItemsArray.push(clickedElement) : console.log('Element exist');
                selectedListAutoComplete.textContent = '';
                selectedItemsArray.forEach(selectedArrElement => {
                    renderSelectedElement(selectedArrElement, 'selected-item__autocomplete', '.selected-list__autocomplete');
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

const renderSelectedElement = (arrElement, liElementClass, ulElementClass) => {
    renderElement(arrElement, liElementClass, ulElementClass);
    const span = document.createElement('span');
    span.classList.add('close-icon');
    const resultItemsAutoComplete = document.querySelectorAll('.selected-item__autocomplete');
    resultItemsAutoComplete.forEach(element => {
        element.appendChild(span);
    });
}

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