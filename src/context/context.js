import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({children}) => {
    const [githubUser,setGitHubUser] = useState(mockUser);
    const [repos,setRepos] = useState(mockRepos);
    const [followers,serFollowers] = useState(mockFollowers);
    const [requests,setRequests] = useState(0);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState({show:false,msg:''})

    const checkRequests = () => {
        axios(`${rootUrl}/rate_limit`)
        .then((response)=>{
            const {data} = response; 
            let {rate:{remaining}} = data;
            setRequests(remaining);
            if(remaining === 0){
                toggleError(true,'Sorry, You have exceeded your hourly rate limit!')
            }
        })
        .catch((err)=>console.log(err));
    }

    function toggleError(show = false, msg = ''){
        setError({show,msg});
    }

    useEffect(checkRequests,[])

    return <GithubContext.Provider value={{githubUser,repos,followers,requests,error}}>{children}</GithubContext.Provider>
}

export {GithubProvider,GithubContext}