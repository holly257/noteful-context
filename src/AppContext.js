import React from 'react';

const AppContext = React.createContext({
    folders: [],
    notes: [],
    selected: {}
})

export default AppContext;