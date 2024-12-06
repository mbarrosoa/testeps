import { QueryClient, QueryClientProvider } from 'react-query'
import { PokemonList } from './components/PokemonList'
import { ErrorBoundary } from './components/ErrorBoundary'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Pokemon List</h1>
          <ErrorBoundary>
            <PokemonList />
          </ErrorBoundary>
        </div>
      </div>
    </QueryClientProvider>
  )
}

