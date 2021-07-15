const $lastLi = $('.last')

const siteList = JSON.parse(localStorage.getItem('siteList')) || [   
    {logo: 'G', url: 'https://github.com'},
    {logo: 'J', url: 'https://juejin.cn'},
    {logo: 'I', url: 'https://www.iconfont.cn'},
    {logo: 'S', url: 'https://stackoverflow.com'}
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
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
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
    })   
}

render()

$('.addButton')
  .on('click',() => {
      let url = window.prompt('请输入要添加的网址') 
      if (url.indexOf('http') !== 0) {  
          url = 'https://' + url
      } 
      siteList.push({
          logo: simplifyUrl(url)[0].toUpperCase(),
          url: url
      }) 
      localStorage.setItem('siteList', JSON.stringify(siteList))
      render()
  })

$(document).on('keypress', (e) => {
    const {key} = e
    for (let i = 0; i < siteList.length; i++) {
        if (siteList[i].logo.toLowerCase() === key) {
            window.open(siteList[i].url)
        }
    }
})