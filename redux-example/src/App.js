import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import './App.css';

function App() {
  // ACTION ACTION ACTION
  const createPolicy = (name, amount) => {
    return {
      type: 'CREATE_POLICY',
      payload: {
        name: name,
        amount: amount,
      },
    };
  };

  const createUpozorenje = (name) => {
    return {
      type: 'CREATE_STOP',
      payload: {
        name: name,
        obavijest: `${name} STOP`,
      },
    };
  };

  const deletePolicy = (name) => {
    return {
      type: 'DELETE_POLICY',
      payload: {
        name: name,
      },
    };
  };

  const createClaim = (name, amountOfMoneyToCollect) => {
    return {
      type: 'CREATE_CLAIM',
      payload: {
        name: name,
        amountOfMoneyToCollect: amountOfMoneyToCollect,
        dodatak: 'evo slona',
      },
    };
  };

  // REDUCERS REDUCERS
  const claimsHistoryReducer = (oldListOfClaims = [], action) => {
    if (action.type === 'CREATE_CLAIM') {
      return [...oldListOfClaims, action.payload];
    }
    return oldListOfClaims;
  };
  const policyHistoryReducer = (oldListOfPolicy = [], action) => {
    if (action.type === 'CREATE_POLICY') {
      return [...oldListOfPolicy, action.payload];
    }
    return oldListOfPolicy;
  };

  const accountingReducer = (bagOfMoney = 100, action) => {
    if (action.type === 'CREATE_CLAIM') {
      return bagOfMoney - action.payload.amountOfMoneyToCollect;
    } else if (action.type === 'CREATE_POLICY') {
      return bagOfMoney + action.payload.amount;
    }
    return bagOfMoney;
  };

  const policiesReducer = (listOfPolicies = [], action) => {
    if (action.type === 'CREATE_POLICY') {
      return [...listOfPolicies, action.payload.name];
    } else if (action.type === 'DELETE_POLICY') {
      return listOfPolicies.filter((name) => name !== action.payload.name);
    } else if (action.type === 'CREATE_STOP') {
      return [
        ...listOfPolicies.filter((name) => name !== action.payload.name),
        action.payload.obavijest,
      ];
    }
    return listOfPolicies;
  };

  const ourDepartments = combineReducers({
    claimsHistory: claimsHistoryReducer,
    accounting: accountingReducer,
    policies: policiesReducer,
    policyHistory: policyHistoryReducer,
  });

  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;


  const store = createStore(
    ourDepartments,
    composeEnhancers(applyMiddleware()),
  );

  store.dispatch(createPolicy('Alex', 20));
  store.dispatch(createPolicy('Alex', 20));
  store.dispatch(createPolicy('Tin', 20));
  store.dispatch(createPolicy('Jim', 30));
  store.dispatch(createPolicy('Bob', 40));
  store.dispatch(createPolicy('Alen', 100));
  store.dispatch(createPolicy('Alen', 100));
  store.dispatch(createPolicy('Mato', 100));
  store.dispatch(createUpozorenje('Mato'));

  store.dispatch(createClaim('Alex', 120));
  store.dispatch(createClaim('Jim', 50));
  store.dispatch(createClaim('Alen', 20));

  store.dispatch(deletePolicy('Alen'));

  console.log(store.getState());

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
