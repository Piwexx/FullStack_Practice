//Basic
test('2 + 2 = 4',()=>{
    expect(2+2).toBe(4);
 })
 
 //Objeto
 test('Object validation',()=>{
    const data = {username:"Juan"}
    const dataDos = {username:"Irma"}
 
    expect(data).toEqual({username:"Juan"});
    expect(dataDos).not.toEqual(data)
 })

 //Comparación
//  expect().toBeNull(); only null
//  expect().toBeUndefined(); only undefined
//  expect().toBeDefined();  opposite of tobeUndefined
//  expect().toBeTruthy(); if statement treats as true
//  expect().toBeFalsy();if statement treats as false

test('null',()=>{
    const n = null

    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
})

test('zero',()=>{
    const zero = 0

    expect(zero).not.toBeNull();
    expect(zero).toBeDefined();
    expect(zero).not.toBeUndefined();
    expect(zero).not.toBeTruthy();
    expect(zero).toBeFalsy();
})

//Números
// expect().toBeGreaterThan();
// expect().toBeGreaterThanOrEqual();
// expect().toBeLessThan();
// expect().toBeLessThanOrEqual();
// expect().toBe();
// expect().toBeCloseTo(number, delta);
// expect().toEqual()

test('two plus two',()=>{
    const value = 2 + 2 

    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(5.5);
    expect(value).toBe(4);
    expect(value).toEqual(4)
})

test('Adding floating point number',()=>{
    const value = 0.1 + 0.2 

    expect(value).toBeCloseTo(0.3);
})

//Text
describe('email validation',() => {
    test('this is a email',()=>{
        const email = 'vigario@gmail.com';

        expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    })

    test('this is not a email',()=>{
        const email = 'vigariogmail.com';
        expect(email).not.toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    })
})

//Array
describe('value in array',()=>{
    test("array is not null",()=>{
        const data = [1,2,3,4,5]
    
        expect(data).not.toBeNull;
    })
    test("array lenght = 5",()=>{
        const data = [1,2,3,4,5]
    
       expect(data).toHaveLength(5);;
    })
    test("1 in array",()=>{
        const data = [1,2,3,4,5]
    
        expect(data).toContain(1);
    })
    test("10 not array",()=>{
        const data = [1,2,3,4,5]
    
        expect(data).not.toContain(10);
    })
})
//Test Coverage
// "test:coverage":"jest --coverage"

//Callback
it('deberia retornar la informacion de goku',done =>{
    const API =  ''

    function callback(err,data){
        try {
            expect(err).toBeNull()
            expect(data).not.toBeNull()
            expect(data.name).toBe('goku')
            done()
        } catch (error) {
            done(err)
        }
    }

    fetchAPI(API,callback)
})
//Promise
it('deberia retornar la informacion de goku', (done) =>{
    const API =  ''
    return fetchAPI(API)
    .then(response =>{
        expect(response.data.name).toBe('goku')
    })
})
it('deberia fallar por url invalida', ()=>{
    const API =  ''
    expect.assertions(1)
    return fetchAPI(API)
    .then(response =>{
        expect(response.data.name).toBe('goku')
    })
    .catch(err =>{
        expect(err).not.toBeNull()
    })
})

it('deberia retornar la informacion de goku', async(done) =>{
    const API =  ''
    const data = await fetchAPI(API)
    
    expect(data.name).toBe('goku')
    expect(data).not.toBeNull()
})
it('deberia fallar por url invalida', async(done) =>{
    const API =  ''
    expect.assertions(1)
    try {
         await fetchAPI(API)
    } catch (error) {
        expect(error).not.toBeNull()
    }
})
//API
beforeAll(()=>{})
afterAll((done)=>{})
beforeEach(()=>{})
AfterEach(()=>{})

//Get
const request = require('supertest')
const app = require('../app')

describe('GET api/users',()=>{
    it('should return all users',async()=>{
        const response = 
                await request(app)
                             .get('/api/users')

        expect(response.error).toBe(false)
        expect(response.status).toBe(200)
        expect(response.body.body).not.toBeNull()
        expect(Array.isArray(response.body.body)).toBe(true)
        expect(response.body.body).toHaveLength(2)
    })
})

//Post
describe('POST api/users',()=>{
    it('should POST a new user',async()=>{
        let user ={
            name: "Juan",
            username: "Vigario"
        }
        const response = 
                await request(app)
                             .post('/api/users')
                             .send(user)

        expect(response.error).toBe(false)
        expect(response.status).toBe(201)
        expect(response.body.body).not.toBeNull()
        expect(response.body.body.username).toBe("Vigario")
    })
})


// Para evitar que nos cancele por tener el puerto ocupado server.close()