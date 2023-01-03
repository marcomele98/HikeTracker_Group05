// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Parameterising the username and password for login
Cypress.Commands.add("login",(username,password) => {
    cy.clearCookies() 
    cy.visit('http://localhost:3000/',{failOnStatusCode: false}) 
    cy.url().should('include', 'http://localhost:3000/') 
    
    cy.contains('Login').click() 
    cy.url().should('include', 'login') 
    cy.get('input[id=username]') 
    .type(username) 
    cy.get('input[id=password]') 
    .type(password) 
    cy.get('#submitLogin').click() 
    cy.contains('Logout').should('be.visible') 
    })

    //logout
Cypress.Commands.add("logout",() => {
    cy.contains('Logout').click() //
})