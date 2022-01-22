import {escapeRegExp, moveCursorToEnd} from '../helpers/helpers.js';
import {technologies} from '../../data/technologies';

const inputAutoComplete = document.querySelector('#input');
const resultListAutoComplete = document.querySelector('.result-list__autocomplete');
const selectedListAutoComplete = document.querySelector('.selected-list__autocomplete');
let resultsListItems = [];
let selectedListItems = [];

inputAutoComplete.addEventListener("input", function (e) {
    const resultItemValue = e.target.value.toLowerCase().replace(/\s/g, '');
    resultsListItems = [];
    if (resultItemValue !== "") {
        resultsListItems.push(resultItemValue);
    }
    technologies.forEach((technology) => {
        const getTechnologyItem = technology.toLowerCase().replace(/\s/g, '');
        const matchItems = getTechnologyItem.match(escapeRegExp(resultItemValue));

        // empty match string do not return null but empty object
        if (matchItems !== null && resultItemValue !== '') {
            resultsListItems.push(technology);
        }
    });
    renderElements(resultsListItems, 'result-item__autocomplete', '.result-list__autocomplete');
    const resultItemsAutocomplete = document.querySelectorAll('.result-item__autocomplete');
    if (resultItemsAutocomplete[0]) {
        resultItemsAutocomplete[0].classList.add('selected');
    }
});

// Add element on click to select list
resultListAutoComplete.addEventListener("click", function (e) {
    if (e.target && e.target.matches("li.result-item__autocomplete")) {
        const clickedElement = e.target;
        const clickedElementValue = e.target.textContent;
        const resultListAutocomplete = document.querySelectorAll('.result-item__autocomplete');
        resultListAutocomplete[0].classList.remove('selected');
        clickedElement.classList.add('selected');
        // Check if clicked element exists in selected list, if array is empty add element
        const foundItems = selectedListItems.filter(selectedElement => selectedElement === clickedElementValue);
        if (foundItems.length === 0) {
            selectedListItems.push(clickedElementValue);
        }
        renderSelectedElement(selectedListItems, 'selected-item__autocomplete', '.selected-list__autocomplete');
        inputAutoComplete.value = "";
        resultsListItems = [];
        resultListAutoComplete.classList.remove('empty')
        setTimeout(() => {
            renderElements(resultsListItems, 'result-item__autocomplete', '.result-list__autocomplete');
            resultListAutoComplete.classList.add('empty');
        }, 200);
    }
});

// Remove element from selected list
selectedListAutoComplete.addEventListener("click", function (e) {
    if (e.target && e.target.matches("span.close-icon")) {
        const clickedElement = e.target.parentNode.textContent;
        const index = selectedListItems.indexOf(clickedElement);
        if (index > -1) {
            selectedListItems.splice(index, 1);
        }
        renderSelectedElement(selectedListItems, 'selected-item__autocomplete', '.selected-list__autocomplete');
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
            allLi[0].classList.remove('selected');
            allLi[liElementsLength - 1].classList.add('selected');
            index = liElementsLength;
        }
    }
    // esc
    if (e.keyCode === 27) {
        inputAutoComplete.value = "";
        resultsListItems = [];
        renderElements(resultsListItems, 'result-item__autocomplete', '.result-list__autocomplete');
    }
    // Enter
    if (e.keyCode === 13) {
        let currentInputValue = inputAutoComplete.value.replace(/\s/g, '');
        if (currentInputValue !== "") {
            const foundItems = selectedListItems.filter(selectedElement => selectedElement === currentInputValue);
            if (foundItems.length === 0) {
                selectedListItems.push(currentInputValue);
            }
        }
        renderSelectedElement(selectedListItems, 'selected-item__autocomplete', '.selected-list__autocomplete');
        inputAutoComplete.value = "";
        resultsListItems = [];
        renderElements(resultsListItems, 'result-item__autocomplete', '.result-list__autocomplete');
    }

    // numbers, letters, special char and backspace
    if (e && e.key.length === 1 || e.keyCode === 8) {
        index = 1;
    }

    // Set input value to selected element
    const selectedElement = document.querySelector('.selected');
    if (selectedElement) inputAutoComplete.value = selectedElement.textContent;
});

// Render items for select list
const renderSelectedElement = (listItems, liElementClass, ulElementClass) => {
    const shouldCreateDeleteIcon = true;
    renderElements(listItems, liElementClass, ulElementClass, shouldCreateDeleteIcon);
}

const renderElements = (listItems, liElementClass, ulElementClass, shouldCreateDeleteIcon) => {
    const ul = document.querySelector(ulElementClass);
    ul.textContent = '';
    listItems.forEach(arrElement => {
        const fragment = document.createDocumentFragment();
        const li = document.createElement('li');
        li.classList.add(liElementClass);
        li.innerHTML = arrElement;

        if (shouldCreateDeleteIcon) {
            const span = document.createElement('span');
            span.classList.add('close-icon');
            li.appendChild(span);
        }

        fragment.appendChild(li);
        ul.appendChild(fragment);
    });
}