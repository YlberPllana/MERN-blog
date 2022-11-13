import Login from "./Login";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import * as Api from '../api/api'



describe("Test the Login Component", () => {

  test("render the login form submit button on the screen", async () => {
   render
    (<Login/>, {wrapper: MemoryRouter})
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(1);
  });

test("Login header should be displayed in the document", async () => {
    render(<Login />, {wrapper: MemoryRouter});
    const header = screen.getByText('Log in');
    expect(header).toBeInTheDocument();
})

  test("email input field should accept email", async () => {
    render(<Login />, {wrapper: MemoryRouter});
    const username = screen.getByPlaceholderText("Username");
    userEvent.type(username, "ylber");
    expect(username.value).not.toMatch("ylber.pllana@polymaths.co");
  });

  test("password input should have type password", async () => {
    render(<Login />, {wrapper: MemoryRouter});
    const password = screen.getByPlaceholderText("Password");
    expect(password).toHaveAttribute("type", "password");
  });




test("should be able to submit the form when username and password are valid", async () => {

jest.mock('../api/api');
    const mockLogin = jest.spyOn(Api,'handleSubmit').mockImplementation();
    render(< Login/>, {wrapper: MemoryRouter});
     const button = screen.getByTestId('submit')
     fireEvent.click(button);
     expect(mockLogin).toHaveBeenCalledTimes(1);
     


  });
 });

 