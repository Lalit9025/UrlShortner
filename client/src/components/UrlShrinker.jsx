import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast'
import axios from 'axios';

const UrlShrinker = () => {
    const [fullurl, setFullurl] = useState("");
    const [note,setNote] = useState("");
    const [allurls, setAllurls] = useState([]);
    const [short,setShort] = useState("");
    const [searchText,setSearchText] = useState("");
    const [searchResult,setSearchResult]= useState([])
    //get all urls
    const getAll = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/urls/all-urls`);
            console.log(data)
            setAllurls(data?.allURLs);
            console.log(allurls)
            
        } catch (error) {
            console.log(error);
            toast.error('error while getting all urls')
        }
    }
    useEffect(()=>{
        getAll();
    })

    //on submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/urls/get-url`, {fullurl,note});
            await getAll();
            setShort(data?.newURL?.shortID)

            if(data?.success){
                toast.success("short id generated successfully");
            }else{
                toast.error("something went wrong")
            }   
        } catch (error) {
            console.log(error);
            toast.error('something went wrong')
        }

    }
    //on search
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/urls/search/${searchText}`);
            if(data?.success){
            setSearchResult(data?.results);
            console.log(searchResult);
            }else{
                console.log('data not found')
            }
        } catch (error) {
            console.log('error while searching')
            toast.error('Error in searching')
            
        }
    }
    const copyShortIdToClipboard = () => {
        navigator.clipboard.writeText(short)
            .then(() => {
                toast.success("Short ID copied to clipboard");
            })
            .catch((error) => {
                console.error('Failed to copy short ID to clipboard: ', error);
                toast.error("Failed to copy Short ID to clipboard");
            });
    };
    return (
        <div className="flex flex-col items-center text-center">
            <div className="text-5xl font-bold text-blue-800 my-20">
                URL Shortner
            </div>
            <form onSubmit={handleSearch} className="flex flex-row items-center justify-between py-3 px-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-full w-3/4">     
                <input 
                  type="text" 
                  name="searchText" 
                  placeholder="Search URLs" 
                  className="pl-5 focus:outline-none w-4/5" 
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                />
                <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full" 
                  type="submit"
                >
                    Search
                </button>
            </form>
            {searchResult && searchText && (
                <div class="relative overflow-x-auto w-3/4 mt-3">
                <table class="w-full text-sm text-left text-gray-700 bg-gray-100">   
                    <tbody>
                    {searchResult.map((p,index)=>(
                        <tr key={index} className="bg-white border-b">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {p.fullURL}
                            </th>
                            <td className="px-6 py-4">
                                {p.shortID}
                            </td>
                            <td className="px-6 py-4">
                                {p.note}
                            </td>
                    </tr>
                    ))}                       
                  </tbody>
                </table>
            </div>
            )}  
            <div className="text-3xl font-semibold text-black-500 my-20">free tool to shorten URLs. Create short & memorable links in seconds</div>
            <form onSubmit={handleSubmit} className=' flex flex-wrap mt-10 items-center justify-between w-3/4'>
                <input 
                  required 
                  placeholder="Enter the URL here" 
                  type="url" 
                  name="fullurl" 
                  className="py-5 px-3 w-3/5 m-1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] focus:outline-none" 
                  value={fullurl}
                  onChange={(e) => setFullurl(e.target.value)}
               />
                <input
                  placeholder="Enter the note" 
                  type="text" 
                  name="note" 
                  className="py-5 px-3 w-1/10 m-1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] focus:outline-none" 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-5 px-10 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Shrink
                </button>              
            </form>
            {short && (
                <span className='flex items-center justify-between p-5 text-3xl mt-10 text-gray-700 uppercase bg-gray-200'>
                {short}
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2 px-4 mx-2 focus:outline-none"
                    onClick={copyShortIdToClipboard}
                >
                    Copy
                </button>
            </span>
            )}
            <div class="flex items-center justify-center relative overflow-x-auto w-9/10 mt-20">
                <table class="w-full text-sm text-left text-gray-700 bg-gray-100">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Full URL
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Short URL
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Note
                            </th>    
                        </tr>
                    </thead>
                    <tbody>
                    {allurls.map((p,index)=>(
                        <tr key={index} className="bg-white border-b">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                <a href={p.fullURL} target="_blank" rel="noopener noreferrer">{p.fullURL}</a>
                            </th>
                           <td className="px-6 py-4">
                                <a href={p.fullURL} target="_blank" rel="noopener noreferrer">{p.shortID}</a>
                           </td>
                            <td className="px-6 py-4">
                                {p.note}
                            </td>
                        </tr>
                    ))}    
                    </tbody>
                </table>
            </div>           
        </div>
    );
};

export default UrlShrinker;
