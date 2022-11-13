
/// <reference types="cypress" />
describe("login",function(){
    const email="lg1@p.it"
    const password="password"
    context("HTML form login test",function(){
        //test use case
        it("login successfully，jump into home page",function(){
            //Visit the previous login link
            cy.visit("http://localhost:3000/login")


            cy.get('input[id=username]').type(email)
            cy.get('input[id=password]').type(password)
            cy.get("button.btn.btn-success.btn-lg[type='submit']")
            //assert
            
            //cy.get('h2').should('contain','login')
           it('exist login button test',()=>{
            cy.contains('Login').click()
            cy.url().should('include','/home')
           })
           // cy.contains('Login').click()]
           //cy.url().should('include','/home')

        })

    })


})