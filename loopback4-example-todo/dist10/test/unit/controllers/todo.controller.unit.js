"use strict";
// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const controllers_1 = require("../../../src/controllers");
const repositories_1 = require("../../../src/repositories");
const helpers_1 = require("../../helpers");
describe('TodoController', () => {
    let todoRepo;
    /*
    =============================================================================
    METHOD STUBS
    These handles give us a quick way to fake the response of our repository
    without needing to wrangle fake repository objects or manage real ones
    in our tests themselves.
    =============================================================================
     */
    let create;
    let findById;
    let find;
    let replaceById;
    let updateById;
    let deleteById;
    /*
    =============================================================================
    TEST VARIABLES
    Combining top-level objects with our resetRepositories method means we don't
    need to duplicate several variable assignments (and generation statements)
    in all of our test logic.
  
    NOTE: If you wanted to parallelize your test runs, you should avoid this
    pattern since each of these tests is sharing references.
    =============================================================================
    */
    let controller;
    let aTodo;
    let aTodoWithId;
    let aChangedTodo;
    let aTodoList;
    const noError = 'No error was thrown!';
    beforeEach(resetRepositories);
    describe('createTodo', () => {
        it('creates a Todo', async () => {
            create.resolves(aTodoWithId);
            const result = await controller.createTodo(aTodo);
            testlab_1.expect(result).to.eql(aTodoWithId);
            testlab_1.sinon.assert.calledWith(create, aTodo);
        });
        it('throws if the payload is missing a title', async () => {
            const todo = helpers_1.givenTodo();
            delete todo.title;
            try {
                await controller.createTodo(todo);
            }
            catch (err) {
                testlab_1.expect(err).to.match(/title is required/);
                testlab_1.sinon.assert.notCalled(create);
                return;
            }
            // Repository stub should not have been called!
            throw new Error(noError);
        });
    });
    describe('findTodoById', () => {
        it('returns a todo if it exists', async () => {
            findById.resolves(aTodoWithId);
            testlab_1.expect(await controller.findTodoById(aTodoWithId.id)).to.eql(aTodoWithId);
            testlab_1.sinon.assert.calledWith(findById, aTodoWithId.id);
        });
    });
    describe('findTodos', () => {
        it('returns multiple todos if they exist', async () => {
            find.resolves(aTodoList);
            testlab_1.expect(await controller.findTodos()).to.eql(aTodoList);
            testlab_1.sinon.assert.called(find);
        });
        it('returns empty list if no todos exist', async () => {
            const expected = [];
            find.resolves(expected);
            testlab_1.expect(await controller.findTodos()).to.eql(expected);
            testlab_1.sinon.assert.called(find);
        });
    });
    describe('replaceTodo', () => {
        it('successfully replaces existing items', async () => {
            replaceById.resolves(true);
            testlab_1.expect(await controller.replaceTodo(aTodoWithId.id, aChangedTodo)).to.eql(true);
            testlab_1.sinon.assert.calledWith(replaceById, aTodoWithId.id, aChangedTodo);
        });
    });
    describe('updateTodo', () => {
        it('successfully updates existing items', async () => {
            updateById.resolves(true);
            testlab_1.expect(await controller.updateTodo(aTodoWithId.id, aChangedTodo)).to.eql(true);
            testlab_1.sinon.assert.calledWith(updateById, aTodoWithId.id, aChangedTodo);
        });
    });
    describe('deleteTodo', () => {
        it('successfully deletes existing items', async () => {
            deleteById.resolves(true);
            testlab_1.expect(await controller.deleteTodo(aTodoWithId.id)).to.eql(true);
            testlab_1.sinon.assert.calledWith(deleteById, aTodoWithId.id);
        });
    });
    function resetRepositories() {
        todoRepo = testlab_1.sinon.createStubInstance(repositories_1.TodoRepository);
        aTodo = helpers_1.givenTodo();
        aTodoWithId = helpers_1.givenTodo({
            id: 1,
        });
        aTodoList = [
            aTodoWithId,
            helpers_1.givenTodo({
                id: 2,
                title: 'so many things to do',
            }),
        ];
        aChangedTodo = helpers_1.givenTodo({
            id: aTodoWithId.id,
            title: 'Do some important things',
        });
        // Setup CRUD fakes
        create = todoRepo.create;
        findById = todoRepo.findById;
        find = todoRepo.find;
        updateById = todoRepo.updateById;
        replaceById = todoRepo.replaceById;
        deleteById = todoRepo.deleteById;
        controller = new controllers_1.TodoController(todoRepo);
    }
});
//# sourceMappingURL=todo.controller.unit.js.map