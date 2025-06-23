import React, { useState, useEffect } from 'react';
import type { Annotation } from '../types/books';

interface TextSegment {
  text: string;
  annotation: Annotation | null;
}

interface AnnotatedTextProps {
  content: string;
  annotations: Annotation[];
}

export const AnnotatedText: React.FC<AnnotatedTextProps> = ({ content, annotations }) => {
  const [segments, setSegments] = useState<TextSegment[]>([]);

  useEffect(() => {
    // Sort annotations by start position to avoid overlaps
    const sortedAnnotations = [...annotations].sort((a, b) => a.startIndex - b.startIndex);
    
    const textSegments: TextSegment[] = [];
    let lastIndex = 0;

    sortedAnnotations.forEach(annotation => {
      // Add text before annotation
      if (annotation.startIndex > lastIndex) {
        textSegments.push({
          text: content.slice(lastIndex, annotation.startIndex),
          annotation: null
        });
      }

      // Add annotated text
      textSegments.push({
        text: content.slice(annotation.startIndex, annotation.endIndex),
        annotation: annotation
      });

      lastIndex = annotation.endIndex;
    });

    // Add remaining text
    if (lastIndex < content.length) {
      textSegments.push({
        text: content.slice(lastIndex),
        annotation: null
      });
    }

    setSegments(textSegments);
  }, [content, annotations]);

  return (
    <div className="prose prose-lg max-w-none leading-relaxed text-gray-800 text-lg font-serif whitespace-pre-wrap">
      {segments.map((segment, index) => 
        segment.annotation ? (
          <AnnotatedSpan 
            key={index}
            text={segment.text}
            annotation={segment.annotation}
          />
        ) : (
          <span key={index}>{segment.text}</span>
        )
      )}
    </div>
  );
};

const AnnotatedSpan: React.FC<{ text: string; annotation: Annotation }> = ({ text, annotation }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getAnnotationStyles = (type: string) => {
    switch (type) {
      case 'symbolic':
        return 'bg-yellow-100 border-b-2 border-yellow-400 hover:bg-yellow-200';
      case 'cultural':
        return 'bg-green-100 border-b-2 border-green-400 hover:bg-green-200';
      case 'literary':
        return 'bg-blue-100 border-b-2 border-blue-400 hover:bg-blue-200';
      case 'psychological':
        return 'bg-red-100 border-b-2 border-red-400 hover:bg-red-200';
      case 'character':
        return 'bg-purple-100 border-b-2 border-purple-400 hover:bg-purple-200';
      case 'ironic':
        return 'bg-orange-100 border-b-2 border-orange-400 hover:bg-orange-200';
      case 'plot':
        return 'bg-indigo-100 border-b-2 border-indigo-400 hover:bg-indigo-200';
      default:
        return 'bg-gray-100 border-b-2 border-gray-400 hover:bg-gray-200';
    }
  };

  return (
    <span 
      className={`${getAnnotationStyles(annotation.type)} cursor-help relative transition-colors duration-200`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
      {isHovered && (
        <div className="absolute z-50 w-80 p-4 bg-white border border-gray-300 rounded-lg shadow-xl bottom-full left-0 mb-2 transform -translate-x-1/4">
          <h4 className="font-bold text-sm mb-2 text-gray-800">{annotation.title}</h4>
          <p className="text-sm text-gray-700 mb-3 leading-relaxed">{annotation.content}</p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 italic">{annotation.source}</span>
            <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              annotation.type === 'symbolic' ? 'bg-yellow-100 text-yellow-800' :
              annotation.type === 'cultural' ? 'bg-green-100 text-green-800' :
              annotation.type === 'literary' ? 'bg-blue-100 text-blue-800' :
              annotation.type === 'psychological' ? 'bg-red-100 text-red-800' :
              annotation.type === 'character' ? 'bg-purple-100 text-purple-800' :
              annotation.type === 'ironic' ? 'bg-orange-100 text-orange-800' :
              annotation.type === 'plot' ? 'bg-indigo-100 text-indigo-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {annotation.type}
            </div>
          </div>
        </div>
      )}
    </span>
  );
};

export const AnnotationLegend: React.FC = () => (
  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
    <h3 className="font-semibold text-sm mb-2 text-gray-700">Annotation Types:</h3>
    <div className="flex flex-wrap gap-2 text-xs">
      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Symbolic</span>
      <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Cultural</span>
      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">Literary</span>
      <span className="px-2 py-1 bg-red-100 text-red-800 rounded">Psychological</span>
      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">Character</span>
      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded">Ironic</span>
      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded">Plot</span>
    </div>
    <p className="text-xs text-gray-500 mt-2">Hover over highlighted text for detailed annotations</p>
  </div>
);