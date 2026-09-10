import { GlobalOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import { useTranslation } from 'react-i18next'

import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/shared/lib/i18n'

export function LanguageToggle() {
  const { t, i18n } = useTranslation()

  const items = SUPPORTED_LANGUAGES.map((lng) => ({
    key: lng,
    label: t(`language.${lng}`),
    onClick: () => void i18n.changeLanguage(lng),
  }))

  return (
    <Dropdown menu={{ items, selectedKeys: [i18n.resolvedLanguage ?? 'en'] as SupportedLanguage[] }}>
      <Button type="text" shape="circle" icon={<GlobalOutlined />} aria-label="Language" />
    </Dropdown>
  )
}
