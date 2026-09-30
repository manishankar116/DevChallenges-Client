import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { deleteChallenge, getChallengeById, recordView } from "../api/challenge";
import DeleteChallengeDialog from "../Components/DeleteChallengeDialog";
import useAuthStore from "../store/useAuthStore";
import {
  ArrowLeft,
  CalendarDays,
  Eye,
  Edit3,
  Trash2,
  FileText,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
  Lightbulb,
} from "lucide-react";

const Challenge = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loggedInUsername = useAuthStore((state) => state.user?.username);
  const profileUsername = location.state?.profileUsername;
  const canManage = Boolean(
    isAuthenticated && loggedInUsername && profileUsername &&
    loggedInUsername.toLowerCase() === profileUsername.toLowerCase()
  );
  const [challenge, setChallenge] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;

    let isCurrent = true;

    const loadChallenge = async () => {
      setIsLoading(true);
      setError("");
      try {
        const data = await getChallengeById(id);
        if (isCurrent) {
          setChallenge(data);
          recordView(id).catch((viewError) => {
            console.error("Unable to record challenge view:", viewError);
          });
        }
      } catch {
        if (isCurrent) setError("Unable to load this challenge.");
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };

    loadChallenge();

    return () => {
      isCurrent = false;
    };
  }, [id]);

  const handleDelete = async () => {
    if (!canManage) return;

    setIsDeleting(true);
    setError("");
    try {
      await deleteChallenge(challenge.challengeId || id);
      navigate(-1);
    } catch {
      setError("Unable to delete this challenge. Please try again.");
      setIsDeleting(false);
    }
  };

  if (!id) {
    return <p role="alert" className="p-8 text-sm text-red-600">Challenge not found.</p>;
  }

  if (isLoading) {
    return <p className="p-8 text-sm text-slate-600">Loading challenge...</p>;
  }

  if (!challenge) {
    return <p role="alert" className="p-8 text-sm text-red-600">{error || "Challenge not found."}</p>;
  }

  const technologies = challenge.environment || challenge.technologies || [];
  const learnings = Array.isArray(challenge.learnings)
    ? challenge.learnings
    : (challenge.learnings || "").split(/\r?\n/).filter(Boolean);
  const createdAt = challenge.date || challenge.createdAt || challenge.createdDate;
  const toPlainText = (value) => {
    if (typeof value !== "string") return "";
    return new DOMParser().parseFromString(value, "text/html").body.textContent || "";
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-slate-800"
        >
          <ArrowLeft size={14} />
          Back to My Challenges
        </button>

        {/* Header */}
        <div className="mb-6 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                {challenge.title}
              </h1>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                {challenge.description}
              </p>

              {/* Technologies */}
              <div className="mt-4 flex flex-wrap gap-2">
                {(Array.isArray(technologies) ? technologies : [technologies]).map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              {/* Meta */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CalendarDays size={14} />
                  <span>{createdAt ? new Date(createdAt).toLocaleDateString() : ""}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Eye size={14} />
                  <span>{challenge.views ?? 0} views</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            {canManage && <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => navigate(`/update-challenge/${challenge.challengeId || id}`)}
                className="flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-100"
              >
                <Edit3 size={13} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
              >
                <Trash2 size={13} />
                Delete
              </button>
            </div>}
          </div>
        </div>
        {error && <p role="alert" className="mb-4 text-sm text-red-600">{error}</p>}

        {/* Description */}
        <section className="mb-5 rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
          <SectionHeader
            icon={<FileText size={17} />}
            title="Description"
          />

          <div className="px-5 pb-5">
            <p className="text-sm leading-6 text-slate-600">
              {challenge.description || "No description provided."}
            </p>
          </div>
        </section>

        {/* Expected / Actual Result */}
        <section className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Expected */}
          <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
              <CheckCircle2
                size={18}
                className="text-emerald-500"
              />

              <h2 className="text-sm font-semibold text-slate-800">
                Expected Result
              </h2>
            </div>

            <div className="p-5">
              <p className="text-sm leading-6 text-slate-600">
                {challenge.expectedResult || "Not provided."}
              </p>
            </div>
          </div>

          {/* Actual */}
          <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
              <AlertCircle
                size={18}
                className="text-red-500"
              />

              <h2 className="text-sm font-semibold text-slate-800">
                Actual Result
              </h2>
            </div>

            <div className="p-5">
              <p className="text-sm leading-6 text-slate-600">
                {challenge.actualResult || "Not provided."}
              </p>
            </div>
          </div>
        </section>

        {/* Attempts */}
        <section className="mb-5 rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
          <SectionHeader
            icon={<FlaskConical size={17} />}
            title="Attempts"
          />

          <div className="px-5 pb-5">
            <p className="mb-5 text-xs text-slate-500">
              Here are the approaches I tried to identify and fix the issue.
            </p>

            {challenge.attemptsXML ? (
              <div
                className="text-sm leading-6 text-slate-600 [&_a]:text-blue-600 [&_a]:underline [&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-slate-300 [&_blockquote]:pl-4 [&_h1]:mb-3 [&_h1]:text-xl [&_h1]:font-bold [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:font-semibold [&_li]:my-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-slate-900 [&_pre]:p-3 [&_pre]:text-slate-100 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(challenge.attemptsXML),
                }}
              />
            ) : (
              <p className="text-sm leading-6 text-slate-600">No attempts recorded.</p>
            )}
          </div>
        </section>

        {/* Solution */}
        <section className="mb-5 rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
          <SectionHeader
            icon={<CheckCircle2 size={17} />}
            title="Solution"
            iconClassName="text-emerald-500"
          />

          <div className="px-5 pb-5">
            <p className="text-sm leading-6 text-slate-600">
              {toPlainText(challenge.content) || "No solution provided."}
            </p>
          </div>
        </section>

        {/* Learnings */}
        <section className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
          <SectionHeader
            icon={<Lightbulb size={17} />}
            title="Learnings"
            iconClassName="text-blue-500"
          />

          <div className="px-5 pb-5">
            <ul className="space-y-2">
              {learnings.map((learning, index) => (
                <li
                  key={index}
                  className="flex gap-2 text-sm leading-6 text-slate-600"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />

                  <span>{toPlainText(learning)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      {canManage && (
        <DeleteChallengeDialog
          isOpen={isDeleteDialogOpen}
          isDeleting={isDeleting}
          onCancel={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

/* ----------------------------------------
   Reusable Section Header
----------------------------------------- */

const SectionHeader = ({
  icon,
  title,
  iconClassName = "text-blue-500",
}) => {
  return (
    <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
      <div className={iconClassName}>
        {icon}
      </div>

      <h2 className="text-sm font-semibold text-slate-800">
        {title}
      </h2>
    </div>
  );
};

export default Challenge;