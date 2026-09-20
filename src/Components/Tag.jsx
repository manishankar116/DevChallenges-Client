import React from 'react'


const TAG_STYLES = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-600",
  purple: "bg-violet-50 text-violet-600",
  orange: "bg-orange-50 text-orange-600",
  red: "bg-rose-50 text-rose-600",
};

const Tag = ({ children, tone = "blue" }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${TAG_STYLES[tone]}`}>
      {children}
    </span>
  )
}

export default Tag