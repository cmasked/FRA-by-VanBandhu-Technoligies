import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Upload, 
  File, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Eye,
  Download
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export default function UploadDocuments() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const requiredDocuments = [
    {
      id: 1,
      title: "Identity Proof",
      description: "Aadhaar Card, Voter ID, or Passport",
      required: true,
      uploaded: true,
      fileName: "aadhaar_card.pdf"
    },
    {
      id: 2,
      title: "Residence Proof",
      description: "Proof of residence in the forest area",
      required: true,
      uploaded: false,
      fileName: null
    },
    {
      id: 3,
      title: "Forest Occupation Evidence",
      description: "Evidence of forest land occupation before 2005",
      required: true,
      uploaded: true,
      fileName: "occupation_evidence.pdf"
    },
    {
      id: 4,
      title: "Community Certificate",
      description: "Scheduled Tribe/Traditional Forest Dweller certificate",
      required: true,
      uploaded: false,
      fileName: null
    },
    {
      id: 5,
      title: "Survey Settlement Records",
      description: "Revenue records or survey settlement documents",
      required: false,
      uploaded: true,
      fileName: "survey_records.pdf"
    }
  ];

  const uploadedFiles = [
    {
      name: "application_form.pdf",
      size: "2.3 MB",
      uploadDate: "2024-01-15",
      status: "verified"
    },
    {
      name: "family_tree.pdf",
      size: "1.8 MB",
      uploadDate: "2024-01-14",
      status: "pending"
    }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload
      console.log("Files dropped:", e.dataTransfer.files);
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const completedDocs = requiredDocuments.filter(doc => doc.uploaded).length;
  const totalRequiredDocs = requiredDocuments.filter(doc => doc.required).length;
  const completionPercentage = Math.round((completedDocs / totalRequiredDocs) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Upload Documents</h1>
        <p className="text-muted-foreground">
          Upload required documents for your Forest Rights Act application
        </p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Document Submission Progress</CardTitle>
          <CardDescription>
            {completedDocs} of {totalRequiredDocs} required documents uploaded
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completion Progress</span>
              <span>{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
          </div>
          {completionPercentage === 100 && (
            <Alert className="mt-4 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                All required documents have been uploaded successfully!
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload New Document</CardTitle>
          <CardDescription>
            Drag and drop files or click to browse
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Drop files here or click to upload</p>
              <p className="text-sm text-muted-foreground">
                Supports PDF, JPG, PNG files up to 10MB
              </p>
            </div>
            <Button className="mt-4">
              <Upload className="mr-2 h-4 w-4" />
              Browse Files
            </Button>
          </div>
          
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Required Documents Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Required Documents Checklist</CardTitle>
          <CardDescription>
            Ensure all required documents are uploaded
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requiredDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {doc.uploaded ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{doc.title}</h3>
                      {doc.required && (
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                    {doc.fileName && (
                      <p className="text-xs text-green-600 mt-1">
                        Uploaded: {doc.fileName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {doc.uploaded ? (
                    <>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files History */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Uploaded Files</CardTitle>
          <CardDescription>
            View and manage your uploaded documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <File className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {file.size} • Uploaded on {file.uploadDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    className={
                      file.status === 'verified' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {file.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}