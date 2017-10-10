import React from 'react';
import VehicleItem from '../VehicleItem/VehicleItem';

 import './ResultPage.css';

const ResultPage = ({ title }) => {
  const vehicles = [{
      brand: 'Renault', 
      modelLabel: 'Clio',
      versionLabel: 'version',
      image: [{
        type: '',
        url: 'http://lorempixel.com/1024/768/',
      }],
      price: '24790.0',
      year: '2015',
      energy: 'diesel',
      mileage: '1000',
      pollution: '',
      vehicleType:'VO',
    },
    {
      brand: 'Renault', 
      modelLabel: 'Clio',
      versionLabel: 'version',
      image: [{
        type: '',
        url: 'http://lorempixel.com/1024/768/',
      }],
      price: '24790.0',
      year: '2015',
      energy: 'diesel',
      mileage: '1000',
      pollution: '',
      vehicleType:'VN',
    },
    {
      brand: 'Renault', 
      modelLabel: 'Clio',
      versionLabel: 'version',
      image: [{
        type: '',
        url: 'http://lorempixel.com/1024/768/',
      }],
      price: '24790.0',
      year: '2015',
      energy: 'diesel',
      mileage: '1000',
      pollution: '',
      vehicleType:'VO',
    },
    {
      brand: 'Renault', 
      modelLabel: 'Clio',
      versionLabel: 'version',
      image: [{
        type: '',
        url: 'http://lorempixel.com/1024/768/',
      }],
      price: '24790.0',
      year: '2015',
      energy: 'diesel',
      mileage: '1000',
      pollution: '',
      vehicleType:'VN',
    },
    {
      brand: 'Renault', 
      modelLabel: 'Clio',
      versionLabel: 'version',
      image: [{
        type: '',
        url: 'http://lorempixel.com/1024/768/',
      }],
      price: '24790.0',
      year: '2015',
      energy: 'diesel',
      mileage: '1000',
      pollution: '',
      vehicleType:'VO',
    }
  ];

  return (
    <div className="ResultPage">
      <div className="ResultPage__list">
      {
        vehicles.map(vehicle => (
          <div className="ResultPage__listItem">
            <VehicleItem vehicle={vehicle} />
          </div>
        ))
      }{
        vehicles && vehicles.length % 3 === 2 &&
        <div className="ResultPage__listItem"></div>
      }
      </div>
    </div>
  )
};

export default ResultPage;
