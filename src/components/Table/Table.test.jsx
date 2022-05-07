/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import { mount } from '@cypress/react';
import { LangProvider } from '@dcentralab/unified-frontend';
import * as _ from 'lodash';
import en from '../../../services/translate/en.json';
import Table from './Table';
import '../../../styles/partials/_utils.scss';

const locales = {
  en: () => import('../../../services/translate/en.json'),
};

const cols = [
  {
    id: 'name',
    title: 'Name',
  },
  {
    id: 'age',
    title: 'Age',
  },
  {
    id: 'favouriteColor',
    title: 'Color',
    render: (record, color) => (
      <>
        <span role="whole-record">{JSON.stringify(record)}</span>
        <span role="record-value-by-id">{color}</span>
      </>
    ),
  },
];

const dataSourse = [
  {
    name: 'foo',
    age: 33,
    favouriteColor: 'blue',
  },
  {
    name: 'bar',
    age: 23,
    favouriteColor: 'red',
  },
];

/**
 *  compound components pattern was used in Tabs Component
 *  take a look into it at https://blog.logrocket.com/understanding-react-compound-components/
 */

const TestComponent = (props) => (
  <LangProvider enMessages={en} locales={locales}>
    <div style={{ backgroundColor: '#79018C' }}>
      <Table dataSourse={dataSourse} cols={cols} {...props} />
    </div>
  </LangProvider>
);

describe('Table', () => {
  it('all  dataSource records should be rendered => number of rows equals the length of dataSrc', () => {
    mount(<TestComponent />);
    cy.get('tr.table-row').should('have.length', dataSourse.length);
  });

  it('render method should retutn corresponding record.[colId] as a second param', () => {
    mount(<TestComponent />);
    // first record in dataSrc => record[id] => record.color
    cy.get('span[role="record-value-by-id"]').first().contains('blue');
  });

  it('render method should retutn corresponding record as a first param', () => {
    mount(<TestComponent />);
    cy.get('span[role="whole-record"]')
      .first()
      .then(($elem) => {
        expect($elem.text()).to.eq(JSON.stringify(dataSourse[0]));
      });
  });

  it('passing hidden cols array to Table should hide related cols', () => {
    mount(<TestComponent hiddenCols={['favouriteColor']} />); // there should only be two cols
    cy.get('table thead th').should('have.length', 2);
  });

  it('passing loading as true should hide all records and show loading skeletons', () => {
    mount(<TestComponent loading />);
    cy.get('tr.table-row').should('have.length', 0);
  });
});
