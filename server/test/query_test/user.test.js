'use strict';

const user = require ('../../Queries/user'); 

function User (id, name, surname, role, password, email, salt, phone_number) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.role = role;
    this.password = password;
    this.email = email;
    this.salt = salt;
    this.phone_number = phone_number;
}

test('Test getUser', async()=>{

    const email = 'lg1@p.it';
    let data = await user.getUser(email);
    let user1 = new User(data.id, data.name, data.surname, data.role, data.password, data.email, data.salt, data.phone_number);
    let user_check = new User(
        1,
        'Mario',
        'Rossi',
        'local guide',
        'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333',
        'lg1@p.it',
        '4783473632662333',
        '3334567980'
    );

    expect(user1).toEqual(user_check);

    data = await user.getUser('');
    expect(data).toBe(undefined);

});

test('Test getUserById', async()=>{
    const id = 1;
    let data = await user.getUserById(1);
    let user1 = new User(data.id, data.name, data.surname, data.role, data.password, data.email, data.salt, data.phone_number);
    let user_check = new User(
        1,
        'Mario',
        'Rossi',
        'local guide',
        'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333',
        'lg1@p.it',
        '4783473632662333',
        '3334567980'
    );

    expect(user1).toEqual(user_check);
    
    data = await user.getUserById(-1);
    expect(data).toBe(undefined);
});