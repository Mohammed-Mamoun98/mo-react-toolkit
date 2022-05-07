/* eslint-disable jsx-a11y/aria-role */
import React, { useState } from 'react';
import { mount } from '@cypress/react';
import { useDebounce } from './useDebounce';
import { sleep } from '../../utils/date';

const INIT_DEPOUNCE_VALUE = 0;
const DEPOUNCE_SLEEP_TIME = 200;

const TestComponent = () => {
  const [count, setCount] = useState(0);
  const [depouncedValue = 0] = useDebounce(count, DEPOUNCE_SLEEP_TIME);

  const addCount = () => setCount((c) => c + 1);

  return (
    <div className="div">
      <button type="button" role="udpate-count-button" onClick={addCount}>
        Click Me!
      </button>
      <span role="child-content">{depouncedValue}</span>
    </div>
  );
};

describe('useDebounce', () => {
  it('when a dependency chnage happen but debounce time did not pass, value should stay as it is', () => {
    mount(<TestComponent />);
    cy.get('button[role="udpate-count-button"]').click();
    cy.get('button[role="udpate-count-button"]').click();
    cy.get('span[role="child-content"]').contains(0);
  });

  it('when a dependency chnage happen and debounce time passed, value should update', () => {
    mount(<TestComponent />);
    cy.clock();
    cy.get('button[role="udpate-count-button"]').click();
    cy.get('button[role="udpate-count-button"]').click();
    cy.tick(200);
    cy.get('span[role="child-content"]').contains(2);
  });
});
