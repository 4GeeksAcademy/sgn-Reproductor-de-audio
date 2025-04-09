
import React, { useEffect, useState, useRef } from "react";

const Audio = () => {
    const [songs, setSongs] = useState([])
    const track = useRef(null)
    const [id, setId] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false);

    async function obtenerCanciones() {
        try {
            const respuesta = await fetch('https://playground.4geeks.com/sound/songs');
            const data = await respuesta.json();
            console.log('Listado de canciones:', data.songs);
            setSongs(data.songs)

        } catch (error) {
            console.error('Error al obtener canciones:', error);
        }
    }


    useEffect(() => {
        obtenerCanciones()

    }, [])

    useEffect(() => {
        if (track.current) {
            track.current.load();
            track.current.play();
        }
    }, [id]);

    const next = () => {
        setId((prev) => (prev + 1) % songs.length);
    }

    const prev = () => {
        setId((prev) => (prev - 1 + songs.length) % songs.length);
    }

    const play = () => {
        track.current.play();
        setIsPlaying(true);
    };

    const pause = () => {
        track.current.pause();
        setIsPlaying(false);

    };

    const tooglePlayPause = () => {
        if (isPlaying) {
            pause()
        } else {
            play();
        }
    };




    return (

        <div className="audio card" >
            <div className="resizable-container">
                <div className="list-container">
                    <ul className="list-group">
                        {songs.map((obj, index) => (
                            <li className={`list-group-item list-group-item-action ${index === id ? "active" : ""
                                }`}
                                onClick={() => setId(index)} key={index} >

                                {`${index + 1}. ${obj.name}`} { }
                            </li>
                        ))}
                    </ul>
                </div>




                <audio ref={track} src={`https://playground.4geeks.com${songs[id]?.url}`} />


                <div className="botones">
                    <button onClick={prev}>
                        <i className="fa-solid fa-backward"></i>
                    </button>
                    <button onClick={tooglePlayPause}>
                        {isPlaying ? (
                            <i className="fa-solid fa-pause"></i>

                        ) : (<i className="fa-solid fa-play"></i>)
                        }

                    </button>
                    <button onClick={next}>
                        <i className="fa-solid fa-forward"></i>
                    </button>
                </div>

            </div>
        </div >

    );
};

export default Audio

