import {
  BriefcaseBusiness,
  Check,
  Lightbulb,
  Link2,
  LockKeyhole,
  MapPin,
} from 'lucide-react';
import { resolveProfileImageUrl } from '../api/userProfile';

const ProfileDetailsPanel = ({ user }) => {
  if (!user) return null;

  const name = user.fullName || user.name || user.username || 'Developer';
  const website = user.website?.trim();
  const websiteUrl = website
    ? (/^https?:\/\//i.test(website) ? website : `https://${website}`)
    : null;

  const details = [
    user.location && { icon: MapPin, label: user.location },
    user.currentCompany && { icon: BriefcaseBusiness, label: user.currentCompany },
    user.currentRole && { icon: BriefcaseBusiness, label: user.currentRole },
    website && { icon: Link2, label: website, href: websiteUrl },
  ].filter(Boolean);

  return (
    <aside className="sticky top-20 hidden max-h-[calc(100vh-5rem)] w-72 shrink-0 space-y-3 overflow-y-auto px-4 py-8 xl:block">
      <section className="rounded-lg border border-slate-200 bg-white p-4">     

        {user.profileImageUrl ? (
          <img
            src={resolveProfileImageUrl(user.profileImageUrl)}
            alt={name}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-lg font-bold text-blue-700">
            {name.charAt(0).toUpperCase()}
          </div>
        )}

        <h3 className="mt-3 text-base font-bold text-slate-900">{name}</h3>
        {user.headline && <p className="mt-0.5 text-xs text-slate-500">{user.headline}</p>}

        {details.length > 0 && (
          <ul className="mt-3 space-y-2">
            {details.map(({ icon: Icon, label, href }) => (
              <li key={label} className="flex min-w-0 items-center gap-2 text-xs text-slate-600">
                <Icon className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                {href ? (
                  <a href={href} target="_blank" rel="noreferrer" className="truncate text-blue-600 hover:underline">
                    {label}
                  </a>
                ) : (
                  <span className="truncate">{label}</span>
                )}
              </li>
            ))}
          </ul>
        )}

        {user.bio && <p className="mt-3 text-xs leading-relaxed text-slate-600">{user.bio}</p>}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="flex items-center gap-2 text-sm font-bold text-slate-800">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          Tips for a great profile
        </h2>
        <ul className="mt-3 space-y-2 text-xs leading-relaxed text-slate-600">
          {[
            'Use a clear and professional profile picture.',
            'Write a compelling headline.',
            'Keep your bio concise and focused on your experience and interests.',
            'Add your current company and role.',
            'Include your location and a personal website.',
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-violet-100 bg-violet-50 p-4">
        <h2 className="flex items-center gap-2 text-sm font-bold text-slate-800">
          <LockKeyhole className="h-4 w-4 text-violet-600" />
          Privacy
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-slate-600">
          Your profile is publicly visible. Be mindful of the information you share.
        </p>
      </section>
    </aside>
  );
};

export default ProfileDetailsPanel;