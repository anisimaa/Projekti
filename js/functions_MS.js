let listContainer
let draggableItem

function setup() {
    listContainer = document.querySelector('.js-list')

    if (!listContainer) return

    listContainer.addEventListener('mousedown', dragStart)

    document.addEventListener('mouseup', dragEnd)
}

function dragStart(e) {
    console.log('Drag start')

    document.addEventListener('mousemove', drag)
}

function drag(e) {
    console.log('Dragging')
}

function dragEnd() {
    console.log('Drag end')

    document.removeEventListener('mousemove', drag)
}

setup()