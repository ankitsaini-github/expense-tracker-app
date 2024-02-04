import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from '../../store/index';
import Auth from './Auth';
import userEvent from '@testing-library/user-event';

describe('auth render tests ',()=>{

  test('renders "Forgot password ?" as a text after clicking already user', () => {
    render(<Provider store={store}><Auth /></Provider>);
    const btn = screen.getByText('Have an account? LogIn',{exact:false});
    act(()=>{
      userEvent.click(btn);

    })
    const texttt = screen.getByText('Forgot password ?',{exact:false});
    expect(texttt).toBeInTheDocument();
  });

  test('renders "LogIn" on Log in click', () => {
    render(<Provider store={store}><Auth /></Provider>);
    const btn = screen.getByText('Have an account? LogIn',{exact:false});
    act(()=>{
      userEvent.click(btn);

    })
    const texttt = screen.getByText('LogIn');
    expect(texttt).toBeInTheDocument();
  });

  test('hides "SignUp" on Log in click', () => {
    render(<Provider store={store}><Auth /></Provider>);
    const btn = screen.getByText('Have an account? LogIn',{exact:false});
    act(()=>{
      userEvent.click(btn);

    })
    const texttt = screen.queryByText('SignUp')
    expect(texttt).toBeNull();
  });

  test('hides "confirm password" when log in', () => {
    render(<Provider store={store}><Auth /></Provider>);
    const btn = screen.getByText('Have an account? LogIn',{exact:false});
    act(()=>{
      userEvent.click(btn);

    })
    const texttt = screen.queryByText('Confirm password')
    expect(texttt).toBeNull();
  });

  test('change have an account to create new', () => {
    render(<Provider store={store}><Auth /></Provider>);
    const btn = screen.queryByText('Have an account? LogIn',{exact:false});
    act(()=>{
      userEvent.click(btn);
    })
    const btn2 = screen.queryByText('Have an account? LogIn',{exact:false});
    expect(btn2).toBeNull();
  });

})