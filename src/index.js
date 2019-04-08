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

/*
class AddForm extends React.Component {
  //This method is to avoid setting refs as inline methods as they are updated twice seemingly on each change.
  //Using this, it seems that this is only called once.
  setRef = (input) => {
    input.name === 'name' ? this.input1 = input : this.input2 = input;
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const name = this.input1;
    const relationship = this.input2;
    if (name.value && relationship.value) {
      this.props.handleSubmit(name.value, relationship.value);
      name.value = '';
      relationship.value = '';
    }
  }
  render() {
    return (
      <form className='margin-bottom' onSubmit={this.handleSubmit}>
        <fieldset name='test'>
          <legend>Name</legend>
          <input type='text' name='name' ref={this.setRef}></input>
        </fieldset>
        <fieldset>
          <legend>Relationship</legend>
          <input type='text' name='relationship' ref={this.setRef}></input>
        </fieldset>
        <input type='submit' value='Submit'></input>
      </form>
    )
  }
}
*/

const AddForm = (props) => {
  let input1 = React.createRef();
  let input2 = React.createRef();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const name = input1.current;
    const relationship = input2.current;
    if (name.value && relationship.value) {
      props.handleSubmit(name.value, relationship.value);
      name.value = '';
      relationship.value = '';
    }
  }
    return (
      <form className='margin-bottom' onSubmit={handleSubmit}>
        <fieldset name='test'>
          <legend>Name</legend>
          <input type='text' name='name' ref={input1}></input>
        </fieldset>
        <fieldset>
          <legend>Relationship</legend>
          <input type='text' name='relationship' ref={input2}></input>
        </fieldset>
        <input type='submit' value='Submit'></input>
      </form>
    )
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
//fields from the DOM. This seems to necessitate using a constructor to initialize the refs using
//React.createRef(). I could have (hypothetically) instead removed the fieldset and legend tags and accessed
//the inputs using event.target[0].value. This would have removed semantic html in favor of a more concise
//component (no constructor or state). Maybe there is a way to further refine this component. Maybe there is
//a way for event.target to access child elements...

//After some research I foudn two other methods for adding refs. One was uning an inline function to create the
//ref this eliminating the need to use React.createRef() (and thus eliminating the need for a constructor), and
//the other methods was to use a method to set the ref which avoided the inline ref function updating often. I
//then converted the AddForm component to a functional component and found that the setRef method wasn't working
//as it did when the component was a class component so I instead reverted to using React.createRef() instead
//of a setRef method.

//POSSIBLE ADDITIONS: STOP EACH PERSON COMPONNET FROM RERENDERING, ADD ERRORS FOR EMPTY FIELDS, DONT ALLOW
//DUPLICATE NAMES

