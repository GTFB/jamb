'use client';

import { BlockRendererProps } from './types';

export function TextBlockRenderer({ block }: BlockRendererProps) {
  const { content, alignment, fontSize, fontWeight, color } = block.data;
  
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  const fontSizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  };

  const fontWeightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <div className={`${alignmentClasses[alignment]} ${fontSizeClasses[fontSize]} ${fontWeightClasses[fontWeight]} ${color}`}>
      {content}
    </div>
  );
}

export function ImageBlockRenderer({ block }: BlockRendererProps) {
  const { src, alt, caption, alignment, width, rounded, shadow } = block.data;
  
  const widthClasses = {
    full: 'w-full',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3',
    '1/4': 'w-1/4',
  };

  const alignmentClasses = {
    left: 'mx-0',
    center: 'mx-auto',
    right: 'ml-auto',
  };

  return (
    <div className={`${widthClasses[width]} ${alignmentClasses[alignment]}`}>
      <img
        src={src}
        alt={alt}
        className={`${rounded ? 'rounded-lg' : ''} ${shadow ? 'shadow-lg' : ''}`}
      />
      {caption && (
        <p className="text-sm text-gray-600 mt-2 text-center">{caption}</p>
      )}
    </div>
  );
}

export function GalleryBlockRenderer({ block }: BlockRendererProps) {
  const { images, columns, gap, rounded } = block.data;
  
  const columnClasses = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]}`}>
      {images.map((image: any, index: number) => (
        <div key={index} className="space-y-2">
          <img
            src={image.src}
            alt={image.alt}
            className={`w-full h-48 object-cover ${rounded ? 'rounded-lg' : ''}`}
          />
          {image.caption && (
            <p className="text-sm text-gray-600 text-center">{image.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export function VideoBlockRenderer({ block }: BlockRendererProps) {
  const { src, title, description, autoplay, controls, loop, muted, width } = block.data;
  
  const widthClasses = {
    full: 'w-full',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3',
  };

  return (
    <div className={widthClasses[width]}>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <video
        src={src}
        controls={controls}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        className="w-full rounded-lg"
      />
      {description && (
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      )}
    </div>
  );
}

export function CodeBlockRenderer({ block }: BlockRendererProps) {
  const { code, language, title, showLineNumbers, theme } = block.data;
  
  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg p-4`}>
      {title && (
        <div className="text-sm font-medium text-gray-400 mb-2">{title}</div>
      )}
      <pre className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} overflow-x-auto`}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function QuoteBlockRenderer({ block }: BlockRendererProps) {
  const { text, author, source, alignment, style } = block.data;
  
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const styleClasses = {
    simple: 'border-l-4 border-blue-500 pl-4',
    bordered: 'border border-gray-300 rounded-lg p-4',
    background: 'bg-gray-50 rounded-lg p-4',
  };

  return (
    <blockquote className={`${alignmentClasses[alignment]} ${styleClasses[style]}`}>
      <p className="text-lg italic mb-2">"{text}"</p>
      {(author || source) && (
        <footer className="text-sm text-gray-600">
          {author && <cite className="font-medium">{author}</cite>}
          {source && <span className="ml-2">— {source}</span>}
        </footer>
      )}
    </blockquote>
  );
}

export function CTABlockRenderer({ block }: BlockRendererProps) {
  const { title, description, buttonText, buttonUrl, buttonStyle, alignment, background } = block.data;
  
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const buttonClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
  };

  const backgroundClasses = {
    none: '',
    light: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
  };

  return (
    <div className={`${backgroundClasses[background]} rounded-lg p-6 ${alignmentClasses[alignment]}`}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {description && <p className="mb-4">{description}</p>}
      <a
        href={buttonUrl}
        className={`inline-block px-6 py-2 rounded-lg font-medium transition-colors ${buttonClasses[buttonStyle]}`}
      >
        {buttonText}
      </a>
    </div>
  );
}

export function DividerBlockRenderer({ block }: BlockRendererProps) {
  const { style, color, width, spacing } = block.data;
  
  const widthClasses = {
    full: 'w-full',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3',
  };

  const spacingClasses = {
    sm: 'my-4',
    md: 'my-8',
    lg: 'my-12',
  };

  const styleClasses = {
    solid: 'border-t',
    dashed: 'border-t border-dashed',
    dotted: 'border-t border-dotted',
    gradient: 'border-t border-gradient-to-r from-gray-300 to-gray-600',
  };

  return (
    <div className={`${spacingClasses[spacing]} flex justify-center`}>
      <hr className={`${widthClasses[width]} ${styleClasses[style]} ${color}`} />
    </div>
  );
}

export function SpacerBlockRenderer({ block }: BlockRendererProps) {
  const { height, background } = block.data;
  
  const heightClasses = {
    sm: 'h-4',
    md: 'h-8',
    lg: 'h-12',
    xl: 'h-16',
    '2xl': 'h-24',
  };

  return (
    <div className={`${heightClasses[height]} ${background || ''}`} />
  );
}

export function EmbedBlockRenderer({ block }: BlockRendererProps) {
  const { url, title, height, responsive } = block.data;
  
  return (
    <div className="space-y-2">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      <div className={`${responsive ? 'relative w-full' : ''}`}>
        <iframe
          src={url}
          title={title || 'Embedded content'}
          className={`${responsive ? 'absolute top-0 left-0 w-full h-full' : ''} border-0 rounded-lg`}
          style={{ height: responsive ? '100%' : `${height}px` }}
        />
        {responsive && (
          <div style={{ paddingBottom: '56.25%' }} /> // 16:9 aspect ratio
        )}
      </div>
    </div>
  );
}
