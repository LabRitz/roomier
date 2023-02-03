import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ApplicationModal from "./ApplicationModal.jsx";

const applications = [
  {
    firstName: 'John',
    lastName: 'Smith',
    username: 'test@gmail.com'
  },
  {
    firstName: 'Jimmy',
    lastName: 'Johns',
    username: 'jj@gmail.com'
  },
  {
    firstName: 'Jenga',
    lastName: 'Manual',
    username: 'jm@gmail.com'
  }
]

describe("ApplicationModal.jsx", () => {

  it("Renders open ApplicationModal", async () => {    
    render(<ApplicationModal applications={applications} open={true}/>);

    expect(await screen.getByText("John Smith")).toBeTruthy();
    expect(await screen.getByText("test@gmail.com")).toBeTruthy();
  });

  it("Renders open ApplicationModal", async () => {    
    render(<ApplicationModal applications={applications} open={true}/>);

    expect(await screen.getAllByTestId("listItemModal").length).toEqual(3);
    expect(await screen.getAllByTestId("dividerModal").length).toEqual(3);
  });

});
