import React from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from '../services/atoms'

export default function Home() {
  const user = useRecoilValue(userState);
  return (
    <div className='container mx-auto px-4'>
      <div className="py-8">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="col-span-3">
            <h1 className="text-2xl font-bold mb-4">Quiz List</h1>
            <div className="bg-base-200 p-4">
              {/* Daftar Kuis */}
            </div>
          </div>
          <div className="col-span-1">
            <h1 className="text-2xl font-bold mb-4">Quiz History</h1>
            <div className="bg-base-200 p-4">
              {user && user.quizHistories > 0? "" :( <p>No quiz history</p>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
