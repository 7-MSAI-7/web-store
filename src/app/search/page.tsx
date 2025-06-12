import { Suspense } from 'react'
import SearchClient from './SearchClient'

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xl">로딩 중...</div>}>
      <SearchClient />
    </Suspense>
  )
}
