import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChallengeById, recordView } from "../api/challenge";
import useAuthStore from "../store/useAuthStore";

const Challenge = () => {
  const { id } = useParams();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [challenge, setChallenge] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;

    const loadChallenge = async () => {
      setIsLoading(true);
      setError("");

      try {
        const challengeData = await getChallengeById(id);
        if (!isCurrent) return;

        setChallenge(challengeData);

        if (isAuthenticated) {
          recordView(challengeData.challengeId ?? id)
          .catch((recordError) => {
            console.error("Unable to record challenge view:", recordError);
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
  }, [id, isAuthenticated]);

  if (isLoading) {
    return <p className="p-8 text-sm text-slate-600">Loading challenge...</p>;
  }

  if (!challenge) {
    return <p role="alert" className="p-8 text-sm text-red-600">{error || "Challenge not found."}</p>;
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">{challenge.title}</h1>
      {challenge.date && <p className="mt-2 text-sm text-slate-500">{challenge.date}</p>}
      {challenge.description && <p className="mt-6 whitespace-pre-wrap leading-relaxed text-slate-700">{challenge.description}</p>}
      {Array.isArray(challenge.environment) && challenge.environment.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {challenge.environment.map((technology) => (
            <li key={technology} className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
              {technology}
            </li>
          ))}
        </ul>
      )}
      {challenge.expectedResult && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900">Expected result</h2>
          <p className="mt-2 whitespace-pre-wrap leading-relaxed text-slate-700">{challenge.expectedResult}</p>
        </section>
      )}
      {challenge.actualResult && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold text-slate-900">Actual result</h2>
          <p className="mt-2 whitespace-pre-wrap leading-relaxed text-slate-700">{challenge.actualResult}</p>
        </section>
      )}
      {challenge.learnings && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold text-slate-900">What I learned</h2>
          <p className="mt-2 whitespace-pre-wrap leading-relaxed text-slate-700">{challenge.learnings}</p>
        </section>
      )}
    </article>
  );
};

export default Challenge;