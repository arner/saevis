"use strict";
// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const rest_1 = require("@loopback/rest");
const application_1 = require("../../src/application");
const repositories_1 = require("../../src/repositories/");
const helpers_1 = require("../helpers");
describe('Application', () => {
    let app;
    let server;
    let client;
    let todoRepo;
    before(givenAnApplication);
    before(async () => {
        await app.boot();
        await app.start();
    });
    before(givenARestServer);
    before(givenTodoRepository);
    before(() => {
        client = testlab_1.createClientForHandler(server.requestHandler);
    });
    after(async () => {
        await app.stop();
    });
    it('creates a todo', async () => {
        const todo = helpers_1.givenTodo();
        const response = await client
            .post('/todos')
            .send(todo)
            .expect(200);
        testlab_1.expect(response.body).to.containEql(todo);
        const result = await todoRepo.findById(response.body.id);
        testlab_1.expect(result).to.containEql(todo);
    });
    it('gets a todo by ID', async () => {
        const todo = await givenTodoInstance();
        await client
            .get(`/todos/${todo.id}`)
            .send()
            .expect(200, todo);
    });
    it('replaces the todo by ID', async () => {
        const todo = await givenTodoInstance();
        const updatedTodo = helpers_1.givenTodo({
            title: 'DO SOMETHING AWESOME',
            desc: 'It has to be something ridiculous',
            isComplete: true,
        });
        await client
            .put(`/todos/${todo.id}`)
            .send(updatedTodo)
            .expect(200);
        const result = await todoRepo.findById(todo.id);
        testlab_1.expect(result).to.containEql(updatedTodo);
    });
    it('updates the todo by ID ', async () => {
        const todo = await givenTodoInstance();
        const updatedTodo = helpers_1.givenTodo({
            title: 'DO SOMETHING AWESOME',
            isComplete: true,
        });
        await client
            .patch(`/todos/${todo.id}`)
            .send(updatedTodo)
            .expect(200);
        const result = await todoRepo.findById(todo.id);
        testlab_1.expect(result).to.containEql(updatedTodo);
    });
    it('deletes the todo', async () => {
        const todo = await givenTodoInstance();
        await client
            .del(`/todos/${todo.id}`)
            .send()
            .expect(200);
        try {
            await todoRepo.findById(todo.id);
        }
        catch (err) {
            testlab_1.expect(err).to.match(/No Todo found with id/);
            return;
        }
        throw new Error('No error was thrown!');
    });
    /*
     ============================================================================
     TEST HELPERS
     These functions help simplify setup of your test fixtures so that your tests
     can:
     - operate on a "clean" environment each time (a fresh in-memory database)
     - avoid polluting the test with large quantities of setup logic to keep
     them clear and easy to read
     - keep them DRY (who wants to write the same stuff over and over?)
     ============================================================================
     */
    function givenAnApplication() {
        app = new application_1.TodoListApplication({
            rest: {
                port: 0,
            },
            datasource: {
                name: 'db',
                connector: 'memory',
            },
        });
    }
    async function givenARestServer() {
        server = await app.getServer(rest_1.RestServer);
    }
    async function givenTodoRepository() {
        todoRepo = await app.getRepository(repositories_1.TodoRepository);
    }
    async function givenTodoInstance(todo) {
        return await todoRepo.create(helpers_1.givenTodo(todo));
    }
});
//# sourceMappingURL=application.acceptance.js.map