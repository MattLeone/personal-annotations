import { useParams, Link } from 'react-router-dom'
import { getBookBySlug, getChapterById } from './data'
import { AnnotatedText, AnnotationLegend } from '../src/components/annotated-text'

function ChapterPage() {
  const { bookTitle, chapterId } = useParams<{ bookTitle: string; chapterId: string }>()
  
  const book = bookTitle ? getBookBySlug(bookTitle) : undefined
  const chapter = bookTitle && chapterId ? getChapterById(bookTitle, parseInt(chapterId)) : undefined
  
  if (!book || !chapter) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-orange-200 via-amber-50 to-orange-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-gray-800 mb-4">Chapter not found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to collection
          </Link>
        </div>
      </div>
    )
  }

  const currentIndex = book.chapters.findIndex(ch => ch.id === chapter.id)
  const prevChapter = currentIndex > 0 ? book.chapters[currentIndex - 1] : null
  const nextChapter = currentIndex < book.chapters.length - 1 ? book.chapters[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-200 via-amber-50 to-orange-200">
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link 
                to={`/${book.id}/chapters`}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm"
              >
                ← Back to {book.title}
              </Link>
              <h1 className="text-xl font-medium text-gray-800 mt-1">
                {chapter.title}
              </h1>
            </div>
            
            <div className="flex gap-4">
              {prevChapter && (
                <Link
                  to={`/${book.id}/chapters/${prevChapter.id}`}
                  className="px-3 py-1 text-sm bg-orange-100 hover:bg-orange-200 text-orange-800 rounded transition-colors duration-200"
                >
                  ← Previous
                </Link>
              )}
              {nextChapter && (
                <Link
                  to={`/${book.id}/chapters/${nextChapter.id}`}
                  className="px-3 py-1 text-sm bg-orange-100 hover:bg-orange-200 text-orange-800 rounded transition-colors duration-200"
                >
                  Next →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-12">
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h2 className="text-3xl font-light text-gray-800 mb-2">
              {chapter.title}
            </h2>
            {chapter.description && 
              <p className="text-gray-600 italic leading-relaxed">
                {chapter.description}
              </p>
            }
          </div>
          
          {chapter.annotations && chapter.annotations.length > 0 && (
            <AnnotationLegend />
          )}

          {chapter.annotations && chapter.annotations.length > 0 ? (
            <AnnotatedText 
              content={chapter.content} 
              annotations={chapter.annotations}
            />
          ) : (
            <div className="prose prose-lg prose-gray max-w-none">
              <div className="text-gray-800 leading-relaxed text-lg font-serif whitespace-pre-line">
                {chapter.content}
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            {prevChapter ? (
              <Link
                to={`/${book.id}/chapters/${prevChapter.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-800 rounded-lg transition-colors duration-200"
              >
                ← {prevChapter.title}
              </Link>
            ) : (
              <div className="w-32"></div>
            )}
            
            <Link
              to={`/${book.id}/chapters`}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              All Chapters
            </Link>
            
            {nextChapter ? (
              <Link
                to={`/${book.id}/chapters/${nextChapter.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-800 rounded-lg transition-colors duration-200"
              >
                {nextChapter.title} →
              </Link>
            ) : (
              <div className="w-32"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChapterPage