import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { APIServer } from './src/tests/Test/Code/LoginForm/mocks/servers';

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
});

beforeAll(() => APIServer.listen());
afterAll(() => APIServer.close());
afterEach(() => APIServer.resetHandlers());