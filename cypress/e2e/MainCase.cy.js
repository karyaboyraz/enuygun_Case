// noinspection JSCheckFunctionSignatures

import faker from '../support/faker.js';

let ticketData = faker.randomUser();
console.log(ticketData);

function dateShorter(date) {
    const dateParts = date.split(' ');

    const day = dateParts[0];
    const month = dateParts[1].slice(0, 3);
    const year = dateParts[2];

    return `${day} ${month} ${year}`;
}

describe('Cypress Test', () => {
    beforeEach(() => {
        cy.resetTestEnvironment();
    });

    it('Search Ticket with Random Data', () => {
        const checkingDataArray = [ticketData.fromCountry, ticketData.toCountry, dateShorter(ticketData.startDate) ];
        if (ticketData.endDate) checkingDataArray.push(dateShorter(ticketData.endDate));
        checkingDataArray.push(ticketData.passenger.adult + ticketData.passenger.child + ticketData.passenger.baby + " Yolcu");

        cy.findTicketConcept(ticketData) // Concept of Page Object Model
        cy.findText( "Uçuşlarınız hazırlanıyor, lütfen bekleyin..." , `span`)

        for (const arrEl of checkingDataArray) {
            cy.xpath(`//div[@id="SearchRoot"]//div[@class="info"][contains(., "${arrEl}")]`).should('be.visible');
        }
    });
});
