/*this file include e2eTest of inserting hut(story5) and searching hut(story7),
in this way can reduce some repeated steps*/
//test new hut(story5)
describe('hutform e2e tset', () => {
    it('login ', () => {
         cy.login("lg1@p.it","password")
    })

    it('jump into Huts page test',()=>{
        cy.contains('Huts').click({force: true})
        cy.url().should('include','/huts')
      
    })    
    
    it('create new huts button test',()=>{
        cy.contains("New Hut").click({force: true})
        cy.url().should('include', '/new-hut')
   })

    it('submit hut form',()=>{
        cy.get('.list-group').trigger('click',367,90)
        cy.get('input[id=validationCustom01]').clear({force: true}).type('Torino Lingotto').should('have.value', 'Torino Lingotto')
        cy.get('input[id=validationCustom08]').clear({force: true}).type('Refuge').should('have.value', 'Refuge')
        cy.get('input[id=validationCustom09]').clear({force: true}).type('40').should('have.value', '40')
        cy.get('input[id=validationCustom03]').clear({force: true}).type('200').should('have.value', '200')
        cy.get('textarea').clear({force: true}).type('good').should('have.value', 'good')
        cy.get("[type='submit']").click({ force: true })
    })
     
})

//testwrong insertion with empty info and cancel button
describe('cancel button test of hutform e2e tset', () => {
    it('jump into Huts page test',()=>{
        cy.contains("New Hut").click({force: true})     
    })    

    it('wrong insertion with empty infomation',()=>{
        cy.contains('Create new hut').click()
        cy.contains('Please insert name')
        cy.contains('Please insert correct type')
        cy.contains('Please insert correct number of beds')
        cy.contains('Please insert correct description')
        cy.contains('Please insert correct altitude')
    })
    
        it('Cancel button test',()=>{
        cy.contains('Cancel').click()
        cy.url().should('include', '/huts')
    })
})

//test searchHut function(story7)
describe('search hut e2e tset', () => { 
    it('search input form test',()=>{
       cy.get(".md[type='text']").type('Vil',{force: true}).should('have.value','Vil')
       cy.get('.list-group').should('contain','Hotel Villaggio Baffa','Calabria','Cotronei (KR)')
    })

    it('see more button exist',()=>{
       cy.contains('see more').click()
       cy.url().should('include','hut/18')
    })

   it('show all info of the hut which is searched',()=>{
       cy.get('.titleBig').should('contain','Hotel Villaggio Baffa')
       cy.get('.textGrayPrimaryItalic').should('contain','Villaggio Baffa is an excellent combination for short or long stays and at any time of the year.')
       cy.get('.textGrayPrimaryBig').should('contain','Calabria','Cotronei (KR)','Beds: 28')
    })

   it('the input does not match any hut test',()=>{
       cy.contains('Huts').click({force: true})
       cy.get(".md[type='text']").type('Ro',{force: true}).should('have.value','Ro')
       cy.get('.container').should("not.have.class","list-group")
   })

})
