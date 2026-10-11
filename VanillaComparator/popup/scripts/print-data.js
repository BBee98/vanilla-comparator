import { HTMLTemplate } from '../utils/template.js';

export function printData() {
    const JSONData = JSON.parse(localStorage.getItem("data"))

    if (!JSONData) {
        return false;
    }

    createTable(JSONData);
}

function createTable(JSONData) {
    const comparatorDiv = document.querySelector("#comparator");
    comparatorDiv.classList.add("table");

    const fields = Object.keys(HTMLTemplate);
    fields.forEach(fieldKey => {
        const row = createRow(fieldKey);
        const { cell: rowHeader } = createCell({ text: HTMLTemplate[fieldKey] });
        rowHeader.classList.add("fieldKey")
        row.appendChild(rowHeader);
        comparatorDiv.appendChild(row);
        addCellsToRow(row, { JSONData, fieldKey })
    })
}

function createRow(fieldKey) {
    const row = document.createElement("div");
    row.id = fieldKey;
    row.classList.add("title");
    return row;
}

function addCellsToRow(parentElement, { JSONData, fieldKey }) {
    JSONData.forEach(({ data }) => {
        data.forEach(({ fieldName, content }) => {
            if (fieldName.includes(fieldKey)) {
                const { cell } = fieldName.includes("price") ? formatPrice(content) : createCell({ text: content });
                parentElement.appendChild(cell);
            }
        })
    })

}

function createCell({ text }) {
    const cell = document.createElement("div");
    const cellText = document.createElement("span");
    cellText.classList.add("text");
    cellText.innerHTML = text;
    cell.classList.add("content")
    cell.appendChild(cellText);
    return { cell }
}

function formatPrice({ priceWhole, priceDecimal, priceFraction, priceSymbol }) {

    const cell = document.createElement("div");
    cell.classList.add("content")

    const priceWholeElement = createElement(priceWhole.replace(/[^\p{L}\p{N}]/gu, ""), "priceWhole");
    const priceDecimalElement = createElement(priceDecimal, "priceDecimal");
    const priceFractionElement =createElement(priceFraction, "priceFraction");
    const priceSymbolElement =createElement(priceSymbol, "priceSymbol")

    cell.appendChild(priceWholeElement);
    cell.appendChild(priceDecimalElement);
    cell.appendChild(priceFractionElement);
    cell.appendChild(priceSymbolElement);

    return { cell }

    function createElement(priceData, className) {
        console.log("priceData", priceData)


        if (!priceData) {
            return null;
        }
        const priceElement = document.createElement("span");
        priceElement.classList.add(className);
        priceElement.innerHTML = priceData;

        console.log("priceElement", priceElement)

        return priceElement;
    }
}

/*

    const sortedList = data.sort((a, b) => {
        if (a.brand < b.brand) {
            return 1;
        }
        return -1
    });

    */