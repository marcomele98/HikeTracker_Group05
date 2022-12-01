//test create new parking lot button
describe('loginform e2e tset', () => { 
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
})

describe('parkingform e2e tset', () => {
    
    it('jump into parkingLots page test',()=>{
        cy.contains('Parking Lots').click({force: true})
        cy.url().should('include','/parkingLots')
      
    })    
    
    it('create new parking button test',()=>{
        cy.contains("New Parking Lot").click({force: true})
        cy.url().should('include', '/new-parking')
   })
    it('all info exist',()=>{
        cy.contains('Name')
        cy.contains('Region')
        cy.contains('Province')
        cy.contains('City')
        cy.contains('Altitude')
    })

    it('submit form',()=>{
       cy.get('input[id=validationCustom01]').click({force: true}).type('Dash Kitchen').should('have.value', 'Dash Kitchen')
       cy.get('input[id=validationCustom03]').click({force: true}).type('200').should('have.value', '200')
       cy.get('input[id=validationCustom02]').click({force: true}).type('Piemonte').should('have.value', 'Piemonte')
       cy.get('input[id=validationCustom06]').click({force: true}).type('TO').should('have.value', 'TO')
       cy.get('input[id=validationCustom07]').click({force: true}).type('Torino').should('have.value', 'Torino')
       //cy.get('.clickMap').should('have.value','45.058437, 7.678607')
       //cy.get('.clickMap').click('right')
       cy.contains('Create new parking lot').click({force: true})
     })
})


//testwrong insertion with empty info and cancel button
describe('loginform e2e tset', () => { 
    it('1 access the webpage', () => {
       cy.visit('http://localhost:3000/')
    })
    
    it('Login button exists',()=>{
        cy.contains('Login').click()
    })

   
    it('login form test',()=>{
        cy.get('input[id=username]').clear()
        cy.get('input[id=password]').clear()
        cy.get('input[id=username]').type('lg1@p.it').should('have.value', 'lg1@p.it')
        cy.get('input[id=password]').type('password').should('have.value', 'password')
        cy.contains('Login').click()
        cy.url().should('include', '/home')
        
    })
})

describe('cancel button test of parkingform e2e tset', () => {
    
    it('jump into parkingLots page test',()=>{
        cy.contains('Parking Lots').click({force: true})
        cy.url().should('include','/parkingLots')
      
    })    
    
    it('create new parking button test',()=>{
        cy.contains("New Parking Lot").click({force: true})
        cy.url().should('include', '/new-parking')
   })
    // it('all info exist',()=>{
    //     cy.contains('Name')
    //     cy.contains('Region')
    //     cy.contains('Province')
    //     cy.contains('City')
    //     cy.contains('Altitude')
    // })
        it('wrong insertion with empty infomation',()=>{
            cy.contains('Create new parking lot').click()
            cy.contains('Please insert name')
            cy.contains('Please insert correct length')
            cy.contains('Please insert correct province')
            cy.contains('Please insert correct city')
            cy.contains('Please insert correct altitude')
        })
    
        it('Cancel button test',()=>{
        cy.contains('Cancel').click({force: true})
        cy.url().should('include', '/parkingLots')
    })

  
})

