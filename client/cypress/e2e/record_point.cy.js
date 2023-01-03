/*test story19:As a hiker I want to record reaching a reference point of
 an on-going hike so that I can track my progress on the hike*/
 describe.only('The hiker record reaching a reference point of an on-going hike  test', () => {
    beforeEach(() => {
        cy.login('h1@p.it', 'password')
    })
    afterEach(()=>{
        cy.contains('Logout').click({force:true})
    })
    it('test add a reference point in the hike',()=>{
        // cy.get('.title',{ timeout: 30000 }).contains('Monte Zerbion da Antagnod',{ timeout: 30000 }).parent().parent()
        // .within(() => {     
        // cy.get('.seeMore').contains('see more').click({force:true})
        // })
        // cy.url().should('include', '/hike/27')
        cy.visit('http://localhost:3000/hike/15')
        cy.get('.paddingHorizontal').contains('Start').click({force:true})
        cy.wait(2000)
        cy.contains('Confirm').click({force:true})
        cy.wait(2000)
        cy.get('.textGrayPrimaryBig').contains('Reference Points')
        cy.contains('Abbazzia di San Fruttuoso')
        cy.contains('mark as reached').click({force:true})
        // cy.get('input#formDate.form-control').clear({force:true}).type('2023-01-30') //pick the date to end the hike     
        // cy.get('input#formTime.form-control').clear({force:true}).type('17:15') //pick the time to end the hike
        //cy.get('.modal-content').should('be.visible')
        cy.contains('Confirm').click({force:true})
       // cy.contains('Reached at')
        cy.get('.paddingHorizontal').contains('End').click({force:true})  
        cy.wait(2000) 
        cy.contains('Confirm').click({force:true}) 
    })

    // it('check if the reference point was added successfully',()=>{
    //     cy.visit('http://localhost:3000/hike/27')
    //    cy.get('.point').eq(0).should('contain','Reached at')
    //     cy.get('.paddingHorizontal').contains('End').click({force:true})  
    //     cy.wait(2000) 
    //     cy.contains('Confirm').click({force:true}) 
    // })
    
})