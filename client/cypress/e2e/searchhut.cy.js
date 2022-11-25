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


describe('search hut e2e tset', () => { 

    it('jump into parkingLots page test',()=>{
        cy.contains('Huts').click({force: true})
        cy.url().should('include','huts')
    })   


    it('search input form',()=>{
       cy.get(".md[type='text']").type('Villaggio Baffa',{force: true}).should('have.value','Villaggio Baffa')
       cy.contains('Villaggio Baffa (Hotel)')
       cy.contains('Calabria')
       cy.contains('Cotronei (KR)')
       
    })

    it('see more button exist',()=>{
       cy.contains('see more').click()
       cy.url().should('include','hut/18')
    })


   it('show all info of the hut which is searched',()=>{
       cy.contains('Villaggio Baffa (Hotel)')
       cy.contains('Villaggio Baffa is an excellent combination for short or long stays and at any time of the year.')
       cy.contains('Calabria')
       cy.contains('Cotronei (KR)')
       cy.contains('Beds: 28')
       cy.contains('Cotronei (KR)')
    
    })



})