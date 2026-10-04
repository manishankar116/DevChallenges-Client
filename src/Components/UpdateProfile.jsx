import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { resolveProfileImageUrl, updateProfile } from "../api/userProfile";

/*export const user = {
    username: "mani_shankar",
    fullName: "Mani Shankar",
    email: "mani.shankar@email.com",
    profileImageUrl: null,
};

export const profile = {
    headline: "Backend and Frontend Developer",
    bio: "Backend and Frontend Developer with 2 years of experience building scalable web applications.",
    currentCompany: "Cognizant",
    currentRole: "Software Engineer",
    location: "Chennai, India",
    website: "https://mani-shankar.dev",
};*/

export default function UpdateProfile() {
  const {user} = useOutletContext();
  if (!user) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <p className="text-sm text-slate-500">Loading profile...</p>
      </div>
    );
  }

  return <ProfileEditor key={user.username} user={user} />;
}

function ProfileEditor({ user }) {
  const {username} = useParams();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [formData, setFormData] = useState(() => ({
    username: user?.username || "",
    fullName: user?.fullName || user?.fullname || "",
    email: user?.email || "",
    headline: user?.headline || "",
    bio: user?.bio || "",
    currentCompany: user?.currentCompany || "",
    currentRole: user?.currentRole || "",
    location: user?.location || "",
    website: user?.website || "",
  }));
  const [profileImage, setProfileImage] = useState(user?.profileImageUrl || null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    return () => {
      if (profileImage?.startsWith("blob:")) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setSaveError("Profile picture must be 5 MB or smaller.");
      e.target.value = "";
      return;
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setSaveError("Only PNG, JPG, and WebP images are supported.");
      e.target.value = "";
      return;
    }

    setSaveError("");
    setSelectedFile(file);
    setProfileImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setProfileImage(user?.profileImageUrl || null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError("");

    try {
      await updateProfile({
        ...formData,
        profileImage: selectedFile,
      });
      navigate(`/profile/${username}`, { replace: true });
    } catch (error) {
      const responseMessage = error.response?.data;
      setSaveError(
        (typeof responseMessage === "string" && responseMessage) ||
        responseMessage?.detail ||
        responseMessage?.message ||
        "Could not update your profile. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = () => {
    if (!formData.fullName) return "U";

    return formData.fullName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((name) => name.charAt(0).toUpperCase())
      .join("");
  };

  if (user.username !== username) {
    return <Navigate to={`/profile/${user.username}`}  replace/>
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Update Profile
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Keep your profile up to date. This information will be visible on
            your public profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ================= PROFILE PICTURE ================= */}
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <h2 className="text-sm font-bold text-slate-800">
                Profile Picture
              </h2>
            </div>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {/* Avatar */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                {profileImage ? (
                  <img
                    src={resolveProfileImageUrl(profileImage)}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-semibold text-slate-500">
                    {getInitials()}
                  </span>
                )}
              </div>

              {/* Upload */}
              <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={handleImageClick}
                  className="flex min-h-[72px] flex-1 flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-white px-4 py-3 text-center transition hover:border-blue-400 hover:bg-blue-50"
                >
                  <svg
                    className="mb-1 h-5 w-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 9l4.5-4.5L16.5 9M12 4.5V16"
                    />
                  </svg>

                  <span className="text-xs font-medium text-blue-500">
                    Click to upload or drag and drop
                  </span>

                  <span className="mt-0.5 text-[10px] text-slate-400">
                    PNG, JPG, WebP (Max 5MB)
                  </span>
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {selectedFile && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="rounded-md border border-slate-200 px-5 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Undo image change
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* ================= ACCOUNT INFORMATION ================= */}
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-sm font-bold text-slate-800">
                Account Information
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Basic account details. Your username cannot be changed.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Username */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Username
                </label>

                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    disabled
                    className="h-10 w-full rounded-md border border-slate-200 bg-slate-100 px-3 pr-10 text-xs text-slate-500 outline-none"
                  />

                  {/* Lock */}
                  <svg
                    className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      x="4"
                      y="10"
                      width="16"
                      height="10"
                      rx="2"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 10V7a4 4 0 018 0v3"
                    />
                  </svg>
                </div>

                <p className="mt-1 text-[10px] text-slate-400">
                  Username cannot be changed.
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Full Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  maxLength={120}
                  required
                  className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />

                <div className="mt-1 text-right text-[10px] text-slate-400">
                  {formData.fullName.length}/120
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="h-10 w-full rounded-md border border-slate-200 bg-slate-100 px-3 text-xs text-slate-500 outline-none"
                />

                <div className="mt-1 text-right text-[10px] text-slate-400">
                  {formData.email.length}/160
                </div>
              </div>

              {/* Email Support Message */}
              <div className="flex min-h-[72px] items-center rounded-md bg-blue-50 px-4">
                <svg
                  className="mr-2 h-4 w-4 shrink-0 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    strokeLinecap="round"
                    d="M12 10v6M12 7.5h.01"
                  />
                </svg>

                <p className="text-[11px] leading-4 text-slate-500">
                  To change your email, please contact{" "}
                  <span className="font-medium text-blue-500">
                    support
                  </span>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* ================= PROFESSIONAL INFORMATION ================= */}
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-sm font-bold text-slate-800">
                Professional Information
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                This information will be shown on your public profile.
              </p>
            </div>

            <div className="space-y-5">
              {/* Headline */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Headline
                </label>

                <input
                  type="text"
                  name="headline"
                  value={formData.headline}
                  onChange={handleChange}
                  maxLength={255}
                  placeholder="e.g. Backend and Frontend Developer"
                  className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />

                <div className="mt-1 text-right text-[10px] text-slate-400">
                  {formData.headline.length}/255
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Bio
                </label>

                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  maxLength={1000}
                  rows={4}
                  placeholder="Tell people about yourself..."
                  className="w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-3 text-xs leading-5 text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />

                <div className="mt-1 text-right text-[10px] text-slate-400">
                  {formData.bio.length}/1000
                </div>
              </div>

              {/* Company + Role */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Current Company */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Current Company
                  </label>

                  <input
                    type="text"
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleChange}
                    maxLength={150}
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />

                  <div className="mt-1 text-right text-[10px] text-slate-400">
                    {formData.currentCompany.length}/150
                  </div>
                </div>

                {/* Current Role */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Current Role
                  </label>

                  <input
                    type="text"
                    name="currentRole"
                    value={formData.currentRole}
                    onChange={handleChange}
                    maxLength={150}
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />

                  <div className="mt-1 text-right text-[10px] text-slate-400">
                    {formData.currentRole.length}/150
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    maxLength={100}
                    placeholder="e.g. Chennai, India"
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />

                  <div className="mt-1 text-right text-[10px] text-slate-400">
                    {formData.location.length}/100
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Website
                  </label>

                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    maxLength={255}
                    placeholder="https://example.com"
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />

                  <div className="mt-1 text-right text-[10px] text-slate-400">
                    {formData.website.length}/255
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= ACTIONS ================= */}
          {saveError && (
            <p role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
              {saveError}
            </p>
          )}

          <div className="flex justify-end gap-3 pb-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-md border border-slate-200 bg-white px-5 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12.5l4 4L19 7"
                />
              </svg>

              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}