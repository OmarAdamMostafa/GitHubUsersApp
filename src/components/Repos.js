import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const {repos} = React.useContext(GithubContext);
  //Calculating the number of instances and the number of stars for each language 
  let languages = repos.reduce((total,repo)=>{
    const {language,stargazers_count} = repo;
    if(!language){
      return total;
    }

    //If the language doesn't exist within the array yet
    if(!total[language]){
      total[language] = {label:language,
                        value:1,
                        stars:stargazers_count};
    }
    else{
      total[language] = {...total[language],
                        value: total[language].value + 1,
                        stars: total[language].stars + stargazers_count};
    }

    return total;
  },{})

  //Sorting out the languages from highest number of instances to lowest (using sort)
  const mostUsedLangauge = Object.values(languages).sort((a,b)=>{
    return b.value - a.value;
  }).slice(0,5); //Getting the first 5 popular languages

  //Most stars per language
  const mostPopularLanguage = Object.values(languages).sort((a,b)=>{
    return b.value - a.value;
  }).map((item)=>{
    return {...item, value:item.stars}
  }).slice(0,5); 

  let {stars,forks} = repos.reduce((total,repo)=>{
  const {stargazers_count,forks,name} = repo;
  total.stars[stargazers_count] = {label: name,
                                  value: stargazers_count};
  total.forks[forks] = {label: name,
                                  value: forks};                               
  return total;
  },{stars:{},forks:{}});

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return <section className='section'>
    <Wrapper className='section-center'>
      <Pie3D data={mostUsedLangauge}/>
      <Column3D data={stars}/>
      <Doughnut2D data={mostPopularLanguage}/>
      <Bar3D data={forks}/>
    </Wrapper>
  </section>;
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
