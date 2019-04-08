import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Tracker extends React.Component {
  state = {
    nameVal: '',
    relationshipVal: '',
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
  updateInput = (event) => {
    if (event.target.name === 'name') {
      this.setState ({
        nameVal: event.target.value
      })
    } else {
      this.setState ({
        relationshipVal: event.target.value
      })
    }
  }
  handleDelete = (index) => {
    this.setState (prevState => {
      return {people: prevState.people.filter((_, i) => i !== index)}
    })
  }
  handleSubmit = (name, relationship) => {
    this.setState ({
      nameVal: '',
      relationshipVal: '',
      people : [...this.state.people, {name: name, relationship: relationship}]
    })
  }
  render() {
    return (
      <div>
        <h1 className='margin-bottom'>Person Tracker</h1>
        <AddForm
          handleSubmit={this.handleSubmit}
          nameVal={this.state.nameVal}
          relationshipVal={this.state.relationshipVal}
          updateInput={this.updateInput}/>
        <h2 className={'margin-bottom'}>Persons:</h2>
        <Persons people={this.state.people} handleDelete={this.handleDelete}/>
      </div>
    )
  }
}

const AddForm = props => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.nameVal && props.relationshipVal) {
      props.handleSubmit(props.nameVal, props.relationshipVal);
    }
  }
  return (
    <form className='margin-bottom' onSubmit={handleSubmit}>
      <fieldset>
        <legend><h2 className={'margin-bottom'}>Add New Person</h2></legend>
        <legend>Name</legend>
        <input type='text' name='name' value={props.nameVal} onChange={props.updateInput}></input>
        <legend>Relationship</legend>
        <input className={'margin-bottom'} type='text' name='relationship' value={props.relationshipVal} onChange={props.updateInput}></input>
        <input className='display-block' type='submit' value='Submit'></input>
      </fieldset>
    </form>
  )
}

const Persons = props => {
  const people = props.people;
  const peopleRenders = people.map((peep, i) => {
    return (
    <Person
      key={peep.name + i}
      index={i}
      name={peep.name}
      relationship={peep.relationship}
      handleDelete={props.handleDelete}/>
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

class Person extends React.PureComponent {
  handleClick = () => {
    this.props.handleDelete(this.props.index);
  }
  render () {
    console.log(this.props.name + ' just rendered')
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

//CONTINUE COMPARING AND REFINING: I most recently converted the AddForm compopnent from a controlled
//component using state to an uncontrolled component using refs to access the value of the input
//fields from the DOM. This seems to necessitate using a constructor to initialize the refs using
//React.createRef(). I could have (hypothetically) instead removed the fieldset and legend tags and accessed
//the inputs using event.target[0].value. This would have removed semantic html in favor of a more concise
//component (no constructor or state). Maybe there is a way to further refine this component. Maybe there is
//a way for event.target to access child elements...

//After some research I found two other methods for adding refs. One was using an inline function to create the
//ref thus eliminating the need to use React.createRef() (and thus eliminating the need for a constructor), and
//the other method was to use a method to set the ref which avoided the inline ref function updating often. I
//then converted the AddForm component to a functional component and found that the setRef method wasn't working
//as it did when the component was a class component so I instead reverted to using React.createRef() instead
//of a setRef method. Maybe a class component would be best in this case. If so, why?

//POSSIBLE ADDITIONS: STOP EACH PERSON COMPONNET FROM RERENDERING, ADD ERRORS FOR EMPTY FIELDS, DONT ALLOW
//DUPLICATE NAMES

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

/*
const AddForm = props => {
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
      <fieldset>
        <legend><h2 className={'margin-bottom'}>Add New Person</h2></legend>
        <legend>Name</legend>
        <input type='text' name='name' ref={input1}></input>
        <legend>Relationship</legend>
        <input className={'margin-bottom'} type='text' name='relationship' ref={input2}></input>
        <input className='display-block' type='submit' value='Submit'></input>
      </fieldset>
    </form>
  )
}

const AddForm = props => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target[0].children[2];
    const relationship = event.target[0].children[4];
    if (name.value && relationship.value) {
      props.handleSubmit(name.value, relationship.value);
      name.value = '';
      relationship.value = '';
    }
  }
  return (
    <form className='margin-bottom' onSubmit={handleSubmit}>
      <fieldset>
        <legend><h2 className={'margin-bottom'}>Add New Person</h2></legend>
        <legend>Name</legend>
        <input type='text' name='name'></input>
        <legend>Relationship</legend>
        <input className={'margin-bottom'} type='text' name='relationship'></input>
        <input className='display-block' type='submit' value='Submit'></input>
      </fieldset>
    </form>
  )
}
*/
