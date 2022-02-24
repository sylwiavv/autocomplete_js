import {escapeRegExp, moveCursorToEnd} from '../helpers/helpers.js';
import {technologies} from '../../data/technologies';

const inputAutoComplete = document.querySelector('#input');
const autoCompleteResultList = document.querySelector('.autocomplete__result-list');
const autoCompleteSelectedList = document.querySelector('.autocomplete__selected-list');
let resultsListItems = [];
let selectedListItems = [];
//
// inputAutoComplete.addEventListener("input", function (e) {
//     let inputValue = e.target.value;
//     resultsListItems = [];
//     // If user enters empty string do nothing
//     if (inputValue.trim() !== "") {
//         resultsListItems.push(inputValue);
//         technologies.forEach((technology) => {
//             const technologyItem = technology.toLowerCase().replace(/\s/g, "");
//             const matchItems = technologyItem.match(escapeRegExp(inputValue.toLowerCase().replace(/\s/g, '')));
//             // If element does not match then match method returns null
//             if (matchItems !== null) {
//                 resultsListItems.push(technology);
//             }
//         });
//     }
//     renderElements(resultsListItems, 'autocomplete__result-item', '.autocomplete__result-list');
//     const resultItemsAutocomplete = document.querySelectorAll('.autocomplete__result-item');
//     if (resultItemsAutocomplete[0]) {
//         resultItemsAutocomplete[0].classList.add('selected');
//     }
// });
//
// // Add element on click to select list
// autoCompleteResultList.addEventListener("click", function (e) {
//     if (e.target && e.target.matches("li.autocomplete__result-item")) {
//         const clickedElement = e.target;
//         const clickedElementValue = e.target.dataset.value.trim();
//         const autoCompleteResultList = document.querySelectorAll('.autocomplete__result-item');
//         autoCompleteResultList[0].classList.remove('selected');
//         clickedElement.classList.add('selected');
//         // Check if clicked element exists in selected list, if foundItems is empty add element
//         const foundItems = selectedListItems.filter(selectedElement => selectedElement === clickedElementValue);
//         if (foundItems.length === 0) {
//             selectedListItems.push(clickedElementValue);
//         }
//         renderSelectedElements(selectedListItems, 'autocomplete__selected-item', '.autocomplete__selected-list');
//         inputAutoComplete.value = "";
//         resultsListItems = [];
//         renderElements(resultsListItems, 'autocomplete__result-item', '.autocomplete__result-list');
//     }
// });
//
// // Remove element from selected list
// autoCompleteSelectedList.addEventListener("click", function (e) {
//     if (e.target && e.target.matches("span.close-icon")) {
//         const clickedElement = e.target.parentNode.dataset.value;
//         const index = selectedListItems.indexOf(clickedElement);
//         if (index > -1) {
//             selectedListItems.splice(index, 1);
//         }
//         renderSelectedElements(selectedListItems, 'autocomplete__selected-item', '.autocomplete__selected-list');
//     }
// });
//
// let index = 0;
// inputAutoComplete.addEventListener("keydown", (e) => {
//     const liElements = document.querySelectorAll('.autocomplete__result-item');
//     const liElementsLength = liElements.length;
//     let previousElement;
//     let actualElement;
//
//     // Arrow down
//     if (e.keyCode === 40 && liElementsLength > 0) {
//         index++;
//         previousElement = liElements[index - 2];
//         actualElement = liElements[index - 1];
//
//         if (index <= liElementsLength) {
//             actualElement.classList.add('selected');
//             if (index > 1) {
//                 previousElement.classList.remove('selected');
//             }
//         } else {
//             liElements[liElementsLength - 1].classList.remove('selected')
//             liElements[0].classList.add('selected');
//             index = 1;
//         }
//     }
//     // Arrow up
//     if (e.keyCode === 38 && liElementsLength > 0) {
//         moveCursorToEnd(e, inputAutoComplete);
//         index--;
//         previousElement = liElements[index];
//         actualElement = liElements[index - 1];
//
//         if (index > 0) {
//             actualElement.classList.add('selected');
//             previousElement.classList.remove('selected');
//         } else {
//             liElements[0].classList.remove('selected');
//             liElements[liElementsLength - 1].classList.add('selected');
//             index = liElementsLength;
//         }
//     }
//     // Esc
//     if (e.keyCode === 27) {
//         inputAutoComplete.value = "";
//         resultsListItems = [];
//         renderElements(resultsListItems, 'autocomplete__result-item', '.autocomplete__result-list');
//     }
//     // Enter
//     if (e.keyCode === 13) {
//         let currentInputValue = inputAutoComplete.value.trim();
//         if (currentInputValue !== "") {
//             const foundItems = selectedListItems.filter(selectedElement => selectedElement === currentInputValue);
//             if (foundItems.length === 0) {
//                 selectedListItems.push(currentInputValue);
//             }
//         }
//
//         renderSelectedElements(selectedListItems, 'autocomplete__selected-item', '.autocomplete__selected-list');
//         inputAutoComplete.value = "";
//         resultsListItems = [];
//         renderElements(resultsListItems, 'autocomplete__result-item', '.autocomplete__result-list');
//     }
//
//     // Move to first element on list when user presses any printable key or backspace
//     if (e && e.key.length === 1 || e.keyCode === 8) {
//         index = 1;
//     }
//
//     // Backspace
//     if (e.keyCode === 8 && inputAutoComplete.value === "") {
//         selectedListItems.pop();
//         renderSelectedElements(selectedListItems, 'autocomplete__selected-item', '.autocomplete__selected-list');
//     }
//
//     // Set input value to selected element
//     const selectedElement = document.querySelector('.selected');
//     if (selectedElement) inputAutoComplete.value = selectedElement.dataset.value;
// });
//
// // Render items for selected list
// const renderSelectedElements = (listItems, liElementClass, ulElementClass) => {
//     const shouldCreateDeleteIcon = true;
//     renderElements(listItems, liElementClass, ulElementClass, shouldCreateDeleteIcon);
// }
//
// const renderElements = (listItems, liElementClass, ulElementClass, shouldCreateDeleteIcon) => {
//     const ul = document.querySelector(ulElementClass);
//     ul.textContent = "";
//     listItems.forEach(listElement => {
//         const fragment = document.createDocumentFragment();
//         const li = document.createElement('li');
//         li.classList.add(liElementClass);
//         li.setAttribute('data-value', listElement);
//         li.innerHTML = listElement.replaceAll(" ", '&nbsp;');
//         if (shouldCreateDeleteIcon) {
//             const span = document.createElement('span');
//             span.classList.add('close-icon');
//             li.appendChild(span);
//         }
//         fragment.appendChild(li);
//         ul.appendChild(fragment);
//     });
// }
//
setTimeout(() => {
    const loading = document.querySelector('.on-loading');
    loading.classList.remove('on-loading');
}, 800);


// Class Approach
const myList = document.querySelector('.autocomplete__class-container');
const updateButton = document.querySelector('.update');

class CrateList {
    constructor(element) {
        this.myList = element;
        this.textList = technologies;
    }

    // Make <li>text</text> tag
    static createListItem (text) {
        const li = document.createElement("li");
        li.textContent = text;
        return li;
    }

    update () {
        // Remove all existing Li and Tags
        while (this.myList.firstChild) {
            this.myList.removeChild(this.myList.firstChild);
        }

        // Fill ul with li
        for (const text of this.textList) {
            this.myList.appendChild(CrateList.createListItem(text));
        }
        // this.myList.appendChild(CrateList.createTitle());
    }

    add (text) {
        // this.textList.set(text);
        this.textList.push(text);
        this.update();
    }

    remove (index) {
        this.textList.splice(index, 1);
        this.update();
    }
}

new CrateList(myList);
//////////////////////////////////////////////////////////

const names = [
    "Paulina",
    "Kacper",
    "Sebastian"
];

const animals = [
    "Luna",
    "Kot",
    "Pies"
];
//////////////////////////////

const secondContainer = document.querySelector('.autocomplete__container-second');

class AnimalAutocomplete {
    constructor(title, mainArray) {
        this.secondContainer = document.querySelector('.autocomplete__container-second');

        this.createTitle(title);
        this.createInput();

        const createResultUlList = document.createElement('ul');
        const ulListResult = secondContainer.appendChild(createResultUlList);
        ulListResult.classList.add('result');
        this.ulListResult = ulListResult;

        const createSelectedUlList = document.createElement('ul');
        const ulListSelected = secondContainer.appendChild(createSelectedUlList);
        ulListSelected.classList.add('selected');
        this.ulListSelected = ulListSelected;

        this.boundHandleClick = this.handleInput.bind(this);

        this.eventOnInput();
        this.mainArray = mainArray;

        this.eventOnItemClick();

        this.resultList = [];
        this.selectedListItems = [];
    }

    handleInput(e) {
        let inputValue = e.target.value;
        this.resultList = [];
        this.resultList.push(inputValue);

        this.mainArray.forEach((item) => {
            const technologyItem = item.toLowerCase().replace(/\s/g, "");
            const matchItems = technologyItem.match(escapeRegExp(inputValue.toLowerCase().replace(/\s/g, '')));
            // If element does not match then match method returns null
            if (matchItems !== null) {
                this.resultList.push(item);
            }
        });

        this.renderHtmlList(this.resultList, 'autocomplete__result-item', this.ulListResult);
        if (inputValue === '') {
            this.resultArray = [];
            this.ulListResult.textContent = '';
        }
    }

    //Events
    eventOnInput() {
        this.input.addEventListener('input', this.boundHandleClick)
    }

    // click
    eventOnItemClick() {
        secondContainer.addEventListener('click', (e) => {
            if (e.target && e.target.matches('.autocomplete__result-item')) {
                const clickedElement = e.target;
                const clickedElementValue = e.target.dataset.value.trim();
                const autoCompleteResultListItems = document.querySelectorAll('.autocomplete__result-item');
                clickedElement.classList.add('selected');
                console.log(this.selectedListItems)

                const foundItems = this.selectedListItems.filter(selectedElement => selectedElement === clickedElementValue);

                if (foundItems.length === 0) {
                    this.selectedListItems.push(clickedElementValue);
                }
            }

            this.renderHtmlList(this.selectedListItems, 'autocomplete__selected-item', this.ulListSelected);

            this.input.value = "";
            this.resultList = [];

            this.renderHtmlList(this.resultList, 'autocomplete__result-item', this.ulListResult);
        })
    }

    // Create HTML elements
    createInput() {
        this.input = document.createElement("input");
        this.secondContainer.appendChild(this.input);
    }

    createTitle(titleName) {
        this.title = document.createElement("h1");
        secondContainer.appendChild(this.title);
        this.title.textContent = titleName;
        return this.title;
    }

    renderHtmlList(array, liClass, ulList) {
        ulList.textContent = '';
        array.forEach(listElement => {
            const fragment = document.createDocumentFragment();
            const li = document.createElement('li');
            li.classList.add(liClass);

            fragment.appendChild(li);
            li.setAttribute('data-value', listElement);
            li.innerHTML = listElement.replaceAll(" ", '&nbsp;');
            li.textContent = listElement;
            ulList.appendChild(fragment);
            ulList.appendChild(li);
        });
    }
}


////////////

const container = document.querySelector('.autocomplete__container-second');

class newAutocomplete {
    constructor(mainArray, selectedArray, title) {
        const input = document.createElement("input");
        const div = document.createElement("div");
        div.classList.add('autocomplete__class-container');

        const ulListResult = document.createElement("ul");
        ulListResult.classList.add('autocomplete__result-list')

        this.div = div;
        this.input = input;
        this.title = title;
        this.ulListResult = ulListResult;

        this.mainArrayy = mainArray;
        this.selectedArray = selectedArray;
        this.resultArray = [];
        this.inputTyping = this.handleClick.bind(this);
        this.connectedCallback();
        this.updateTitle();

        div.appendChild(input);
        container.appendChild(div);
    }

    connectedCallback() {
        this.input.addEventListener('input', this.inputTyping);
    }

    updateTitle() {
        const titleTag = document.createElement("h1");
        titleTag.classList.add('autocomplete__title');
        titleTag.textContent = this.title;
        this.div.appendChild(titleTag);
        console.log(this.title);
    }

    handleClick(e) {
        let inputValue = e.target.value;
        this.resultArray = [];
        this.ulListResult.textContent = '';

        this.resultArray.push(inputValue);

        this.mainArrayy.forEach((technology) => {
            const technologyItem = technology.toLowerCase().replace(/\s/g, "");
            const matchItems = technologyItem.match(escapeRegExp(inputValue.toLowerCase().replace(/\s/g, '')));
            // If element does not match then match method returns null
            if (matchItems !== null) {
                this.resultArray.push(technology);
            }
        });

        this.renderResultArray(this.resultArray);

        if (inputValue === '') {
            this.resultArray = [];
            this.ulListResult.textContent = '';
        }
    }

    renderResultArray(text) {
        text.forEach(listElement => {
            const fragment = document.createDocumentFragment();
            const li = document.createElement('li');

            fragment.appendChild(li);
            li.textContent = listElement;
            this.ulListResult.appendChild(fragment);
            this.ulListResult.appendChild(li);
            this.div.appendChild(this.ulListResult);
        })
    }
}

new newAutocomplete(technologies, selectedListItems, "Technologies");
new newAutocomplete(names, selectedListItems, "Names");
new newAutocomplete(animals, selectedListItems, "Animals");
