import { useEffect } from 'react'

// Lazy-load Wowhead tooltips script on the Crafting page only.
// Uses the Classic tooltip domain by default.
export default function useWowheadTooltips() {
  useEffect(() => {
    const existing = document.querySelector('script[data-wowhead]') as HTMLScriptElement | null
    if (existing) return

    const s = document.createElement('script')
    s.src = 'https://wow.zamimg.com/widgets/power.js'
    s.defer = true
    s.setAttribute('data-wowhead', 'true')
    // Classic options: domain=classic
    s.dataset['wowheadwidget'] = JSON.stringify({ domain: 'classic', locale: 'en' })
    document.body.appendChild(s)
  }, [])
}
