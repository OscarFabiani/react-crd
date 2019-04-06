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
    this.setState (prevState => {
      return {people: prevState.people.filter((_, i) => i !== index)}
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
  constructor(props) {
    super(props);
    this.input1 = React.createRef();
    this.input2 = React.createRef();
  }
  handleChange = (event) => {
    this.setState ({
      [event.target.name]: event.target.value,
    })
  }
  handleSubmit = (event) => {
    const name = this.input1.current;
    const relationship = this.input2.current;
    if(name.value && relationship.value) {
      this.props.handleSubmit(name.value, relationship.value);
      name.value = '';
      relationship.value = '';
    }
    event.preventDefault();
  }
  render() {
    return (
      <form className='margin-bottom' onSubmit={this.handleSubmit}>
        <fieldset name='test'>
          <legend>Name</legend>
          <input type='text' name='name' ref={this.input1} onChange={this.handleChange}></input>
        </fieldset>
        <fieldset>
          <legend>Relationship</legend>
          <input type='text' name='relationship' ref={this.input2} onChange={this.handleChange}></input>
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
        handleDelete={() => this.props.handleDelete(i)}/>
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
    console.log(this.props.name + ' just rendered')
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.relationship}</td>
        <td><button onClick={this.props.handleDelete}>Delete</button></td>
      </tr>
    )
  }
}



ReactDOM.render(
  <Tracker />,
  document.getElementById('root')
);

//CONTINUE COMPARING AND REFINING: I most recently converted the AddForm compopnent from a controlled
//component using state to an uncontrolled component using refs to access the value of the input
//fields from the DOM. This seems to necessitate using a constructor to initialize the refs. I could have
//(hypothetically) instead removed the fieldset and legend tags and accessed the inputs using
//event.target[0].value. This would have removed semantic html in favor of a more concise component (no
//constructor or state). Maybe there is a way to further refine this component. Maybe there is a way for
//event.target to access child elements...

//POSSIBLE ADDITIONS: STOP EACH PERSON COMPONNET FROM RERENDERING, ADD ERRORS FOR EMPTY FIELDS, DONT ALLOW
//DUPLICATE NAMES