const $lastLi = $('.last')
const siteList = JSON.parse(localStorage.getItem('siteList')) || [   
    {logo: 'G', url: 'https://github.com'},
    {logo: 'J', url: 'https://juejin.cn'},
    {logo: 'Z', url: 'https://www.zhihu.com'},
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
        let $li = null
        let defaultUrl = ['github.com', 'juejin.cn', 'zhihu.com', 'stackoverflow.com']
        let url = simplifyUrl(node.url)
        if(defaultUrl.indexOf(url) !== -1) {
            $li = $(`<li>
                <div class="site">
                    <div class="logo">
                        <img class="x" src="https://${url}/favicon.ico">
                    </div>
                    <div class="link">${url}</div>
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div> 
            </li>`).insertBefore($lastLi)                  
        } else {
            $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${url}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div> 
        </li>`).insertBefore($lastLi) 
        }
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

const render2 = () => {
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
            render2()
        })  
    })   
}

render()

$("img").on("error", render2)

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
      $("img").on("error", render2)
  })

$(document).on('keypress', (e) => {
    const {key} = e
    for (let i = 0; i < siteList.length; i++) {
        if (siteList[i].logo.toLowerCase() === key) {
            window.open(siteList[i].url)
        }
    }
})