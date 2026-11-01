import type { ReactNode } from 'react'

type IconProps = { size?: number; className?: string }

function Icon({
  children,
  size = 24,
  className = '',
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {children}
    </svg>
  )
}

export function GridIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
    </Icon>
  )
}

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path d="m16 16 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </Icon>
  )
}

export function LocationIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </Icon>
  )
}

export function CloudSunIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15.5 5V3M20.4 7.1l1.4-1.4M10.6 7.1 9.2 5.7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path
        d="M8 18.5h10.5a3.5 3.5 0 0 0 .2-7 5.7 5.7 0 0 0-10.8 1.1A3 3 0 0 0 8 18.5Z"
        fill="currentColor"
        fillOpacity=".22"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path d="M10.5 9.2a5.2 5.2 0 0 1 8.1 2.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </Icon>
  )
}

export function ArrowIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </Icon>
  )
}

export function PinIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="m9 4 6 1-1.2 4.2 3 3-4.2 1.2L9 17l-2-2 3.6-3.6 1.2-4.2L9 4Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
      <path d="m8 16-4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </Icon>
  )
}

export type AppLogoName = 'youtube' | 'disney' | 'netflix' | 'spotify' | 'hdmi'

export function AppLogo({ name }: { name: AppLogoName }) {
  if (name === 'youtube') {
    return (
      <svg className="brand-app-logo" viewBox="0 0 48 48" aria-hidden="true">
        <rect x="3" y="10" width="42" height="28" rx="9" fill="#ff0033" />
        <path d="m20 17 12 7-12 7V17Z" fill="white" />
      </svg>
    )
  }

  if (name === 'disney') {
    return (
      <svg className="brand-app-logo brand-app-logo-disney" viewBox="0 0 64 48" aria-hidden="true">
        <path d="M8 17C20 5 42 4 56 15" fill="none" stroke="#8ed7ff" strokeLinecap="round" strokeWidth="2.4" />
        <text x="7" y="32" fill="white" fontFamily="Georgia, serif" fontSize="17" fontStyle="italic" fontWeight="700">Disney</text>
        <path d="M53 21v10M48 26h10" stroke="white" strokeLinecap="round" strokeWidth="2" />
      </svg>
    )
  }

  if (name === 'netflix') {
    return (
      <svg className="brand-app-logo" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M13 7h8v34h-8zM27 7h8v34h-8z" fill="#b20710" />
        <path d="m21 7 14 34h-8L13 7h8Z" fill="#f6121d" />
      </svg>
    )
  }

  if (name === 'spotify') {
    return (
      <svg className="brand-app-logo" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="21" fill="#1ed760" />
        <path d="M13 19c8-2.4 18.2-1.6 25 2" fill="none" stroke="#10241b" strokeLinecap="round" strokeWidth="3.2" />
        <path d="M15 25c7-1.8 15.7-1.1 21.5 1.8" fill="none" stroke="#10241b" strokeLinecap="round" strokeWidth="2.8" />
        <path d="M17 31c5.2-1.2 11.7-.7 16 1.5" fill="none" stroke="#10241b" strokeLinecap="round" strokeWidth="2.5" />
      </svg>
    )
  }

  return (
    <svg className="brand-app-logo" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 13h32v22H8z" fill="none" stroke="white" strokeLinejoin="round" strokeWidth="2.5" />
      <path d="M16 35v4M32 35v4M13 39h22" stroke="white" strokeLinecap="round" strokeWidth="2.5" />
      <text x="24" y="29" fill="white" fontFamily="Manrope, sans-serif" fontSize="15" fontWeight="700" textAnchor="middle">3</text>
    </svg>
  )
}
