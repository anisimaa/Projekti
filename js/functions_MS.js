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
    console.log('Drag start')

    if(e.target.classList.contains('js-drag-handle')) {
        draggableItem = e.target.closest('.js-item')
    }

    if (!draggableItem) return

    initDraggableItem()

    document.addEventListener('mousemove', drag)
}

function drag(e) {
    console.log('Dragging')
}

function dragEnd() {
    console.log('Drag end')

    document.removeEventListener('mousemove', drag)
}

function initDraggableItem() {
    draggableItem.classList.remove('is-idle')
    draggableItem.classList.add('is-draggable')
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

setup()