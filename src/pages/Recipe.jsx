import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import React from 'react'

function Recipe() {

    let params = useParams();
    const[details, setDetails] = useState({});
    const[activeTab, setActiveTab] = useState('instructions');

    const fetchDetails = async () => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
    
      const detailData = await data.json();
      setDetails(detailData); 
      console.log(detailData);
    };

    useEffect(()=> {
        fetchDetails();
    }, [params.name]);
 
  return (
    <DetailWrapper>
        <div>
            <h2>{details.title}</h2>
            <img src={details.image} alt=""  style={{height: "30%"}} />
        </div>
        <Info>
            <Button  className={activeTab === 'instructions' ? 'active' : ''} 
              onClick={() => setActiveTab("instructions")}>Instructions
            </Button>
            <Button  className={activeTab === 'ingredients' ? 'active' : ''} 
              onClick={() => setActiveTab("ingredients")}>Ingredients
            </Button>
            {activeTab === "instructions" && (
                 <div>
                   <h4 dangerouslySetInnerHTML={{__html: details.summary}} style={{marginTop: "1rem"}} ></h4><br/>
                   <h4 dangerouslySetInnerHTML={{__html: details.instructions}} ></h4><br/>
                </div>
            )}
            {activeTab === "ingredients" && (
                <ul>
                  {details.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                   ))}
               </ul>
            )}
        </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 2.5rem;
  display: flex;
  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2{
    margin-bottom: 1rem; 
    font-size: 1rem; 
  }
  li{
    font-size: 1.2rem;
    line-height: 1.5rem;
  }
  ul{
    margin-top: 1rem;
  }
`;

const Button = styled.button`
  padding: 0.6rem 0.9rem;
  color: #313131;
  background:: white;
  border: 1.8px solid black;
  margin-right: 1.5rem;
  font-size: 0.6rem;
  font-weight: 300;
`;

const Info = styled.div`
  margin-left: -8rem;
`;

export default Recipe;
