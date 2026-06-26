import { useState } from "react";

export default function BiologyLab() {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-4">Biology Microscope Lab</h1>
      <div className="relative border rounded-lg overflow-hidden">
        <img
          src="/images/cell-sample-hd.jpg"
          alt="Microscopic cell sample"
          style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
          className="transition-transform duration-300"
        />
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={() => setZoom((z) => Math.max(1, z - 0.2))} className="px-4 py-2 bg-gray-200 rounded">
          Zoom Out
        </button>
        <button onClick={() => setZoom((z) => z + 0.2)} className="px-4 py-2 bg-blue-500 text-white rounded">
          Zoom In
        </button>
      </div>
    </div>
  );
}
