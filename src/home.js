import React, {useState, useEffect} from 'react';
import {getBeers} from "./firebase";
import './home.css';

const Home = () => {

    const [beers, setBeers] = useState([]);

    useEffect(() => {
        getBeers()
            .then(beers => {
                setBeers(beers);
            })
    }, []);

    return(
        <div>
            <div className="container uk-grid-match">
                {beers.map((beer, key) => (
                    <div key={key} className="chela-card">
                        <h2>{beer.name}</h2>
                        <p>
                            Precio:
                            <strong>${beer.price}.00</strong>
                        </p>
                        <p>{beer.description}</p>
                        <div>
                            {beer.images.map((img,key) => <img src={img} key={key} alt={beer.name} width="150" height="150"/>)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Home;
