import React from 'react';

import './VehicleItem.css';

const VehicleItem = ({vehicle}) => {

    const { 
        brand, //marque
        model, //model
        version, //version
        finish //finition
        picture, //img vehicule
        year, // année
        fuel, //carburant
        mileage, //mileage
    } : vehicle;

    return (
        <div className="VehicleItem">
            <img src={picture} alt="default" className="VehicleItem__picture"/>
            <p className="VehicleItem__title">{brand} {model}</p>
            <p className="VehicleItem__subtitle">{version} {finish}</p>
            <ul className="VehicleItem__infos">
                <li className="VehicleItem__info">{year}</li>
                <li className="VehicleItem__info">{fuel}</li>
                <li className="VehicleItem__info">{mileage}</li>
            </ul>
            <button className="VehicleItem__chooseButton">Choose</button>
        </div>
    )
}