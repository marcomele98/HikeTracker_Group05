//e2etest of story33
describe('the local guide wants to define reference points', () => { 
    it('jump into certain hike page test',()=>{
        cy.login("lg1@p.it","password")
        cy.get('.title').contains('Alassio, San Bernardo, Poggio Brea, Laigueglia, Metta, Torre Pisana e Moglio').parent().parent()
        .within(() => {     
        cy.contains('see more').click({force:true})
        })
    })

    it('test cancel button',()=>{
        cy.get('button').contains('Add new point').click()
        cy.get('#validationCustom04').clear().type('yyyyy').should('have.value','yyyyy')
        cy.get('button').contains('Cancel').click()
        cy.get('#validationCustom04').should('not.exist')
        cy.contains('Add new point')      
    })
    it('add new reference point without select a point on the map test',()=>{
        cy.get('button').contains('Add new point').click()
        cy.get('#validationCustom04').type('wy').should('have.value','wy')
        cy.contains('Confirm point').click()
        cy.on('window:alert', (alert) => {
            expect(alert).to.eq('Please select a point.');
        });
        cy.get('.btn-close').click()
    })
    it('add new reference point after selecting a point on the map test',()=>{
        cy.get('.list-group').eq(5).trigger('click',{ multiple: true })
        cy.contains('Address')
        cy.get('#validationCustom05').should('have.value','Via Alessandro Battaglia')
        cy.get('button').contains('Confirm point').click()
    })
    
    it('add new reference point without login test',()=>{
        cy.visit('http://localhost:3000/hike/20')
        cy.get('button').contains('Add new point').should('not.exist')
    })
})