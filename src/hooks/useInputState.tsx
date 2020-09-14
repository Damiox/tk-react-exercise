import { ChangeEvent, useState } from 'react'

export default (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue)
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }
  return [value, handleChange, setValue] as const
}
