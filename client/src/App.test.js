import { render, screen } from '@testing-library/react'
import App from './App'

window.test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  window.expect(linkElement).toBeInTheDocument()
})
