import styled from 'styled-components/macro'

const Clickable = styled.div`
  display: inline;
  cursor: pointer;
`

const Form = styled.form`
`
const Button = styled.button`
`
const Label = styled.label`
`
const TextInput = styled.input.attrs(p => ({
  type: 'text'
}))`
  width: 100%;
`

const TextArea = styled.textarea`
  width: 100%;
  height: 5rem;
`

export { Clickable, Form, Button, Label, TextInput, TextArea }
