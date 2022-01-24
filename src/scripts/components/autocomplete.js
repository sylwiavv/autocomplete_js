import { escapeRegExp, moveCursorToEnd } from '../helpers/helpers.js';
import { technologies } from '../../data/technologies';

const inputAutoComplete = document.querySelector('#input');
const autoCompleteResultList = document.querySelector('.autocomplete__result-list');
const autoCompleteSelectedList = document.querySelector('.autocomplete__selected-list');
let resultsListItems = [];
let selectedListItems = [];

inputAutoComplete.addEventListener("input", function (e) {
    let inputValue = e.target.value;
    resultsListItems = [];
    // If user enters empty string do nothing
    if (inputValue.trim() !== "") {
        resultsListItems.push(inputValue);
        technologies.forEach((technology) => {
            const technologyItem = technology.toLowerCase().replace(/\s/g, "");
            const matchItems = technologyItem.match(escapeRegExp(inputValue.toLowerCase().replace(/\s/g, '')));
            // If element does not match then match method returns null
            if (matchItems !== null) {
                resultsListItems.push(technology);
            }
        });
    }
    renderElements(resultsListItems, 'autocomplete__result-item', '.autocomplete__result-list');
    const resultItemsAutocomplete = document.querySelectorAll('.autocomplete__result-item');
    if (resultItemsAutocomplete[0]) {
        resultItemsAutocomplete[0].classList.add('selected');
    }
});

// Add element on click to select list
autoCompleteResultList.addEventListener("click", function (e) {
    if (e.target && e.target.matches("li.autocomplete__result-item")) {
        const clickedElement = e.target;
        const clickedElementValue = e.target.dataset.value.trim();
        const autoCompleteResultList = document.querySelectorAll('.autocomplete__result-item');
        autoCompleteResultList[0].classList.remove('selected');
        clickedElement.classList.add('selected');
        // Check if clicked element exists in selected list, if foundItems is empty add element
        const foundItems = selectedListItems.filter(selectedElement => selectedElement === clickedElementValue);
        if (foundItems.length === 0) {
            selectedListItems.push(clickedElementValue);
        }
        renderSelectedElements(selectedListItems, 'autocomplete__selected-item', '.autocomplete__selected-list');
        inputAutoComplete.value = "";
        resultsListItems = [];
        renderElements(resultsListItems, 'autocomplete__result-item', '.autocomplete__result-list');
    }
});

// Remove element from selected list
autoCompleteSelectedList.addEventListener("click", function (e) {
    if (e.target && e.target.matches("span.close-icon")) {
        const clickedElement = e.target.parentNode.dataset.value;
        const index = selectedListItems.indexOf(clickedElement);
        if (index > -1) {
            selectedListItems.splice(index, 1);
        }
        renderSelectedElements(selectedListItems, 'autocomplete__selected-item', '.autocomplete__selected-list');
    }
});

let index = 0;
inputAutoComplete.addEventListener("keydown", (e) => {
    const allLi = document.querySelectorAll('.result-item__autocomplete');
    const liElementsLength = allLi.length;
    let previousElement;
    let actualElement;
    // arrow down
    if (e.keyCode === 40 && liElementsLength > 0) {
        index++;
        previousElement = allLi[index - 2];
        actualElement = allLi[index - 1];

        if (index <= liElementsLength) {
            actualElement.classList.add('selected');
            if (index > 1) {
                previousElement.classList.remove('selected');
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
        previousElement = allLi[index];
        actualElement = allLi[index - 1];

        if (index > 0) {
            actualElement.classList.add('selected');
            previousElement.classList.remove('selected');
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
        renderElements(resultsListItems, 'autocomplete__result-item', '.autocomplete__result-list');
    }
    // Enter
    if (e.keyCode === 13) {
        let currentInputValue = inputAutoComplete.value.trim();
        if (currentInputValue !== "") {
            const foundItems = selectedListItems.filter(selectedElement => selectedElement === currentInputValue);
            if (foundItems.length === 0) {
                selectedListItems.push(currentInputValue);
            }
        }

        renderSelectedElements(selectedListItems, 'autocomplete__selected-item', '.autocomplete__selected-list');
        inputAutoComplete.value = "";
        resultsListItems = [];
        renderElements(resultsListItems, 'autocomplete__result-item', '.autocomplete__result-list');
    }

    // numbers, letters, special char and backspace
    if (e && e.key.length === 1 || e.keyCode === 8) {
        index = 1;
    }

    // Set input value to selected element
    const selectedElement = document.querySelector('.selected');
    if (selectedElement) inputAutoComplete.value = selectedElement.dataset.value;
});

// Render items for select list
const renderSelectedElements = (listItems, liElementClass, ulElementClass) => {
    const shouldCreateDeleteIcon = true;
    renderElements(listItems, liElementClass, ulElementClass, shouldCreateDeleteIcon);
}

const renderElements = (listItems, liElementClass, ulElementClass, shouldCreateDeleteIcon) => {
    const ul = document.querySelector(ulElementClass);
    ul.textContent = "";
    listItems.forEach(listElement => {
        const fragment = document.createDocumentFragment();
        const li = document.createElement('li');
        li.classList.add(liElementClass);
        li.setAttribute('data-value', listElement);
        li.innerHTML = listElement.replaceAll(" ", '&nbsp;');
        if (shouldCreateDeleteIcon) {
            const span = document.createElement('span');
            span.classList.add('close-icon');
            li.appendChild(span);
        }
        fragment.appendChild(li);
        ul.appendChild(fragment);
    });
}