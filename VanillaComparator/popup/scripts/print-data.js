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
                const { cell } = createCell({ text: content });
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
    return { cell, cellText }
}


/*

    const sortedList = data.sort((a, b) => {
        if (a.brand < b.brand) {
            return 1;
        }
        return -1
    });

    */