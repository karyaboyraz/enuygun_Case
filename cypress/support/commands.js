// noinspection JSCheckFunctionSignatures

/**
 * @memberof cy
 * @function resetTestEnvironment
 * @description This function is used to prepare the test environment before each test.
 */
Cypress.Commands.add('resetTestEnvironment', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(Cypress.env().webUrl); // Visits the application's homepage.
});

/**
 * @memberof cy
 * @function writeElementText
 * @description Write text to an input element identified by the given elementName
 * @param {string} elementName - Element name
 * @param {string} text - Text to be written to the element
 */
Cypress.Commands.add('writeElementText', (elementName, text) => {
    let textboxXpath = `//label[.='${elementName}']/..//input`;
    cy.xpath(textboxXpath).click().clear().type(text);
});

/**
 * @memberof cy
 * @function selectRotation
 * @description Select Rotation by the given elementName
 * @param {string} elementName - Element name
 * @param {string} text - Text to be written to the element
 */
Cypress.Commands.add('selectRotation', (elementName, text) => {

    let textboxXpath = `//label[.='${elementName}']/..//input`;
    let textpath = `(//strong[contains(text(),'${text}')])/ancestor::*[@role = "option" and @data-suggestion-index="0"]`;

    cy.xpath(textboxXpath).click().clear().type(text);
    cy.xpath(textpath).click();
});

/**
 * @memberof cy
 * @function selectDate
 * @description Selected date by the given elementName
 * @param {string} elementName - Element name
 * @param {string} date - Text to be written to the element
 */
Cypress.Commands.add('selectDate', (elementName, date) => {
    let textboxXpath = `//label[text() ='${elementName}']/..//input[@placeholder="Date"]`;
    let dateXpath = `//td[ contains(@aria-label,", ${date}")]`;
    let nextMonthButtonXpath = `//div[@role='button' and @aria-label='Move forward to switch to the next month.']`;

    elementName === "Gidiş Tarihi" ? cy.xpath(textboxXpath).click() : null ;

    let found = false;
    for (let i = 0; i < 12; i++) {
        cy.get("body").then($body => {
            if ($body.find(`td[aria-label$=", ${date}"]`).length > 0) {
                console.log("Tarih bulundu");
                i === 0  ? null : cy.xpath(nextMonthButtonXpath).click();
                cy.xpath(dateXpath).click({force: true});
                found = true;
            }
            if (!found) {
                cy.xpath(nextMonthButtonXpath).click({ multiple: true });
            }
        });
        if (found) {break;}
    }
});

/**
 * @memberof cy
 * @function checkBox
 * @description Selects the checkbox with the given name
 * @param {string} name - The name of the checkbox
 */
Cypress.Commands.add('checkBox', (name) => {
    const boxPath = `//label[text()='${name}']`;
    cy.xpath(boxPath).click();
});

/**
 * @memberof cy
 * @function clickButton
 * @description Selects the checkbox with the given name
 * @param {string} name - The name of the button
 */
Cypress.Commands.add('clickButton', (name) => {
    const boxPath = ` //*[text()="${name}"]`;
    cy.xpath(boxPath).click();
});

/**
 * @memberof cy
 * @function findAllElementXpath
 * @description Finds all elements that match the given XPath and returns their inner texts in an array
 * @param {string} xpath - The XPath expression to use for finding the elements
 * @returns {Array} - An array of inner texts of matched elements
 */
Cypress.Commands.add('findAllElementXpath', (xpath) => {
    cy.xpath(xpath).then(($els) => {
        return Cypress.$.makeArray($els).map((el) => el.innerText);
    });
});

/**
 * @memberof cy
 * @function findText
 * @description Checks if an HTML element with the given text and tag exists or not
 * @param {string} text - The full text of the HTML element to look for
 * @param {string} type - The tag of the HTML element to look for (e.g. 'a', 'p', 'div', 'span')
 * @param {boolean} shouldExist - If true, the function expects the element to exist, if false it expects the element to not exist
 */
Cypress.Commands.add('findText', (text, type, shouldExist = true) => {
    let element = `//${type}[text() = "${text}"]`;
    cy.log(`Searching ${text} with an/a ${type}`);
    cy.xpath(element).should(shouldExist ? 'be.visible' : 'not.exist');
});

/**
 * @memberof cy
 * @function dateShorter
 */
Cypress.Commands.add('dateShorter', (date) => {
    const parsedDate = new Date(date);
    const day = parsedDate.getDate();
    const month = date.split(' ')[1].slice(0, 3);
    const year = parsedDate.getFullYear();

    return `${day} ${month} ${year}`;
});