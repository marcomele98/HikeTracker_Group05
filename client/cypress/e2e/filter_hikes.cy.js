//e2e test of story11 and story10 together because they are closely linked
describe('hikers can set and see the filtered hikes ', () => { 
    it('Show Filters button test',()=>{
        cy.login("h1@p.it","password")
        cy.contains('Show Filters').click({force:true})
    })

    it('test Hide Filters button', ()=>{
        cy.contains('Hide Filters').click({force:true})
        cy.get('.rc-slider-handle').should('not.exist')
    })


    it('Set filters test',()=>{
        cy.contains('Show Filters').click({force:true})
        cy.get("[placeholder='Insert province code']").type('TO',{force:true}).should('have.value','TO')
//cy.get("[placeholder='Insert city']").type('Frailino',{force:true}).should('have.value','Frailino')
        cy.get("[placeholder='Insert maximum distance from the selected point']").type('200',{force:true}).should('have.value','200')
        cy.get('.list-group').eq(1).trigger('click',{force:true})
    })

    it("using arrow  to set the value of Ascent test", () => {
        cy.contains('Ascent (m): ')
        const currentValue  = 0;
        const targetValue = 1000;
        const increment = 4;
        const steps = (targetValue - currentValue) / increment;
        const arrows = '{rightarrow}'.repeat(steps); 
      
        cy.get('.rc-slider-handle').eq(0)
          .should('have.attr', 'aria-valuenow', 0)
          .type(arrows,{force:true})
      
        cy.get('.rc-slider-handle')
        .should('have.attr', 'aria-valuenow', 250) 
      
    })

    it("using arrow  to set the value of Length test", () => {
        cy.contains('Length (km): ')
        const currentValue  = 0;
        const targetValue = 12;
        const increment = 3;
        const steps = (targetValue - currentValue) / increment;
        const arrows = '{rightarrow}'.repeat(steps); 
        cy.get('.rc-slider-handle').eq(2)
        .should('have.attr', 'aria-valuenow', 0)
        .type(arrows,{force:true})
        cy.get('.rc-slider-handle').eq(2)
        .should('have.attr', 'aria-valuenow', 4) 
    })
    it("using arrow  to set the value of Expected time test", () => {
        cy.contains('Expected time (min): ')
        const currentValue  = 0;
        const targetValue = 240;
        const increment = 3;
        const steps = (targetValue - currentValue) / increment;
        const arrows = '{rightarrow}'.repeat(steps); 
        cy.get('.rc-slider-handle').eq(4)
        .should('have.attr', 'aria-valuenow', 0)
        .type(arrows,{force:true})
        cy.get('.rc-slider-handle').eq(4)
        .should('have.attr', 'aria-valuenow', 80) 
    })
    it('test after clicking confirm button whether user can see the filter hike and save filters as preference', () =>{
        cy.contains('Confirm').click({force:true})
        cy.get('.title').contains('Path to Rocciamelone')
        cy.get('.list-group-item').children().should('have.length', 8)
        cy.get('.list-group-item').should('contain','Piemonte','Mompantero (TO)','Ascent: 1353 m','Length: 9 km','Expected time: 420 min','Difficulty: Professional Hiker')
        cy.contains('Save Filters As Preferences').click({force:true})
    
    })

    it('test see morde button to know the more details of filter hike', ()=>{
        cy.get('.seeMore').click()
        cy.url().should('include','/hike/1')
    })

    it('test delete button in filter page', ()=>{
        cy.go('back')
        cy.contains('Show Filters').click({force:true})
        cy.contains('Delete').click()
        cy.get("[placeholder='Insert province code']").should('have.value','')
        cy.get("[placeholder='Insert maximum distance from the selected point']").should('have.value','')
    })

    it('test function of Getting Filters From Preferences',()=>{
        cy.go('back')
        cy.contains('Get Filters From Preferences').click({force:true})
        cy.get('.title').should('contain','Salita al Bric Mindino e al Colle di Prato Rotondo')//get my preference filter
    })
})