process.env.NODE_ENV = "test";
const request = require("supertest");
const { response } = require("./app");
const app = require("./app")
let items = require("./fakeDb")

let item = {'name': 'apple', 'price': 100}

beforeEach(async () => {
    items.push(item)
  });
  
  afterEach(async () => {
    items = []
  });


describe("get route /items", function(){
    test('returns list of all items', async function(){
        const resp = await request(app).get('/items');
        const items = resp.body;
        expect(resp.statusCode).toBe(200)
        expect(items).toHaveLength(1)
    })
})

describe("get route /items/:name", function(){
    test('returns selected item', async function(){
        const resp = await request(app).get('/items/apple');
        const item = resp.body;
        expect(resp.statusCode).toBe(200)
        expect(item.name).toEqual('apple')
        expect(item.price).toEqual(100)
    })
})

describe("post route to /items/:name", function(){
    test('adds a new item to the db', async function(){
        const resp = await request(app).post('/items').send({"name": "pear", "price": 200})
        expect(resp.statusCode).toBe(200)
        expect(resp.body.added.name).toEqual('pear')
        expect(resp.body.added.price).toEqual(200)
    })
})

describe("patch route to change item", function(){
    test('updates apple to new apple', async function(){
        const resp = await request(app).patch('/items/apple')
        .send({"name": "new apple", "price": 50})

        expect(resp.statusCode).toBe(200)
        expect(resp.body.updated.name).toEqual('new apple')
        expect(resp.body.updated.price).toEqual(50)
    })
})

describe("patch route to delete item", function(){
    test('deletes apple', async function(){
        const resp = await request(app).delete('/items/apple')

        expect(resp.statusCode).toBe(200)
        expect(resp.body.message).toEqual('Deleted')
    })
})

describe('test wrong route name', function(){
    test('gives error message', async function(){
        const resp = await request(app).get('/asd')

        expect(resp.statusCode).toBe(404)
        expect(resp.error.text).toEqual('page not found')
    })
})