import React from 'react';
import VehicleItem from '../VehicleItem/VehicleItem';

import './ResultPage.css';

const ResultPage = ({ vehicles, currentParams, loading }) => {

  return (
    <div className="ResultPage">
      <div className="ResultPage__criterias">
        {
          Object.keys(currentParams).map(keyParam => (
            <span className="ResultPage__tag">
              {currentParams[keyParam]}
            </span>
          ))
        }
      </div>
      { !loading &&
        <div className="ResultPage__list">
        {
          vehicles.map(vehicle => (
            <div className="ResultPage__listItem">
              <VehicleItem vehicle={vehicle} />
            </div>
          ))
        }{
          vehicles && vehicles.length % 3 === 2 &&
          <div className="ResultPage__listItem" />
        }
        </div>
      }
    </div>
  )
};

export default ResultPage;
