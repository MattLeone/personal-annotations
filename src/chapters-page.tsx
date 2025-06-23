import { useParams, Link } from 'react-router-dom'
import { getBookBySlug } from './data'

function ChaptersPage() {
  const { bookTitle } = useParams<{ bookTitle: string }>()
  
  const book = bookTitle ? getBookBySlug(bookTitle) : undefined
  
  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-orange-200 via-amber-50 to-orange-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-gray-800 mb-4">Book not found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to collection
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-200 via-amber-50 to-orange-200 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-4 inline-block"
          >
            ← Back to Collection
          </Link>
          <h1 className="text-5xl font-light tracking-wider text-gray-800 mb-2">
            {book.title}
          </h1>
          {book.altTitle && (
            <p className="text-xl text-gray-600 italic mb-2">{book.altTitle}</p>
          )}
          <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
          <p className="text-xl text-gray-600">Choose a chapter to begin reading</p>
        </div>

        <div className="bg-gradient-to-r from-zinc-50 via-white to-zinc-50 rounded-lg shadow-2xl border-2 border-zinc-50 p-8">
          <div className="space-y-4">
            {book.chapters.map((chapter) => (
              <Link
                key={chapter.id}
                to={`/${book.id}/chapters/${chapter.id}`}
                className="block border-l-4 border-orange-300 pl-6 py-4 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 cursor-pointer rounded-r-lg"
              >
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  {chapter.title}
                </h3>
                {chapter.description && 
                  <p className="text-gray-600 leading-relaxed">
                    {chapter.description}
                  </p>
                }
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChaptersPage