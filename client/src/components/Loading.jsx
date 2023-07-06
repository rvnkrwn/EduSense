import React from 'react'

export default function Loading() {
  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-base-200/80" style={{zIndex: 999999}}>
      <span className="loading loading-spinner loading-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
    </div>
  )
}
