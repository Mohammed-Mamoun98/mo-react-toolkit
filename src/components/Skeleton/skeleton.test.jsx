import React, { useState, useRef, useEffect } from 'react';
import { mount, unmount } from '@cypress/react';
import '../../../utils/testing/styles/index.scss';
import Skeleton from './Skeleton';

const TestComponent = (props) => (
  <Skeleton {...props}>
    <span id="child-content">Child Content</span>
  </Skeleton>
);

describe('Skeleton', () => {
  it('when passing loading flag as true, only skeleton should be rendered, and child should be hidden', () => {
    mount(<TestComponent loading />);
    cy.get('.skeleton').should('exist');
    cy.get('#child-content').should('not.exist');
  });

  it('when passing loading flag as false, only skeleton should be rendered, and child should be hidden', () => {
    mount(<TestComponent loading={false} />);
    cy.get('.skeleton').should('not.exist');
    cy.get('#child-content').should('exist');
  });
});
