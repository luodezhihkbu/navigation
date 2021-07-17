const $lastLi = $('.last')
const siteList = JSON.parse(localStorage.getItem('siteList')) || [   
    {logo: 'G', url: 'https://github.com'},
    {logo: 'G', url: 'https://gitee.com'},
    {logo: 'J', url: 'https://juejin.cn'},
    {logo: 'S', url: 'https://stackoverflow.com'},
    {logo: 'Z', url: 'https://www.zhihu.com'},
    {logo: 'T', url: 'https://www.typescriptlang.org'},
    {logo: 'S', url: 'https://sass.bootcss.com'},
    {logo: 'D', url: 'https://developer.mozilla.org'},
    {logo: 'E', url: 'https://echarts.apache.org'},
    {logo: 'J', url: 'https://jsbin.com'}
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
                <div class="logo">
                    <img class="${index}" src="${node.url}/favicon.ico" loading="lazy"> 
                </div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div> 
        </li>`).insertBefore($lastLi)  
        $(`.${index}`).on('error', function() {
            $(`.${index}`).replaceWith(`<div>${node.logo}</div>`)
        })
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