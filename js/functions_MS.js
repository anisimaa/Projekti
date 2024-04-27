let listContainer
let draggableItem
let items = []

let pointerSartX
let pointerStartY

//talletetaan kaikki elementit yhteen funktioon
function getAllItems() {
    if (!items?.length) {
        items = Array.from(listContainer.querySelectorAll('.js-item'))
    }
    return items
}

//erotellaan elementeistä vain ne, joita voi raahata
function getIdleItems() {
    return getAllItems().filter((item) => item.classList.contains('is-idle'))
}

//raahaus
function setup() {
    listContainer = document.querySelector('.js-list')

    if (!listContainer) return

    listContainer.addEventListener('mousedown', dragStart)

    document.addEventListener('mouseup', dragEnd)
}

//raahauksen aloitus
function dragStart(e) {
    if (e.target.classList.contains('js-drag-handle')) {
        draggableItem = e.target.closest('.js-item')
    }

    if (!draggableItem) return

    pointerSartX = e.clientX
    pointerStartY =e.clientY

    initDraggableItem()
    initItemState()

    document.addEventListener('mousemove', drag)
}

//mitä voi raahata
function drag(e) {
    console.log('Dragging')
    if(!draggableItem) return

    const currentPositionX = e.clientX
    const currentPositionY = e.clientY

    const pointerOffsetX = currentPositionX - pointerSartX
    const pointerOffsetY = currentPositionY - pointerStartY

    draggableItem.style.transform = `translate(${pointerOffsetX}px, ${pointerOffsetY}px)`

    updateIdleItemsStateAndPosition()
}

//palauttaa raahattavan elementin paikoilleen
function unsetDraggableItem() {
    draggableItem.style = null
    draggableItem.classList.remove('is-draggable')
    draggableItem.classList.add('is-idle')
    draggableItem = null
}

//raahauksen lopetus
function dragEnd() {
    console.log('Drag end')
    if(!draggableItem) return

    cleanup()
}

function cleanup() {
    unsetDraggableItem()

    
    document.removeEventListener('mousemove', drag)
}

function initDraggableItem() {
    draggableItem.classList.remove('is-idle')
    draggableItem.classList.add('is-draggable')
}

function initItemState() {
    getIdleItems().forEach((item, i) => {
        if (getAllItems().indexOf(draggableItem) > i) {
            item.dataset.isAbove = ''
        }
    })
}

function getIdleItems() {
    return getAllItems().filter((item) => item.classList.contains('is-idle'))
}

//elementtien siirtyminen, kun paikkaa vaihdetaan
function updateIdleItemsStateAndPosition() {
    const draggableItemRect = draggableItem.getBoundingClientRect()
    const draggableItemY =
        draggableItemRect.top + draggableItemRect.height / 2
    const ITEMS_GAP = 20

// elementin tila (onko paikkaa vaihdettu)
getIdleItems().forEach((item) => {
    const itemRect = item.getBoundingClientRect()
    const itemY = itemRect.top + itemRect.height / 2

    if (isItemAbove(item)) {
        if (draggableItemY <= itemY) {
            item.dataset.isToggled = ''
        } else {
            delete item.dataset.isToggled
        }
    } else {
        if (draggableItemY >= itemY) {
            item.dataset.isToggled = ''
        } else {
            delete item.dataset.isToggled
        }
    }
})

//elementin uusi positio
getIdleItems().forEach((item) => {
    if (isItemToggled(item)) {
        const direction = isItemAbove(item) ? 1 : -1
        item.style.transform = `translateY(${
            direction * (draggableItemRect.height + ITEMS_GAP)
        }px)`
    } else {
        item.style.transform = ''
    }
    })
}

function isItemAbove(item) {
    return item.hasAttribute('data-is-above')
}

function isItemToggled(item) {
    return item.hasAttribute('data-is-toggled')
}

setup()