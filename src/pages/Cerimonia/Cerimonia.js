import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './Cerimonia.css';

export const Cerimonia = () => {
    const containerStyle = {
        width: '100%',
        height: '400px',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginTop: '20px',
    };

    const hotel = {
        lat: -23.556471452380162, // exemplo: São Paulo
        lng: -51.44252021534339,
    };

   

    const localCerimonia = {
        lat: -23.559012308637133,
        lng: -51.51777071534339,
    };
    
    return (
        <div className="cerimonia-container">
            <h1>Cerimônia</h1>
            <p>
                A cerimônia ocorrerá no dia 11 de outubro de 2025, às 15h30 no
                KawaiI Eventos, em Apucarana (PR).
            </p>
            <div className="map-container">
                <LoadScript
                    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={localCerimonia}
                        zoom={12}
                    >
                        <Marker position={localCerimonia} />
                    </GoogleMap>
                </LoadScript>
            </div>
            <p>
                A recepção ocorrerá no mesmo local, logo após a cerimônia Onde
                se hospedar Indicamos o Hotel Matrix, em Apucarana, como
                sugestão de hospedagem para os nossos convidados. Pensando no
                conforto de todos, será disponibilizado transporte do hotel até
                o local do casamento. As reservas devem ser feitas diretamente
                pelo telefone (43) 9912-8777. Se você optar por se hospedar no
                Hotel Matrix, pedimos que sinalize no momento da confirmação de
                presença. Isso nos ajudará a organizar melhor a logística do
                transporte.
            </p>
            <div className="map-container">
                <LoadScript
                    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={hotel}
                        zoom={12}
                    >
                        <Marker position={hotel} />
                    </GoogleMap>
                </LoadScript>
            </div>
            <p>
                Para quem vem de avião, sugerimos os aeroportos de Londrina (a
                64 km do hotel) ou Maringá (a 80 km do hotel). Sugerimos que
                chegue na sexta-feira, já que o casamento ocorrerá durante a
                tarde.
            </p>
        </div>
    );
};
