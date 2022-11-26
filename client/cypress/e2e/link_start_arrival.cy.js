//test confirm button when adding  a hut as start point of the hike
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

describe('get the hikes list', () => { 
    it('jump into certain hike page test',()=>{
        cy.contains('Great War: from Malga Grassi to Rifugio Pernici').parent().parent()
        .within(() => {     
        cy.contains('see more').click()
        })
    })  
    
    it('edit button test',() => {
        cy.contains('Start Point').parent()
        .within(() => {     
            cy.get('button').click()
            })
    })

    it('adding hut point as start point test',() =>{
        cy.contains('hut')
        cy.contains('Confirm').click()
        
    })
    
    it('start point change successfully test',()=>{
        cy.visit('http://localhost:3000/hike/7')
       cy.get('.pointTitle').contains('Rifugio Nino Pernici (Refuge)')
    })
})

//test cancel button when adding  a hut as start point of the hike
describe('cancel button test', ()=>{
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
    it('jump into certain hike page test',()=>{
        cy.contains('Great War: from Malga Grassi to Rifugio Pernici').parent().parent()
        .within(() => {     
        cy.contains('see more').click()
        })
    })  
    
    it('edit button test',() => {
        cy.contains('Start Point').parent()
        .within(() => {     
            cy.get('button').click()
            })
    })
  
    it('Cancel button test',()=>{
        cy.contains('Start Point').parent()
        cy.contains('Cancel').click() 
    })
})
// //test confirm button when adding  a parking lot as start point of the hike
describe('adding a hut as end point test', ()=>{
    it('start point change successfully test',()=>{
        cy.visit('http://localhost:3000/hike/7')
      
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

    it('jump into certain hike page test',()=>{
        cy.contains('Great War: from Malga Grassi to Rifugio Pernici').parent().parent()
        .within(() => {     
        cy.contains('see more').click()
        })
    })  
    
    it('edit button test',() => {
        cy.contains('End Point').parent()
        .within(() => {     
            cy.get('button').click()
            })
    })
  
    it('adding hut as end point test',() =>{
        cy.contains('hut')
        cy.contains('Confirm').click()
      
       
    })
 
})
