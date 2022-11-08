'use strict';

const user = require ('../../Queries/user');

const sqlite = require('sqlite3');
const db = new sqlite.Database('HT.sqlite', (err) => {
    if (err) throw err;
});

db.run('DELETE FROM USER');

db.run(
    "INSERT OR IGNORE INTO USER(id, name, surname, role, password, email, salt, phone_number)\
     VALUES (1, 'Mario', 'Rossi', 'local guide', \
            'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
            'lg1@p.it', '4783473632662333', '3334567980'),\
            (2, 'Luigi', 'Verdi', 'hiker', \
            '47b5880cd28fb469b027514f66ea88bb70cfdc09f74da5b57cf10a5e99f79987', \
            'lg2@p.it', '7753261635033673', '3334567981'),\
            (3, 'Giulia', 'Ferrari', 'hiker', \
            '2ae2aedbee5039df2dd9e543242630c0f0163be04743839005149d153d8c5ccf', \
            'lg3@p.it', '4882005695689689', '3334567982'),\
            (4, 'Giuseppe', 'Fontana', 'local guide', \
            'bfdc14a731c4d449df43553a1a4cdbc642fcd160a7d70edc33a62bab2f1977a6', \
            'lg4@p.it', '2404979062580254', '3334567983')"
  );

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

    let email = 'lg1@p.it';
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


    email = 'lg3@p.it';
    data = await user.getUser(email);
    let user2 = new User(data.id, data.name, data.surname, data.role, data.password, data.email, data.salt, data.phone_number);
    user_check = new User(
        3,
        'Giulia',
        'Ferrari',
        'hiker',
        '2ae2aedbee5039df2dd9e543242630c0f0163be04743839005149d153d8c5ccf',
        'lg3@p.it',
        '4882005695689689',
        '3334567982'
    );
    expect(user2).toEqual(user_check);

    data = await user.getUser('');
    expect(data).toBe(undefined);

});

test('Test getUserById', async()=>{
    
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

    
    data = await user.getUserById(2);
    let user2 = new User(data.id, data.name, data.surname, data.role, data.password, data.email, data.salt, data.phone_number);
    user_check = new User(
        2,
        'Luigi',
        'Verdi',
        'hiker',
        '47b5880cd28fb469b027514f66ea88bb70cfdc09f74da5b57cf10a5e99f79987',
        'lg2@p.it',
        '7753261635033673',
        '3334567981'
    );

    expect(user2).toEqual(user_check);

    data = await user.getUserById(4);
    let user3 = new User(data.id, data.name, data.surname, data.role, data.password, data.email, data.salt, data.phone_number);
    user_check = new User(
        4,
        'Giuseppe',
        'Fontana',
        'local guide',
        'bfdc14a731c4d449df43553a1a4cdbc642fcd160a7d70edc33a62bab2f1977a6',
        'lg4@p.it',
        '2404979062580254',
        '3334567983'
    );

    expect(user3).toEqual(user_check);
    expect(user2).not.toEqual(user_check);

    data = await user.getUserById(-1);
    expect(data).toBe(undefined);
});