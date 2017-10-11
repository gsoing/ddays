import React from 'react';

import './VehicleItem.css';

const VehicleItem = ({vehicle, isDealer}) => {

    const {
        brand,
        modelLabel,
        versionLabel,
        images,
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
                <img src={images} alt="default" className="VehicleItem__picture"/>
                <span className="VehicleItem__vehicleType">{isDealer ? 'SECOND-HAND' :  'NEW'}</span>
            </div>
            <div className="VehicleItem__content">
                <p className="VehicleItem__title">{brand} {modelLabel}</p>
                <p className="VehicleItem__subtitle">{versionLabel}</p>
                <ul className="VehicleItem__infos">
                    {year && <li className="VehicleItem__info">{year}</li>}
                    <li className="VehicleItem__info">{energy}</li>
                    {mileage && <li className="VehicleItem__info">{mileage} km</li>}
                </ul>
                <p className="VehicleItem__price">{Intl.NumberFormat("fr-FR").format(price)} €</p>
            </div>
            <div className="VehicleItem__choose">
              <button className="VehicleItem__chooseButton">Select</button>
            </div>
        </div>
    )
}

export default VehicleItem;
