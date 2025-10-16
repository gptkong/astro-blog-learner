import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  BookOpen,
  Code2,
  Server,
  Network,
  Terminal,
  Cpu,
  ArrowRight,
  TrendingUp
} from 'lucide-react'

interface FeatureGridProps {
  className?: string
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ className }) => {
  const features = [
    {
      icon: Code2,
      title: '前端开发',
      description: 'React、Vue、Astro等现代前端框架技术分享',
      tags: ['JavaScript', 'TypeScript', 'CSS'],
      href: '/tags/前端',
      color: 'text-blue-500'
    },
    {
      icon: Server,
      title: '服务器配置',
      description: 'Linux、Docker、虚拟化等技术实践经验',
      tags: ['Linux', 'Docker', 'PVE'],
      href: '/tags/服务器',
      color: 'text-green-500'
    },
    {
      icon: Network,
      title: '网络技术',
      description: 'VPN、代理、网络优化等网络配置教程',
      tags: ['VPN', '代理', '网络'],
      href: '/tags/网络',
      color: 'text-purple-500'
    },
    {
      icon: Terminal,
      title: '开发工具',
      description: 'IDE配置、命令行工具、开发环境优化',
      tags: ['VSCode', '工具', '效率'],
      href: '/tags/工具',
      color: 'text-orange-500'
    },
    {
      icon: Cpu,
      title: 'VPS评测',
      description: '云服务器评测、性能测试、性价比分析',
      tags: ['VPS', '评测', '性价比'],
      href: '/tags/VPS',
      color: 'text-red-500'
    },
    {
      icon: TrendingUp,
      title: '学习路线',
      description: '前端学习路径、面试准备、技能提升',
      tags: ['学习', '面试', '路线'],
      href: '/tags/学习',
      color: 'text-indigo-500'
    }
  ]

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            技术分类
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            探索
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent ml-3">
              技术领域
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            涵盖前端开发、服务器配置、网络技术等多个技术方向，
            为您提供全面的技术学习资源。
          </p>
        </div>

        {/* 功能卡片网格 */}
        <div className="feature-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card-container">
              <Card
                variant="elevated"
                hover
                className="feature-card cursor-pointer border-border/50 hover:border-primary/50 transition-all duration-300"
                onClick={() => {
                  window.location.href = feature.href
                }}
              >
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg bg-accent/50 flex items-center justify-center mb-4 card-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="card-title text-xl card-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        size="sm"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* 链接按钮 */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto hover:bg-transparent"
                  >
                    查看文章
                    <ArrowRight className="ml-1 w-4 h-4 card-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            </div>
          ))}
        </div>

        {/* 底部行动按钮 */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="group border-2 hover:bg-accent/50"
            onClick={() => {
              window.location.href = '/blog'
            }}
          >
            浏览所有文章
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeatureGrid