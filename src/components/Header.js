import background from "../resources/bgheader.jpg"
import {useContext, useState} from "react";
import axios from 'axios';
import Service from "../context/service";

function Header({setName}){
    const {setBooks} = useContext(Service);
    const [input,setInput] = useState("");
    const formSubmitted = (e) => {
        e.preventDefault();
        setName(input);
        const _replaced = input.replace(/ /g, "+");
        axios("https://www.googleapis.com/books/v1/volumes?q=intitle:"+_replaced+"&printType=books&startIndex=0")
            .then((res)=>filterResult(res.data))
            .catch((e)=>console.log(e));
    };
    const filterResult = (data) => {
        const _filtered = [...new Map(data.items.map((m) => [m.id, m])).values()];
        setBooks({index:0, total:data.totalItems, items:_filtered});
    }
    return(
        <div style={{backgroundImage: `url(${background})`}} className="text-white py-12 px-8 bg-cover">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-center text-3xl mb-4">Book Search</h1>
            <form onSubmit={formSubmitted}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Books..." value={input} onChange={(e)=>setInput(e.target.value)} autoFocus required />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            </div>
        </div>
    )
}
export default Header;