import { useState, useEffect } from 'react'
import './App.css'


const BACKEND_URL = 'https://didactic-trout-ggrwrjpqvpx2vrqw-8000.app.github.dev';

interface Expense {
  id: number;
  name: string;
  amount: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9b59b6', '#e74c3c'];

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseName, setExpenseName] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')

  
  useEffect(() => {
    fetch(`${BACKEND_URL}/expenses`)
    .then(response => response.json())
    .then(data => setExpenses(data))
    .catch(error => console.error('Błąd podczas pobierania danych:', error));
  }, [])
  
  
  const addExpense = () => {
    if (expenseName === '' || expenseAmount === '') return;

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: parseFloat(expenseAmount),
    };

    fetch(`${BACKEND_URL}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Poprawione application
      },
      body: JSON.stringify(newExpense)
    })
    .then(response => response.json())
    .then(savedExpense => {
      setExpenses([...expenses, savedExpense]);
      setExpenseName('');
      setExpenseAmount('');
    })
    .catch(error => console.error('Błąd zapisu', error));
  }

  
  const deleteExpense = (idToRemove: number) => {
    fetch(`${BACKEND_URL}/expenses/${idToRemove}`, {
      method: 'DELETE' // Poprawione DELETE
    })
    .then(() => {
      const updatedExpenses = expenses.filter(expense => expense.id !== idToRemove);
      setExpenses(updatedExpenses);
    })
    .catch(error => console.error('Błąd usuwania', error))
  }

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className='app-container'>
      <h1>Personal Expense Tracker 💰</h1>
      <h2>Total spend: {totalExpenses} PLN</h2>

      {expenses.length > 0 && (
        <div style={{ width: '100%', marginBottom: '30px' }}>
          <div style={{display: 'flex', height: '25px', 
            borderRadius: '12px', overflow: 'hidden', 
            backgroundColor: '#333'}}>
            {expenses.map((expense, index) => {
              const percentage = (expense.amount / totalExpenses) * 100;
              return (
                <div key={expense.id}
                  style={{width: `${percentage}%`, 
                  backgroundColor: COLORS[index % COLORS.length],
                  transition: 'width 0.5s ease-in-out' }} 
                  title={`${expense.name}: ${expense.amount} PLN`} />
              )
            })}
          </div>
          <p style={{ textAlign: 'center', fontSize: '12px', 
            color: '#888', marginTop: '10px' }}>
            Proportion of expenses (tap colors to see details)
          </p>
        </div>
      )}

      <div className='form-container'>
        <input
          type='text'
          placeholder='What did you buy?'
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)} />
        <input
          type='number'
          placeholder='Amount (PLN)'
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)} />
        <button onClick={addExpense}>Add Expense ➕</button>
      </div>

      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <span>{expense.name} - {expense.amount} PLN</span>
            <button onClick={() => deleteExpense(expense.id)}
              style={{ backgroundColor: '#e74c3c', padding: '5px 10px', fontSize: '12px' }}>
              ❌</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default App