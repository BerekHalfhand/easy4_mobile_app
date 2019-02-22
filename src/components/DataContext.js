import React, { createContext } from 'react';

const DataContext = createContext({config: {}, products: []});

export default DataContext;