//test story17:As a hiker I want to start a registered hike So that I can record an ongoing hike
describe('The hiker start a registered hike test', () => {
    // beforeEach(() => {
    //     cy.login('h1@p.it', 'password')
    // })
    // afterEach(()=>{
    //     cy.contains('Logout').click({force:true})
    // })

    it('test Start hike button',()=>{
        cy.login("h1@p.it","password")
        cy.get('.title',{ timeout: 30000 }).contains('Colletta di Castelbianco Loop from Veravo',{ timeout: 30000 }).parent().parent()
        .within(() => {     
        cy.get('.seeMore').contains('see more').click({force:true})
        })
        cy.get('.paddingHorizontal').contains('Start').click({force:true})
        cy.wait(2000)
        cy.contains('Date and Time')
        // cy.get('input#formDate.form-control').clear({force:true}).type('2023-01-29') //pick the date to start the hike     
        //cy.get('input#formTime.form-control').clear().type('15:15') //pick the time to start the time
        cy.contains('Confirm').click({force:true})
        cy.wait(2000)
        //cy.get('.textStarted').contains("IN PROGRESS")//the status of hike changed in the page
        cy.on('window:alert', (alert) => {
            expect(alert).to.eq('Hike Started Successfully');
        });

        //check if the started hike was added successfully in the started hikes list
        cy.get('#basic-nav-dropdown').contains('Hikes').click({force:true})
        cy.get('.dropdown-item').contains('Started').click({force:true})
        cy.url().should('include', '/started-hikes')
        cy.contains('Colletta di Castelbianco Loop from Veravo')

        //back to hike page to end hike in order to promise the next time the initial state is not started in the hike page 
        cy.go('back')
        // cy.get('.title',{ timeout: 30000 }).contains('Colletta di Castelbianco Loop from Veravo',{ timeout: 30000 }).parent().parent()
        // .within(() => {     
        // cy.get('.seeMore').contains('see more').click({force:true})
        // })
        cy.get('.paddingHorizontal').contains('End').click({force:true})
        cy.wait(2000)
        // cy.get('input#formDate.form-control').clear({foece:true}).type('2023-01-29') //pick the date to end the hike     
        // cy.get('input#formTime.form-control').clear({force:true}).type('17:15') //pick the time to end the hike
        cy.contains('Confirm').click({force:true})
        cy.on('window:alert', (alert) => {
            expect(alert).to.eq('Hike Ended Successfully');
        });
        cy.clearLocalStorage()
    })

})
