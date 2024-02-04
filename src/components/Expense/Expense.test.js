import { act,render, screen,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from '../../store/index';
import Expense from './Expense';
import {ExpenseList} from './Expense';
import userEvent from '@testing-library/user-event';

describe('expenses render test ',()=>{
  
  test('renders "My Expenses" as a text', () => {
    render(<Provider store={store}><Expense /></Provider>);
    const texttt = screen.getByText('My Expenses',{exact:false});
    expect(texttt).toBeInTheDocument();
  });

  test('renders "No Expense Listed" as a text', () => {
    render(<Provider store={store}><Expense /></Provider>);
    const texttt = screen.getByText('No Expense Listed',{exact:false});
    expect(texttt).toBeInTheDocument();
  });

  // test('renders "edit" on add click', () => {
  //   render(<Provider store={store}><Expense /></Provider>);
  //   const addbtn = screen.getByText('Add Expense',{exact:false});
  //   act(()=>{
  //     userEvent.click(addbtn)
  //   })
  //   const editbtn = screen.getByText('Edit',{exact:false});
  //   expect(editbtn).toBeInTheDocument();
  // });

  test('Get dummy expense and check on screen ',async()=>{
    const mockexpense=[{
      id:'123',
      price:200,
      description:'test expense',
      category:'test category',
    }];
    window.fetch=jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async()=>{mockexpense}
    })
    render(<Provider store={store}><ExpenseList expenses={mockexpense}/></Provider>); 
    const texttt = await screen.findByText('test expense',{exact:false});
    expect(texttt).toBeInTheDocument();
  })

  test('check if edit btn render ',()=>{
    const mockexpense=[{
      id:'123',
      price:200,
      description:'test expense',
      category:'test category',
    }];

    render(<Provider store={store}><ExpenseList expenses={mockexpense}/></Provider>); 

    expect(screen.getByText('Edit')).toBeInTheDocument();

  })

  test('check if delete btn render ',()=>{
    const mockexpense=[{
      id:'123',
      price:200,
      description:'test expense',
      category:'test category',
    }];

    render(<Provider store={store}><ExpenseList expenses={mockexpense}/></Provider>); 

    expect(screen.getByText('X')).toBeInTheDocument();
  })

})

