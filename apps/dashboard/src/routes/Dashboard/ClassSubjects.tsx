import React, { useState, useEffect } from "react";

// Define types for our data structure
interface Subject {
  id: string;
  name: string;
  description: string;
}

interface Grade {
  id: string;
  name: string;
  description: string;
  subjects: Subject[];
}

export const ClassSubjects = () => {
  // State for grades and subjects
  const [grades, setGrades] = useState<Grade[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  
  // Form states
  const [newGradeName, setNewGradeName] = useState("");
  const [newGradeDescription, setNewGradeDescription] = useState("");
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectDescription, setNewSubjectDescription] = useState("");
  
  // UI states
  const [showAddGradeModal, setShowAddGradeModal] = useState(false);
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  
  // Simulate data fetching on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchGrades = async () => {
      // Simulating API data
      const sampleData: Grade[] = [
        {
          id: "grade-1",
          name: "Grade 1",
          description: "First grade elementary",
          subjects: [
            { id: "subj-1", name: "Basic Mathematics", description: "Introduction to numbers and counting" },
            { id: "subj-2", name: "Reading", description: "Fundamentals of reading comprehension" }
          ]
        },
        {
          id: "grade-2",
          name: "Grade 2",
          description: "Second grade elementary",
          subjects: [
            { id: "subj-3", name: "Mathematics", description: "Addition and subtraction" },
            { id: "subj-4", name: "Science", description: "Introduction to basic science concepts" }
          ]
        },
        {
          id: "grade-3",
          name: "Grade 3",
          description: "Third grade elementary",
          subjects: [
            { id: "subj-5", name: "Advanced Mathematics", description: "Multiplication and division" },
            { id: "subj-6", name: "Social Studies", description: "Understanding communities" }
          ]
        }
      ];
      
      setGrades(sampleData);
      if (sampleData.length > 0) {
        setSelectedGrade(sampleData[0].id);
      }
    };
    
    fetchGrades();
  }, []);
  
  // Find the currently selected grade
  const currentGrade = grades.find(grade => grade.id === selectedGrade);
  
  // Handlers for adding new grades
  const handleAddGrade = () => {
    if (!newGradeName.trim()) return;
    
    const newGrade: Grade = {
      id: `grade-${Date.now()}`,
      name: newGradeName,
      description: newGradeDescription,
      subjects: []
    };
    
    setGrades([...grades, newGrade]);
    setSelectedGrade(newGrade.id);
    setNewGradeName("");
    setNewGradeDescription("");
    setShowAddGradeModal(false);
  };
  
  // Handlers for adding new subjects
  const handleAddSubject = () => {
    if (!selectedGrade || !newSubjectName.trim()) return;
    
    const newSubject: Subject = {
      id: `subj-${Date.now()}`,
      name: newSubjectName,
      description: newSubjectDescription
    };
    
    const updatedGrades = grades.map(grade => {
      if (grade.id === selectedGrade) {
        return {
          ...grade,
          subjects: [...grade.subjects, newSubject]
        };
      }
      return grade;
    });
    
    setGrades(updatedGrades);
    setActiveSubject(newSubject);
    setNewSubjectName("");
    setNewSubjectDescription("");
    setShowAddSubjectModal(false);
  };
  
  return (
    <div className="flex h-full">
      {/* Sidebar for Grades */}
      <div className="w-64 bg-gray-100 border-r border-gray-200 h-full overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Grades</h2>
          <button
            onClick={() => setShowAddGradeModal(true)}
            className="p-1 rounded-full hover:bg-gray-200"
            title="Add Grade"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        
        <nav className="mt-2">
          {grades.map(grade => (
            <div key={grade.id} className="relative">
              <button
                onClick={() => setSelectedGrade(grade.id)}
                className={`w-full text-left px-4 py-2 flex items-center justify-between ${
                  selectedGrade === grade.id ? "bg-blue-50 text-blue-600" : "hover:bg-gray-200"
                }`}
              >
                <span className="font-medium">{grade.name}</span>
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {grade.subjects.length}
                </span>
              </button>
            </div>
          ))}
        </nav>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header for selected grade */}
        {currentGrade && (
          <header className="bg-white border-b border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{currentGrade.name}</h1>
                <p className="text-sm text-gray-600">{currentGrade.description}</p>
              </div>
              <button
                onClick={() => setShowAddSubjectModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Subject
              </button>
            </div>
          </header>
        )}
        
        {/* Subject List */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {currentGrade && (
            <>
              {currentGrade.subjects.length === 0 ? (
                <div className="text-center py-10">
                  <div className="text-gray-400 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500">No subjects added to this grade yet.</p>
                  <button
                    onClick={() => setShowAddSubjectModal(true)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Your First Subject
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentGrade.subjects.map(subject => (
                    <div
                      key={subject.id}
                      className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer ${
                        activeSubject?.id === subject.id ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
                      }`}
                      onClick={() => setActiveSubject(subject)}
                    >
                      <div className="p-4">
                        <h3 className="font-medium text-lg text-gray-800">{subject.name}</h3>
                        <p className="text-gray-600 mt-1">{subject.description}</p>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-end rounded-b-lg">
                        <button className="text-sm text-blue-600 hover:text-blue-800 mr-3">
                          Edit
                        </button>
                        <button className="text-sm text-red-600 hover:text-red-800">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Add Grade Modal */}
      {showAddGradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Add New Grade</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade Name</label>
                <input
                  type="text"
                  value={newGradeName}
                  onChange={(e) => setNewGradeName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Grade 4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newGradeDescription}
                  onChange={(e) => setNewGradeDescription(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the grade"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddGradeModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGrade}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Grade
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Subject Modal */}
      {showAddSubjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Add New Subject</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                <select
                  value={selectedGrade || ""}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled
                >
                  {grades.map(grade => (
                    <option key={grade.id} value={grade.id}>
                      {grade.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
                <input
                  type="text"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Mathematics"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newSubjectDescription}
                  onChange={(e) => setNewSubjectDescription(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the subject"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddSubjectModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubject}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Subject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};