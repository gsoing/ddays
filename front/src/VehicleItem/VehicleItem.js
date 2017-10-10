import React from 'react';

import './VehicleItem.css';

const VehicleItem = ({vehicle}) => {

    const { 
        brand, 
        modelLabel,
        versionLabel,
        image,
        price,
        year,
        energy,
        mileage,
        pollution,
        vehicleType,
    } = vehicle;

    return (
        <div className="VehicleItem">
            <div className="VehicleItem__pictureBox">
                <img src={image[0].url} alt="default" className="VehicleItem__picture"/>
                <span className="VehicleItem__vehicleType">{vehicleType === 'VO' ? 'SECOND-HAND' :  'NEW'}</span>
            </div>      
            <div className="VehicleItem__content">
                <p className="VehicleItem__title">{brand} {modelLabel}</p>
                <p className="VehicleItem__subtitle">{versionLabel}</p>
                <ul className="VehicleItem__infos">
                    <li className="VehicleItem__info">{year}</li>
                    <li className="VehicleItem__info">{energy}</li>
                    <li className="VehicleItem__info">{mileage} km</li>
                </ul>
                <p className="VehicleItem__price">{Intl.NumberFormat("fr-FR").format(price)} €</p>
            </div>
            <button className="VehicleItem__chooseButton">SELECT</button>
        </div>
    )
}

export default VehicleItem;