import React from 'react';
import { paramsMapping } from '../constants';
import interpolate from '../utils';

import './Tags.css';


const Tags = ({currentParams}) => (
  <div className="Tags">
    {
      Object.keys(currentParams).map(keyParam => (
        <span className="Tags__tag">
          {interpolate(paramsMapping[keyParam], { [keyParam] : currentParams[keyParam] })}
        </span>
      ))
    }
  </div>
)

export default Tags;
