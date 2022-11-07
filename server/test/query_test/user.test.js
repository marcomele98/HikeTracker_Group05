'use strict';

const user = require ('../../Queries/user'); 

test('Testing getUser', async()=>{

    const email = 'lg1@p.it';
    let user1 = await user.getUser(email);
    expect(user1.name).toBe('Mario');
});