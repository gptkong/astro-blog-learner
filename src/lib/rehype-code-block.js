import { visit } from 'unist-util-visit';

// 语言图标映射
function getLanguageIcon(language) {
  const icons = {
    javascript: '🟨',
    typescript: '🔷',
    python: '🐍',
    java: '☕',
    rust: '🦀',
    go: '🐹',
    php: '🐘',
    ruby: '💎',
    swift: '🦉',
    kotlin: '🎯',
    dart: '🎯',
    c: '⚙️',
    cpp: '⚙️',
    csharp: '🔷',
    html: '🌐',
    css: '🎨',
    scss: '🎨',
    sass: '🎨',
    vue: '💚',
    react: '⚛️',
    angular: '🅰️',
    svelte: '🧡',
    astro: '🚀',
    json: '📋',
    yaml: '📄',
    toml: '📄',
    xml: '📄',
    markdown: '📝',
    bash: '🐚',
    shell: '🐚',
    zsh: '🐚',
    powershell: '💙',
    sql: '🗄️',
    dockerfile: '🐳',
    nginx: '🌐',
    apache: '🪶',
    git: '🌿',
    vim: '💚',
    emacs: '💜',
    default: '📄'
  };

  return icons[language.toLowerCase()] || icons.default;
}

// 检测代码块是否应该折叠
function shouldCollapse(codeText, maxLines = 15) {
  const lines = codeText.split('\n');
  return lines.length > maxLines;
}

// 添加行号到代码
function addLineNumbers(codeText) {
  return codeText.split('\n').map((line, index) => {
    return `<span class="line">${line || '\u00A0'}</span>`;
  }).join('\n');
}

export function rehypeCodeBlock() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'pre' && node.children[0]?.tagName === 'code') {
        const codeNode = node.children[0];
        const language = codeNode.properties?.className?.[0]?.replace('language-', '') || '';
        
        // 获取代码文本内容
        let codeText = '';
        const extractText = (node) => {
          if (node.type === 'text') {
            return node.value;
          }
          if (node.children) {
            return node.children.map(extractText).join('');
          }
          return '';
        };
        codeText = extractText(codeNode);
        const lines = codeText.split('\n');
        const needsCollapse = shouldCollapse(codeText);

        // 创建增强的包装结构
        const wrapper = {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['code-block-container'],
            'data-language': language || 'text',
            'data-lines': lines.length,
            'data-theme': 'auto'
          },
          children: [
            // 主题切换按钮
            {
              type: 'element',
              tagName: 'button',
              properties: {
                className: ['theme-toggle-button'],
                title: '切换主题',
                'aria-label': '切换代码主题',
                type: 'button'
              },
              children: [
                {
                  type: 'element',
                  tagName: 'svg',
                  properties: {
                    width: '16',
                    height: '16',
                    viewBox: '0 0 24 24',
                    fill: 'none',
                    stroke: 'currentColor',
                    'stroke-width': '2'
                  },
                  children: [
                    {
                      type: 'element',
                      tagName: 'circle',
                      properties: {
                        cx: '12',
                        cy: '12',
                        r: '5'
                      }
                    }
                  ]
                }
              ]
            },
            // 语言标签（带图标）
            ...(language ? [{
              type: 'element',
              tagName: 'div',
              properties: {
                className: ['code-language-label']
              },
              children: [
                {
                  type: 'element',
                  tagName: 'span',
                  properties: {
                    className: ['language-icon']
                  },
                  children: [{ type: 'text', value: getLanguageIcon(language) }]
                },
                { type: 'text', value: ` ${language}` }
              ]
            }] : []),
            // 操作按钮组
            {
              type: 'element',
              tagName: 'div',
              properties: {
                className: ['code-actions']
              },
              children: [
                // 导出按钮
                {
                  type: 'element',
                  tagName: 'button',
                  properties: {
                    className: ['action-button', 'export-button'],
                    title: '导出代码',
                    'data-code': codeText,
                    'data-filename': `code.${language || 'txt'}`,
                    type: 'button'
                  },
                  children: [
                    {
                      type: 'element',
                      tagName: 'svg',
                      properties: {
                        width: '16',
                        height: '16',
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        stroke: 'currentColor',
                        'stroke-width': '2'
                      },
                      children: [
                        {
                          type: 'element',
                          tagName: 'path',
                          properties: {
                            d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'
                          }
                        },
                        {
                          type: 'element',
                          tagName: 'polyline',
                          properties: {
                            points: '7,10 12,15 17,10'
                          }
                        },
                        {
                          type: 'element',
                          tagName: 'line',
                          properties: {
                            x1: '12',
                            y1: '15',
                            x2: '12',
                            y2: '3'
                          }
                        }
                      ]
                    }
                  ]
                },
                // 增强版复制按钮
                {
                  type: 'element',
                  tagName: 'button',
                  properties: {
                    className: ['copy-button'],
                    'data-code': codeText,
                    title: '复制代码',
                    'aria-label': '复制代码到剪贴板',
                    type: 'button'
                  },
                  children: [
                    {
                      type: 'element',
                      tagName: 'span',
                      properties: {
                        className: ['copy-icon']
                      },
                      children: [
                        {
                          type: 'element',
                          tagName: 'svg',
                          properties: {
                            width: '18',
                            height: '18',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            'stroke-width': '2',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            className: ['copy-svg']
                          },
                          children: [
                            {
                              type: 'element',
                              tagName: 'rect',
                              properties: {
                                width: '14',
                                height: '14',
                                x: '8',
                                y: '8',
                                rx: '2',
                                ry: '2'
                              }
                            },
                            {
                              type: 'element',
                              tagName: 'path',
                              properties: {
                                d: 'm4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2'
                              }
                            }
                          ]
                        },
                        {
                          type: 'element',
                          tagName: 'svg',
                          properties: {
                            width: '18',
                            height: '18',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            'stroke-width': '2',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            className: ['check-svg'],
                            style: 'display: none;'
                          },
                          children: [
                            {
                              type: 'element',
                              tagName: 'path',
                              properties: {
                                d: 'm9 12 2 2 4-4'
                              }
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            // 键盘快捷键提示
            {
              type: 'element',
              tagName: 'div',
              properties: {
                className: ['keyboard-hint']
              },
              children: [
                {
                  type: 'element',
                  tagName: 'span',
                  properties: {
                    className: ['kbd']
                  },
                  children: [{ type: 'text', value: 'Ctrl+C' }]
                },
                { type: 'text', value: ' 复制 ' },
                {
                  type: 'element',
                  tagName: 'span',
                  properties: {
                    className: ['kbd']
                  },
                  children: [{ type: 'text', value: 'Ctrl+S' }]
                },
                { type: 'text', value: ' 导出' }
              ]
            },
            // 原始的 pre 元素（增强处理）
            {
              ...node,
              properties: {
                ...node.properties,
                className: [...(node.properties?.className || []), 'enhanced-pre'],
                'data-lines': lines.length
              },
              children: [
                {
                  ...codeNode,
                  children: codeNode.children.map(child => {
                    if (child.type === 'text') {
                      return {
                        ...child,
                        value: addLineNumbers(child.value)
                      };
                    }
                    return child;
                  })
                }
              ]
            },
            // 代码行数指示器
            {
              type: 'element',
              tagName: 'div',
              properties: {
                className: ['code-line-indicator']
              },
              children: [
                { type: 'text', value: `${lines.length} 行` }
              ]
            },
            // 展开/折叠按钮（如果需要）
            ...(needsCollapse ? [{
              type: 'element',
              tagName: 'div',
              properties: {
                className: ['code-expand-container']
              },
              children: [
                {
                  type: 'element',
                  tagName: 'button',
                  properties: {
                    className: ['expand-button'],
                    'data-collapsed': 'true',
                    'data-total-lines': lines.length,
                    type: 'button'
                  },
                  children: [
                    {
                      type: 'element',
                      tagName: 'svg',
                      properties: {
                        width: '16',
                        height: '16',
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        stroke: 'currentColor',
                        'stroke-width': '2',
                        className: ['expand-icon']
                      },
                      children: [
                        {
                          type: 'element',
                          tagName: 'polyline',
                          properties: {
                            points: '6,9 12,15 18,9'
                          }
                        }
                      ]
                    },
                    { type: 'text', value: ` 展开全部 (${lines.length} 行)` }
                  ]
                }
              ]
            }] : [])
          ]
        };

        // 替换原节点
        parent.children[index] = wrapper;
      }
    });
  };
}
