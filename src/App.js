import React, { Component } from 'react';
import CategSelect from './CategSelect';
import ObjDump from './ObjDump';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: {}
    };
  }

  setValue (selected){
    this.setState({
      selected
    });
  }

  render() {
  let parents=[ { id: 1, name: "Cats"},
                { id: 2, name: "Characters Mix" },
                { id: 3, name: "Dogs"}
              ];
  let childs=[  { id: 1, name: "Felix", pid: 1, 
                  avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Felix_the_cat.svg/229px-Felix_the_cat.svg.png'},
                { id: 2, name: "Garfield", pid: 1,
                  avatar: 'https://upload.wikimedia.org/wikipedia/en/4/46/Garfieldand_friends.png'},
                { id: 3, name: "Sylvester", pid: 1 },
                { id: 4, name: "Bugs Bunny", pid: 2 },
                { id: 5, name: "Daffy Duck", pid: 2 },
                { id: 6, name: "Donald", pid: 2 },
                { id: 7, name: "Mickey Mouse", pid: 2 },
                { id: 8, name: "Popeye", pid: 2 },
                { id: 9, name: "Superman", pid: 2 },
                { id: 10, name: "Droopy", pid: 3,
                  avatar: 'https://upload.wikimedia.org/wikipedia/en/f/fd/Droopy_dog.png'},
                { id: 11, name: "Goofy", pid: 3 },
                { id: 12, name: "Scooby Doo", pid: 3 },
                { id: 13, name: "Snoopy", pid: 3 }
              ];
  let {selected} = this.state;
    return (
      <div className="mw9 center ph3-ns">
      <div className="fl w-100 w-third-ns pa2">
      <h2>Categorized Selector:</h2>
      <h4>Instructions:</h4>
      Click on text field to display options.<br/><br/>
      You can select an option by clicking it, <br/>
      or using your keyboard.<br/><br/>
      You can enter text to filter selections.<br/><br/>
      Add a <code>/</code> Slash caracter to separate categories.<br/>
      <p className="underline mb3">Examples:</p>
       <div className="ba pa2 mv3 w-30">do </div>
      Will filter categories beggining with 'Do'.<br/>
       <div className="ba pa2 mv3 w-30">c / s </div>
      Will filter categories beggining with 'C' and names beggining with 'S'.<br/>
       <div className="ba pa2 mv3 w-30">cats / g </div>
       Will show cats which names begin with 'G'.<br/>
       <div className="ba pa2 mv3 w-30">/ s </div>
       Will show all names beginning with 'S'.<br/>
      
      
      </div>
      <div className="fl w-100 w-third-ns pa2 tc">
          <CategSelect parents={parents} childs={childs} 
                           setValue={(val) => { this.setValue(val);} }/>
      </div>
      <div className="fl w-100 w-third-ns pa2">
          <ObjDump obj={selected} />
      </div>
      </div>
    );
  }
}

export default App;
