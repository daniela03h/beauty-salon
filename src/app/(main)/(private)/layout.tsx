import React from 'react'
import AuthGuard from './dashboard/guard/AuthGuard'


export default function PrivateLayout(
    { children }: { children: React.ReactNode}
) {
  return (
    <AuthGuard>{children}</AuthGuard>
  )
}