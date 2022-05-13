/// <reference types="cypress" />

context('Basic', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('hi', () => {
    cy.url().should('eq', 'http://localhost:3333/');

    cy.contains('[Home Layout]').should('exist');

    cy.get('input')
      .type('Vitesse{Enter}')
      .url()
      .should('eq', 'http://localhost:3333/hi/Vitesse');

    cy.contains('[Default Layout]').should('exist');

    cy.get('button').click().url().should('eq', 'http://localhost:3333/');
  });

  it('about', () => {
    cy.get('[title="About"]')
      .click()
      .url()
      .should('eq', 'http://localhost:3333/about');
  });
});
