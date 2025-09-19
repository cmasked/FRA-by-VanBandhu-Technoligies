// frontend/src/pages/Claims.tsx
import { useState, useEffect, useRef } from "react";
import { apiFetch } from "@/services/api";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Search, FileText, AlertCircle, MapPin, User,
  Download, Eye, ThumbsUp, ThumbsDown, MessageSquare
} from "lucide-react";

// ---------------- TYPES ----------------
interface ClaimHistoryItem {
  id: string;
  claimant_name: string;
  status: string;
  village?: string;
  land_area?: string;
  document_url?: string | null;
}

interface ClaimDetail extends ClaimHistoryItem {
  khesra_number?: string;
  evidence?: string;
  suggested_schemes?: string[];
  notes?: { by: string; text: string }[];
  submissionDate?: string;
}

// ---------------- HELPERS ----------------
const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved": return "bg-green-100 text-green-800";
    case "Rejected": return "bg-red-100 text-red-800";
    default: return "bg-yellow-100 text-yellow-800";
  }
};

// ---------------- MAIN COMPONENT ----------------
export default function Claims() {
  const [claims, setClaims] = useState<ClaimHistoryItem[]>([]);
  const [currentClaim, setCurrentClaim] = useState<ClaimDetail | null>(null);
  const [searchId, setSearchId] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detailRef = useRef<HTMLDivElement>(null);

  // Load all claims initially
  useEffect(() => {
    loadClaims();
  }, []);

  const loadClaims = async () => {
    try {
      const data: ClaimHistoryItem[] = await apiFetch("/claimsList");
      setClaims(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load claims list.");
    }
  };

  // Fetch details for one claim
  const fetchClaim = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const claim: ClaimDetail = await apiFetch(`/claims/${id}`);
      setCurrentClaim(claim);
      // Scroll to details after loading
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      console.error(err);
      setError("Failed to load claim details.");
    } finally {
      setLoading(false);
    }
  };

  // Update claim status (Approve/Reject)
  const updateStatus = async (id: string, status: "Approved" | "Rejected") => {
    if (status === "Rejected" && !remarks.trim()) {
      setError("Remarks are required when rejecting.");
      return;
    }
    try {
      await apiFetch(`/claims/${id}/update_status`, {
        method: "POST",
        body: JSON.stringify({ status, remarks }),
      });
      setRemarks(""); // clear remarks after update
      await loadClaims(); // refresh list
      await fetchClaim(id); // refresh current
    } catch (err) {
      console.error(err);
      setError("Failed to update claim status.");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Claims Dashboard</h1>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Search Box */}
      <Card>
        <CardHeader>
          <CardTitle>Search Claims</CardTitle>
          <CardDescription>Enter a Claim ID</CardDescription>
        </CardHeader>
        <CardContent className="flex space-x-4">
          <Input
            placeholder="Enter Claim ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <Button onClick={() => fetchClaim(searchId)} disabled={loading}>
            <Search className="mr-2 h-4 w-4" />
            {loading ? "Loading..." : "Search"}
          </Button>
        </CardContent>
      </Card>

      {/* Claim Details */}
      {currentClaim && (
        <Card ref={detailRef}>
          <CardHeader>
            <CardTitle>Claim Details</CardTitle>
            <CardDescription>ID: {currentClaim.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p><strong>Name:</strong> {currentClaim.claimant_name}</p>
            <p><strong>Village:</strong> {currentClaim.village || "N/A"}</p>
            <p><strong>Khesra:</strong> {currentClaim.khesra_number || "N/A"}</p>
            <p><strong>Area:</strong> {currentClaim.land_area || "N/A"}</p>
            <p>
              <strong>Status:</strong>{" "}
              <Badge className={getStatusColor(currentClaim.status)}>
                {currentClaim.status}
              </Badge>
            </p>

            {/* Document button */}
            {currentClaim.document_url && (
              <Button asChild variant="outline">
                <a href={currentClaim.document_url} target="_blank" rel="noreferrer">
                  <Eye className="mr-2 h-4 w-4" /> View Document
                </a>
              </Button>
            )}

            {/* Remarks input */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" /> <span>Remarks</span>
              </label>
              <Input
                placeholder="Enter remarks (required if rejecting)"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>

            {/* Action buttons */}
            <div className="flex space-x-2">
              

            <Button
            onClick={() => updateStatus(currentClaim.id, "Approved")}
            variant="default"
            className="!bg-green-600 !hover:bg-green-700 !text-white">

  <ThumbsUp className="mr-2 h-4 w-4" /> Approve
</Button>


              <Button
                onClick={() => updateStatus(currentClaim.id, "Rejected")}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <ThumbsDown className="mr-2 h-4 w-4" /> Reject
              </Button>
            </div>

            {/* Notes history */}
            {currentClaim.notes && currentClaim.notes.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold">Notes</h3>
                <ul className="list-disc ml-6 text-sm text-muted-foreground">
                  {currentClaim.notes.map((note, i) => (
                    <li key={i}>
                      <strong>{note.by}:</strong> {note.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* All Claims List */}
      <Card>
        <CardHeader>
          <CardTitle>All Claims</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {claims.length === 0 ? (
            <p>No claims found.</p>
          ) : (
            claims.map((claim) => (
              <div
                key={claim.id}
                className="flex justify-between items-center border rounded p-3"
              >
                <div>
                  <p className="font-medium">{claim.claimant_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {claim.village || "N/A"} | {claim.land_area || "N/A"}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Badge className={getStatusColor(claim.status)}>
                    {claim.status}
                  </Badge>
                  <Button size="sm" onClick={() => fetchClaim(claim.id)}>
                    <Eye className="mr-2 h-4 w-4" /> View
                  </Button>
                  {claim.document_url && (
                    <Button asChild size="sm" variant="outline">
                      <a href={claim.document_url} target="_blank" rel="noreferrer">
                        <Download className="mr-2 h-4 w-4" /> Document
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
