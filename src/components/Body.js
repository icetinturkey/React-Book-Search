import {useContext, useState} from "react";
import Service from "../context/service";
import searchicon from "../resources/magnifying-glass.svg"
import pencilicon from "../resources/pencil.svg"
import Modal from 'react-modal';
import axios from "axios";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '80%',
        maxHeight: '90%',
        overflowY: 'auto',
    },
};

function Body(){
    const {books} = useContext(Service);
    const [modalopen, setModalopen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState({});
    const openDetails = (e) => {
        setLoading(true);
        setModalopen(true);
        axios("https://www.googleapis.com/books/v1/volumes/"+e.target.attributes.tag.value)
            .then((res)=>setCurrent(res.data))
            .catch((e)=>console.log(e))
            .finally(()=> {

                setLoading(false);
            });
    }
    if (typeof books.items == "object") {
        return (
            <div className="grid px-12 max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {
                    books.items.map((item,index)=>(
                        <article key={index} className="flex max-w-xl flex-col items-start justify-between border rounded p-8">
                            <div className="flex items-center gap-x-4 text-xs flex justify-between w-full mb-4">
                                {item.volumeInfo.publishedDate &&
                                    <div className="text-gray-500">{item.volumeInfo.publishedDate}</div>
                                }
                                {item.accessInfo.pdf.acsTokenLink &&
                                    <a href={item.accessInfo.pdf.acsTokenLink} target="_blank" rel="noreferrer" className="relative rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">PDF</a>
                                }
                            </div>
                            <div className="flex justify-center w-full">
                                {item.volumeInfo.imageLinks
                                    ? <img src={item.volumeInfo.imageLinks.thumbnail} className="border border-blue-400 h-[181px] w-[128px]" alt="book"/>
                                    : <img src="https://download.vadi.info/fmss-nopreview.png" alt="no-preview" />
                                }
                                </div>
                            <div className="group relative w-full">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 w-full">
                                    <button onClick={openDetails} className="w-full text-center" tag={item.id}>
                                        {item.volumeInfo.title}
                                    </button>
                                </h3>

                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                                    {item.volumeInfo.description && item.volumeInfo.description.substr(0, 200)}
                                </p>

                            </div>
                            <div className="relative mt-8 flex items-center gap-x-4">
                                <img src={pencilicon} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                                <div className="text-sm leading-6">
                                    <p className="font-semibold text-gray-900"><span className="absolute inset-0"></span>{item.volumeInfo.authors ? item.volumeInfo.authors : "No author !"}</p>
                                    <p className="text-gray-600">{item.volumeInfo.publisher}</p>
                                </div>
                            </div>
                        </article>
                    ))
                }
                <Modal isOpen={modalopen} style={customStyles}>
                    <div className="min-w-[300px]">
                        <div className="flex justify-between mb-4">
                            <div className="flex flex-col justify-center font-bold"><span>Book Details</span></div>
                            <div className="flex flex-col justify-center"><button onClick={()=>{setModalopen(false)}} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">close</button></div>
                        </div>
                        {loading
                            ? <div><p className="p-20">Loading ....</p></div>
                            : <div>
                                <hr/>
                                <div className="flex justify-center my-4">
                                {current.volumeInfo.imageLinks ? <img src={current.volumeInfo.imageLinks.thumbnail} alt="thumbnail" /> : <img src="https://download.vadi.info/fmss-nopreview.png" alt="thumbnail" />}
                                </div>
                                <div>
                                    <div className="text-lg text-center">{current.volumeInfo.title}</div>
                                </div>
                                <div>
                                    <div className="content" dangerouslySetInnerHTML={{__html: current.volumeInfo.description}}></div>
                                </div>
                                <div className="flex justify-between mt-4 italic">
                                    <div>{current.volumeInfo.publishedDate}</div>
                                    <div>{current.volumeInfo.categories && current.volumeInfo.categories[0]}</div>
                                    <div>{current.volumeInfo.pageCount} Pages</div>
                                </div>
                            </div>
                        }
                    </div>
                </Modal>
            </div>
        );
    }else{
        return <div className="flex justify-center pt-10"><img className="h-20 w-20" src={searchicon} alt="loading" /></div>;
    }
}
export default Body;