import React from "react";
import { render, screen } from "@testing-library/react";
import Phrases from "../Phrases.jsx";

describe("Phrases.jsx", () => {

  it("Renders Phrases component", async () => {    
    render(<Phrases />);

    expect(await screen.getByText("find a roommate...")).toBeTruthy();
  });

  it("Phrase changes after 5s", async () => {    
    render(<Phrases />);

    expect(await screen.getByText("find a roommate...")).toBeTruthy();

    setTimeout(async () => {
      expect(await screen.getByText("find a future...")).toBeTruthy();
    }, 5500)
  });

  it("Phrase restarts after 25s", async () => {    
    render(<Phrases />);

    setTimeout(async () => {
      expect(await screen.getByText("find a bed...")).toBeTruthy();
    }, 20500)

    setTimeout(async () => {
      expect(await screen.getByText("find a roommate...")).toBeTruthy();
    }, 25500)
  });

});
