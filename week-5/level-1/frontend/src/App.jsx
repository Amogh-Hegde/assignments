import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'


function App() {
  const [cards,setCard] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:3000/cards")
      .then((response)=>{
        setCard(response.data.cards);
        
      })
  },[cards])

  return (
    <>
      {cards.map((card)=>{
        return <Card key = {card._id} card = {card}></Card>
      })}
      
    </>
    
  )
}

function Card(card){
  let linkArr = ["github","linkedIn"];
  return (  
    <div id = "container">
      <div>{card.name}</div>
      <div>{card.description}</div>
      <div>{card.intersts}</div>
      <div>
        {card.links && card.links.map((link,i)=>{
          i++;
          return (
            <a style = "text-decoration : none;"href={link}>
              <div class="links">{linkArr[i]}</div>
          </a>
          )
          
        })}
      </div>
    </div>
  )
}

export default App
