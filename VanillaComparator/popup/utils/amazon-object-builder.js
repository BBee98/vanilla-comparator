import { DomainTemplate } from './template.js';

/**
 * 
 * @returns {{
 *  brand: string, 
 *  modelName: string,
 *  modelNumber: string,
 *  price: string
 *  productDimensions: string,
 *  color: string, }}
 */
/*
*/

export function amazonObjectBuilder({data, status}) {
    return data.map((item) => {
        const fieldName = item.fieldName;
        const contentData = item.content.trim();
        const contentElement = new DOMParser().parseFromString(contentData, "text/html");
        const titleElement = new DOMParser().parseFromString(fieldName, "text/html");
        const titleKey = Object.keys(DomainTemplate["amazon"]).find(key => cellText(titleElement).toLowerCase().includes(key));
        const contentText = cellText(contentElement);

        if (!titleKey || !contentText) {
            return null;
        }

        return {
            fieldName: DomainTemplate["amazon"][titleKey],
            content: contentText.trim(),
            status
        }
    }).filter(Boolean)
}


function cellText(element) {
    const body = element.querySelector("body");
    if (body.children.length > 1) {
        return false;
    }
    return body.innerText;
}