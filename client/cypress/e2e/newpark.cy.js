//e2etest of story6(add a new park)
describe('parkingform e2e tset', () => {
    it('login ', () => {
        cy.login("lg1@p.it","password")
    })

    it('jump into parkingLots page test',()=>{
        cy.contains('Parking Lots').click({force: true})
        cy.url().should('include','/parkingLots')
    })    
    
    it('create new parking button test',()=>{
        cy.contains('New Parking Lot').click({force: true})
        cy.url().should('include', '/new-parking')
   })
    
    it('submit parkingLot form',()=>{
        cy.get('.list-group').trigger('click')
        cy.get('input[id=validationCustom01]').type('Nizza',{force:true}).should('have.value', 'Nizza')
        cy.get('input[id=validationCustom03]').type('333',{force:true}).should('have.value', '333')
        cy.get('.justify-content-center').should('be.visible')
        cy.get('button').contains('Create new parking lot').click({ force: true })
     })
})

//test wrong insertion with empty info and cancel button

describe('cancel button test of parkingform e2e tset', () => {
    it('back to create new parking button',()=>{
        cy.go('back')
        cy.contains("New Parking Lot").click({force: true})
   })
   
    it('wrong insertion with empty infomation',()=>{
        cy.contains('Create new parking lot').click()
        cy.contains('Please insert name')
        cy.contains('Please insert correct altitude')
    })
    
        it('Cancel button test',()=>{
        cy.contains('Cancel').click({force: true})
        cy.url().should('include', '/parkingLots')
    })

  
})

