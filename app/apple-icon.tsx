import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          borderRadius: '20%',
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 48 48"
          fill="white"
        >
          <path d="M36.73 27a10 10 0 0 0-19.17-4.54A6 6 0 0 0 10 28a6 6 0 0 0 0 12h26a8 8 0 0 0 .73-16Z"/>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}