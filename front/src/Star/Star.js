import React from 'react';
import StarRating from 'react-star-rating-component';

import './Star.css';

const Star = ({starKey}) => (
  <StarRating
    className="Star"
    name={`react-star-rating-${starKey}`}
    caption="Rate this component!"
    size={70}
    value={3}
    starColor="#ffce33"
    emptyStarColor="#ccc"
 />
)

export default Star;
