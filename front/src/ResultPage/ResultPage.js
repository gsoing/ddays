import React from 'react';
import VehicleItem from '../VehicleItem/VehicleItem';
import Tags from '../Tags/Tags';
import Loader from '../Loader/Loader';

import './ResultPage.css';

const ResultPage = ({ vehicles, currentParams, loading, total, isDealer = false, onSelect }) => {
  const classNames = loading ? "ResultPage__wrapper ResultPage__wrapper--loading" : "ResultPage__wrapper";
  const handleSelect = (vehicle) => {
    if(onSelect) {
      onSelect(vehicle);
    }
  }
  return (
    <div className="ResultPage">
      <Loader loading={loading} />
      <div className={classNames}>
        <div className="ResultPage__header">
          <div className="ResultPage__tags">
            {!isDealer && <Tags currentParams={currentParams} />}
            {isDealer && <span className="ResultPage__title">Your stock</span>}
          </div>
          <div className="ResultPage__total">
            {total} vehicles
          </div>
        </div>
        <div className="ResultPage__list">
          {
            vehicles.map(vehicle => (
              <div className="ResultPage__listItem" key={vehicle.vin}>
                <VehicleItem vehicle={vehicle} isDealer={isDealer} onSelect={handleSelect} />
              </div>
            ))
          }{
            vehicles && vehicles.length % 3 === 2 &&
            <div className="ResultPage__listItem" />
          }
        </div>
      </div>
    </div>
  )
};

export default ResultPage;
