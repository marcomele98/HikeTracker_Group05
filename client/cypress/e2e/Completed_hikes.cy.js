//story34:As hiker I want to access the list of hikes I completed
describe('get the hikes list', () => { 
    it('login ', () => {
        cy.login("h2@p.it","password")
    })

    it('jump into  my Completed hikes list test',()=>{
        cy.get('#basic-nav-dropdown').contains('Hikes').click()
        cy.get('.dropdown-item').contains('Completed').click({force:true})
        cy.url().should('include', '/completed-hikes')
    })  

    it('Check if the hiker access correct list of first Completed hike',()=>{
        //completed hike 1
        cy.contains('Laghetto del Vach – Itinerario ad anello da Ligont')
        // cy.contains('San Fili Loop')
        // cy.contains('The top trek in Garda Trentino')
        cy.get('.completedCard').eq(0).click({force:true})
        cy.on('window:alert', (alert) => {
            expect(alert).to.contains('Started at 2022-12-23 14:00:00');
            expect(alert).to.contains('Completed at 2022-12-23 17:00:00');
            expect(alert).to.contains('Completed in 180 mins');
        });
        cy.get(".btn-close").click({force:true})
        cy.get("window").should("not.exist")
    })

    it('Check if the hiker access correct list of second Completed hike',()=>{
        //completed hike 2
         cy.contains('San Fili Loop')
        // cy.contains('The top trek in Garda Trentino')
        cy.get('.completedCard').eq(1).click({force:true})
        cy.on('window:alert', (alert) => {
            expect(alert).to.contains('Started at 2022-12-14 16:00:00');
            expect(alert).to.contains('Completed at 2022-12-14 18:00:00');
            expect(alert).to.contains('Completed in 120 mins');
        });
        cy.get(".btn-close").click({force:true})
        cy.get("window").should("not.exist")
    })

    it('Check if the  hiker access correct list of third Completed hike',()=>{
        //completed hike 3
         
        cy.contains('The top trek in Garda Trentino')
        cy.get('.completedCard').eq(2).click({force:true})
        cy.on('window:alert', (alert) => {
            expect(alert).to.contains('Started at 2022-11-07 12:00:00');
            expect(alert).to.contains('Completed at 2022-11-07 18:00:00');
            expect(alert).to.contains('Completed in 360 mins');
        });
        cy.get(".btn-close").click({force:true})
        cy.get("window").should("not.exist")
    })



})