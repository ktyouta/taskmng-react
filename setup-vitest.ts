import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { SampleTestAPIServerList } from './src/tests/SampleTest/servers';
import { APIServerList } from './src/tests/AppTest/servers';
import { setupServer } from 'msw/node';
import { HttpHandler } from 'msw';


beforeAll(() => {
    global.ResizeObserver = class {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
});


const HttpHandlerSampleList: HttpHandler[] = SampleTestAPIServerList.reduce((prev, current) => {
    return [...prev, ...current];
}, []);

const AppHandlerSampleList: HttpHandler[] = APIServerList.reduce((prev, current) => {
    return [...prev, ...current];
}, []);


beforeAll(() => {

    setupServer(...HttpHandlerSampleList, ...AppHandlerSampleList).listen();
});

afterAll(() => {

    setupServer(...HttpHandlerSampleList, ...AppHandlerSampleList).listen();
});

afterEach(() => {

    setupServer(...HttpHandlerSampleList, ...AppHandlerSampleList).listen();

});