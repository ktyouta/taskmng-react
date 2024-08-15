import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { APIServer } from './src/tests/Test/Code/LoginForm/mocks/servers';
import { LoginAPIServer } from './src/tests/Code/Login/mocks/servers';


// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
});

beforeAll(() => {
    APIServer.listen();
    LoginAPIServer.listen();
});

afterAll(() => {
    APIServer.listen();
    LoginAPIServer.listen();
});

afterEach(() => {
    APIServer.listen();
    LoginAPIServer.listen();
});