const $lastLi = $('.last')
const siteList = JSON.parse(localStorage.getItem('siteList')) || [   
    {logo: 'G', url: 'https://github.com'},
    {logo: 'J', url: 'https://juejin.cn'},
    {logo: 'V', url: 'https://v2ex.com/'},
    {logo: 'S', url: 'https://stackoverflow.com'},
    {logo: 'Z', url: 'https://www.zhihu.com'},
    {logo: 'I', url: 'https://www.iconfont.cn/'},
    {logo: 'E', url: 'https://echarts.apache.org'},
    {logo: 'J', url: 'https://jsbin.com'},
    {logo: 'D', url: 'https://developer.mozilla.org'}
]

const simplifyUrl = (url) =>{
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}

const render = () => {
    $('li:not(.last)').remove()
    siteList.forEach((node, index) => {
        let $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
                <div class="tip">可以按键盘上的字母打开我~</div>
            </div> 
        </li>`).insertBefore($lastLi)  
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() 
            siteList.splice(index, 1) 
            localStorage.setItem('siteList', JSON.stringify(siteList))
            render()
        }) 
        $li.on('click', '.tip', (e) => {
            e.stopPropagation() 
        }) 
    })  
}

render()

$('.addButton')
  .on('click',() => {
      let url = window.prompt('请输入以 https 或 http 开头的网址') 
      if (url.indexOf('http') === 0) {  
        siteList.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            url: url
        }) 
        localStorage.setItem('siteList', JSON.stringify(siteList))
        render()
      } else {
        window.alert('添加失败，请输入以 https 或 http 开头的网址') 
      }    
  })

$(document).on('keypress', (e) => {
    const {key} = e
    for (let i = 0; i < siteList.length; i++) {
        if (siteList[i].logo.toLowerCase() === key) {
            window.open(siteList[i].url)
        }
    }
})