import { testAuth } from "./auth.spec.js";
import { testEvent } from "./event.spec.js";
import { testHome } from "./home.spec.js";
import { testLogin } from "./login.spec.js"
import { testRegister } from "./register.spec.js";
import { testRegisterEvent } from "./register_event.spec.js";

describe('sequentially run tests', () => {
    //testRegister();
    //testLogin();
    //testAuth();
    testHome();
    //testEvent();
    //testRegisterEvent();
})