
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  offers: [
    {
      id: 1,
      name: 'Product 1',
      image: 'https://via.placeholder.com/150',
      originalPrice: 100,
      discountPrice: 80,
      discountPercentage: 20,
      endDate: '2023-12-31T23:59:59', 
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'https://via.placeholder.com/150',
      originalPrice: 200,
      discountPrice: 150,
      discountPercentage: 25,
      endDate: '2023-11-15T23:59:59',
    },
    
  ],
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
});

export default offersSlice.reducer;



