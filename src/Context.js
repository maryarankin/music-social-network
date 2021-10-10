/* useContext to reduce prop drilling for passing accessToken down to child components */

import React, { useContext } from 'react';

export const Context = React.createContext();