import React, { useState, useEffect } from 'react';

const OfferCard = ({ offer }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(offer.endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(offer.endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [offer.endDate]);

  function calculateTimeLeft(endDate) {
    const difference = new Date(endDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <img
        src={offer.image}
        alt={offer.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{offer.name}</h2>
        <div className="flex items-center mb-2">
          <div className="flex">{renderRatingStars(offer.rating)}</div>
          <span className="ml-2 text-sm text-gray-600">({offer.reviews} reviews)</span>
        </div>
        <div className="flex gap-2 mb-2">
          <span className="text-gray-500 line-through">${offer.originalPrice}</span>
          <span className="text-red-500 font-bold">
            ${offer.discountPrice} ({offer.discountPercentage}% off)
          </span>
        </div>
        <div className="bg-gray-100 p-2 rounded-lg">
          <p className="text-sm text-gray-600">Offer ends in:</p>
          <div className="flex gap-2">
            <span>{timeLeft.days} days</span>
            <span>{timeLeft.hours} hours</span>
            <span>{timeLeft.minutes} minutes</span>
            <span>{timeLeft.seconds} seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;