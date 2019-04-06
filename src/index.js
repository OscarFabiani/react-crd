import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Tracker extends React.Component {
  render() {
    return (
      <div>
        <h1 className='margin-bottom'>Person Tracker</h1>
        <h2 className={'margin-bottom'}>Add New Person</h2>
        <AddForm />
        <h2 className={'margin-bottom'}>Persons:</h2>
        <Persons />
      </div>
    )
  }
}

class AddForm extends React.Component {
  render() {
    return (
      <form className='margin-bottom'>
        <fieldset>
          <legend>Name</legend>
          <input type='text'></input>
        </fieldset>
        <fieldset>
          <legend>Relationship</legend>
          <input type='text'></input>
        </fieldset>
        <input type='submit'></input>
      </form>
    )
  }
}

class Persons extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Relationship</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jess</td>
            <td>GF</td>
            <td><button>Delete</button></td>
          </tr>
          <tr>
            <td>Hampton</td>
            <td>Brother</td>
            <td><button>Delete</button></td>
          </tr>
        </tbody>
      </table>
    )
  }
}



ReactDOM.render(
  <Tracker />,
  document.getElementById('root')
);