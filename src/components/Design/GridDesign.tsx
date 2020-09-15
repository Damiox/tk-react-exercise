import styled from 'styled-components/macro'

const Grid = styled.div`
  text-align: center;
`
const Row = styled.div`
  display: flex;
  margin: 0.5rem;
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
`
const Col = styled.div<{ size: number}>`
  flex: ${p => p.size};
  margin: 0.5rem;
`


export { Grid, Row, Col }
