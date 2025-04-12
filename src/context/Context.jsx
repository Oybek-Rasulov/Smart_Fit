import axios from 'axios';
import { createContext, useEffect, useState, useMemo, useContext } from "react"

const dataContext = createContext();

function Context({children}) {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchedNews, setSearchedNews] = useState("");

    useEffect(() => {
        function fetchNews() {
          axios.get('http://localhost:3001/news')
            .then(response => {
              setNews(response.data)
            })
            .catch(error => {
              console.log(error)
            })
        }  
    
        fetchNews()
      }, []);

      const searchData = searchedNews.length > 0 ? 
        news.filter(item => item.title.toLowerCase().includes(searchedNews.toLowerCase())) : news;

    const value = useMemo(() => ({ searchData, loading, setSearchedNews, searchedNews }), [news, searchedNews]);
    return (
        <dataContext.Provider value={
            value
        }>
            {children}
        </dataContext.Provider>
    )   
}

function useData() {
    const context = useContext(dataContext);
    if (!context) {
        throw new Error("useData must be used within a Context");
    } 

    return context;
}

export {Context, useData}
