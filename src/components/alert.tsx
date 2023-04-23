import Container from './container'
import cn from 'classnames'

export default function Alert({ }) {
  return (
    <div
      className={cn('border-b', {
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
            <>
                Welcome to AI Edge Marketing - Achieve your marketing goals with AI-powered solutions.            </>
        </div>
      </Container>
    </div>
  )
}
