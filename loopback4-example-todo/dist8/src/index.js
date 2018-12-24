"use strict";
// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("./application");
const rest_1 = require("@loopback/rest");
async function main(options) {
    const app = new application_1.TodoListApplication(options);
    await app.boot();
    await app.start();
    const server = await app.getServer(rest_1.RestServer);
    const port = await server.get('rest.port');
    console.log(`Server is running at http://127.0.0.1:${port}`);
    return app;
}
exports.main = main;
//# sourceMappingURL=index.js.map