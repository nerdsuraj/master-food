import { createContext } from "react";



const UserContext = createContext({
    logggedInUser:"default user"
});


export default UserContext