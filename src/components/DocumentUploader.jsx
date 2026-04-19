import { useState } from "react";

function DocumentUpload({ documents = [], onUploadDocument, onDeleteDocument }) {
  const [fileName, setFileName] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();

    if (!fileName) {
      alert("Enter document name");
      return;
    }

    const newDocument = {
      id: Date.now(),
      name: fileName,
      uploadedAt: new Date().toLocaleString(),
    };

    onUploadDocument(newDocument);
    setFileName("");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Document Upload</h2>

      <form onSubmit={handleUpload} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter document name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 rounded hover:bg-purple-700"
        >
          Upload
        </button>
      </form>

      {documents.length === 0 ? (
        <p className="text-gray-500">No documents uploaded yet.</p>
      ) : (
        <ul className="space-y-2">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="flex items-center justify-between border p-2 rounded"
            >
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-gray-500">{doc.uploadedAt}</p>
              </div>

              <button
                onClick={() => onDeleteDocument(doc.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DocumentUpload;