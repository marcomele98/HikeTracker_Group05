//test confirm button when adding  a hut as start point of the hike
describe('get the hikes list', () => { 
    it('login ', () => {
        cy.login("lg1@p.it","password")
    })

    it('jump into certain hike page test',()=>{
        cy.contains('Great War: from Malga Grassi to Rifugio Pernici').parent().parent()
        .within(() => {     
        cy.contains('see more').click({force:true})
        })
    })  
    
    it('edit button test',() => {
        cy.contains('Start Point').parent()
        .within(() => {     
            cy.get('button').click({force:true})
            })
    })

    it('adding a hut point as start point test',() =>{
        //test first select input:choose type of start point
        cy.contains('Select the new start point:')
        cy.get('select')
        .eq(0)
        .select('Hut',{force: true})
        .invoke('val')
        .should('eq', 'hut')
        //test second select input:choose one certain hut name
        cy.contains('Select the hut:')
        cy.get('select')
        .eq(1)
        .select('Rifugio Capanna', { force: true })
        .invoke('val')
        .should('deep.equal', '9')

        cy.contains('Confirm').click({force:true})
    })
})

//test cancel button when adding  a hut as start point of the hike
describe('cancel button test', ()=>{
    it('jump into certain hike page test',()=>{
        cy.login("lg1@p.it","password")
        cy.visit('http://localhost:3000/hike/7')
        cy.contains('Start Point').parent()
        .within(() => {     
            cy.get('button').click({force:true})
        })
        cy.contains('Cancel').click({force:true})
        cy.get('select').should('not.exist')

    })  
})
// test user manually insert a start point and insert name of start point 
describe('insert a start point and insert name of start point test', ()=>{
    it('start point change successfully test',()=>{
        cy.contains('Start Point').parent()
        .within(() => {     
            cy.get('button').click({force:true})
        })
        cy.get('select')
        .eq(0)
        .select('Default',{force: true})
        .invoke('val')
        .should('eq', 'default')
        cy.contains('Name')
        cy.get("#validationCustom04").type('porta nuova',{force:true}).should('have.value','porta nuova')
        cy.contains('Confirm')
        cy.contains('Cancel').click({force:true})
    })
 })

  //test add a parking lot as a start point 
  describe('add a parking lot as a end point',()=>{
    it('adding a parking lot as end point test',()=>{
        cy.contains('End Point').parent()
        .within(() => {     
        cy.get('button').click({force:true})
        })
        cy.get('select')
        .eq(0)
        .select('Parking Lot',{force: true})
        .invoke('val')
        .should('eq', 'parking lot')
        //test second select input:choose one certain park name
        cy.contains('Select the parking lot:')
        cy.get('select')
        .eq(1)
        .select('Parking place Malga Grassi', { force: true })
        .invoke('val')
        .should('deep.equal', '4')
          cy.contains('Confirm').click({force:true})
    })
   
  
})
