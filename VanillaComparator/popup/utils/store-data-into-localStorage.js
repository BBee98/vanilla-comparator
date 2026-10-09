import { DomainTemplate } from './template.js';

export function storeDataIntoLocalStorage({ domain, domainData, status }) {

    const arrayData = JSON.parse(localStorage.getItem("data"));

    const fields = getFields(Object.values(DomainTemplate[domain]), domainData)

    const neededData = (Object.keys(fields).length) > 0

    const itemJSONData = {
        ...fields,
        domain,
        status
    }

    const isFirstTime = !arrayData && neededData
    if (isFirstTime) {
        localStorage.setItem("data", JSON.stringify([itemJSONData]))
        return;
    }

    const dataIsAlreadyIn = arrayData.find(item => JSON.stringify(item).includes(JSON.stringify(itemJSONData)))

    if (!dataIsAlreadyIn) {
        arrayData.push(itemJSONData);
        localStorage.setItem("data", JSON.stringify(arrayData))
    }

}

function getFields(fields, data) {
    const itemFields = {}
    fields.forEach(field => {
        const content = data.find(item => item.fieldName.includes(field))?.content;
        if (content) {
            itemFields[field] = content;
        }
    });
    return itemFields;
}
