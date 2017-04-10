import React, { PropTypes } from 'react';

const ObjDump = (props) => {
  let {obj} = props;
  let objProps = Object.entries(obj).map( (o) => ((o[0]!=="avatar")?(<li key={`objProp_${o[0]}`} className="lh-copy pv1 code"> <span className="blue">{o[0]}:</span> {o[1]} </li>):(<li key={`avatar_${o[0]}`}><img alt={o[0]} src={o[1]}/></li>))); 
  return (
    <div className={objProps.length?'ba br3 w-100 ':''}>
      <ul className="list f6 p2 measure center">
        {objProps.length?<p> Your selection </p>:<div/>}
        {objProps}
      </ul>
    </div>
  );
};

ObjDump.propTypes = {
    obj: PropTypes.object.isRequired
};

export default ObjDump;
