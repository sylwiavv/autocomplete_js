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
let indexOfActualElement;

inputAutoComplete.addEventListener("keydown", function (e) {
    const allLi = document.querySelectorAll('.result-item__autocomplete');
    const liElementsLength = allLi.length;
    // Dodajemy elementy do array
    let indexElementu = Array.prototype.slice.call(resultListAutoComplete.children);
    let actualElement = allLi.item(index);
    indexOfActualElement = indexElementu.indexOf(actualElement) + 1;
    let getPreviousElement = allLi[index-1];
    console.log('to jest index ' + index);
    console.log('CHAR: ' + e.key);
    console.log('CHAR len: ' + e.key.length);

    if (e.keyCode === 40 && liElementsLength > 0) {
        index++;
        console.log(indexOfActualElement + ' to jest aktualny');
        console.log(index + ' to jest sztuczny');
        console.log(liElementsLength + ' dlugosc tablicy');
        if (index === indexOfActualElement) {
            actualElement.classList.add('selected');
            if (indexOfActualElement > 1) {
                getPreviousElement.classList.remove('selected');
            }
        } else {
            console.log(index === indexOfActualElement);
            console.log('koniec')
            console.log(index);
            console.log(allLi[liElementsLength - 1]);
            allLi[liElementsLength - 1].classList.remove('selected')
            allLi[0].classList.add('selected');
            index = 1;
        }
        //} else if (e && /[a-zA-Z0-9-_ ]/.test(inp)) {
    } else if (e && e.key.length === 1 || e.keyCode === 8) {
        console.log('Inny klawisz')
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