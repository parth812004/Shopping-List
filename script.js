
function addItem(event)
{
    event.preventDefault();
    let item = document.getElementById('item-input').value;
    let itemList = document.querySelector('#item-list');
    if(item === '')
    {
        alert('Cannot add an empty item!');
    }
    else
    {
        itemList.innerHTML += `<li> ${item}
            <button class="remove-item btn-link text-red">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </li>`;
        document.getElementById('item-input').value = ''; // Clear the input box after adding the item
    }
}
document.querySelector('.btn').addEventListener('click', addItem);

function removeItem(event)
{
    event.target.closest('li').remove();
}
document.querySelector('#item-list').addEventListener('click', removeItem);

function clearAll()
{
    if(confirm('Are you sure you want to clear all items?'))
    {
        let itemList = document.querySelector('#item-list');
        let item = document.getElementById('item-input');
        itemList.innerHTML = '';
        item.value = '';
    }
}

document.querySelector('#filter').addEventListener('input', function()
{
    let search = document.querySelector('#filter').value.toLowerCase();
    let items = Array.from(document.querySelectorAll('#item-list li'));
    items.filter(item => item.textContent.toLowerCase().includes(search))
        .forEach(item => {
            item.style.display = 'block',
            item.style.justifyContent = 'space-between',
            item.style.display = 'flex',
            item.style.width = '45%',
            item.style.border = '1px solid #ccc',
            item.style.borderRadius = '5px',
            item.style.padding = '10px 15px',
            item.style.margin = '0 5px 20px',
            item.style.fontWeight = '700';
        });
    items.filter(item => !item.textContent.toLowerCase().includes(search))
         .forEach(item => item.style.display = 'none');
});