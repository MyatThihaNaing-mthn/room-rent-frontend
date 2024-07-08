import { createContext, useContext } from "react";

export const UserContext = createContext();

export function useUserContext(){
    const {user, setUser} = useContext(UserContext)

    return {user, setUser}
}