/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import { mount } from '@cypress/react';
import DelayedRender from './DelayedRender';

const childText = 'I should be rendered after 0.4sec';
const renderDelay = 400;

const TestComponent = () => (
  <DelayedRender ms={renderDelay}>
    <span role="delayed-content">{childText}</span>
  </DelayedRender>
);

describe('DelayedRender', () => {
  it('initially wrapped content should not be rendered till delay time is done', () => {
    mount(<TestComponent />);
    cy.get('span[role="delayed-content"]').should('not.exist');
  });

  it('after delay time is done wrapped content should be rendered', () => {
    mount(<TestComponent />);
    cy.clock();
    cy.tick(renderDelay);
    cy.get('span[role="delayed-content"]').contains(childText);
  });
});
