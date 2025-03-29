import React from 'react'

export default function Logo() {
  return (
    <div className="flex flex-col items-center mb-10">
      <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center mb-4 elevation-3 material-transition hover:elevation-2">
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-white">
          <path 
            d="M50 15 L85 50 L50 85 L15 50 Z" 
            fill="currentColor"
          />
          <path
            d="M50 30 L70 50 L50 70 L30 50 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
          />
        </svg>
      </div>
      <h1 className="text-4xl font-medium text-brand-primary">hambre</h1>
      <p className="text-sm text-gray-600 mt-2">Descubre los mejores sitios para comer en Madrid</p>
    </div>
  )
}
