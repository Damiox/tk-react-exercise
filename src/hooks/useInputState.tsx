import { ChangeEvent, useState } from 'react'

export default (initialValue: any) => {
  const [value, setValue] = useState(initialValue)
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }
  const reset = () => {
    setValue("")
  }
  return [value, handleChange, reset] as const
}
