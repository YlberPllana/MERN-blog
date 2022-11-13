import { render, screen, fireEvent } from '@testing-library/react';
import Nav from '../Nav';
import * as navMockedFunc from './mocks/navMockedFunc'
import {createMemoryHistory} from 'history';
import { Router } from 'react-router-dom';
import "@testing-library/jest-dom";

const user = {
  username: 'ylber',
  _id: '632871fcb752cab23647d4a4'
};
const noUser = undefined;
const setUser = jest.fn();

describe('Verify navigation pages appearance based on user value', () => {
  it('should show Home,Dashboard,Create, and Logout when user is logged in', async () => {

    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <Nav user={user} setUser={setUser} />,
      </Router>,
    );

    // Home, Dashboard, Create and Logout Pages are visible(not hidden) when user is logged in
    expect(screen.getByTestId('home-link')).not.toHaveAttribute("hidden");
    expect(screen.getByTestId('dashboard-link')).not.toHaveAttribute("hidden");
    expect(screen.getByTestId('create-link')).not.toHaveAttribute("hidden");
    expect(screen.getByTestId('logout-link')).not.toHaveAttribute("hidden");

    // Login and Signup Pages are hidden when user is logged in
    expect(screen.getByTestId('login-link')).toHaveAttribute("hidden");
    expect(screen.getByTestId('signup-link')).toHaveAttribute("hidden");
  });

  it('should show Login and Signup when user is logged out', async () => {

    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Nav user={noUser} setUser={setUser}/>,
      </Router>,
    );

    // Home, Dashboard, Create and Logout Pages are hidden when user is logged out
    expect(screen.getByTestId('home-link')).toHaveAttribute("hidden");
    expect(screen.getByTestId('dashboard-link')).toHaveAttribute("hidden");
    expect(screen.getByTestId('create-link')).toHaveAttribute("hidden");
    expect(screen.getByTestId('logout-link')).toHaveAttribute("hidden");

    // Login and Signup Pages are visible(not hidden) when user is logged out
    expect(screen.getByTestId('login-link')).not.toHaveAttribute("hidden");
    expect(screen.getByTestId('signup-link')).not.toHaveAttribute("hidden");
  });

});

// Second scenario

describe('Navigate through pages using navigation bar', () => {

  it('should go to My Blog page when My Blog link is clicked', async () => {

    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <Nav user={user} setUser={setUser} />,
      </Router>,
    );

     fireEvent.click(screen.getByText('My Blog'));

    expect(history.location.pathname).toEqual('/'); 

  });

  it('should go to Login page when Login link is clicked', async () => {

    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <Nav user={noUser} setUser={setUser}/>,
      </Router>,
    );

    fireEvent.click(screen.getByText('Log in'));

    expect(history.location.pathname).toEqual('/login');
    
  });

  it('should go to Signup page when Signup link is clicked', async () => {

    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <Nav user={noUser} setUser={setUser}/>,
      </Router>,
    );

    fireEvent.click(screen.getByText('Sign up'));

    expect(history.location.pathname).toEqual('/signup');
  });

  it('should go to Home page when Home link is clicked', async () => {

    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <Nav user={user} setUser={setUser}/>,
      </Router>,
    );

    fireEvent.click(screen.getByText('Home'));

    expect(history.location.pathname).toEqual('/');
  });

  it('should go to Dashboard page when Dashboard link is clicked', async () => {

    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <Nav user={user} setUser={setUser}/>,
      </Router>,
    );

    fireEvent.click(screen.getByText('Dashboard'));

    expect(history.location.pathname).toEqual('/dashboard');
  });

  it('should go to Create page when Create link is clicked', async () => {

    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <Nav user={user} setUser={setUser}/>,
      </Router>,
    );

    fireEvent.click(screen.getByText('Create'));

    expect(history.location.pathname).toEqual('/create');
  });

  it('should call handleLogut function when Logout link is clicked', async () => {

    jest.mock('./mocks/navMockedFunc')

    const mockHandleLogout = jest.spyOn(navMockedFunc,'handleLogout').mockImplementation();
      const history = createMemoryHistory();
       render(
          <Router location={history.location} navigator={history}>
            <Nav user={user} setUser={setUser}/>,
          </Router>,
        );
        const button = screen.getByText('Log out')
        fireEvent.click(button);
        fireEvent.click(button);
        expect(mockHandleLogout).toHaveBeenCalledTimes(2);
        // expect(mockHandleLogout).toHaveBeenCalledWith()

  });
  it('should logout the user and send it to My Blog page', async () => {

      const history = createMemoryHistory();
       render(
          <Router location={history.location} navigator={history}>
            <Nav user={user} setUser={setUser}/>,
          </Router>,
        );
        const button = screen.getByText('Log out')
        fireEvent.click(button);

         expect(history.location.pathname).toEqual('/');
  });
})

  
  
