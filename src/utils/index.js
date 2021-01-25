
export function filterEditor(params) {
  return params.replace(/<[^>]+>/g, '')
}
export const articleType = [
  {
    name: '专栏',
    value: 'zl',
  },
  {
    name: '技术',
    value: 'js',
  },
  {
    name: '生活',
    value: 'sh',
  },
]

export const testUrl = 'http://localhost:3000';
