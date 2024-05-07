//funktio lisää pelikohtaiset pisteet local storageen pelin id:n mukaiseen kohtaan
function updateScore(peliId, pisteet) {
	localStorage.setItem("peli" + peliId, pisteet)
}
updateScore(3, 0)

//<--Pisteiden lasku ja oikea järjestys-->
var pisteet;
var oikein = [];

//lista pelin juomista ja niiden valmistusvaiheet
const juomat = [
	{
		"nimi": "mocha latte",
		"kuva": "../img/mochalatte.png",
		"vaiheet": [
			'Lisää suklaakastike',
			'Valuta espresso',
			'Vaahdota maito',
			'Koristele'
		]
	},
	{
		"nimi": "cappuccino",
		"kuva": "../img/cappuccino.png",
		"vaiheet": [
			'Valuta espresso',
			'Vaahdota maito',
			'Kaada maitovaahto',
			'Latte art'
		]
	},
	{
		"nimi": "caramel jäälatte",
		"kuva": "../img/jaalatte.png",
		"vaiheet": [
			'Lisää caramelkastike lasin reunoille',
			'Lisää jäät',
			'Lisää maito',
			'Lisää espresso'
		]
	},
	{
		"nimi": "kaakao",
		"kuva": "../img/kaakao.png",
		"vaiheet": [
			'Sekoita kaakaojauhe pieneen määrään vettä',
			'Vaahdota maito',
			'Kaada maito, jätä ohut vaahtokerros',
			'Koristele'
		]
	}
]



randomizeOptions();
function randomizeOptions() {
	//haetaan listalta satunnainen juoma ja sen tiedot
	var randomJuoma = juomat[Math.floor(Math.random() * juomat.length)];
	oikein = randomJuoma["vaiheet"];

	//lisätään juoman nimi tehtävän ohjeistukseen
	document.getElementById("juoma").innerHTML = randomJuoma["nimi"] + "n"
	document.getElementById("kuva").src = randomJuoma["kuva"];

	//haetaan ja randomisoidaan listan elementit
	var children = ['lista1', 'lista2', 'lista3', 'lista4']
	var shuffledChildren = shuffleArray(children);

	//lisätään tietyn juoman valmistuvaiheet elementteihin
	for (var i = 0; i < shuffledChildren.length; i++) {
		document.getElementById(children[i]).innerHTML += randomJuoma["vaiheet"][i]
	}
}

// funktio, joka sekoittaa listan
function shuffleArray(arr) {
    for (i = 0; i < arr.length; i++) {
        x = Math.floor(Math.random() * arr.length);
        y = Math.floor(Math.random() * arr.length);
        if (x === y) {
            continue;
        }
        temp0 = arr[x];
        arr[x] = arr[y];
        arr[y] = temp0;
    }
    return arr
}

// funktio palauttaa id:n perusteella parent-divin sisällä olevien elementtien idt
function getChildren(parent) {
	var children = document.getElementById(parent).children;
	var childrenIds = [];

	for (i = 0; i < children.length; i++) {
		childrenIds.push(children[i].id)
	}
	return childrenIds
}

// funktio tarkistaa, onko valmistusvaiheet oikeassa järjestyksessä (oikea järjestys rivillä 40)
function checkOrder() {
	var children = getChildren("lista");
	var child = "";
	var pisteet = 0;
	// pisteiden lasku
	for (var i = 0; i < children.length; i++) {
		child = document.getElementById(children[i])
		child.classList.remove("js-item")
		if (child.innerHTML.includes(oikein[i])) {
			pisteet++;
			child.style.backgroundColor = "#d5e7b8"
		} else {
			child.style.backgroundColor = "#feb5b1"
		}
	}
	
	var viesti = "";
	if (pisteet === 1) {
		viesti = "Sait yhden oikein!";
	} else if (pisteet === 2) {
		viesti = "Sait kaksi oikein!";
	} else if (pisteet === 3) {
		viesti = "Sait kolme oikein!";
	} else if (pisteet === 4) {
		viesti = "Sait kaikki oikein!";
	} else {
		viesti = "Pieleen meni!";
	}

	var viestispan = document.createElement("span");
	document.querySelector("#lista").appendChild(viestispan);
	viestispan.innerHTML = viesti
	document.querySelector("#teksti").innerHTML = "";
	updateScore(3, pisteet)
	
	document.querySelector(".seuraava").innerHTML = "Seuraava";
	document.querySelector(".seuraava").setAttribute("onClick", "location.href = '../html/pelisivu_NH.html'" );

}



/*drag-to-reorder

https://github.com/TahaSh/drag-to-reorder

MIT License

Copyright (c) 2023 Taha Shashtari

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/



// <--Nimetään muuttujat-->

// listContainer sisältää listan järjestettävistä elementeistä
let listContainer

// muuttuja elementille, jota liikutetaan
let draggableItem

// muuttujat kursorin koordinaateille
let pointerStartX
let pointerStartY

let itemsGap = 0

// muuttuja listalle, jonka elementit järjestetään
let items = []


let prevRect = {}

// <--Funktiot-->

// talletetaan kaikki elementit yhteen funktioon, joka palauttaa elementit items-listamuuttujaan
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

	if (!listContainer) return										//jos parent-diviä ei löydy, return

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

	if (!draggableItem) return										//jos elementtiä ei löydy, return

	pointerStartX = e.clientX || e.touches?.[0]?.clientX			//kursorin koordinaatit, toiminta myös kosketusnäytöllä
	pointerStartY = e.clientY || e.touches?.[0]?.clientY

	setItemsGap()
	initDraggableItem()
	initItemsState()
	prevRect = draggableItem.getBoundingClientRect()

	document.addEventListener('mousemove', drag)
	document.addEventListener('touchmove', drag, { passive: false })
}

// lasketaan liikutettavien elementtien välin suuruuden
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

// nollataan attribuutit
function initItemsState() {
	getIdleItems().forEach((item, i) => {
		if (getAllItems().indexOf(draggableItem) > i) {
			item.dataset.isAbove = ''
		}
	})
}

// raahauksen aloitus, luokat
function initDraggableItem() {
	draggableItem.classList.remove('is-idle')
	draggableItem.classList.add('is-draggable')
}


// <--raahausfunktio-->
function drag(e) {
	if (!draggableItem) return																		// jos raahattavaa elementtiä ei löydy, return

	e.preventDefault()

	const clientX = e.clientX || e.touches[0].clientX
	const clientY = e.clientY || e.touches[0].clientY

	const pointerOffsetX = clientX - pointerStartX
	const pointerOffsetY = clientY - pointerStartY

	draggableItem.style.transform = `translate(${pointerOffsetX}px, ${pointerOffsetY}px)`			// raahattava elementti liikuu kursorin mukana

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

// nollataan elementin tila
function cleanup() {
	itemsGap = 0
	items = []
	unsetItemState()
	enablePageScroll()

	document.removeEventListener('mousemove', drag)
	document.removeEventListener('touchmove', drag)
}

// raahauksen lopetus, luokat
function unsetDraggableItem() {
	draggableItem.style = null
	draggableItem.classList.remove('is-draggable')
	draggableItem.classList.add('is-idle')
	draggableItem = null
}

// poistetaan väliaikaiset attribuutit
function unsetItemState() {
	getIdleItems().forEach((item, i) => {
		delete item.dataset.isAbove
		delete item.dataset.isToggled
		item.style.transform = ''
	})
}

// aktivoidaan sivun vieritys
function enablePageScroll() {
	document.body.style.overflow = ''
	document.body.style.touchAction = ''
	document.body.style.userSelect = ''
}

setup()