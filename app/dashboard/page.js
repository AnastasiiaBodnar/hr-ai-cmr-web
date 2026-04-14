import CandidateForm from '@/app/components/candidates/CandidateForm'

export default function Dashboard() {
  return (
    <div className="p-10 flex flex-col items-center justify-center bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Preview</h1>
      <CandidateForm isEditing={false} />
    </div>
  )
}