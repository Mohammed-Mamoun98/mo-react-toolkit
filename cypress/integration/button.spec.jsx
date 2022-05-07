import React from "react";
import { mount, unmount } from "@cypress/react";

const TestComponent = () => <button className="test">TEST</button>;

describe("Paginator", () => {
  it("number of records is less than or equal page size => all records should be rendered", () => {
    // defaultPageSize for paginator is 4
    mount(<TestComponent />);
    cy.get(".test").should("have.length", 1);
    unmount();
  });
});
