import React, { useState, useEffect } from 'react';
import defaultUser from './mockData.js/mockUser';
import defaultRepos from './mockData.js/mockRepos';
import defaultFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({children}) => {
    const [githubUser,setGitHubUser] = useState(defaultUser);
    const [repos,setRepos] = useState(defaultRepos);
    const [followers,setFollowers] = useState(defaultFollowers);
    const [requests,setRequests] = useState(0);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState({show:false,msg:''})

    const searchGithubUser = async(user) =>{
        toggleError();
        setLoading(true);   
        const response = await axios(`${rootUrl}/users/${user}`).catch((err)=>console.log(err));
        
        if(response){
            setGitHubUser(response.data);
            const {login,followers_url} = response.data;

            //Keeps loading until ALL the data is retrievied and displayed simultaneously
            await Promise.allSettled([
                axios(`${rootUrl}/users/${login}/repos?per_page=100`),
                axios(`${followers_url}?per_page=100`),
            ]).then((results) => {
                const [repos,followers] = results;
                const status = 'fulfilled';
                if (repos.status === status){
                    setRepos(repos.value.data)
                }
                if (followers.status === status){
                    setFollowers(followers.value.data)
                }
            }).catch(err=>console.log(err))
        }
        else{
            toggleError(true,'user does not exist')
        }
        checkRequests();
        setLoading(false);
    };

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

    useEffect(()=>{
        checkRequests();
    })

    return <GithubContext.Provider value={{githubUser,repos,followers,requests,error,loading,searchGithubUser}}>{children}</GithubContext.Provider>
}

export {GithubProvider,GithubContext}