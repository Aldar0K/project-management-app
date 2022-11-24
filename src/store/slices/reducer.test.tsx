import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';

// import fetchMock from 'fetch-mock-jest';
const updateTimeout = 5000;
import fetchMockJest from 'fetch-mock-jest';
import assert from 'assert';
import { store } from 'store';
const fetchMock = fetchMockJest.sandbox();

fetchMock.post('https://pma-backend-2-0.onrender.com/auth/signup', 400).get(/bad\.com/, 500);

beforeEach(() => {
  fetchMock.mock('https://pma-backend-2-0.onrender.com/auth/signup', 400);
});
afterEach(() => {
  fetchMock.restore();
});
