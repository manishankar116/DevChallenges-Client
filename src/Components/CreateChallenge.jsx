import React, { useState } from "react";
import TestEditor from "./TestEditor";
import axios from "axios";
import { createChallenge } from "../api/challenge";
import TextEditor from "./TextEditor";

export default function CreateChallenge() {
  // Basic fields
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [environment, setEnvironment] = useState("");
  const [contribution, setContribution] = useState("");
  const [expectedResult, setExpectedResult] = useState("");
  const [actualResult, setActualResult] = useState("");
  const [content, setContent] = useState("");
  const [attemptsXML, setAttemptsXML] = useState("");
  const [learnings, setLearnings] = useState("");
  const [screenshots, setScreenshots] = useState([]);

  const handleScreenshotUpload = (event) => {
    const files = Array.from(event.target.files);
    setScreenshots(files);
  };

  const handlePublish = async () => {
    const challengeData = {
        title,
        description : shortDescription,
        expectedResult,
        actualResult,
        environment: environment
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
        contribution,
        content,
        attemptsXML,
        learnings
    };

    await createChallenge(challengeData).then((response) => {
        console.log("Challenge created successfully:", response);
    }).catch((error) => {
        console.error("Error creating challenge:", error);
    });

  };

  return (
    <div className="min-h-full bg-white px-5 py-6 md:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Create New Challenge
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Document a problem you faced and how you solved it. Share your
            knowledge with the community.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          {/* Title */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Title <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              placeholder="Eg. Optimizing a Slow SQL Query in Production"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <div className="mt-1 text-right text-xs text-slate-400">
              {title.length}/100
            </div>
          </div>

          {/* Short Description */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Short Description <span className="text-red-500">*</span>
            </label>

            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              maxLength={300}
              rows={4}
              placeholder="Give a brief overview of the problem and solution (2–3 sentences)."
              className="w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <div className="mt-1 text-right text-xs text-slate-400">
              {shortDescription.length}/300
            </div>
          </div>

          {/* Technology / Environment */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Technology / Environment{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
              placeholder="Eg. Java, Spring Boot, MySQL, AWS"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-1 text-xs text-slate-400">
              Separate multiple technologies with commas.
            </p>
          </div>

          {/* Contribution */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Contribution <span className="text-red-500">*</span>
            </label>

            <select
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Select contribution</option>
              <option value="Interview">Interview</option>
              <option value="Client Project">Client Project</option>
              <option value="Personal Project">Personal Project</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Other">Other</option>
            </select>
          </div>
            {/* Expected Result & Actual Result */}
            <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Expected Result */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Expected Result <span className="text-red-500">*</span>
                    </label>

                    <textarea
                    value={expectedResult}
                    onChange={(e) => setExpectedResult(e.target.value)}
                    rows={5}
                    placeholder="What result were you expecting?"
                    className="w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                {/* Actual Result */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Actual Result <span className="text-red-500">*</span>
                    </label>

                    <textarea
                    value={actualResult}
                    onChange={(e) => setActualResult(e.target.value)}
                    rows={5}
                    placeholder="What actually happened?"
                    className="w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

            </div>

          {/* Attempts XML */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Attempts (XML)
            </label>
                  <TextEditor
                        value={attemptsXML}
                        onChange={setAttemptsXML}
                        placeholder="Explain the challenge you faced..."
                    />
          </div>

          {/* Learnings */}
            <div className="mb-6">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Learnings <span className="text-red-500">*</span>
                </label>

                <textarea
                    value={learnings}
                    onChange={(e) => setLearnings(e.target.value)}
                    rows={5}
                    placeholder="What did you learn from this challenge? What would you do differently next time?"
                    className="w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
            </div>

            {/* Screenshots */}
            <div className="mb-6">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                Screenshots{" "}
                <span className="font-normal text-slate-400">(Optional)</span>
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition hover:border-blue-400 hover:bg-blue-50/30">

                <div className="mb-2 text-2xl text-slate-400">
                    ↑
                </div>

                <p className="text-sm text-slate-500">
                    Drag and drop images here, or{" "}
                    <span className="font-medium text-blue-600">
                    click to upload
                    </span>
                </p>

                <p className="mt-1 text-xs text-slate-400">
                    Supports PNG, JPG, GIF (Max 5MB each)
                </p>

                <input
                    type="file"
                    accept="image/png,image/jpeg,image/gif"
                    multiple
                    onChange={handleScreenshotUpload}
                    className="hidden"
                />

                </label>

                {/* Selected files */}
                {screenshots.length > 0 && (
                <div className="mt-3 space-y-1">
                    {screenshots.map((file, index) => (
                    <div
                        key={index}
                        className="text-sm text-slate-600"
                    >
                        {file.name}
                    </div>
                    ))}
                </div>
                )}
            </div> 
            

          {/* Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">

                <button
                type="button"
                className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                Cancel
                </button>

                <button
                type="button"
                onClick={handlePublish}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                Publish Challenge
                </button>

            </div>

        </div>
      </div>
    </div>
  );
}