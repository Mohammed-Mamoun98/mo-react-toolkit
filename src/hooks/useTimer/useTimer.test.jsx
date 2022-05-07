/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import { mount } from '@cypress/react';
import { useTimer } from './useTimer';

const TEST_SECONDS_LEFT = 24; // in seconds

const TestComponent = () => {
  const [secondsLeft] = useTimer(TEST_SECONDS_LEFT);
  return <span role="renderedTimeLeft">{secondsLeft}</span>;
};

describe('useTimer', () => {
  it('useTimer should return seconds left', () => {
    mount(<TestComponent />);
    cy.clock();
    cy.get('span[role="renderedTimeLeft"]').contains(24);
    cy.clock(2000);
    cy.get('span[role="renderedTimeLeft"]').should('not.have.text', 23);
    cy.get('span[role="renderedTimeLeft"]').contains(22);
  });
});
