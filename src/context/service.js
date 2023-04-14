import {createContext,useState} from "react";
const Service = createContext();
export const ServiceProvider = ({children}) => {
    const [books,setBooks] = useState([]);
    const values = {books,setBooks};
    return <Service.Provider value={values}>{children}</Service.Provider>;
};
export default Service;