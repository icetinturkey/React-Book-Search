import {useContext} from "react";
import Service from "../context/service";
import axios from 'axios';

function Footer({name}){
    const {books, setBooks} = useContext(Service);
    const getBooks = () => {
        const newStart = books.index + 10;
        const _replaced = name.replace(/ /g, "+");
        axios("https://www.googleapis.com/books/v1/volumes?q=intitle:"+_replaced+"&printType=books&startIndex="+newStart)
            .then((res)=>filterResult(res.data.items))
            .catch((e)=>console.log(e));
    }
    const filterResult = (items) => {
        if(typeof items === "undefined"){
            setBooks({...books,index:books.total});//NO DATA
        }else{
            const newStart = books.index + 10;
            const _merged = books.items.concat(items);
            const _filtered = [...new Map(_merged.map((m) => [m.id, m])).values()];
            setBooks({index:newStart, total:books.total, items:_filtered});
        }
    }
    return(
        <div className="flex mt-20 mb-8 w-full justify-center">
            <div className="font-bold mr-4 flex flex-col justify-center">
                {books.items &&
                <span>Total Results: {books.items.length}</span>}
            </div>
            <div>
                {(books.index+10) < books.total &&
                <button onClick={getBooks} className="block uppercase mx-auto shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded">Load More</button> }
            </div>
        </div>
    )
}
export default Footer;