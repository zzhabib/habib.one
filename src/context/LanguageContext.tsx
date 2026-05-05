import { createContext, useContext, useState } from 'react'
import { en } from '../i18n/en'
import { ja } from '../i18n/ja'
import type { Strings } from '../i18n/en'

type Lang = 'en' | 'ja'

interface LangContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Strings
}

const LangContext = createContext<LangContextType | null>(null)

const strings: Record<Lang, Strings> = { en, ja }

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  return (
    <LangContext.Provider value={{ lang, setLang, t: strings[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
