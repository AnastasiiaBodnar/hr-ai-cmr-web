import Link from 'next/link';

export default function StatusCard({ type, title, description, actions }) {
  const isSuccess = type === 'success';

  return (
    <div className="relative bg-white shadow-xl rounded-xl p-10 max-w-lg w-full text-center border border-gray-100">
      <div className="flex justify-center mb-6 mt-4">
        {isSuccess ? (
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(16,185,129,0.4)]">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="w-16 h-16 bg-error rounded-full flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(225,29,72,0.4)]">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 15.5c1.5-2.5 5.5-2.5 7 0M9 9v.01M15 9v.01" />
            </svg>
          </div>
        )}
      </div>

      <h2 className={`text-[22px] font-bold mb-4 ${isSuccess ? 'text-success' : 'text-error'}`}>
        {title}
      </h2>

      <p className="text-gray-500 mb-8 whitespace-pre-line text-[15px] leading-relaxed max-w-[85%] mx-auto">
        {description}
      </p>

      <div className="flex justify-center flex-col sm:flex-row gap-4 px-4">
        {actions.map((action, i) => {
          let colorClass = "border-gray-300 text-gray-700 hover:bg-gray-50";
          if (action.variant === 'outline-success') {
            colorClass = "border-success text-success hover:bg-success hover:text-white";
          } else if (action.variant === 'outline-warning') {
            colorClass = "border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white";
          }

          return (
            <Link
              key={i}
              href={action.href}
              className={`flex-1 px-6 py-2.5 rounded-lg font-medium text-sm transition-all border ${colorClass}`}
            >
              {action.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
