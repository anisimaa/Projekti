//<--Pisteiden lasku ja oikea järjestys-->
var pisteet;
var oikein = [];

//lista pelin juomista ja niiden valmistusvaiheet
const juomat = [
	{
		"nimi": "mocha latte",
		"kuva": "url",
		"vaiheet": [
			'Lisää suklaakastike',
			'Valuta espresso',
			'Vaahdota maito',
			'Koristele'
		]
	}, {
		"nimi": "cappuccino",
		"kuva": "url",
		"vaiheet": [
			'Valuta espresso',
			'Vaahdota maito',
			'Kaada maitovaahto',
			'Latteart'
		]
	}
]

//talletetaan saadut pisteet local storageen
if (localStorage.pisteet) {
	pisteet = localStorage.pisteet;
} else {
	pisteet = 0;
}


randomizeOptions();
function randomizeOptions() {
	//haetaan listata satunnainen juoma ja sen tiedot
	var randomJuoma = juomat[Math.floor(Math.random() * juomat.length)];
	oikein = randomJuoma["vaiheet"];

	//lisätään juoman nimi tehtävän ohjeistukseen
	document.getElementById("juoma").innerHTML = randomJuoma["nimi"] + "n"

	//haetaan ja randomisoidaan listan elementit
	var children = getChildren("lista");
	children = shuffleArray(children);

	//lisätään tietyn juoman valmistuvaiheet elementteihin
	for (var i = 0; i < children.length; i++) {
		children[i].innerHTML += randomJuoma["vaiheet"][i]
	}
}

//funktio, joka sekoittaa listan
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

//funktio palauttaa parent-divin (idn perusteella) sisällä olevat elementit
function getChildren(parent) {
	return document.getElementById(parent).children;
}

//funktio tarkistaa, onko valmistusvaiheet oikeassa järjestyksessä (oikea järjestys rivillä 40)
function checkOrder() {
	var children = getChildren("lista")

	//pisteiden lasku
	for (var i = 0; i < children.length; i++) {
		if (children[i].innerHTML.includes(oikein[i])) {
			pisteet++;
		}
	}
	document.getElementById("viesti").innerHTML = "Pisteitä: " + pisteet;
	localStorage.pisteet = pisteet;
}



//<--Nimetään muuttujat-->

//listContainer sisältää listan järjestettävistä elementeistä
let listContainer

//muuttuja elementille, jota liikutetaan
let draggableItem

//muuttujat kursorin koordinaateille
let pointerStartX
let pointerStartY

let itemsGap = 0

//muuttuja listalle, jonka elementit järjestetään
let items = []


let prevRect = {}

//<--Funktiot-->

//talletetaan kaikki elementit yhteen funktioon, joka palauttaa elementit items-listamuuttujaan
function getAllItems() {
	if (!items?.length) {
		items = Array.from(listContainer.querySelectorAll('.js-item'))
	}
	return items
}

//funktio palauttaa elementit, jotka eivät ole raahauksessa ("is-idle")
function getIdleItems() {
	return getAllItems().filter((item) => item.classList.contains('is-idle'))
}

//onko elementillä "data-is-above"-atribuutti
function isItemAbove(item) {
	return item.hasAttribute('data-is-above')
}
//onko elementillä "data-is-toggled"-atribuutti
function isItemToggled(item) {
	return item.hasAttribute('data-is-toggled')
}

//alustetaan kaikki toiminnot 
function setup() {
	listContainer = document.querySelector('.js-list')

	if (!listContainer) return									//jos ei parent-diviä löydy, return

	listContainer.addEventListener('mousedown', dragStart)
	listContainer.addEventListener('touchstart', dragStart)

	document.addEventListener('mouseup', dragEnd)
	document.addEventListener('touchend', dragEnd)
}

//<--raahauksen aloitusfunktio-->

function dragStart(e) {
	if (e.target.classList.contains('js-drag-handle')) {			//elementti on	raahattava, jos sillä on js-drag-handle -luokka
		draggableItem = e.target.closest('.js-item')				//asetetaan muuttujaan lähin elementti, jolla on .js-item -luokka
	}

	if (!draggableItem) return									//jos elementtiä ei löydy, return

	pointerStartX = e.clientX || e.touches?.[0]?.clientX			//kursorin koordinaatit, toiminta myös kosketusnäytöllä
	pointerStartY = e.clientY || e.touches?.[0]?.clientY

	setItemsGap()
	disablePageScroll()
	initDraggableItem()
	initItemsState()
	prevRect = draggableItem.getBoundingClientRect()

	document.addEventListener('mousemove', drag)
	document.addEventListener('touchmove', drag, { passive: false })
}

//laksetaan liikutettavien elementtien välin suuruuden
function setItemsGap() {
	if (getIdleItems().length <= 1) {
		itemsGap = 0
		return
	}

	const item1 = getIdleItems()[0]
	const item2 = getIdleItems()[1]

	const item1Rect = item1.getBoundingClientRect()
	const item2Rect = item2.getBoundingClientRect()

	itemsGap = Math.abs(item1Rect.bottom - item2Rect.top)
}

//estetään sivun vieritys
function disablePageScroll() {
	document.body.style.overflow = 'hidden'
	document.body.style.touchAction = 'none'
	document.body.style.userSelect = 'none'
}

//nollataan attribuutit
function initItemsState() {
	getIdleItems().forEach((item, i) => {
		if (getAllItems().indexOf(draggableItem) > i) {
			item.dataset.isAbove = ''
		}
	})
}

//raahauksen aloitus, luokat
function initDraggableItem() {
	draggableItem.classList.remove('is-idle')
	draggableItem.classList.add('is-draggable')
}


//raahausfunktio
function drag(e) {
	if (!draggableItem) return			//jos raahattavaa elementtiä ei löydy, return

	e.preventDefault()

	const clientX = e.clientX || e.touches[0].clientX
	const clientY = e.clientY || e.touches[0].clientY

	const pointerOffsetX = clientX - pointerStartX
	const pointerOffsetY = clientY - pointerStartY

	draggableItem.style.transform = `translate(${pointerOffsetX}px, ${pointerOffsetY}px)`			//raahattava elementti liikuu kursorin mukana

	updateIdleItemsStateAndPosition()
}

function updateIdleItemsStateAndPosition() {
	const draggableItemRect = draggableItem.getBoundingClientRect()
	const draggableItemY = draggableItemRect.top + draggableItemRect.height / 2

	// elementin tila
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

	// elementin uusi positio
	getIdleItems().forEach((item) => {
		if (isItemToggled(item)) {
			const direction = isItemAbove(item) ? 1 : -1			//
			item.style.transform = `translateY(${direction * (draggableItemRect.height + itemsGap)
				}px)`
		} else {
			item.style.transform = ''
		}
	})
}

// raahauksen lopetus
function dragEnd(e) {
	if (!draggableItem) return

	applyNewItemsOrder(e)
	cleanup()
}

// elementtien uusi järjestys
function applyNewItemsOrder(e) {
	const reorderedItems = []

	getAllItems().forEach((item, index) => {
		if (item === draggableItem) {
			return
		}
		if (!isItemToggled(item)) {
			reorderedItems[index] = item
			return
		}
		const newIndex = isItemAbove(item) ? index + 1 : index - 1
		reorderedItems[newIndex] = item
	})

	for (let index = 0; index < getAllItems().length; index++) {
		const item = reorderedItems[index]
		if (typeof item === 'undefined') {
			reorderedItems[index] = draggableItem
		}
	}

	reorderedItems.forEach((item) => {
		listContainer.appendChild(item)
	})

	draggableItem.style.transform = ''

	requestAnimationFrame(() => {
		const rect = draggableItem.getBoundingClientRect()
		const yDiff = prevRect.y - rect.y
		const currentPositionX = e.clientX || e.changedTouches?.[0]?.clientX
		const currentPositionY = e.clientY || e.changedTouches?.[0]?.clientY

		const pointerOffsetX = currentPositionX - pointerStartX
		const pointerOffsetY = currentPositionY - pointerStartY

		draggableItem.style.transform = `translate(${pointerOffsetX}px, ${pointerOffsetY + yDiff
			}px)`
		requestAnimationFrame(() => {
			unsetDraggableItem()
		})
	})
}

//nollataan elementin tila
function cleanup() {
	itemsGap = 0
	items = []
	unsetItemState()
	enablePageScroll()

	document.removeEventListener('mousemove', drag)
	document.removeEventListener('touchmove', drag)
}

//raahauksen lopetus, luokat
function unsetDraggableItem() {
	draggableItem.style = null
	draggableItem.classList.remove('is-draggable')
	draggableItem.classList.add('is-idle')
	draggableItem = null
}

//poistetaan väliaikaiset attribuutit
function unsetItemState() {
	getIdleItems().forEach((item, i) => {
		delete item.dataset.isAbove
		delete item.dataset.isToggled
		item.style.transform = ''
	})
}

//aktivoidaan sivun vieritys
function enablePageScroll() {
	document.body.style.overflow = ''
	document.body.style.touchAction = ''
	document.body.style.userSelect = ''
}

setup()
