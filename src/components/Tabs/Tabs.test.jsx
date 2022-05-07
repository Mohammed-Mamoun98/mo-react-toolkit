/* eslint-disable jsx-a11y/aria-role */
import React, { useState, useRef, useEffect } from 'react';
import { mount, unmount } from '@cypress/react';
import clsx from 'clsx';
import Tabs from './Tabs';

/**
 *  compound components pattern was used in Tabs Component
 *  take a look into it at https://blog.logrocket.com/understanding-react-compound-components/
 */

const CHILD_WRAPPER_ID = 'CHILD_WRAPPER_ID';

const tabs = [
  { id: 'a', title: 'Tab A' },
  { id: 'b', title: 'Tab B' },
  { id: 'c', title: 'Tab C' },
];

// eslint-disable-next-line react/prop-types
const TabPicker = ({ tabs = [], setCurrentTab, currentTab }) => (
  <div className="order-tabs">
    {tabs.map((tab) => (
      <React.Fragment key={tab.id}>
        <div
          onClick={() => setCurrentTab(tab.id)}
          className={clsx('order-tab', { 'tab-active': currentTab === tab.id })}
          data-testid={tab.title}
        >
          {currentTab === tab.id && <div className="active-indicator" />}
          <span>{tab.title}</span>
        </div>
      </React.Fragment>
    ))}
  </div>
);

const TestComponent = (props) => (
  <div data-testid={CHILD_WRAPPER_ID} className="tab-wrapper">
    <Tabs tabs={tabs} TabPicker={TabPicker}>
      <Tabs.Tab tab="a">
        <span role="tab-content">Component A</span>
      </Tabs.Tab>
      <Tabs.Tab tab="b">
        <span role="tab-content">Component B</span>
      </Tabs.Tab>
      <Tabs.Tab tab="c">
        <span role="tab-content">Component C</span>
      </Tabs.Tab>
    </Tabs>
  </div>
);

describe('Tabs', () => {
  it('Only one tab content should be rendered at time', () => {
    mount(<TestComponent />);
    cy.get('span[role="tab-content"]').should('have.length', 1);
  });

  it('By default first Tab should be rendered', () => {
    mount(<TestComponent />);
    cy.get('span[role="tab-content"]').first().contains('Component A');
  });

  it('Clicking tab should render the corresponding component, tab should have active class', () => {
    mount(<TestComponent />);
    cy.get('.order-tab').contains('Tab B').click();
    cy.get('span[role="tab-content"]').first().contains('Component B');
  });
});
