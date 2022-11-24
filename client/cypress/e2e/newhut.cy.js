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

describe('hutform e2e tset', () => {
    
    it('jump into Huts page test',()=>{
        cy.contains('Huts').click({force: true})
        cy.url().should('include','/huts')
      
    })    
    
    it('create new huts button test',()=>{
        cy.get("svg").click({multiple: true})
        cy.url().should('include', '/new-hut')
   })
    it('all info exist',()=>{
        cy.contains('Name')
        cy.contains('Region')
        cy.contains('Province')
        cy.contains('City')
        cy.contains('Type')
        cy.contains('Number of beds')
        cy.contains('Description')
        cy.contains('Altitude')
    })

    it('submit form',()=>{
       cy.get('input[id=validationCustom01]').type('Maison Saluzzo').should('have.value', 'Maison Saluzzo')
       cy.get('input[id=validationCustom02]').type('Piemonte').should('have.value', 'Piemonte')
       cy.get('input[id=validationCustom06]').type('TO').should('have.value', 'TO')
       cy.get('input[id=validationCustom07]').type('Torino').should('have.value', 'Torino')
       cy.get('input[id=validationCustom08]').type('Refuge').should('have.value', 'Refuge')
       cy.get('input[id=validationCustom09]').type('40').should('have.value', '40')
       //cy.get('.clickMap').should('have.value','45.058437, 7.678607')
       //cy.get('.clickMap').click('right')
       cy.get('input[id=validationCustom10]').type('good').should('have.value', 'good')
       cy.get('input[id=validationCustom03]').type('200').should('have.value', '200')
       cy.contains('Create new hut').click()
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

describe('cancel button test of hutform e2e tset', () => {
    
    it('jump into Huts page test',()=>{
        cy.contains('Huts').click({force: true})
        cy.url().should('include','/huts')
      
    })    
    
    it('create new parking button test',()=>{
        cy.get("svg").click({multiple: true})
        cy.url().should('include', '/new-hut')
   })
    // it('all info exist',()=>{
    //     cy.contains('Name')
    //     cy.contains('Region')
    //     cy.contains('Province')
    //     cy.contains('City')
    //     cy.contains('Altitude')
    // })
        it('wrong insertion with empty infomation',()=>{
            cy.contains('Create new hut').click()
            cy.contains('Please insert name')
            cy.contains('Please insert correct length')
            cy.contains('Please insert correct province')
            cy.contains('Please insert correct city')
            cy.contains('Please insert correct type')
            cy.contains('Please insert correct number of beds')
            cy.contains('Please insert correct description')
            cy.contains('Please insert correct altitude')
        })
    
        it('Cancel button test',()=>{
        cy.contains('Cancel').click()
        cy.url().should('include', '/home')
    })

  
})
