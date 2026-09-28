import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteChallenge } from '../api/challenge';
import DeleteChallengeDialog from './DeleteChallengeDialog';

const IconEye = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconArrowRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ChallengeCard = ({challenge, onDelete}) => {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const handleDelete = async () => {
    try {
      await deleteChallenge(challenge.challengeId);
      onDelete?.(challenge.challengeId);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting challenge:', error);
    }
  }
  const handleEdit = (id) => {
    navigate(`/update=profile/${id}`);
  }

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white px-6 py-5 transition-shadow hover:shadow-sm sm:flex-row sm:items-center sm:gap-8">
    
    {/* Content */}
        <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-slate-900">
            {challenge.title}
            </h3>

            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
            {challenge.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
            {challenge.environment?.map((t, i) => (
                <Tag key={i}>
                {t}
                </Tag>
            ))}
            </div>
        </div>

    {/* Right Section */}
        <div className="mt-4 flex shrink-0 items-center justify-between sm:mt-0 sm:w-36 sm:flex-col sm:items-end sm:gap-5">
            
            <div className="text-right">
              <p className="text-sm text-slate-500">
                  {challenge.date}
              </p>

              <div className="mt-1.5 flex items-center justify-end gap-1.5 text-sm text-slate-400">
                  <IconEye className="h-4 w-4" />
                  {challenge.views}
              </div>
            </div>
            <div className=' flex items-center gap-3'>
              <button
              type="button"
              onClick={() => navigate(`/challenge/${challenge.challengeId}`)}
              className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-100"
              >
              View
              <IconArrowRight className="h-3.5 w-3.5" />
              </button>
              <p onClick={() => handleEdit(challenge.challengeId)}>Edit</p>
              <button type="button" onClick={() => setIsDeleteDialogOpen(true)}>Delete</button>
            </div>
        </div>
        <DeleteChallengeDialog
          isOpen={isDeleteDialogOpen}
          onCancel={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDelete}
        />
    </div>
  )
}

function Tag({ children, tone = "blue" }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${TAG_STYLES[tone]}`}>
      {children}
    </span>
  );
}

const TAG_STYLES = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-600",
  purple: "bg-violet-50 text-violet-600",
  orange: "bg-orange-50 text-orange-600",
  red: "bg-rose-50 text-rose-600",
};


export default ChallengeCard