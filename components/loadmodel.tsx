import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

const LoadModel: React.FC = () => {
    const [modelLoaded, setModelLoaded] = useState(false);

    useEffect(() => {
        const loadModel = async () => {
            try {
                const model = await tf.loadLayersModel('/assets/modelo/model.json');
                setModelLoaded(true);
                console.log('Modelo cargado exitosamente');
            } catch (error) {
                console.error('Error al cargar el modelo', error);
            }
        };

        loadModel();
    }, []);

    return (
        <div>
            {modelLoaded ? (
                <p>Modelo cargado exitosamente</p>
            ) : (
                <p>Cargando modelo...</p>
            )}
        </div>
    );
};

export default LoadModel;