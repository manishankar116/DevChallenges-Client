import React, {useState} from 'react'
import ChallengeCard from '../Components/ChallengeCard'
import Pagination from '../Components/Pagination'

const IconChevronDown = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const Feed = ({ challenges, totalCount, pageSize = 5 }) => {
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("Latest");
    const totalPages = Math.ceil(totalCount / pageSize);
  return (
    <div className="flex-1 px-6 py-8 sm:px-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Challenges</h1>
          <p className="mt-1 text-slate-500">A collection of real-world problems I faced and how I solved them.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Sort by</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm font-medium text-slate-700 outline-none"
            >
              <option>Latest</option>
              <option>Oldest</option>
              <option>Most viewed</option>
            </select>
            <IconChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {challenges.map((c, i) => (
          <ChallengeCard key={i} challenge={c} />
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <p className="text-sm text-slate-500">
          Showing {challenges.length} of {totalCount} challenges
        </p>
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  )
}

export default Feed