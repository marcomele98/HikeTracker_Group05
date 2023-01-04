//e2e test of story18:As a hiker I want to terminate a hike so that the hike is added to my completed hikes
describe('The hiker terminates a started hike test', () => {
    beforeEach(() => {
        cy.login('h1@p.it', 'password')
    })
    afterEach(()=>{
        cy.contains('Logout').click({force:true})
    })
    it('test End hike and check it in the completed list',()=>{

        cy.visit('http://localhost:3000/hike/49',{failOnStatusCode: false})
        cy.get('.paddingHorizontal').contains('Start').click({force:true})
       // cy.wait(2000)
        cy.get('.styleButtonWidth100').contains('Confirm').click()
        cy.get('.textStarted').contains("IN PROGRESS")//the status of hike changed in the page
        cy.get('.paddingHorizontal').contains('End').click({force:true})
        cy.get('.modal-content').should('be.visible')
        //cy.wait(2000)
        cy.contains('Confirm').click({force:true})
        cy.on('window:alert', (alert) => {
            expect(alert).to.eq('Hike Ended Successfully');
        });
        //check if this hike was added in completed list
        cy.get('#basic-nav-dropdown').contains('Hikes').click()
        cy.get('.dropdown-item').contains('Completed').click({force:true})
        cy.url().should('include', '/completed-hikes')
        cy.get(".title").should('contain','Baita Termen-Rifugio Pian della Palù-Monte Alto-Rifugio Leonida Magnolini')
    })

})