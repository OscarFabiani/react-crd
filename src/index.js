import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Tracker extends React.Component {
  state = {
    people: [
      {
        name: 'Jess',
        relationship: 'GF',
      },
      {
        name: 'Hampton',
        relationship: 'Brother',
      },
    ]
  }
  handleDelete = (index) => {
    const people = this.state.people.filter((p, i) => i !== index)
    this.setState ({
      people: people
    })
  }
  handleSubmit = (name, relationship) => {
    this.setState ({
      people : [...this.state.people, {name: name, relationship: relationship}]
    })
  }
  render() {
    return (
      <div>
        <h1 className='margin-bottom'>Person Tracker</h1>
        <h2 className={'margin-bottom'}>Add New Person</h2>
        <AddForm handleSubmit={this.handleSubmit}/>
        <h2 className={'margin-bottom'}>Persons:</h2>
        <Persons people={this.state.people} handleDelete={this.handleDelete}/>
      </div>
    )
  }
}

class AddForm extends React.Component {
  state = {
    name: '',
    relationship: '',
  }
  handleNameChange = (event) => {
    this.setState ({
      name: event.target.value
    })
  }
  handleRelationshipChange = (event) => {
    this.setState ({
      relationship: event.target.value
    })
  }
  handleSubmit = (event) => {
    if (this.state.name && this.state.relationship) {
      this.props.handleSubmit(this.state.name, this.state.relationship);
      this.setState ({
        name: '',
        relationship: '',
      })
    }
    event.preventDefault();
  }
  render() {
    return (
      <form className='margin-bottom' onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Name</legend>
          <input type='text' name='name' value={this.state.name} onChange={this.handleNameChange}></input>
        </fieldset>
        <fieldset>
          <legend>Relationship</legend>
          <input type='text' name='relationship' value={this.state.relationship} onChange={this.handleRelationshipChange}></input>
        </fieldset>
        <input type='submit' value='Submit'></input>
      </form>
    )
  }
}

class Persons extends React.Component {
  render() {
    const people = this.props.people;
    const peopleRenders = people.map((peep, i) => {
      return (
      <Person
        key={peep.name + i}
        index={i}
        name={peep.name}
        relationship={peep.relationship}
        handleDelete={this.props.handleDelete}/>
      )
    })
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
          {peopleRenders}
        </tbody>
      </table>
    )
  }
}

class Person extends React.Component {
  handleClick = () => {
    this.props.handleDelete(this.props.index);
  }
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.relationship}</td>
        <td><button onClick={this.handleClick}>Delete</button></td>
      </tr>
    )
  }
}



ReactDOM.render(
  <Tracker />,
  document.getElementById('root')
);


//POSSIBLE ADDITIONS: ADD ERRORS FOR EMPTY FIELDS, DONT ALLOW DUPLICATE NAMES