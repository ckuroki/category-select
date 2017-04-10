import React, { Component, PropTypes } from 'react';
import camera from './camera.svg';
import './CategSelect.css';

export default class TwoLevelsSelect extends Component {

  static propTypes = {
    parents: PropTypes.array.isRequired,
    childs: PropTypes.array.isRequired,
    setValue: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    let parentMap= new Map (this.props.parents.map((item) => [item.id,item.name]));
    let items= this.getItems(parentMap,props.childs);

    this.state = {
      keySelPos: -1,
      filter: '',
      filtered: items,
      parentMap,
      items,
      displayed: false,
      inputVal: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.clients !== nextProps.clients) {
      let parentMap= new Map (nextProps.clients.map((item) => [item.id,item.name]));
      this.setState({
        keySelPos: -1,
        filter: '',
        parentMap
      });
    }
    if (this.props.childs !== nextProps.childs) {
      let items= this.getItems(this.state.parentMap,nextProps.childs);
      this.setState({
        keySelPos: -1,
        filter: '',
        filtered: items,
        items
      });
    }
  }

  getItems(parentMap,childs) {
    let items=[];
    let lastPid=0;

    for (let i of childs) {
    let parentName =parentMap.get(i.pid);
      if (i.pid === lastPid) {
        items=[...items,{...i, parentName}]; // Add child element
      } else {
        items=[...items,
                {...i,avatar: null, name: parentName, parentName}
              ]; // Add parent element
        items=[...items,{...i, parentName}]; // Add child element
        lastPid=i.pid;
      }
    }
    return items;
  }

  mouseOver(index) {
    let {items} = this.state;
        if(items[index].name!==items[index].parentName) {
          this.setState({
            keySelPos: index
          });
        }
  }

  keyDown(ev) {
    let {keySelPos,filtered,items} = this.state;
    // Key Enter
    if (ev.which===13){
    ev.preventDefault();
      if (keySelPos >= 0){
        let val=  filtered[keySelPos].parentName+ " / "
                  + filtered[keySelPos].name;
        this.setState({
          inputVal: val
        });
        this.props.setValue(filtered[keySelPos]);
        this.setDisplay(false);
      }
    }
    // Key Down
    if (ev.which===40){
    let off=1;
    ev.preventDefault();
      if (keySelPos+1 < filtered.length && filtered[keySelPos+1].name===filtered[keySelPos+1].parentName) {
        off+=1;
      }
      if (keySelPos+off < filtered.length){
        this.setState({
          keySelPos: this.state.keySelPos+off
        });
      }
    }
    // Key Up
    if (ev.which===38){
    let off=1;
    ev.preventDefault();
      if (keySelPos > 1){
        if (items[keySelPos-1].parentName === 
            items[keySelPos-1].name ) {
          off+=1;
        }
        this.setState({
          keySelPos: this.state.keySelPos-off
        });
      }
    }
  }

  setDisplay(displayed) {
    this.setState({
      displayed
    });
  };

  async changeVal(ev) {
    let val = ev.target.value;
    let {items} = this.state;

    await this.setState({
      filter: val,
      keySelPos: -1,
      displayed: true,
      inputVal: val
    });

    let filtered =  items.filter( (item) => { return this.filter(item); });
    filtered = this.removeEmpty(filtered);
    this.setState({ filtered });
  }

  filter(item) {
    let {filter} = this.state;
    let sp = filter.split('/',2);

      if (filter.length>0) {
        if (sp.length>1) {
          let re1 = new RegExp(`^${sp[0].trim()}.*$`,"i");
          let re2 = new RegExp(`^${sp[1].trim()}.*$`,"i");
          return (((item.parentName.match(re1)!== null)&&
                  (item.name.match(re2)!== null)) || 
                  ((item.parentName.match(re1)!== null)&&
                  (item.parentName === item.name)) );
        } else {
          let re = new RegExp(`^${filter.trim()}.*$`,"i");
          return (item.parentName.match(re)!== null);
        }
      } else {
        return true;
      }
  }

  removeEmpty(items) {
    let lastIsParent= false;
    let clean=items;

    if (items.length > 0) {
      for (let [ix,f] of items.entries()) {
        if (lastIsParent && (f.name===f.parentName)) {
          clean=[...clean.slice(0,ix-1),...clean.slice(ix)];
        }
        lastIsParent=(f.name===f.parentName);
      }
      // Remove last category if its empty
      if (clean[clean.length -1].name ===
          clean[clean.length -1].parentName ) {
        clean = [...clean.slice(0,clean.length -1)];
      }
    }
    return clean;
  }

  clicked(ev) {
    let {keySelPos,filtered} = this.state;
      if (keySelPos >= 0){
        let val=  filtered[keySelPos].parentName+ " / "
                  + filtered[keySelPos].name;
        this.setState({
          inputVal: val
        });
        this.props.setValue(filtered[keySelPos]);
      }
    this.setDisplay(false);
  }
  
  render() {
    let values=[];
    let {filtered,keySelPos,displayed,inputVal} = this.state;

    values = filtered.map( (item,index) => {
      let isParent = (item.name === item.parentName);
      return(<li key={`prj_${index}`} onMouseOver={() => {this.mouseOver(index);}} onClick={(ev) => {this.clicked(ev);}} className={"pl1 pr2 pv2 "+((index===keySelPos)?'bg-light-gray':'bg-white')+" "+(isParent?'b tl dark-green':'tr')}>
        {item.name}
        {item.avatar?<img className='icon ml2' src={camera}/>:<span/>}
        </li>);
    });

    return (
      <div className="fl pa2 z-2 bg-white z-2"> 
      <input className="w5 pl1 pr2 pv2 roboto" type="text"  value={inputVal} onChange={(e) => { this.changeVal(e);}} onClick={() => {this.setDisplay(true);}} onKeyDown={(e) => {this.keyDown(e);}} />
    
          <ul className={'list pl1 pr2 mt0 ba w5 h5 h-auto-ns bg-white absolute overflow-y-scroll overflow-y-auto-ns '+(displayed?'':'clip')}>
          {values}
          </ul>
      </div>
    );
  }
}
