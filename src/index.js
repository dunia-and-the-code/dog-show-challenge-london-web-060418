//define URL
const dogsURL = "http://localhost:3000/dogs"
//query everything needed
const formEl = document.querySelector("#dog-form")
const tableBodyEl = document.querySelector("#table-body")
const nameInput = document.querySelector("input[name=name]")
const breedInput = document.querySelector("input[name=breed]")
const sexInput = document.querySelector("input[name=sex]")
const idInput = document.querySelector("input[name=id]")

//init function
function init() {
  getDogs()
}

//get dogs from server
function getDogs() {
  fetch(dogsURL)
    .then(resp => resp.json())
    .then(renderDogs)
}

//render one dog
function renderDog(dog) {
  //create the table elements
  const dogRow = document.createElement("tr")
  dogRow.setAttribute("id", `dog-row-${dog.id}`) //inorder to be able to grab rows to update on page

  const dogName = document.createElement("td")
  dogName.setAttribute("class", "row-name")
  dogName.innerText = dog.name
  // debugger
  const dogBreed = document.createElement("td")
  dogBreed.setAttribute("class", "row-breed")
  dogBreed.innerText = dog.breed

  const dogSex = document.createElement("td")
  dogSex.setAttribute("class", "row-sex")
  dogSex.innerText = dog.sex

  const dogEditButton = document.createElement("td")

  const updateBtn = document.createElement("button")

  updateBtn.innerText = "Edit"
  //update button eventListener will go here
  updateBtn.addEventListener("click", () => {
    selectDog(dog)
  })

  //append all elements
  dogRow.append(dogName)
  dogRow.append(dogBreed)
  dogRow.append(dogSex)
  dogEditButton.append(updateBtn)
  dogRow.append(dogEditButton)
  tableBodyEl.append(dogRow)
}

//render all dogs
function renderDogs(dogs) {
  tableBodyEl.innerHTML = ""
  dogs.forEach(dog => renderDog(dog))
}

//populate update form
function populateForm(dog) {
  nameInput.value = dog.name
  breedInput.value = dog.breed
  sexInput.value = dog.sex
  idInput.value = dog.id
}

//update dog to server
function updateDogOnServer(dog) {
  fetch(`${dogsURL}/${dog.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dog)
  }).then(() => getDogs())
}

//update dog to page
function updateDogOnPage(dog) {
  const trEl = document.querySelector(`#dog-row-${dog.id}`)
}

//form eventListener
function addFormEventListner() {
  formEl.addEventListener("submit", e => {
    e.preventDefault()

    const dog = {
      name: nameInput.value,
      breed: breedInput.value,
      sex: sexInput.value,
      id: idInput.value
    }
    updateDogOnServer(dog)
  })
}

//select dog by populating formEl and updating dogId
function selectDog(dog) {
  populateForm(dog)
  addFormEventListner()
}
init()
