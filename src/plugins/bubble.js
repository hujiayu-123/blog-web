window.bubble = function(status) {
  if (status) {
    clearInterval(timer)
    let bubbleDom = document.querySelector('.bubbleDom')
    bubbleDom.remove()
    return
  }
  let div = document.createElement('div')
  div.className = 'bubbleDom'
  window.document.body.appendChild(div)
  let bubbleDom = document.querySelector('.bubbleDom')
  let width = document.documentElement.scrollWidth || document.body.scrollWidth
  let height =
    document.documentElement.scrollHeight || document.body.scrollHeight
  function drawBubble() {
    let leftPos = Math.floor(Math.random() * width + 1) // 生成元素随机位置
    let interval = Math.floor(Math.random() * 40 + 10) // 生成随机速度
    let itemDomSize = Math.floor(Math.random() * 30 + 10) // 生成元素大小
    let removeHeight = Math.floor(
      // 生成指定高度删除
      Math.random() * (height - 50) + 50
    )
    let bubbleItemDom = document.createElement('div')
    bubbleItemDom.className = 'bubbleItemDom'
    bubbleItemDom.style.bottom = '0px'
    bubbleItemDom.style.left = leftPos + 'px'
    bubbleItemDom.style.width = itemDomSize + 'px'
    bubbleItemDom.style.height = itemDomSize + 'px'
    if (itemDomSize % 5 === 0) {
      // 条件符合的话给个气泡头像
      bubbleItemDom.className = 'bubbleItemDom-a'
    }
    bubbleDom.appendChild(bubbleItemDom)
    let pos = 0
    setInterval(() => {
      pos++
      bubbleItemDom.style.bottom = pos + 'px'
      if (pos === removeHeight) {
        bubbleItemDom.remove()
      }
    }, interval)
  }
  for (var i = 0; i < 50; i++) {
    drawBubble()
  }
  var timer = setInterval(() => {
    drawBubble()
  }, 100)
}
