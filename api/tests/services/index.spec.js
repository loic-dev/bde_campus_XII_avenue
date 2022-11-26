import { testAuth } from "./auth.spec.js";
import { testLogin } from "./login.spec.js"
import { testRegister } from "./register.spec.js";

describe('sequentially run tests', () => {
    testRegister();
    testLogin();
    testAuth();
})