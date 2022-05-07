/* eslint-disable jsx-a11y/aria-role */
import React, { useState, useRef, useEffect } from 'react';
import { mount } from '@cypress/react';
import { sleep } from '../../utils/date';
import { useOnClickOutside } from '../useClickAway';

const childContent = 'childContent';

const TestComponent = () => {
  const childRef = useRef(null);
  const [count, setCount] = useState(0);

  const addCount = () => setCount((c) => c + 1);
  useOnClickOutside(childRef, addCount);

  return (
    <div style={{ padding: '4rem', backgroundColor: '#ddd' }}>
      <span role="outside-elem">Outside Elem</span>
      <div ref={childRef} style={{ backgroundColor: '#eee', padding: '2rem' }}>
        <span role="child-content">{count}</span>
      </div>
    </div>
  );
};

describe('useClickAway', () => {
  it('basic usage for useClickAway => by clicking outside the targeted elem ref should trigger the callback', () => {
    mount(<TestComponent />);
    cy.get('span[role="outside-elem"]').click();
    cy.get('span[role="child-content"]').contains(1);
  });

  it('clicking the targeted elem itself should not trigger the callback', () => {
    mount(<TestComponent />);
    cy.get('span[role="child-content"]').click();
    cy.get('span[role="child-content"]').contains(0);
  });
});
