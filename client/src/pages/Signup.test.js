import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import { MemoryRouter } from 'react-router-dom';
import * as exportedFunc from './exportedFunc'
import SignUp from './SignUp';

describe('My first test', ()=>{

  jest.mock('./exportedFunc')

  it('should comment', async ()=> {

    const mockSignup = jest.spyOn(exportedFunc,'handleSubmit').mockImplementation();
    render(<SignUp />, {wrapper: MemoryRouter});
     const button = screen.getByText('Sign up')
     fireEvent.click(button);
     expect(mockSignup).toHaveBeenCalledTimes(1);
    //expect(mockSignup).toHaveBeenCalledWith();



  });
  })