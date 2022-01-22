import { escapeRegExp, moveCursorToEnd } from '../helpers/helpers.js';
import { technologies } from '../../data/technologies';

const inputAutoComplete = document.querySelector('#input');
const resultListAutoComplete = document.querySelector('.result-list__autocomplete');
const selectedListAutoComplete = document.querySelector('.selected-list__autocomplete');
let resultsListItems = [];
let selectedListItems = [];

inputAutoComplete.addEventListener("input", function (e) {
    const firstElement = inputAutoComplete.value.replace(/\s/g, '');
    resultsListItems = [];
    if (firstElement !== "") {
        resultsListItems.push(firstElement);
    }
    resultListAutoComplete.textContent = '';
    technologies.forEach((technology) => {
        let inputElement = e.target.value.toLowerCase().replace(/\s/g, '');
        let arrElement = technology.toLowerCase().replace(/\s/g, '');
        let matchesWord = arrElement.match(escapeRegExp(inputElement));
        if (matchesWord !== null && inputElement !== '') {
            resultsListItems.push(technology);
        }
    });

    renderElement(resultsListItems, 'result-item__autocomplete', '.result-list__autocomplete');

    const elements = document.querySelectorAll('.result-item__autocomplete');
    if (elements[0]) {
        elements[0].classList.add('selected');
    }
    elements.forEach(element => {
        element.addEventListener('click', (e) => {
            const clickedElement = element.innerHTML;
            const array = selectedListItems.filter(selectedElement => selectedElement === clickedElement);
            array.length === 0 ? selectedListItems.push(clickedElement) : console.log('Element exist');
            renderSelectedElement(selectedListItems, 'selected-item__autocomplete', '.selected-list__autocomplete');
        })
    })
});

// Remove element from selected list
selectedListAutoComplete.addEventListener("click", function (e) {
    if (e.target && e.target.matches("span.close-icon")) {
        const parentValue = e.target.parentNode.textContent;
        const index = selectedListItems.indexOf(parentValue);
        if (index > -1) {
            selectedListItems.splice(index, 1);
        }
        renderSelectedElement(selectedListItems, 'selected-item__autocomplete', '.selected-list__autocomplete');
    }
});

let index = 0;
// function scrollWin(x, y, element) {
//     element.scrollBy(x, y);
//     console.log('test');
// }

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
            allLi[0].classList.remove('selected');
            allLi[liElementsLength - 1].classList.add('selected');
            index = liElementsLength;
        }
    }
    // esc
    if (e.keyCode === 27) {
        inputAutoComplete.value = "";
        resultsListItems = [];
        resultListAutoComplete.textContent = "";
    }
    // Enter
    if (e.keyCode === 13) {
        let currentInputValue = inputAutoComplete.value.replace(/\s/g, '');
        if (currentInputValue !== "") {
            const array = selectedListItems.filter(selectedElement => selectedElement === currentInputValue);
            array.length === 0 ? selectedListItems.push(currentInputValue) : console.log('Element exist');
        }
        console.log(selectedListAutoComplete)
        renderSelectedElement(selectedListItems, 'selected-item__autocomplete', '.selected-list__autocomplete');
        inputAutoComplete.value = "";
        resultsListItems = [];
        renderElement(resultsListItems, 'result-item__autocomplete', '.result-list__autocomplete');
    }

    // numbers, letters, special char and backspace
    if (e && e.key.length === 1 || e.keyCode === 8) {
        index = 1;
    }

    // Set input value to selected element
    const selectedElement = document.querySelector('.selected');
    if (selectedElement) inputAutoComplete.value = selectedElement.textContent;
});

const renderSelectedElement = (array, liElementClass, ulElementClass) => {
    renderElement(array, liElementClass, ulElementClass,  true);
}

const renderElement = (array, liElementClass, ulElementClass, shouldCreateAdditionalElement) => {
    const ul = document.querySelector(ulElementClass);
    ul.textContent = '';
    console.log(array);
    array.forEach(arrElement => {
        const fragment = document.createDocumentFragment();
        const li = document.createElement('li');
        li.classList.add(liElementClass);
        li.innerHTML = arrElement;
        if (shouldCreateAdditionalElement) {
            const span = document.createElement('span');
            span.classList.add('close-icon');
            li.appendChild(span);
        }
        fragment.appendChild(li);
        ul.appendChild(fragment);
    });
}

