import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IfcViewerAPI } from 'web-ifc-viewer';
import * as THREE from 'three';
import { AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<IfcViewerAPI | null>(null);

  useEffect(() => {
    if (containerRef.current && !viewerRef.current) {
      viewerRef.current = new IfcViewerAPI({ container: containerRef.current, backgroundColor: new THREE.Color(0xffffff) });
      viewerRef.current.axes.setAxes();
      viewerRef.current.grid.setGrid();
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.dispose();
        viewerRef.current = null;
      }
    };
  }, []);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setError(null);
      if (viewerRef.current) {
        try {
          await viewerRef.current.IFC.loadIfc(event.target.files[0], true);
        } catch (error) {
          console.error("Error loading IFC file:", error);
          setError("Error al cargar el archivo IFC. Por favor, asegúrese de que es un archivo IFC válido.");
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">REN+HOMES Dashboard</h1>
          <Link to="/sensor-details" className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-blue-100">
            Ver Detalles del Sensor
          </Link>
        </div>
      </nav>
      <div className="container mx-auto mt-8 p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Visor IFC</h2>
          <input
            type="file"
            accept=".ifc"
            onChange={handleFileChange}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
              <AlertCircle className="mr-2" />
              <span>{error}</span>
            </div>
          )}
          <div ref={containerRef} style={{ height: '500px', width: '100%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;