/* eslint-disable react/jsx-pascal-case */
import React, { useState, useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { mount, unmount } from '@cypress/react';
import store from '../../redux/store';
import { sleep } from '../../utils/date';
import { usePromise } from './usePromise';
import ShowAt from '../../components/Common/ShowAt/ShowAt';

const mockValidPromise = () =>
  new Promise(async (resolve, reject) => {
    await sleep(500);
    resolve('Test Data');
  });

const mockFailedPromise = () =>
  new Promise(async (resolve, reject) => {
    await sleep(500);
    reject('Request Failed!');
  });

// eslint-disable-next-line react/prop-types
const _TestComponent = ({ request }) => {
  const [getData, data, loading, error] = usePromise(request);

  useEffect(() => {
    // catch has been added cuz it crashes cypress test, no need to add it in real examples
    getData().catch(() => {});
  }, []);

  return (
    <div>
      <span className="data">{data}</span>
      <span className="error">{error}</span>
      <span className="loading">
        <ShowAt at={loading}>loading...</ShowAt>
      </span>
    </div>
  );
};
const TestComponent = (props) => (
  <Provider store={store}>
    <_TestComponent {...props} />
  </Provider>
);

describe('usePromise', () => {
  it(`passing a function that return a valid promise
        => should show loading until promise is resolved
        => should render promise resolved data
        => should stop loading after resolve
  `, () => {
    mount(<TestComponent request={mockValidPromise} />);
    cy.get('span.loading').contains('loading...');
    cy.get('span.data').contains('Test Data');
    cy.get('span.loading').should('not.have.text', 'loading...');
  });
  it(`passing a function that return an invalid promise
        => should render error msg
  `, () => {
    mount(<TestComponent request={mockFailedPromise} />);
    cy.get('span.loading').contains('loading...');
    cy.get('span.error').contains('Request Failed!');
    cy.get('span.loading').should('not.have.text', 'loading...');
  });
});
