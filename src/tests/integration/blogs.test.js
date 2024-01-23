let server; 

const request = require('supertest');
const { Blog } = require('../../models/blogs');


describe('/add-blogs' ,async () =>{
    beforeEach(() => { require("../../../index"); })
    afterEach( async () => { 
        server.close();
        await Blog.remove();
    })

    await Blog.collection.insertMany([
        {title : "Testing blogs" , desc : "I am testing this add-blogs GET endpoint"},
        {title : "Testing blogs +1" , desc : "I am testing this add-blogs GET endpoint +1"}
    ])

    it('should return all the blogs', async() => {
        const res = await request(server).get('/add-blogs');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
    })
});