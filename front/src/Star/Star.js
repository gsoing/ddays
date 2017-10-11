import React from 'react';
import StarRating from 'react-star-rating-component';

import './Star.css';

const Star = ({starKey, value}) => (
  <StarRating
    className="Star"
    name={`react-star-rating-${starKey}`}
    caption="Rate this component!"
    size={70}
    value={value || 3}
    starColor="#ffce33"
    emptyStarColor="#ccc"
 />
)

export default Star;
