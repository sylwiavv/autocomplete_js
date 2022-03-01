import { escapeRegExp, moveCursorToEnd, onLoad } from '../helpers/helpers.js';
import { ESC, ENTER, BACKSPACE, ARROW_DOWN, ARROW_UP } from '../utils/consts.js';
import { technologies, names, animals } from '../../data/data';

const container = document.querySelector('.autocomplete__container');

class Autocomplete {
    constructor(mainArray, title) {
        const input = document.createElement("input");
        input.classList.add('autocomplete__input');

        const inputMainWrapper = document.createElement("div");
        inputMainWrapper.classList.add('autocomplete__wrapper');

        const wrapperSection = document.createElement("div");
        wrapperSection.classList.add('autocomplete__section');

        const inputWrapper = document.createElement("div");
        inputWrapper.classList.add('autocomplete__input-wrapper');

        const ulListResult = document.createElement("ul");
        ulListResult.classList.add('autocomplete__result-list');

        const ulListSelected = document.createElement("ul");
        ulListSelected.classList.add('autocomplete__selected-list');

        this.wrapperSection = wrapperSection;
        this.inputWrapper = inputWrapper;
        this.inputMainWrapper = inputMainWrapper;
        this.input = input;
        this.title = title;
        this.ulListResult = ulListResult;
        this.ulListSelected = ulListSelected;

        this.placeholder = `Search for ${this.title.toLowerCase()}`;
        this.input.placeholder = this.placeholder;

        this.pointer = 0;

        this.mainArrayy = mainArray;

        this.resultArray = [];
        this.selectedArray = [];

        this.inputTyping = this.handleInput.bind(this);

        this.eventsHandlers();
        this.renderHtml()
    }

    eventsHandlers() {
        this.input.addEventListener('input', this.inputTyping);
        this.input.addEventListener('keydown', (e) => {
            this.handleKeys(e)
        });

        this.ulListResult.addEventListener('click', (e) => {
            if (e.target) {
                this.addElementOnClick(e);
            }
        });

        this.ulListSelected.addEventListener('click', (e) => {
            if (e.target && e.target.matches("span.close-icon")) {
                this.removeElementOnClick(e);
            }
        });

        this.wrapperSection.addEventListener('mouseleave', () => {
            this.closeResultList();
        });
    }

    renderHtml() {
        this.renderTitle();

        container.appendChild(this.wrapperSection);
        container.appendChild(this.inputWrapper);

        this.inputWrapper.appendChild(this.input);
        this.inputWrapper.appendChild(this.ulListResult);

        this.wrapperSection.appendChild(this.inputMainWrapper);
        this.inputMainWrapper.appendChild(this.ulListSelected);
        this.wrapperSection.appendChild(this.inputWrapper);
        this.inputMainWrapper.appendChild(this.inputWrapper);
    }

    closeResultList() {
        this.input.value = "";
        this.input.placeholder = this.placeholder;

        this.resultArray = [];
        this.renderResultList(this.resultArray);
        this.ulListResult.remove();
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
            this.renderResultList(this.resultArray);
        }

        if (e.keyCode === ENTER) {
            let currentInputValue = this.input.value.trim();
            if (currentInputValue !== "") {
                const foundItems = this.selectedArray.filter(selectedElement => selectedElement === currentInputValue);
                if (foundItems.length === 0) {
                    this.selectedArray.push(currentInputValue);
                }
            }

            this.renderSelectedList(this.selectedArray);
            this.input.value = "";
            this.resultArray = [];
            this.renderResultList(this.resultArray);
        }

        // Move to first element on list when user presses any printable key or backspace
        if (e && e.key.length === 1 || e.keyCode === BACKSPACE) {
            this.pointer = 1;
        }

        const selectedElement = this.ulListResult.querySelector('.selected');
        if (selectedElement) this.input.value = selectedElement.dataset.value;
    }

    removeElementOnClick(e) {
        const clickedElement = e.target.parentNode.dataset.value;
        const index = this.selectedArray.indexOf(clickedElement);

        this.selectedArray.splice(index, 1);
        this.renderSelectedList(this.selectedArray);
    }

    addElementOnClick(e) {
        const clickedElementValue = e.target.dataset.value.trim();

        const foundItems = this.selectedArray.filter(selectedElement => selectedElement === clickedElementValue);
        if (foundItems.length === 0) {
            this.selectedArray.push(clickedElementValue);
        }

        this.renderSelectedList(this.selectedArray);

        this.input.value = "";
        this.resultArray = [];

        this.renderResultList(this.resultArray);
    }

    renderTitle() {
        const titleTag = document.createElement("h1");
        titleTag.classList.add('autocomplete__title');
        titleTag.textContent = this.title;
        this.wrapperSection.appendChild(titleTag);
    }

    handleInput() {
        let inputValue = this.input.value;
        this.resultArray = [];
        this.resultArray.push(inputValue);

        this.mainArrayy.forEach((technology) => {
            const technologyItem = technology.toLowerCase().replace(/\s/g, "");
            const matchItems = technologyItem.match(escapeRegExp(inputValue.toLowerCase().replace(/\s/g, "")));
            // If element does not match then match method returns null
            if (matchItems !== null) {
                this.resultArray.push(technology);
            }
        });

        this.renderResultList(this.resultArray);

        if (inputValue === "") {
            this.resultArray = [];
            this.ulListResult.textContent = "";
        }

        const resultItemsAutocomplete = this.ulListResult.querySelectorAll('.autocomplete__result-item');
        if (resultItemsAutocomplete[0]) {
            resultItemsAutocomplete[0].classList.add('selected');
        }
    }

    renderSelectedList(selectedItems) {
        this.ulListSelected.textContent = "";
        selectedItems.forEach(selectedItems => {
            const fragment = document.createDocumentFragment();
            const li = document.createElement('li');
            li.classList.add('autocomplete__selected-item');
            const span = document.createElement('span');

            fragment.appendChild(li);
            li.textContent = selectedItems;
            li.setAttribute('data-value', selectedItems);
            li.innerHTML = selectedItems.replaceAll(" ", '&nbsp;');
            span.classList.add('close-icon');
            li.appendChild(span);
            this.ulListSelected.appendChild(fragment);
            this.ulListSelected.appendChild(li);
        })
    }

    renderResultList(resultItems) {
        this.ulListResult.textContent = "";
        resultItems.forEach(resultItem => {
            const fragment = document.createDocumentFragment();
            const li = document.createElement('li');
            li.classList.add('autocomplete__result-item');

            fragment.appendChild(li);
            li.textContent = resultItem;
            li.setAttribute('data-value', resultItem);
            li.innerHTML = resultItem.replaceAll(" ", '&nbsp;');
            this.ulListResult.appendChild(fragment);
            this.ulListResult.appendChild(li);
            this.inputWrapper.appendChild(this.ulListResult);
        })
    }
}

onLoad();

new Autocomplete(technologies, "Technologies");
new Autocomplete(names, "Names");
new Autocomplete(animals, "Animals");