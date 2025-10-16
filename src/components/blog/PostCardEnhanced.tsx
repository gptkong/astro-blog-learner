import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Calendar, Clock, ArrowRight, Eye } from 'lucide-react'
import type { CollectionEntry } from 'astro:content'

interface PostCardEnhancedProps {
  post: CollectionEntry<'blog'>
  className?: string
  showDescription?: boolean
  variant?: 'default' | 'featured' | 'compact'
}

const PostCardEnhanced: React.FC<PostCardEnhancedProps> = ({
  post,
  className,
  showDescription = true,
  variant = 'default'
}) => {
  const { data, slug } = post
  const { title, description, pubDate, updatedDate, tags, heroImage } = data

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const getReadingTime = () => {
    // 估算阅读时间（假设每分钟200字）
    const wordsPerMinute = 200
    const wordCount = description?.length || 0
    const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute))
    return `${readingTime} 分钟阅读`
  }

  const getCardVariant = () => {
    switch (variant) {
      case 'featured':
        return 'elevated'
      case 'compact':
        return 'outlined'
      default:
        return 'default'
    }
  }

  const getCardSize = () => {
    switch (variant) {
      case 'featured':
        return 'md:col-span-2 lg:col-span-2'
      case 'compact':
        return 'md:col-span-1 lg:col-span-1'
      default:
        return 'md:col-span-1 lg:col-span-1'
    }
  }

  return (
    <Card
      variant={getCardVariant()}
      hover
      className={`post-card cursor-pointer overflow-hidden ${getCardSize()} ${className}`}
      onClick={() => {
        window.location.href = `/blog/${slug}`
      }}
    >
      {/* Hero图片 */}
      {heroImage && variant === 'featured' && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover post-card-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          {variant === 'featured' && (
            <Badge className="absolute top-4 left-4" variant="secondary">
              精选文章
            </Badge>
          )}
        </div>
      )}

      <CardHeader className={heroImage && variant === 'featured' ? '-mt-8' : ''}>
        <div className="space-y-3">
          {/* 标签 */}
          <div className="flex flex-wrap gap-2">
            {tags?.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                size="sm"
                className="text-xs"
              >
                {tag}
              </Badge>
            ))}
            {tags && tags.length > 3 && (
              <Badge variant="outline" size="sm" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>

          {/* 标题 */}
          <CardTitle className={`post-card-hover:text-primary transition-colors ${
            variant === 'featured' ? 'text-2xl' : 'text-xl'
          }`}>
            {title}
          </CardTitle>

          {/* 描述 */}
          {showDescription && description && (
            <CardDescription className={`leading-relaxed ${
              variant === 'compact' ? 'line-clamp-2' : 'line-clamp-3'
            }`}>
              {description}
            </CardDescription>
          )}

          {/* 元信息 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={pubDate.toISOString()}>
                {formatDate(pubDate)}
              </time>
            </div>

            {updatedDate && updatedDate > pubDate && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <time dateTime={updatedDate.toISOString()}>
                  更新于 {formatDate(updatedDate)}
                </time>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{getReadingTime()}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      {variant !== 'compact' && (
        <CardContent className="pt-0">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto hover:bg-transparent"
          >
            阅读全文
            <ArrowRight className="ml-1 w-4 h-4 post-card-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      )}
    </Card>
  )
}

export default PostCardEnhanced