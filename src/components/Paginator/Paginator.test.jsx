import React, { useState, useRef, useEffect } from 'react';
import { mount, unmount } from '@cypress/react';
import Paginator from './Paginator';
import '../../../styles/partials/_utils.scss';

/**
 *  render props pattern was used in Pagination Component
 *  take a look into it at https://blog.logrocket.com/react-reference-guide-render-props/
 */

const createMockData = (arrLength) => new Array(arrLength).fill(null).map((elem, index) => ({ num: index }));

// eslint-disable-next-line react/prop-types
const TestComponent = ({ records = [], test, ...rest }) => (
  <>
    <Paginator records={records} {...rest}>
      {({ renderedRecords = [] }) => (
        <>
          <div className="paginator-wrapper d-flex gap-lg">
            {renderedRecords.map((elem) => (
              // eslint-disable-next-line jsx-a11y/aria-role
              <span role="paginated-child" key={elem.num}>
                elem {elem.num}
              </span>
            ))}
          </div>
        </>
      )}
    </Paginator>
  </>
);

describe('Paginator', () => {
  it('number of records is less than or equal page size => all records should be rendered', () => {
    // defaultPageSize for paginator is 4
    mount(<TestComponent records={createMockData(3)} />);
    cy.get('.paginator-wrapper > span').should('have.length', 3);
    unmount();
  });

  it('number of records is more than page size => max rendered elems is page size', () => {
    const pageSize = 2;
    mount(<TestComponent pageSize={pageSize} records={createMockData(10)} />);
    cy.get('.paginator-wrapper > span').should('have.length.at.most', pageSize);
    unmount();
  });

  it('click on page should render the related chunk of elems of that page', () => {
    const pageSize = 3;
    mount(<TestComponent pageSize={pageSize} records={createMockData(10)} />);
    // rendered record should be 6, 7, 8
    cy.get('li[title="3"]').click();

    cy.get('.paginator-wrapper')
      .children()
      .should('contain', 'elem 6')
      .and('contain', 'elem 7')
      .and('contain', 'elem 8');
  });
});
