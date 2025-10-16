import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Download,
  Share2,
  Sun,
  Moon,
  Monitor
} from 'lucide-react'

interface CodeBlockEnhancedProps {
  code: string
  language: string
  filename?: string
  showLineNumbers?: boolean
  maxLines?: number
  theme?: 'light' | 'dark' | 'auto'
  enableCollapse?: boolean
  enableExport?: boolean
  enableShare?: boolean
  className?: string
}

const codeThemes = {
  light: 'github-light',
  dark: 'github-dark',
  auto: 'github-dark'
}

const languageIcons: { [key: string]: string } = {
  javascript: '🟨',
  typescript: '🔷',
  react: '⚛️',
  vue: '💚',
  astro: '🚀',
  html: '🌐',
  css: '🎨',
  json: '📋',
  bash: '💻',
  python: '🐍',
  docker: '🐳',
  markdown: '📝',
  yaml: '⚙️',
  xml: '📄'
}

export const CodeBlockEnhanced: React.FC<CodeBlockEnhancedProps> = ({
  code,
  language,
  filename,
  showLineNumbers = true,
  maxLines,
  theme = 'auto',
  enableCollapse = true,
  enableExport = true,
  enableShare = true,
  className = ''
}) => {
  const [copied, setCopied] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(theme)
  const [isExpanded, setIsExpanded] = useState(false)
  const codeRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const lines = code.split('\n')
  const shouldCollapse = enableCollapse && maxLines && lines.length > maxLines
  const displayLines = shouldCollapse && !isExpanded ? lines.slice(0, maxLines) : lines

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }, [code])

  const exportCode = useCallback(() => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename || `code.${language}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [code, filename, language])

  const shareCode = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Code Snippet - ${language}`,
          text: code.slice(0, 100) + (code.length > 100 ? '...' : ''),
          url: window.location.href
        })
      } catch (err) {
        console.error('Failed to share code:', err)
      }
    } else {
      // Fallback: copy to clipboard
      copyToClipboard()
    }
  }, [code, language, copyToClipboard])

  const toggleTheme = useCallback(() => {
    const themes: Array<'light' | 'dark' | 'auto'> = ['light', 'dark', 'auto']
    const currentIndex = themes.indexOf(currentTheme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setCurrentTheme(nextTheme)
  }, [currentTheme])

  // 检测水平滚动
  useEffect(() => {
    const checkHorizontalScroll = () => {
      if (codeRef.current && containerRef.current) {
        const hasHorizontalScroll = codeRef.current.scrollWidth > codeRef.current.clientWidth
        containerRef.current.classList.toggle('has-horizontal-scroll', hasHorizontalScroll)
      }
    }

    checkHorizontalScroll()
    window.addEventListener('resize', checkHorizontalScroll)
    return () => window.removeEventListener('resize', checkHorizontalScroll)
  }, [displayLines])

  // 格式化代码行
  const formatCodeLines = (lines: string[]) => {
    return lines.map((line, index) => (
      <span key={index} className="line">
        {line || '\u00A0'}
      </span>
    ))
  }

  const getLanguageIcon = (lang: string) => {
    return languageIcons[lang.toLowerCase()] || '📄'
  }

  const getLineCount = () => {
    return displayLines.length
  }

  return (
    <div
      ref={containerRef}
      className={`code-block-container ${className}`}
      data-theme={currentTheme}
    >
      {/* 语言标签 */}
      <div className="code-language-label">
        <span className="language-icon">{getLanguageIcon(language)}</span>
        {language}
      </div>

      {/* 操作按钮组 */}
      <div className="absolute top-12 right-12 flex gap-2 z-20">
        {/* 主题切换按钮 */}
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 p-0 bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-accent/50 opacity-0 group-hover:opacity-100 transition-all duration-300"
          onClick={toggleTheme}
          title={`当前主题: ${currentTheme}`}
        >
          {currentTheme === 'light' && <Sun className="w-4 h-4" />}
          {currentTheme === 'dark' && <Moon className="w-4 h-4" />}
          {currentTheme === 'auto' && <Monitor className="w-4 h-4" />}
        </Button>

        {/* 导出按钮 */}
        {enableExport && (
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 p-0 bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-accent/50 opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={exportCode}
            title="导出代码"
          >
            <Download className="w-4 h-4" />
          </Button>
        )}

        {/* 分享按钮 */}
        {enableShare && (
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 p-0 bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-accent/50 opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={shareCode}
            title="分享代码"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        )}

        {/* 复制按钮 */}
        <Button
          variant={copied ? "default" : "ghost"}
          size="icon"
          className={`copy-button w-10 h-10 p-0 transition-all duration-300 ${
            copied ? 'bg-green-500 hover:bg-green-600 text-white' :
            'bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-accent/50 opacity-0 group-hover:opacity-100'
          }`}
          onClick={copyToClipboard}
          title={copied ? "已复制!" : "复制代码"}
        >
          <div className="copy-icon">
            <Copy className={`copy-svg w-5 h-5 ${copied ? 'hidden' : 'block'}`} />
            <Check className={`check-svg w-5 h-5 ${copied ? 'block' : 'hidden'}`} />
          </div>
        </Button>
      </div>

      {/* 文件名标签 */}
      {filename && (
        <div className="absolute top-12 left-12 z-10">
          <Badge variant="outline" className="text-xs bg-background/80 backdrop-blur-sm">
            📄 {filename}
          </Badge>
        </div>
      )}

      {/* 代码内容 */}
      <pre
        ref={codeRef}
        className={`language-${language}`}
        data-lines={getLineCount()}
      >
        <code>
          {formatCodeLines(displayLines)}
        </code>
      </pre>

      {/* 行数指示器 */}
      <div className="code-line-indicator">
        {getLineCount()} 行
      </div>

      {/* 展开/折叠按钮 */}
      {shouldCollapse && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <Button
            variant="outline"
            size="sm"
            className="bg-background/90 backdrop-blur-sm border border-border/50 hover:bg-accent/50 shadow-lg"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                收起
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                展开全部 ({lines.length} 行)
              </>
            )}
          </Button>
        </div>
      )}

      {/* 键盘快捷键提示 */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <Badge variant="glass" className="text-xs">
          Ctrl+C 复制 | Ctrl+S 导出
        </Badge>
      </div>
    </div>
  )
}