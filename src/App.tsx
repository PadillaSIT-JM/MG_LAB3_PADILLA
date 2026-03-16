import './App.css'
import React, { useState, useRef } from "react";
interface BookRequest {
  studentName: string;
  studentId: string;
  bookTitle: string;
  author: string;
  reason: string;
}

function App() {

  const [studentName, setStudentName] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [bookTitle, setBookTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [requests, setRequests] = useState<BookRequest[]>([]);

  const nameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const reasonRef = useRef<HTMLTextAreaElement>(null);


  const handleControlledSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!studentName || !studentId || !bookTitle || !author || !reason) {
      alert("Please fill in all fields for the Controlled Form.");
      return;
    }

    const newRequest: BookRequest = {
      studentName,
      studentId,
      bookTitle,
      author,
      reason,
    };

    setRequests([...requests, newRequest]);
    
    // Reset fields
    setStudentName("");
    setStudentId("");
    setBookTitle("");
    setAuthor("");
    setReason("");
  };

  const handleUncontrolledSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      studentName: nameRef.current?.value,
      studentId: idRef.current?.value,
      bookTitle: titleRef.current?.value,
      author: authorRef.current?.value,
      reason: reasonRef.current?.value,
    };

    if (!data.studentName || !data.studentId || !data.bookTitle || !data.author || !data.reason) {
      alert("Validation Error: All fields are required in the Uncontrolled Form!");
      return;
    }

    console.log("Uncontrolled Form Submitted:", data);
    alert("Check the console for submitted data!");
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', minHeight: '100vh'}} > 
    <div className="container mt-5">
      <h1 className="text-center mb-4">LIBRARY BOOK REQUEST FORM</h1>

      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h2 className="h4 mb-3 text-primary">Controlled Form</h2>
            <form onSubmit={handleControlledSubmit}>
              <div className="mb-2">
                <label className="form-label">Student Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={studentName} 
                  onChange={(e) => setStudentName(e.target.value)} 
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Student ID</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={studentId} 
                  onChange={(e) => setStudentId(e.target.value)} 
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Book Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={bookTitle} 
                  onChange={(e) => setBookTitle(e.target.value)} 
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Author</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={author} 
                  onChange={(e) => setAuthor(e.target.value)} 
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Reason for Request</label>
                <textarea 
                  className="form-control" 
                  rows={1} 
                  value={reason} 
                  onChange={(e) => setReason(e.target.value)} 
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Submit Request</button>
            </form>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h2 className="h4 mb-3 text-secondary">Uncontrolled Form</h2>
            <form onSubmit={handleUncontrolledSubmit}>
              <div className="mb-2">
                <label className="form-label">Student Name</label>
                <input type="text" 
                className="form-control" 
                ref={nameRef} />
              </div>
              <div className="mb-2">
                <label className="form-label">Student ID</label>
                <input type="text" 
                className="form-control" 
                ref={idRef} />
              </div>
              <div className="mb-2">
                <label className="form-label">Book Title</label>
                <input type="text" 
                className="form-control" 
                ref={titleRef} />
              </div>
              <div className="mb-2">
                <label className="form-label">Author</label>
                <input type="text" 
                className="form-control" 
                ref={authorRef} />
              </div>
              <div className="mb-3">
                <label className="form-label">Reason for Request</label>
                <textarea 
                className="form-control" 
                rows={1} 
                ref={reasonRef} />
              </div>
              <button type="submit" className="btn btn-secondary w-100">Log to Console</button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="border-bottom pb-1">Submitted Book Requests</h3>
        {requests.length === 0 ? (
          <p className="text-muted">No requests submitted yet.</p>
        ) : (
          <div className="row mt-3">
            {requests.map((req, index) => (
              <div key={index} className="col-md-4 mb-3">
                <div className="card border-info h-100">
                  <div className="card-body">
                    <h5 className="card-title text-info">{req.bookTitle}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">by {req.author}</h6>
                    <p className="card-text small">
                      <strong>Requested by:</strong> {req.studentName} ({req.studentId})<br />
                      <strong>Reason:</strong> {req.reason}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default App;
