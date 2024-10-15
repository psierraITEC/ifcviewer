import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '00:00', temperature: 20, humidity: 50 },
  { name: '04:00', temperature: 22, humidity: 52 },
  { name: '08:00', temperature: 25, humidity: 55 },
  { name: '12:00', temperature: 28, humidity: 58 },
  { name: '16:00', temperature: 26, humidity: 56 },
  { name: '20:00', temperature: 23, humidity: 53 },
];

const SensorDetails: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Detalles del Sensor</h1>
          <Link to="/dashboard" className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-blue-100">
            Volver al Dashboard
          </Link>
        </div>
      </nav>
      <div className="container mx-auto mt-8 p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Mediciones del Sensor</h2>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Características del Sensor:</h3>
            <ul className="list-disc pl-5">
              <li>Tipo: Sensor de Temperatura y Humedad</li>
              <li>Modelo: DHT22</li>
              <li>Precisión: ±0.5°C, ±2-5% RH</li>
              <li>Rango de medición: -40 a 80°C, 0-100% RH</li>
              <li>Intervalo de muestreo: 2 segundos</li>
            </ul>
          </div>
          <div style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorDetails;