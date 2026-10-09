import { HTMLTemplate } from '../utils/template.js';

export function printData() {
    const JSONData = JSON.parse(localStorage.getItem("data"))

    if (!JSONData) {
        return false;
    }


    createTable(JSONData);
}

function createTable(data) {
    const comparatorDiv = document.querySelector("#comparator");
    comparatorDiv.classList.add("table");

    const sortedList = data.sort((a, b) => {
        if (a.brand < b.brand) {
            return 1;
        }
        return -1
    });

    const fields = Object.keys(HTMLTemplate);
    fields.forEach(field => {
        const column = document.createElement("div");
        addColumnHeader(column, field)
        comparatorDiv.appendChild(column)

        sortedList.forEach(item => {
            let content = "";
            if (!(content.includes(item[field]))) {
                content = item[field];
                const rowContent = document.createElement("p");
                rowContent.innerText = content;
                column.appendChild(rowContent);
            }
        })

    });


}



function addColumnHeader(column, field) {
    const text = document.createElement("span");
    text.innerText = HTMLTemplate[field];
    column.id = field;
    column.appendChild(text);
}


