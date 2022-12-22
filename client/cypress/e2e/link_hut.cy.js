//e2e test of story9
describe('the local guide wants to link a hut to a hike', () => { 
    it('jump into certain hike page test',()=>{
        cy.login("lg1@p.it","password")
        cy.contains('Ascesa al Rifugio Savona',{ timeout: 30000 }).parent().parent()
        .within(() => {     
        cy.contains('see more').click({force:true})
        })
        cy.contains('Ascesa al Rifugio Savona')
    })

    it('add new hut for hike test',()=>{
        cy.contains('Add new hut').click({force: true})
        cy.contains('Select the hut:')
        cy.contains('Cancel').click({force:true})//test cancel button before confirm button
        cy.get('select').should('not.exist')
        cy.get('button').contains('Add new hut').click({force: true})
        cy.get('.form-select').children().should('have.length', 1)//test the number of optional huts
        cy.get('select')
        .select('Gallo di monte',{force: true})
        .invoke('val')
        .should('eq', '4')
        cy.get("[type='submit']").contains('Confirm').click({force:true})
    })
 })