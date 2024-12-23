let key = 1;
let items = [];

//Adding an item to list
function addItem(event) {
    var item = document.getElementById("item-input").value.trim();
    event.preventDefault();
    if (item === "") {
        alert("Can't add empty item in the list");
    } 
    else {
        document.getElementById("item-list").innerHTML += `<li>
                ${item}
                <button class="remove-item btn-link text-red" id="remove">
                <i class="fa-solid fa-xmark"></i>
                </button>
                </li>`;
        console.log("Added");
        document.getElementById("item-input").value = "";
        localStorage.setItem(`${key}`, `${item}`);
        key++;
    }
}
document.querySelector(".btn").addEventListener("click", addItem);


//Updating the list item name
document.getElementById('item-list').addEventListener('click', updateName);
function updateName(event) {
    event.preventDefault();
    let itemName = event.target.closest('li').textContent.trim();
    console.log(itemName);
    let oldValue = document.querySelector('#item-input').value;
    oldValue = itemName;
    document.querySelector('#item-input').value = oldValue;
    document.querySelector('#button').style.backgroundColor = 'green';
    document.querySelector('#button').innerHTML = `<i class="fa-solid fa-pen"></i> Update Item`;
    let oldKey;
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(localStorage.key(i)) === itemName) {
            oldKey = localStorage.key(i);
            break;
        }
    }
    let updateButton = document.querySelector('#button');
    let newButton = updateButton.cloneNode(true);
    updateButton.parentNode.replaceChild(newButton, updateButton);
    newButton.addEventListener('click', function(event) {
        if (event.target.innerHTML.includes('Update Item')) {
            localStorage.setItem(`${oldKey}`, document.querySelector('#item-input').value);
            document.querySelector('#button').style.backgroundColor = '';
            document.querySelector('#button').innerHTML = ' <i class="fa-solid fa-plus"></i> Add Item';
            document.querySelector('#item-input').value = '';
        }
    });
    console.log(`itemKey = ${oldKey}`);
    console.log(`oldValue = ${oldValue}`);
}


//Deleting a list item
function deleteItem(event) {
  //First, we get the textContent of the list item we clicked
  let itemName = event.target.closest("li").textContent.trim(); // Get only the text content of the list item, excluding the button text
  // console.log(itemName);
  if (confirm("Do you want to remove this item from your list?\nClick 'Cancel' to update list item selected")) {
    event.target.closest("li").remove(); //Closest and trim is used because of the nested behaviour of the HTML code structure of a particular list element
    console.log("Removed Item");
    let itemKey;

    //Now we find the itemName in the localStorage by traversing keywise and delete the selected itemName by using its key
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.getItem(localStorage.key(i)) === itemName) {
        itemKey = localStorage.key(i);
        break;
      }
    }
    localStorage.removeItem(`${itemKey}`);
  }
}
document.querySelector("#item-list").addEventListener("click", deleteItem);

//Clear full list
function clearAll(event) {
  event.preventDefault();
  var list = document.getElementById("item-list").innerText;
  if (list == "") {
    alert("List is already empty!");
  } else {
    if (confirm("Are you sure you want to clear your list??"))
      document.getElementById("item-list").innerHTML = ``;
    localStorage.clear();
    key = 1; //Start over, since list is empty

    console.log("Cleared all items");
  }
}
document.querySelector(".btn-clear").addEventListener("click", clearAll);

//Search for particular item in the list
/* reference for search functionality :
    https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_list
*/
function searchItem() {
  // Get the input element with the id 'filter'
  let input = document.getElementById("filter");

  // Get the value of the input and convert it to uppercase for case-insensitive comparison
  let filter = input.value.toUpperCase();

  // Get all the <li> elements in the document
  let li = document.getElementsByTagName("li");

  // Loop through all the <li> elements
  for (let i = 0; i < li.length; i++) {
    // Get the text content of the current <li> element
    let txtValue = li[i].textContent || li[i].innerText;

    // Check if the text content includes the filter string
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      // If it does, display the <li> element
      li[i].style.display = "";
    } else {
      // If it doesn't, hide the <li> element
      li[i].style.display = "none";
    }
  }
}

//Persist the list items even after reload of webpage
document.addEventListener("DOMContentLoaded", loadItems);
function loadItems() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    items.push({ key: key, value: localStorage.getItem(key) }); // Making array of objects having property as {key: ___, value: list_item_name} This will make sorting easy based on the key.
  }
  items.sort((a, b) => a.key - b.key);
  items.forEach((item) => {
    document.getElementById("item-list").innerHTML += `<li>
        ${item.value}
        <button class="remove-item btn-link text-red" id="remove">
        <i class="fa-solid fa-xmark"></i>
        </button>
        </li>`;
  });
  key = localStorage.length + 1;
}


