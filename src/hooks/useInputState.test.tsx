import React from 'react'
import useInputState from "./useInputState";
import { render, screen, fireEvent } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'

describe('useInputState()', () => {
  it('handles HTML input events', () => {
    const { result } = renderHook(() => useInputState(""))
    let [value, handleChange,] = result.current

    render(<input data-testid="input" type="text" onChange={handleChange} value={value} />)

    const input = screen.getByTestId("input");

    const testValue = 'another value'
    act(() => {
      fireEvent.change(input, { target: { value: testValue } })
    })

    let [newValue,,] = result.current
    expect(newValue).toEqual(testValue)
  })

  it('sets the value', () => {
    const { result } = renderHook(() => useInputState(""))
    let [,, setValue] = result.current

    const testValue = 'some value'
    act(() => {
      setValue(testValue)
    })

    let [value,,] = result.current
    expect(value).toEqual(testValue)
  })
})
