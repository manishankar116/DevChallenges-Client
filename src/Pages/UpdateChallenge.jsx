import { useEffect, useState } from "react";
import {
  FileText,
  Lightbulb,
  Settings,
  Code2,
  BookOpen,
  Save,
} from "lucide-react";
import TextEditor from "../Components/TextEditor";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getChallengeById, updateChallenge as saveChallenge } from "../api/challenge";
import useAuthStore from "../store/useAuthStore";

const UpdateChallenge = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [challenge, setChallenge] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    expectedResult: "",
    actualResult: "",
    technologies: "",
    contribution: "Personal Project",
    //difficulty: "Easy",
    attemptsXML: "Test",
    learnings: "",
  });

  useEffect(() => {
    if (!isAuthenticated || !id) return;

    let isCurrent = true;

    const loadChallenge = async () => {
      setIsLoading(true);
      setError("");
      try {
        const challengeData = await getChallengeById(id);
        if (isCurrent) {
          setChallenge(challengeData);
          setFormData({
            title: challengeData.title || "",
            description: challengeData.description || "",
            expectedResult: challengeData.expectedResult || "",
            actualResult: challengeData.actualResult || "",
            technologies: Array.isArray(challengeData.environment)
              ? challengeData.environment.join(", ")
              : challengeData.environment || "",
            contribution: challengeData.contribution || "Personal Project",
            difficulty: challengeData.difficulty || "Easy",
            attemptsXML: challengeData.attemptsXML || "",
            learnings: challengeData.learnings || "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      attemptsXML: content,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const technologies = formData.technologies
      .split(",")
      .map((technology) => technology.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      environment: technologies,
    };

    delete payload.technologies;

    try {
      await saveChallenge({
        ...payload,
        challengeId: challenge.challengeId || id,
      });
      navigate(-1);
    } catch {
      setError("Unable to update this challenge. Please try again.");
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (isLoading) {
    return <p className="p-8 text-sm text-slate-600">Loading challenge...</p>;
  }

  if (!challenge) {
    return <p className="p-8 text-sm text-red-600">{error || "Challenge not found."}</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Update Challenge
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Update the details of your challenge. Keep it clear, concise, and
            helpful for others.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

          {/* =========================================================
              BASIC INFORMATION
          ========================================================== */}
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <SectionHeader
              icon={<FileText size={20} />}
              title="Basic Information"
              description="Update the title and description of your challenge."
            />

            <div className="mt-6 space-y-5">

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Title <span className="text-red-500">*</span>
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength={100}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <div className="mt-1 text-right text-xs text-slate-400">
                  {formData.title.length}/100
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Description <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  maxLength={300}
                  rows={4}
                  required
                  className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm leading-6 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <div className="mt-1 text-right text-xs text-slate-400">
                  {formData.description.length}/300
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================
              EXPECTED VS ACTUAL RESULT
          ========================================================== */}
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <SectionHeader
              icon={<Lightbulb size={20} />}
              title="Expected vs Actual Result"
              description="Describe what you expected and what actually happened."
            />

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Expected Result */}
              <div>
                <label
                  htmlFor="expectedResult"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Expected Result <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="expectedResult"
                  name="expectedResult"
                  value={formData.expectedResult}
                  onChange={handleChange}
                  maxLength={500}
                  rows={4}
                  required
                  placeholder={`What was the expected behavior or result?\nE.g., The API should return data in under 2 seconds.`}
                  className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm leading-6 text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <div className="mt-1 text-right text-xs text-slate-400">
                  {formData.expectedResult.length}/500
                </div>
              </div>

              {/* Actual Result */}
              <div>
                <label
                  htmlFor="actualResult"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Actual Result <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="actualResult"
                  name="actualResult"
                  value={formData.actualResult}
                  onChange={handleChange}
                  maxLength={500}
                  rows={4}
                  required
                  placeholder={`What actually happened?\nE.g., The API was taking 15 seconds and timing out.`}
                  className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm leading-6 text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <div className="mt-1 text-right text-xs text-slate-400">
                  {formData.actualResult.length}/500
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================
              TECHNOLOGIES / CONTRIBUTION / DIFFICULTY
          ========================================================== */}
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <SectionHeader
              icon={<Settings size={20} />}
              title="Technologies / Contribution & Difficulty"
              description="Add the technologies used, your contribution type, and the difficulty level."
            />

            <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[2fr_0.75fr_1fr]">

              {/* Technologies */}
              <div>
                <label
                  htmlFor="technologies"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Technologies / Environment{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  id="technologies"
                  name="technologies"
                  type="text"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="Java, Spring Boot, PostgreSQL, Docker"
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-1.5 text-xs text-slate-400">
                  Separate technologies with commas.
                </p>
              </div>

              {/* Contribution */}
              <div>
                <label
                  htmlFor="contribution"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Contribution <span className="text-red-500">*</span>
                </label>

                <select
                  id="contribution"
                  name="contribution"
                  value={formData.contribution}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Personal Project">
                    Personal Project
                  </option>
                  <option value="Team Project">
                    Team Project
                  </option>
                  <option value="Work Project">
                    Work Project
                  </option>
                  <option value="Open Source">
                    Open Source
                  </option>
                </select>
              </div>

              {/* Difficulty */}
              {/*<div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Difficulty Level <span className="text-red-500">*</span>
                </label>

                <div className="flex gap-2">
                  <DifficultyButton
                    value="Easy"
                    selected={formData.difficulty === "Easy"}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        difficulty: "Easy",
                      }))
                    }
                    dotClass="bg-green-500"
                    textClass="text-green-600"
                  />

                  <DifficultyButton
                    value="Medium"
                    selected={formData.difficulty === "Medium"}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        difficulty: "Medium",
                      }))
                    }
                    dotClass="bg-orange-500"
                    textClass="text-orange-500"
                  />

                  <DifficultyButton
                    value="Hard"
                    selected={formData.difficulty === "Hard"}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        difficulty: "Hard",
                      }))
                    }
                    dotClass="bg-red-500"
                    textClass="text-red-500"
                  />
                </div>
              </div> */}
            </div>
          </section>

          {/* =========================================================
              ATTEMPTS - TIPTAP EDITOR
          ========================================================== */}
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <SectionHeader
              icon={<Code2 size={20} />}
              title="Attempts"
              description="Update the steps, code, configurations, logs, or other approaches you tried."
            />

            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Attempts <span className="text-red-500">*</span>
              </label>

              <div className="overflow-hidden rounded-lg border border-slate-300">
                {/*<TextEditor
                  value={formData.attemptsXML}
                  onChange={handleEditorChange}
                />*/}
                <TextEditor value={formData.attemptsXML} onChange={handleEditorChange} />
              </div>
            </div>
          </section>

          {/* =========================================================
              LEARNINGS
          ========================================================== */}
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <SectionHeader
              icon={<BookOpen size={20} />}
              title="Learnings"
              description="Share what you learned from this challenge."
            />

            <div className="mt-6">
              <label
                htmlFor="learnings"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Learnings <span className="text-red-500">*</span>
              </label>

              <textarea
                id="learnings"
                name="learnings"
                value={formData.learnings}
                onChange={handleChange}
                maxLength={500}
                rows={4}
                required
                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm leading-6 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <div className="mt-1 text-right text-xs text-slate-400">
                {formData.learnings.length}/500
              </div>
            </div>
          </section>

          {/* =========================================================
              ACTIONS
          ========================================================== */}
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Save size={17} />
              Update Challenge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


/* =============================================================
   SECTION HEADER
============================================================= */

function SectionHeader({ icon, title, description }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div>
        <h2 className="text-base font-bold text-slate-900">
          {title}
        </h2>

        <p className="mt-0.5 text-sm text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}


/* =============================================================
   DIFFICULTY BUTTON
============================================================= */

function DifficultyButton({
  value,
  selected,
  onClick,
  dotClass,
  textClass,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
        selected
          ? "border-slate-300 bg-slate-50"
          : "border-slate-200 bg-white hover:bg-slate-50"
      }`}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${dotClass}`} />
      <span className={textClass}>{value}</span>
    </button>
  );
}

export default UpdateChallenge;