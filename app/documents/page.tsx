"use client"

import { useState, useEffect, useRef } from "react"
import { Sidebar } from "@/components/sidebar"
import { AuthGuard } from "@/components/auth-guard"
import { Bell, FileText, Upload, Download, Search, X, Loader2 } from "lucide-react"
import { client } from "@/lib/data"
import { useAuth } from "@/contexts/auth-context"
import { storage, db } from "@/lib/firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { collection, addDoc, query, where, onSnapshot, orderBy, Timestamp } from "firebase/firestore"
import { Progress } from "@/components/ui/progress"

interface Document {
  id: string
  name: string
  description: string
  url: string
  uploadedAt: Date
  size: number
}

// Static demo documents
const staticDocuments = [
  {
    id: "static-1",
    name: "Logo / Wordmark",
    description: "Trademark Registration - Uploaded (PNG format)",
    uploadedAt: "18 Jan 2026",
    status: "uploaded" as const,
  },
  {
    id: "static-2",
    name: "Form TM-48",
    description: "Trademark Registration - Signed and submitted",
    uploadedAt: "18 Jan 2026",
    status: "uploaded" as const,
  },
  {
    id: "static-3",
    name: "Partnership Deed",
    description: "PAN Application - Required for application",
    uploadedAt: "",
    status: "required" as const,
  },
]

export default function DocumentsPage() {
  const { user } = useAuth()
  const [uploadedDocs, setUploadedDocs] = useState<Document[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadingFileName, setUploadingFileName] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch user's documents from Firestore
  useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, "documents"),
      where("userId", "==", user.uid),
      orderBy("uploadedAt", "desc")
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs: Document[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        docs.push({
          id: doc.id,
          name: data.name,
          description: data.description || "",
          url: data.url,
          uploadedAt: data.uploadedAt?.toDate() || new Date(),
          size: data.size || 0,
        })
      })
      setUploadedDocs(docs)
    })

    return () => unsubscribe()
  }, [user])

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return

    setUploading(true)
    setUploadProgress(0)
    setUploadingFileName(file.name)

    try {
      // Create a reference to the file in Firebase Storage
      const storageRef = ref(storage, `uploads/${user.uid}/${Date.now()}_${file.name}`)
      
      // Upload the file with progress tracking
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setUploadProgress(progress)
        },
        (error) => {
          console.error("Upload error:", error)
          setUploading(false)
          setUploadingFileName("")
        },
        async () => {
          // Get the download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

          // Save document metadata to Firestore
          await addDoc(collection(db, "documents"), {
            userId: user.uid,
            name: file.name,
            description: `${formatFileSize(file.size)} - ${file.type || "Unknown type"}`,
            url: downloadURL,
            size: file.size,
            uploadedAt: Timestamp.now(),
          })

          setUploading(false)
          setUploadProgress(0)
          setUploadingFileName("")
        }
      )
    } catch (error) {
      console.error("Upload failed:", error)
      setUploading(false)
      setUploadingFileName("")
    }

    // Reset the file input
    e.target.value = ""
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  // Filter documents based on search query
  const filteredUploadedDocs = uploadedDocs.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredStaticDocs = staticDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Sidebar />
      
        <main className="ml-64 min-h-screen p-8">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <header className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Documents</h1>
                <p className="text-muted-foreground">
                  All your uploaded and required documents in one place
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-gray-100 hover:text-foreground">
                  <Bell className="h-5 w-5" />
                </button>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1f2e] font-semibold text-white">
                  {client.initials}
                </div>
              </div>
            </header>

            {/* Search and Upload */}
            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#f97316] focus:outline-none focus:ring-1 focus:ring-[#f97316]"
                />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={handleUploadClick}
                disabled={uploading}
                className="flex items-center gap-2 rounded-lg bg-[#f97316] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#ea580c] disabled:opacity-50"
              >
                <Upload className="h-4 w-4" />
                Upload Document
              </button>
            </div>

            {/* Upload Progress */}
            {uploading && (
              <div className="mt-4 rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-[#f97316]" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      Uploading: {uploadingFileName}
                    </p>
                    <Progress value={uploadProgress} className="mt-2 h-2" />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {Math.round(uploadProgress)}% complete
                    </p>
                  </div>
                  <button
                    onClick={() => setUploading(false)}
                    className="rounded-full p-1 text-muted-foreground hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Uploaded Documents from Firebase */}
            {filteredUploadedDocs.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-lg font-semibold text-foreground">Your Uploads</h2>
                <div className="space-y-3">
                  {filteredUploadedDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                          <FileText className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">{doc.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {formatDate(doc.uploadedAt)}
                        </span>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-gray-50"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Static Documents List */}
            <div className="mt-8">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Service Documents</h2>
              <div className="space-y-3">
                {filteredStaticDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                        <FileText className="h-6 w-6 text-[#f97316]" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {doc.status === "uploaded" ? (
                        <>
                          <span className="text-sm text-muted-foreground">{doc.uploadedAt}</span>
                          <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-gray-50">
                            <Download className="h-4 w-4" />
                            Download
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={handleUploadClick}
                          className="flex items-center gap-1.5 rounded-lg bg-[#f97316] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#ea580c]"
                        >
                          <Upload className="h-4 w-4" />
                          Upload
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
