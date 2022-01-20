import { escapeRegExp } from '../helpers/helpers.js';

const inputAutoComplete = document.querySelector('#input');
const resultListAutoComplete = document.querySelector('.result-list__autocomplete');
const selectedListAutoComplete = document.querySelector('.selected-list__autocomplete');
let newArray = [];
let selectedItemsArray = [];

const technologies = [
    'Java Script', 'React', 'Next.js', 'HTML', 'scss', 'less', 'sass', 'Vue', 'Vanilla', 'Typescript', 'Angular', 'Python', 'Java', 'Go', 'Ruby', 'C++', 'C#', ';dziwny'
];

const searchFunction = (inputElement, arrElement) => {
    inputAutoComplete.addEventListener("input", function (e) {
        newArray = [];
        resultListAutoComplete.textContent = '';
        technologies.forEach((technology) => {
            inputElement = e.target.value.toLowerCase();
            arrElement = technology.toLowerCase();
            let matchesWord = arrElement.match(escapeRegExp(inputElement));
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

// Remove element from selected list
selectedListAutoComplete.addEventListener("click", function(e) {
    if (e.target && e.target.matches("span.close-icon")) {
        const parentValue = e.target.parentNode.innerText;
        const index = selectedItemsArray.indexOf(parentValue);
        if (index > -1) {
            selectedItemsArray.splice(index, 1);
        }
        selectedListAutoComplete.textContent = '';
        selectedItemsArray.forEach(selectedArrElement => {
            renderSelectedElement(selectedArrElement, 'selected-item__autocomplete', '.selected-list__autocomplete');
        });
    }
});

let index = 0;

inputAutoComplete.addEventListener("keydown", function (e) {
    const allLi = document.querySelectorAll('.result-item__autocomplete');
    const liElementsLength = allLi.length;
    let getPreviousElement;
    let getActualElement;

    //arrow down
    if (e.keyCode === 40 && liElementsLength > 0) {
        index++;
        getPreviousElement = allLi[index-2];
        getActualElement = allLi[index-1];

        if (index <= liElementsLength) {
            getActualElement.classList.add('selected');
            if (index > 1) {
                getPreviousElement.classList.remove('selected');
            }
        } else {
            allLi[liElementsLength - 1].classList.remove('selected')
            allLi[0].classList.add('selected');
            index = 1;
        }
    }     // arrow up
    if (e.keyCode === 38 && liElementsLength > 0) {
        console.log('up');
        index--;
        console.log(index)
        getPreviousElement = allLi[index];
        getActualElement = allLi[index-1];

        if (index > 0) {
            getActualElement.classList.add('selected');
            // if (index > 1) {
                getPreviousElement.classList.remove('selected');
            // }
        } else {
            allLi[0].classList.remove('selected')
            allLi[liElementsLength - 1].classList.add('selected');
            index = liElementsLength;
        }
    }
    else if (e && e.key.length === 1 || e.keyCode === 8) {
        index = 0;
    }


})

//TODO
inputAutoComplete.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
        const inputCurrentValue = inputAutoComplete.value;
        selectedItemsArray.push(inputCurrentValue);
        inputAutoComplete.value = "";
        console.log(selectedItemsArray);
        selectedListAutoComplete.textContent = '';
        selectedItemsArray.forEach(selectedArrElement => {
            renderSelectedElement(selectedArrElement, 'selected-item__autocomplete', '.selected-list__autocomplete');
        });
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