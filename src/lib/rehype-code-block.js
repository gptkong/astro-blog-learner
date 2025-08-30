import { visit } from 'unist-util-visit';

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

        // 创建新的包装结构
        const wrapper = {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['code-block-container']
          },
          children: [
            // 语言标签
            ...(language ? [{
              type: 'element',
              tagName: 'div',
              properties: {
                className: ['code-language-label']
              },
              children: [{ type: 'text', value: language }]
            }] : []),
            // 复制按钮
            {
              type: 'element',
              tagName: 'button',
              properties: {
                className: ['copy-button'],
                'data-code': codeText,
                title: '复制代码',
                'aria-label': '复制代码到剪贴板'
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
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round'
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
                }
              ]
            },
            // 原始的 pre 元素
            node
          ]
        };

        // 调整 pre 元素的样式，为语言标签留出空间
        if (language) {
          const codeElement = node.children[0];
          if (codeElement) {
            codeElement.properties = codeElement.properties || {};
            codeElement.properties.style = (codeElement.properties.style || '') + 'padding-top: 2rem;';
          }
        }

        // 替换原节点
        parent.children[index] = wrapper;
      }
    });
  };
}
