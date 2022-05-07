/* eslint-disable jsx-a11y/aria-role */
import React, { useState } from 'react';
import { mount } from '@cypress/react';
import Stepper from './Stepper';

/**
 *  compound components pattern was used in Stepper Component
 *  take a look into it at https://blog.logrocket.com/understanding-react-compound-components/
 */

const crateStepTextContent = (index) => `Step ${index}`;

const TestComponent = (props) => {
  const [currentStep, setCurrentStep] = useState(0);

  const goNext = () => setCurrentStep((c) => c + 1);
  const goBack = () => setCurrentStep((c) => c - 1);

  return (
    <div>
      <div>
        <button type="button" role="next-btn" onClick={goNext}>
          Next
        </button>
        <button type="button" role="prev-btn" onClick={goBack}>
          Prev
        </button>
      </div>
      <div>
        <Stepper currentStepIndex={currentStep}>
          <Stepper.Step>
            <span role="step-content">{crateStepTextContent(1)}</span>
          </Stepper.Step>
          <Stepper.Step>
            <span role="step-content">{crateStepTextContent(2)}</span>
          </Stepper.Step>
          <Stepper.Step>
            <span role="step-content">{crateStepTextContent(3)}</span>
          </Stepper.Step>
        </Stepper>
      </div>
    </div>
  );
};

describe('Stepper', () => {
  it('only one step content should be rendered at time', () => {
    mount(<TestComponent />);
    cy.get('span[role="step-content"]').should('have.length', 1);
  });

  it('by default, first tab in the array should be rendered', () => {
    mount(<TestComponent />);
    cy.get('span[role="step-content"]').contains(crateStepTextContent(1));
  });

  it('clicking a next button should render the next step content', () => {
    mount(<TestComponent />);
    cy.get('button[role="next-btn"]').click(); // step += 1 => step = 2
    cy.get('span[role="step-content"]').contains(crateStepTextContent(2));
  });

  it('clicking a prev button should render the prev step content', () => {
    mount(<TestComponent />);
    cy.get('button[role="next-btn"]').click(); // step += 1 => step = 2
    cy.get('button[role="next-btn"]').click(); // step += 1 => step = 3
    cy.get('button[role="prev-btn"]').click(); // step -= 1 => step = 2
    cy.get('span[role="step-content"]').contains(crateStepTextContent(2));
  });

  it('reaching a negative or unsopported step index, should render empty div', () => {
    mount(<TestComponent />);
    cy.get('button[role="prev-btn"]').click(); // step -= 1 => step = 0 => unHandled Step index
    cy.get('span[role="step-content"]').should('not.exist');
  });
});
