import React, {createContext, useState} from 'react';

export const UserContext = createContext();

const UserProvider = ({children}) => {
  const [me, setMe] = useState(undefined);
  return (
    <UserContext.Provider value={{me, setMe}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
