export default (DataModule = {})=>{

    let Stiker    = []
    fetch('./public/json/stiker.json')
        .then( res => res.json() )
        .then( data => Stiker = data)

    const imgIcon = icon => `<img src="public/img/icons/svg/${ icon }.svg" alt="icon-svg">`

    const ElementComponent = createHTML(`
        <div class="div_H8m7YkD">
            <div class="div_9w65NCd scroll-x">
                <div class="div_G533kHG">
                    <button type="button" data-action="favorite">${ imgIcon('icon-favorite-light') }</button>
                    <div class="div_zq2nbRg"></div>
                </div>
            </div>
            <div class="div_4m9E0dI scroll-y">
                <div class="div_K23c15w"></div>
            </div>
        </div>
    `)

    const findChild = query => ElementComponent.querySelector(query)

    const elementItemHead = findChild('.div_zq2nbRg')
    const elementItem = findChild('.div_K23c15w')
    const btnFavorite = findChild('button[data-action=favorite]')


    btnFavorite.addEventListener('click', ()=> loadDataBody())

    elementItemHead.addEventListener('click', e => {
        const button = e.target.closest('button')
        if(button) {
            const id = button.dataset.id

            const final = 25 * (parseInt(id) || 1)
            const inicio = final - 25

            renderData({ stiker : Stiker.slice(inicio, final) }) 
        }
    })

    elementItem.addEventListener('click', e => {
        const item = e.target.closest('.div_6dnYWBn')
        if(item) {

            dispatchEvent(new CustomEvent(DataModule.dispatch, { detail : {
                message : {
                        message : item.dataset.name,
                        type    : 'stiker'
                    }
            }}))
            
        }
    })

    const renderHTMLHead =(data)=>{
        const element = createHTML(`<button type="button" data-id="${ data.id }">${ data.id }</button>`)
        return element
    }


    const renderHTML =(data)=>{
        const element = createHTML(`
            <div class="div_6dnYWBn" data-name="${ data.name }"><img src="public/img/stiker/${ data.name }" alt="icon-stiker"></div>
        `)

        return element
    }

    const renderDataHead =(Data)=>{
        if(elementItemHead.children.length) {
            console.log('es mayor cero');
        } else {
            const elementTemp = document.createDocumentFragment()
            Data.stiker.forEach((data) => elementTemp.append(renderHTMLHead(data)));
            elementItemHead.append(elementTemp)
        }
    }

    const renderData =(Data)=>{
        const elementTemp = document.createDocumentFragment()
        Data.stiker.forEach((data) => elementTemp.append(renderHTML(data)));
        elementItem.innerHTML = ''
        elementItem.append(elementTemp)
    }

    const loadDataHead =()=>{
        const DataJSON = {
            stiker : JSON.parse(localStorage.getItem('stiker-collection')).filter(data => data.status)
        }
        renderDataHead(DataJSON)
    }

    loadDataHead()

    const loadDataBody =()=>{ 
        renderData({ stiker : JSON.parse(localStorage.getItem('stiker-favorite')) })
    } 

    
    loadDataBody()


    return ElementComponent
}

// import { dbFirebase } from "../firebase/data.js"

// export default ()=>{

//     // const db     = new dbFirebase('stream_chat')
//     // const params = json(sessionStorage.getItem('params'))
//     // const user   = json(localStorage.getItem('user'))

//     const ElementComponent = createHTML(`
//         <div>
//             <div class="scroll-y" data-css="contenedor_stiker">
//                 <div data-css="contenido_stiker">
//                     <div data-css="item_stiker"></div>  
//                 </div>
//             </div>
//         </div>
//     `)

//     const style = new createCSS('chat-stiker', ElementComponent)

//     const color_item    = 'var(--color-item)'  

//     style.css(`
//         & { position : absolute; inset : 0; background : rgb(0 0 0 / .3); display: grid }
//     `)

//     const contenedor_stiker = style.element('contenedor_stiker').css(`
//         & { 
             
//             width : 100%; 
//             height : 75%; 
//             background : ${ color_item };
//             align-self: end; 
//             align-self: flex-end;
//             border-radius:8px 8px 0 0; 
//         }
//     `)

//     const contenido_stiker = style.element('contenido_stiker').css(`
//         & { 
//             width : 100%; 
//             display: grid;
//             grid-template-columns: repeat(auto-fill, minmax(min(100%, 70px), 1fr));
//             padding : 15px;
//             gap : 15px;
//             overflow : hidden;
//         } 
//     `)

//     const item_stiker = style.element('item_stiker').css(`
//         & { 
//             aspect-ratio: 1/1; 
//             border-radius:8px;
//             overflow : hidden; 
//             display: flex;
//             cursor : pointer
//         } 

//         & img{
//             margin : auto;
//             max-width : 100%;
//             max-height: 100%; 
//             object-fit: cover;
//         }
//     `)

//     clickElement(ElementComponent, ()=> ElementComponent.remove())

//     contenido_stiker.element.addEventListener('click', e => {

//     })

//     clickElementclosest(contenido_stiker.element, `.${ item_stiker.className }`, target => {
     
//         dispatchEvent(new CustomEvent('set_message', { detail : {
//             message : {
//                 message : target.dataset.name,
//                 type    : 'stiker'
//             }
//         } }))

//         ElementComponent.remove()
//     })

//     fetch('./public/json/chat-stiker.json')
//     .then(res => res.json())
//     .then(data => contenido_stiker.element.innerHTML = ArrayToString(data, data => {
//         return `<div class="${ item_stiker.className }" data-name="${ data.name }" ><img src="public/img/stiker/${ data.name }"></div>`
//     }))

//     item_stiker.element.remove()
//     return ElementComponent
// }