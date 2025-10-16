import React from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight, BookOpen, Code2, Sparkles } from 'lucide-react'

interface HeroProps {
  className?: string
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section className={`hero-section relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />

      {/* 装饰性背景元素 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* 顶部标签 */}
          <div className="flex justify-center">
            <Badge variant="glass" className="text-sm px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              技术博客 · 开发分享 · 学习记录
            </Badge>
          </div>

          {/* 主标题 */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                探索技术
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                分享智慧
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              专注于前端开发、服务器配置和网络技术的技术博客，
              记录学习历程，分享实战经验。
            </p>
          </div>

          {/* 统计数据 */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>50+ 技术文章</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              <span>10+ 技术分类</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>持续更新</span>
            </div>
          </div>

          {/* 行动按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="xl"
              className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                const element = document.getElementById('latest-posts')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              开始阅读
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="xl"
              className="border-2 hover:bg-accent/50 transition-all duration-300"
              onClick={() => {
                window.location.href = '/blog'
              }}
            >
              浏览所有文章
            </Button>
          </div>

          {/* 装饰性元素 */}
          <div className="flex justify-center gap-2 pt-8">
            <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-primary/20 rounded-full animate-bounce delay-200" />
          </div>
        </div>
      </div>

      {/* 底部渐变遮罩 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}

export default Hero