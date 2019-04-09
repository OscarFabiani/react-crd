import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Tracker extends React.Component {
  state = {
    name: '',
    relationship: '',
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
    this.setState ({
      [event.target.name]: event.target.value
    })
  }
  handleDelete = (index) => {
    this.setState (prevState => {
      return {people: prevState.people.filter((_, i) => i !== index)}
    })
  }
  handleSubmit = (name, relationship) => {
    const {people} = this.state;
    this.setState ({
      name: '',
      relationship: '',
      people : [...people, {name: name, relationship: relationship}]
    })
  }
  render() {
    const {name, relationship, people} = this.state;
    return (
      <div>
        <h1 className='margin-bottom'>Person Tracker</h1>
        <AddForm
          handleSubmit={this.handleSubmit}
          nameVal={name}
          relationshipVal={relationship}
          updateInput={this.updateInput}/>
        <h2 className={'margin-bottom'}>Persons:</h2>
        <People people={people} handleDelete={this.handleDelete}/>
      </div>
    )
  }
}

class AddForm extends React.PureComponent {
  handleSubmit = (event) => {
    event.preventDefault();
    const {nameVal, relationshipVal, handleSubmit} = this.props;
    if (nameVal && relationshipVal) {
      handleSubmit(nameVal, relationshipVal);
    }
  }
  render() {
    const {nameVal, relationshipVal, updateInput} = this.props;
    return (
      <form className='margin-bottom' onSubmit={this.handleSubmit}>
        <fieldset>
          <legend><h2 className={'margin-bottom'}>Add New Person</h2></legend>
          <legend>Name</legend>
          <input type='text' name='name' value={nameVal} onChange={updateInput}></input>
          <legend>Relationship</legend>
          <input className={'margin-bottom'} type='text' name='relationship' value={relationshipVal} onChange={updateInput}></input>
          <input className='display-block' type='submit' value='Submit'></input>
        </fieldset>
      </form>
    )
  }
}

class People extends React.PureComponent {
  render() {
    const {people, handleDelete} = this.props;
    const peopleRenders = people.map((p, i) => {
      return (
      <Person
        key={p.name + i}
        index={i}
        name={p.name}
        relationship={p.relationship}
        handleDelete={handleDelete}/>
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

class Person extends React.PureComponent {
  handleClick = () => {
    const {handleDelete, index} = this.props;
    handleDelete(index);
  }
  render () {
    const {name, relationship} = this.props;
    return (
      <tr>
        <td>{name}</td>
        <td>{relationship}</td>
        <td><button onClick={this.handleClick}>Delete</button></td>
      </tr>
    )
  }
}


ReactDOM.render(
  <Tracker />,
  document.getElementById('root')
);

//COMPARE WITH TUTORIAL AND WRAP UP

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

//After more research, I found that I could use the event object to access input elements using vanilla DOM
//API methods (event.target[0].children[2]) and eliminate the need for using refs. Then I found that while this
//method would work for my limited functionality it would be restrictive. Furthermore it would not be the 'React
//way' in that it would be manipulating the DOM directly instead of through React. I then reverted the AddForm
//componnet to a controlled component by adding state to the Tracker component as opposed to re-adding state to
//the AddForm component. While this involved passing more props it also allows for more functionality and doesn't
//directly manipulate the DOM. Lastly I converted the functional components to PureComponents which prevented
//seeminigly unnecessary renders.

//POSSIBLE ADDITIONS: ADD ERRORS FOR EMPTY FIELDS, DONT ALLOW DUPLICATE NAMES


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
