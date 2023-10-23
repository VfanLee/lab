const btn = document.querySelector('.btn')
const content = document.querySelector('.detail .content')

/* 
  1. 将高度设置为 auto，获取动态高度值
  2. 再将高度设为 0，恢复初始化值
    tip：js在执行过程中，可能会改变 dom树，但是还来不及绘制，所以不用担心高度闪烁的情况
  3. 页面强行渲染
  4. 再将高度设为动态高度
*/
btn.addEventListener('mouseenter', e => {
  content.style.height = 'auto'
  const { height } = content.getBoundingClientRect()
  content.style.height = 0
  content.offsetHeight // 强行渲染
  content.style.height = height + 'px'
})

/* 
  鼠标移出只需要恢复初始值即可
 */
btn.addEventListener('mouseleave', e => {
  content.style.height = 0
})
