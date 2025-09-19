// frontend/src/pages/FRAAtlas.tsx
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { apiFetch } from "@/services/api";

// Fix marker icons (otherwise they won’t show in React builds)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// Helper: color by status
function colorForStatus(status: string) {
  if (status === "Approved") return "#28a745";
  if (status === "Rejected") return "#dc3545";
  if (status === "SendBack") return "#17a2b8";
  return "#ffb020"; // Waiting / default
}

// Call backend to update claim status
async function updateStatus(
  id: string,
  status: "Approved" | "Rejected" | "SendBack",
  remark: string
) {
  try {
    const res = await apiFetch(`/claims/${id}/update_status`, {
      method: "POST",
      body: JSON.stringify({ status, remarks: remark }),
    });
    alert(`Claim updated to ${status}`);
    return res;
  } catch (e: any) {
    alert("Failed to update status: " + e.message);
    throw e;
  }
}

// Popup content with action buttons
function PopupContent({ props }: { props: any }) {
  const { id } = props;

  return (
    <div style={{ minWidth: 220 }}>
      <div style={{ fontWeight: 700 }}>{props.claimant_name || "Unknown"}</div>
      <div style={{ margin: "4px 0" }}>
        <b>Status:</b> {props.status || "Waiting"}
      </div>
      <div>
        <b>Village:</b> {props.village || "N/A"}
      </div>
      <div>
        <b>Khesra:</b> {props.khesra_number || "N/A"}
      </div>
      <div>
        <b>Area:</b> {props.land_area || "N/A"}
      </div>
      <div>
        <b>Suggested:</b>{" "}
        {(props.suggested_schemes || []).length
          ? props.suggested_schemes.join(", ")
          : "None"}
      </div>
      {props.document_url && (
        <div style={{ marginTop: 6 }}>
          <a
            href={props.document_url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            View document
          </a>
        </div>
      )}

      {/* Action buttons */}
      <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
        


        
        <button
        
        
         
          className="!bg-green-600 !hover:bg-green-700 !text-white border border-green-800"
          

          
          onClick={() => updateStatus(id, "Approved", "Approved via map")}
        >
          Approve
        </button>
        

        
        <button
          className="bg-red-600 text-white px-2 py-1 rounded"
          onClick={() => updateStatus(id, "Rejected", "Rejected via map")}
        >
          Reject
        </button>
        <button
          className="bg-blue-600 text-white px-2 py-1 rounded"
          onClick={() => updateStatus(id, "SendBack", "Sent back for more info")}
        >
          Send Back
        </button>
      </div>
    </div>
  );
}

export default function FRAAtlas() {
  const [geojson, setGeojson] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await apiFetch("/parcels");
setGeojson((prev: any) => {
  if (!prev) return res;
  return {
    ...res,
    features: [...prev.features, ...res.features],
  };
});

      } catch (e) {
        console.error("Failed to load parcels", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">FRA Atlas Map</h1>
      <p className="text-sm text-muted-foreground">
        Interactive mapping system for Forest Rights Act implementation
      </p>

      <div style={{ height: "600px", width: "100%" }}>
        {loading && <div className="p-6">Loading map...</div>}
        {!loading && geojson && (
          <MapContainer
            center={[23.0, 77.0]}
            zoom={6}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {(geojson.features || []).map((f: any) => {
              const geomType = f.geometry?.type;
              if (geomType === "Point") {
                const [lon, lat] = f.geometry.coordinates;
                return (
                  <Marker key={f.properties.id} position={[lat, lon]}>
                    <Popup>
                      <PopupContent props={f.properties} />
                    </Popup>
                  </Marker>
                );
              } else {
                return (
                  <GeoJSON
                    key={f.properties.id}
                    data={f}
                    style={() => ({
                      color: colorForStatus(f.properties.status),
                      weight: 2,
                      fillColor: colorForStatus(f.properties.status),
                      fillOpacity: 0.35,
                    })}
                    onEachFeature={(feature, layer) => {
                      const props = feature.properties;
                      const container = L.DomUtil.create("div");
                      // Render popup React-style
                      const content = (
                        <PopupContent props={props} />
                      ) as unknown as string;
                      layer.bindPopup(content);
                    }}
                  />
                );
              }
            })}
          </MapContainer>
        )}
        {!loading && !geojson && <div className="p-6">No data</div>}
      </div>
    </div>
  );
}
