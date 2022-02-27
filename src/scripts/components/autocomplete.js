import { escapeRegExp, moveCursorToEnd, onLoad } from '../helpers/helpers.js';
import { ESC, ENTER, BACKSPACE, ARROW_DOWN, ARROW_UP } from '../utils/consts.js';
import { technologies, names, animals } from '../../data/data';

const container = document.querySelector('.autocomplete__container-second');

class Autocomplete {
    constructor(mainArray, title) {
        const input = document.createElement("input");
        const div = document.createElement("div");
        div.classList.add('autocomplete__class-container');

        const ulListResult = document.createElement("ul");
        ulListResult.classList.add('autocomplete__result-list');

        const ulListSelected = document.createElement("ul");
        ulListSelected.classList.add('autocomplete__selected-list');

        this.div = div;
        this.input = input;
        this.title = title;
        this.ulListResult = ulListResult;
        this.ulListSelected = ulListSelected;

        this.pointer = 0;

        this.mainArrayy = mainArray;

        this.resultArray = [];
        this.selectedArray = [];
        this.inputTyping = this.handleInput.bind(this);
        this.eventsHandlers();
        this.updateTitle();

        div.appendChild(input);
        container.appendChild(div);
    }

    eventsHandlers() {
        this.input.addEventListener('input', this.inputTyping);
        this.ulListResult.addEventListener('click', (e) => {
            if (e.target) { this.addElementOnClick(e); }
        });

        this.ulListSelected.addEventListener('click', (e) => {
            if (e.target && e.target.matches("span.close-icon")) { this.removeElementOnClick(e); }
        });

        this.input.addEventListener('keydown', (e) => {
            this.handleKeys(e)
        });
    }

    handleKeys(e) {
        const liElements = this.ulListResult.querySelectorAll('.autocomplete__result-item');
        const liElementsLength = liElements.length;
        let previousElement;
        let actualElement;

        if (e.keyCode === ARROW_DOWN ) {
            this.pointer++;
            previousElement = liElements[this.pointer - 2];
            actualElement = liElements[this.pointer - 1];

            if (this.pointer <= liElementsLength) {
                actualElement.classList.add('selected');
                if (this.pointer > 1) {
                    previousElement.classList.remove('selected');
                }
            } else {
                liElements[liElementsLength - 1].classList.remove('selected')
                liElements[0].classList.add('selected');
                this.pointer = 1;
            }
        }

        if (e.keyCode === ARROW_UP && liElementsLength > 0) {
            moveCursorToEnd(e, this.input);
            this.pointer--;
            previousElement = liElements[this.pointer];
            actualElement = liElements[this.pointer - 1];

            if (this.pointer > 0) {
                actualElement.classList.add('selected');
                previousElement.classList.remove('selected');
            } else {
                liElements[0].classList.remove('selected');
                liElements[liElementsLength - 1].classList.add('selected');
                this.pointer = liElementsLength;
            }
        }

        if (e.keyCode === ESC) {
            this.input.value = "";
            this.resultArray = [];
            this.renderResultArray(this.resultArray);
        }

        if (e.keyCode === ENTER) {
            let currentInputValue = this.input.value.trim();
            if (currentInputValue !== "") {
                const foundItems = this.selectedArray.filter(selectedElement => selectedElement === currentInputValue);
                if (foundItems.length === 0) {
                    this.selectedArray.push(currentInputValue);
                }
            }

            this.renderSelectedArray(this.selectedArray);
            this.input.value = "";
            this.resultArray = [];
            this.renderResultArray(this.resultArray);
        }

        // Move to first element on list when user presses any printable key or backspace
        if (e && e.key.length === 1 || e.keyCode === BACKSPACE) {
            this.pointer = 1;
        }

        const selectedElement = document.querySelector('.selected');
        if (selectedElement) this.input.value = selectedElement.dataset.value;
    }

    removeElementOnClick(e) {
        const clickedElement = e.target.parentNode.dataset.value;
        const index = this.selectedArray.indexOf(clickedElement);

        this.selectedArray.splice(index, 1);
        this.renderSelectedArray(this.selectedArray);
    }

    addElementOnClick(e) {
        const clickedElementValue = e.target.dataset.value.trim();

        const foundItems = this.selectedArray.filter(selectedElement => selectedElement === clickedElementValue);
        if (foundItems.length === 0) {
            this.selectedArray.push(clickedElementValue);
        }

        this.renderSelectedArray(this.selectedArray);

        this.input.value = "";
        this.resultArray = [];

        this.renderResultArray(this.resultArray);
    }

    updateTitle() {
        const titleTag = document.createElement("h1");
        titleTag.classList.add('autocomplete__title');
        titleTag.textContent = this.title;
        this.div.appendChild(titleTag);
    }

    handleInput(e) {
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

        const resultItemsAutocomplete = this.ulListResult.querySelectorAll('.autocomplete__result-item');
        if (resultItemsAutocomplete[0]) {
            resultItemsAutocomplete[0].classList.add('selected');
        }
    }

    renderSelectedArray(array) {
        this.ulListSelected.textContent = '';
        array.forEach(listElement => {
            const fragment = document.createDocumentFragment();
            const li = document.createElement('li');
            li.classList.add('autocomplete__selected-item');
            const span = document.createElement('span');

            fragment.appendChild(li);
            li.textContent = listElement;
            li.setAttribute('data-value', listElement);
            li.innerHTML = listElement.replaceAll(" ", '&nbsp;');
            span.classList.add('close-icon');
            li.appendChild(span);
            this.ulListSelected.appendChild(fragment);
            this.ulListSelected.appendChild(li);
            this.div.appendChild(this.ulListSelected);
        })
    }

    renderResultArray(text) {
        this.ulListResult.textContent = '';
        text.forEach(listElement => {
            const fragment = document.createDocumentFragment();
            const li = document.createElement('li');
            li.classList.add('autocomplete__result-item');

            fragment.appendChild(li);
            li.textContent = listElement;
            li.setAttribute('data-value', listElement);
            li.innerHTML = listElement.replaceAll(" ", '&nbsp;');
            this.ulListResult.appendChild(fragment);
            this.ulListResult.appendChild(li);
            this.div.appendChild(this.ulListResult);
        })
    }
}

onLoad();

new Autocomplete(technologies, "Technologies");
new Autocomplete(names, "Names");
new Autocomplete(animals, "Animals");
