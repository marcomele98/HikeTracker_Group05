//test create new parking lot button
describe('login and logout e2e tset', () => { 
    it('1 access the webpage', () => {
       cy.visit('http://localhost:3000/')
    })
    
    it('Login button exists',()=>{
        cy.contains('Login').click()
    })

   
    it('wrong login with wrong info',()=>{
        cy.get('input[id=username]').clear()
        cy.get('input[id=password]').clear()
        cy.get('input[id=username]').type('lg1@p.it').should('have.value', 'lg1@p.it')
        cy.get('input[id=password]').type('passwordd').should('have.value', 'passwordd')
        cy.contains('Login').click()
        cy.contains('Username and/or password wrong. Try again.')
    })

    it('login form test',()=>{
        cy.get('input[id=username]').clear()
        cy.get('input[id=password]').clear()
        cy.get('input[id=username]').type('lg1@p.it').should('have.value', 'lg1@p.it')
        cy.get('input[id=password]').type('password').should('have.value', 'password')
        cy.contains('Login').click()
        cy.url().should('include', '/home')
        
    })

    it('logout button test',()=>{
        cy.contains('Logout').click()
        cy.url().should('include', '/home')
        cy.contains('Login')
    })

})
