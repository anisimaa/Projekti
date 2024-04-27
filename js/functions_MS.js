let listContainer
let draggableItem

let pointerSartX
let pointerStartY

function setup() {
    listContainer = document.querySelector('.js-list')

    if (!listContainer) return

    listContainer.addEventListener('mousedown', dragStart)

    document.addEventListener('mouseup', dragEnd)
}

function dragStart(e) {
    if (e.target.classList.contains('js-drag-handle')) {
        draggableItem = e.target.closest('.js-item')
    }

    if (!draggableItem) return

    pointerSartX = e.clientX
    pointerStartY =e.clientY

    initDraggableItem()

    document.addEventListener('mousemove', drag)
}

function drag(e) {
    console.log('Dragging')
    if(!draggableItem) return

    const currentPositionX = e.clientX
    const currentPositionY = e.clientY

    const pointerOffsetX = currentPositionX - pointerSartX
    const pointerOffsetY = currentPositionY - pointerStartY

    draggableItem.style.transform = `translate(${pointerOffsetX}px, ${pointerOffsetY}px)`
}

function unsetDraggableItem() {
    draggableItem.style = null
    draggableItem.classList.remove('is-draggable')
    draggableItem.classList.add('is-idle')
    draggableItem = null
}

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

setup()