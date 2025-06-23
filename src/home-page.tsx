import { Link } from 'react-router-dom'
import { books } from './data'
import { useState, useEffect } from 'react'

function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredBook, setHoveredBook] = useState<string | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-amber-50 via-orange-100 to-amber-200 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-300 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-24 w-24 h-24 bg-amber-300 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-orange-400 rounded-full blur-md animate-pulse delay-500"></div>
      </div>

      <div className={`flex flex-col items-center bg-gradient-to-br from-white/90 via-zinc-50/95 to-white/90 backdrop-blur-sm w-[65vw] min-h-[85vh] border border-white/60 rounded-2xl shadow-2xl transform transition-all duration-1000 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        
        <div className={`prose mx-auto m-8 p-6 text-center transform transition-all duration-1000 delay-300 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-orange-300 opacity-60"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-orange-300 opacity-60"></div>
            
            <h1 className="text-5xl font-light tracking-wider text-gray-800 mb-2 relative">
              A Collection of
              <span className="block text-4xl font-serif italic text-orange-700 mt-2">
                Novels & Annotations
              </span>
            </h1>
            <p className="text-gray-600 mt-4 text-lg font-light tracking-wide">
              Discover deeper meanings through interactive literary analysis
            </p>
          </div>
        </div>

        <div className="relative w-4/5 flex items-center justify-center my-6">
          <div className="flex-grow border-t border-gradient-to-r from-transparent via-orange-300 to-transparent"></div>
          <div className="mx-4 w-3 h-3 bg-orange-300 rounded-full"></div>
          <div className="mx-2 w-2 h-2 bg-orange-400 rounded-full"></div>
          <div className="mx-2 w-2 h-2 bg-orange-400 rounded-full"></div>
          <div className="mx-4 w-3 h-3 bg-orange-300 rounded-full"></div>
          <div className="flex-grow border-t border-gradient-to-r from-transparent via-orange-300 to-transparent"></div>
        </div>
        
        <div className={`grid gap-12 mt-8 p-8 w-[45vw] transform transition-all duration-1000 delay-500 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        } ${
          books.length === 1 ? 'grid-cols-1 justify-items-center' :
          books.length === 2 ? 'grid-cols-2' :
          books.length <= 4 ? 'grid-cols-2' :
          'grid-cols-3'
        }`}>
          {books.map((book, index) => (
            <Link 
              key={book.id} 
              to={`/${book.id}/chapters`} 
              className={`group relative transform transition-all duration-700 hover:scale-105 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${600 + index * 200}ms` }}
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img
                  src={book.coverImage}
                  alt={`${book.title} by ${book.author} cover`}
                  className="w-full h-auto rounded-xl transition-all duration-500 group-hover:scale-110 filter group-hover:brightness-110"
                />
                
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl transition-opacity duration-300 ${
                  hoveredBook === book.id ? 'opacity-100' : 'opacity-0'
                }`}></div>
                
                <div className={`absolute bottom-0 left-0 right-0 p-4 text-white transform transition-all duration-300 ${
                  hoveredBook === book.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <h3 className="font-serif text-lg font-medium mb-1">{book.title}</h3>
                  <p className="text-sm opacity-90">by {book.author}</p>
                  <div className="mt-2 text-xs opacity-75">
                    {book.chapters.length} chapters • Interactive annotations
                  </div>
                </div>

                <div className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 ${
                  hoveredBook === book.id ? 'border-orange-300 shadow-lg shadow-orange-200/50' : 'border-transparent'
                }`}></div>
              </div>

              <div className={`absolute -top-2 -right-2 bg-orange-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-medium transform transition-all duration-300 ${
                hoveredBook === book.id ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}>
                →
              </div>
            </Link>
          ))}
        </div>

        <div className={`mt-auto mb-8 text-center transform transition-all duration-1000 delay-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <p className="text-gray-500 text-sm font-light">
            Click any book to begin your annotated reading journey
          </p>
          <div className="mt-3 flex justify-center space-x-1">
            <div className="w-1 h-1 bg-orange-300 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-orange-400 rounded-full animate-bounce delay-150"></div>
            <div className="w-1 h-1 bg-orange-300 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage