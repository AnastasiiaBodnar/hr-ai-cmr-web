'use client'

import { useState } from 'react'
import CandidateForm from '@/app/components/candidates/CandidateForm'

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(true) // Open by default for preview

  return (
    <div className="p-10 flex flex-col items-center justify-center bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Preview</h1>
      
      <button 
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
      >
        Open Candidate Form
      </button>

      {isModalOpen && (
        <CandidateForm 
            isEditing={false} 
            onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  )
}