import {escapeRegExp, moveCursorToEnd} from '../helpers/helpers.js';

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
        const firstElement = inputAutoComplete.value;
        newArray = [];
        if (firstElement.replace(/\s/g, '') !== "") {
            newArray.push(firstElement);
        }
        resultListAutoComplete.textContent = '';
        technologies.forEach((technology) => {
            inputElement = e.target.value.toLowerCase().replace(/\s/g, '');
            arrElement = technology.toLowerCase().replace(/\s/g, '');
            let matchesWord = arrElement.match(escapeRegExp(inputElement));
            if (matchesWord !== null && inputElement !== '') {
                newArray.push(technology);
            }
        });
        newArray.forEach(arrElement => {
            renderElement(arrElement, 'result-item__autocomplete', '.result-list__autocomplete');
        });

        const elements = document.querySelectorAll('.result-item__autocomplete');
        // console.log(elements[0].textContent.length);
        if (elements[0]) {
            elements[0].classList.add('selected');
        }
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
selectedListAutoComplete.addEventListener("click", function (e) {
    if (e.target && e.target.matches("span.close-icon")) {
        const parentValue = e.target.parentNode.textContent;
        const index = selectedItemsArray.indexOf(parentValue);
        console.log([parentValue]);
        console.log(index);
        console.log(e);
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

inputAutoComplete.addEventListener("keydown", (e) => {
    const allLi = document.querySelectorAll('.result-item__autocomplete');
    const liElementsLength = allLi.length;
    let getPreviousElement;
    let getActualElement;
    // arrow down
    if (e.keyCode === 40 && liElementsLength > 0) {
        index++;
        getPreviousElement = allLi[index - 2];
        getActualElement = allLi[index - 1];

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
    }
    // arrow up
    if (e.keyCode === 38 && liElementsLength > 0) {
        moveCursorToEnd(e, inputAutoComplete);
        index--;
        getPreviousElement = allLi[index];
        getActualElement = allLi[index - 1];

        if (index > 0) {
            getActualElement.classList.add('selected');
            getPreviousElement.classList.remove('selected');

        } else {
            allLi[0].classList.remove('selected')
            allLi[liElementsLength - 1].classList.add('selected');
            index = liElementsLength;
        }
    }
    // esc
    if (e.keyCode === 27) {
        inputAutoComplete.value = "";
        newArray = [];
        resultListAutoComplete.textContent = "";
    }
    // Enter
    if (e.keyCode === 13) {
        let currentInputValue = inputAutoComplete.value;
        if (currentInputValue.replace(/\s/g, '') !== "") {
            const array = selectedItemsArray.filter(selectedElement => selectedElement === currentInputValue);
            array.length === 0 ? selectedItemsArray.push(currentInputValue) : console.log('Element exist');
        }
        selectedListAutoComplete.textContent = "";
        selectedItemsArray.forEach(selectedArrElement => {
            renderSelectedElement(selectedArrElement, 'selected-item__autocomplete', '.selected-list__autocomplete');
        });

        inputAutoComplete.value = "";
        newArray = [];
        resultListAutoComplete.textContent = "";
        newArray.forEach(arrElement => {
            renderElement(arrElement, 'result-item__autocomplete', '.result-list__autocomplete');
        });
    }
    // numbers, letters, special char and backspace
    if (e && e.key.length === 1 || e.keyCode === 8) {
        index = 1;
    }

    const selectedElement = document.querySelector('.selected');
    //todo null
    selectedElement ? inputAutoComplete.value = selectedElement.textContent : null;
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