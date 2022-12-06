// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//将用户名和密码进行登录参数化
Cypress.Commands.add("login",(username,password) => {
    cy.clearCookies() //清除cookies,保证页面为未登录状态
    cy.visit('http://localhost:3000/') //访问url
    cy.url().should('include', 'http://localhost:3000/') //验证目标url 是否正确包含光谷社区正确域名 验证是否正确跳转到光谷社区页面
    
    cy.contains('Login').click() //点击登录按钮
    cy.url().should('include', 'login') //验证正确跳转到登录页面
    cy.get('input[id=username]') //根据 css 定位用户名输入框
    .type(username) //输入参数化的用户名
    cy.get('input[id=password]') //根据 css 定位密码输入框
    .type(password) //输入参数化的密码
    cy.get('#submitLogin').click() //点击登录按钮
    cy.contains('Logout').should('be.visible') 
    })