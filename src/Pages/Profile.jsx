import { useEffect, useState } from 'react';
import {
  BriefcaseBusiness,
  Eye,
  FileText,
  Link2,
  MapPin,
  Tag,
  UserRound,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getChallenges } from '../api/challenge';
import {
  getStats,
  getUserProfile,
  resolveProfileImageUrl,
} from '../api/userProfile';

const formatCount = (value) => {
  const count = Number(value);
  if (!Number.isFinite(count)) return value ?? 0;
  if (count >= 1000) {
    return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K`;
  }
  return count;
};

const getChallengeTags = (challenges) => {
  const tagCounts = new Map();

  challenges.forEach((challenge) => {
    const tags = Array.isArray(challenge.environment)
      ? challenge.environment
      : [];

    tags.forEach((tag) => {
      if (typeof tag === 'string' && tag.trim()) {
        const label = tag.trim();
        tagCounts.set(label, (tagCounts.get(label) || 0) + 1);
      }
    });
  });

  return [...tagCounts.entries()]
    .sort((first, second) => second[1] - first[1] || first[0].localeCompare(second[0]))
    .map(([label]) => label);
};

const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCurrent = true;

    const loadProfile = async () => {
      setIsLoading(true);
      setError('');

      try {
        const [profileData, statsData, challengeData] = await Promise.all([
          getUserProfile(username),
          getStats(username),
          getChallenges(username),
        ]);

        if (!isCurrent) return;
        setProfile(profileData);
        setStats(statsData);
        setTags(getChallengeTags(Array.isArray(challengeData) ? challengeData : []));
      } catch (loadError) {
        console.error('Error fetching profile page data:', loadError);
        if (isCurrent) {
          setError(loadError?.message || 'Unable to load this profile right now.');
          setProfile(null);
          setStats(null);
          setTags([]);
        }
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };

    if (username) loadProfile();
    return () => {
      isCurrent = false;
    };
  }, [username]);

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
        <p className="text-sm font-medium text-slate-500" role="status">
          Loading profile…
        </p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="px-6 py-10 sm:px-10">
        <div className="mx-auto max-w-4xl rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700" role="alert">
          {error || 'This profile could not be found.'}
        </div>
      </div>
    );
  }

  const name = profile.fullName || profile.fullname || profile.name || profile.username;
  const imageUrl = resolveProfileImageUrl(profile.profileImageUrl) || profile.avatarUrl;
  const website = profile.website?.trim();
  const websiteUrl = website
    ? (/^https?:\/\//i.test(website) ? website : `https://${website}`)
    : null;
  const bio = profile.bio?.trim();
  const details = [
    profile.location && { icon: MapPin, label: profile.location },
    profile.currentCompany && { icon: BriefcaseBusiness, label: profile.currentCompany },
    profile.currentRole && { icon: BriefcaseBusiness, label: profile.currentRole },
    website && { icon: Link2, label: website, href: websiteUrl },
  ].filter(Boolean);
  const profileStats = [
    {
      icon: FileText,
      value: formatCount(stats?.challengeCount),
      label: 'Challenges',
      tone: 'blue',
    },
    {
      icon: Eye,
      value: formatCount(stats?.totalViews),
      label: 'Total views',
      tone: 'green',
    },
    {
      icon: Tag,
      value: formatCount(stats?.uniqueTagCount ?? tags.length),
      label: 'Tags used',
      tone: 'orange',
    },
  ];
  const statTones = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-emerald-50 text-emerald-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50/70 via-white to-violet-50/60 px-4 py-6 sm:px-8 sm:py-8">
      <div className="mx-auto max-w-5xl space-y-5">
        <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="h-28 w-28 shrink-0 rounded-full object-cover ring-4 ring-blue-50 sm:h-36 sm:w-36"
              />
            ) : (
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-blue-100 text-4xl font-bold text-blue-700 ring-4 ring-blue-50 sm:h-36 sm:w-36">
                {name?.charAt(0)?.toUpperCase() || <UserRound />}
              </div>
            )}

            <div className="min-w-0">
              <h1 className="m-0 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {name}
              </h1>
              {profile.headline && (
                <p className="mt-2 text-base font-medium text-slate-600">
                  {profile.headline}
                </p>
              )}

              {details.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                  {details.map(({ icon: Icon, label, href }) => (
                    <li key={label} className="flex min-w-0 items-center gap-2 text-sm text-slate-600">
                      <Icon className="h-4 w-4 shrink-0 text-slate-500" />
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="truncate text-blue-600 hover:underline"
                        >
                          {label}
                        </a>
                      ) : (
                        <span>{label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {bio && (
            <p className="mt-6 max-w-4xl text-sm leading-7 text-slate-600">
              {bio}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
              >
                {tag}
              </span>
            ))}
            {tags.length === 0 && (
              <p className="text-sm text-slate-500">No challenge technologies have been added yet.</p>
            )}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {profileStats.map(({ icon: Icon, value, label, tone }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-4"
              >
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${statTones[tone]}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xl font-bold leading-6 text-slate-900">{value}</p>
                  <p className="mt-1 text-xs text-slate-500">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm sm:p-7">
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <UserRound className="h-5 w-5 text-blue-700" />
            About
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            {bio || 'This developer has not added an about section yet.'}
          </p>
        </section>
      </div>
    </div>
  );
};

export default Profile;
