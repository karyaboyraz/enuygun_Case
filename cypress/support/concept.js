/**
 * @memberof cy
 * @function selectRotation
 * @description Concept of Page Object Model
 * @param {string} creatinData - Data package for random search ticket
 */
Cypress.Commands.add('findTicketConcept', (ticketData) => {
    cy.selectRotation('Nereden', ticketData.fromCountry);
    cy.selectRotation('Nereye', ticketData.toCountry);
    cy.selectDate('Gidiş Tarihi', ticketData.startDate);
    if(!ticketData.oneWayTicket) {
        cy.checkBox("Tek Yön")
        cy.selectDate('Dönüş Tarihi', ticketData.endDate);
    }
    ticketData.throughFlight ? cy.checkBox("Aktarmasız") : null;
    cy.xpath(`//*[@data-testid="passengerSelectButtonMulti"]`).click();
    for (let i = 0; i < ticketData.passenger.adult - 1; i++) {
        cy.xpath(`//*[@data-testid="passengerCountIncrease-0"]`).click();
    }
    for (let i = 0; i < ticketData.passenger.child; i++) {
        cy.xpath(`//*[@data-testid="passengerCountIncrease-1"]`).click();
    }
    for (let i = 0; i < ticketData.passenger.baby; i++) {
        cy.xpath(`//*[@data-testid="passengerCountIncrease-2"]`).click();
    }
    cy.clickButton(`Tamam`)
    cy.xpath(`//button[@data-testid="formSubmitButton"]`).click()
});