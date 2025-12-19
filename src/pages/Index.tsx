import React, { useState } from 'react';
import { Trash2, Plus, Edit2 } from 'lucide-react'; // Standard Lovable icons

const CourseManager = () => {
  // 1. Initial State (Replace with your actual curriculum data)
  const [courses, setCourses] = useState([
    { code: 'AMAT 8111', name: 'Applied Mathematics', cr: 3, grade: 'A' },
    { code: 'ACCT 8112', name: 'Principles of Accounting I', cr: 3, grade: 'B' },
  ]);

  const [newCourse, setNewCourse] = useState({ code: '', name: '', cr: '', grade: '' });

  // 2. Add Course Function
  const addCourse = () => {
    if (!newCourse.code || !newCourse.name) return;
    setCourses([...courses, { ...newCourse, cr: Number(newCourse.cr) }]);
    setNewCourse({ code: '', name: '', cr: '', grade: '' }); // Reset form
  };

  // 3. Remove Course Function
  const removeCourse = (code) => {
    setCourses(courses.filter(course => course.code !== code));
  };

  // 4. Update Grade Function
  const updateGrade = (code, newGrade) => {
    setCourses(courses.map(course => 
      course.code === code ? { ...course, grade: newGrade } : course
    ));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Course Conqueror Hub</h1>

      {/* --- ADD COURSE FORM --- */}
      <div className="bg-slate-100 p-4 rounded-lg mb-8 grid grid-cols-1 md:grid-cols-5 gap-2">
        <input 
          placeholder="Code" 
          className="p-2 border rounded"
          value={newCourse.code} 
          onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
        />
        <input 
          placeholder="Course Name" 
          className="p-2 border rounded col-span-2"
          value={newCourse.name}
          onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
        />
        <input 
          placeholder="Credits" 
          type="number"
          className="p-2 border rounded"
          value={newCourse.cr}
          onChange={(e) => setNewCourse({...newCourse, cr: e.target.value})}
        />
        <button 
          onClick={addCourse}
          className="bg-blue-600 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-blue-700"
        >
          <Plus size={18} /> Add
        </button>
      </div>

      {/* --- COURSE TABLE --- */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-3">Code</th>
              <th className="p-3">Course Name</th>
              <th className="p-3">Grade</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.code} className="border-b hover:bg-slate-50">
                <td className="p-3 font-mono">{course.code}</td>
                <td className="p-3">{course.name}</td>
                <td className="p-3">
                  {/* EDITABLE GRADE INPUT */}
                  <input 
                    type="text" 
                    value={course.grade}
                    className="w-12 border rounded text-center p-1 focus:border-blue-500 outline-none"
                    onChange={(e) => updateGrade(course.code, e.target.value)}
                  />
                </td>
                <td className="p-3 text-right">
                  <button 
                    onClick={() => removeCourse(course.code)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseManager;
