// 입력한 내용을 저장

const items = document.querySelector('.items')  // ul
const input = document.querySelector('.footer_input')  
const addBtn = document.querySelector('.footerAdd_btn') 

let shoppingList = []   // 입력한 내용을 넣을 배열

const onAdd = () => {
  // 1. 사용자가 입력한 텍스트를 받아옴
  const text = input.value;
  if(text.trim() == ''){
    input.value='';
    input.focus();
    return
  }
  
  // 2. 새로운 아이템 만듦 (li/텍스,삭제버튼)
  const item = createItem(text);

  // 3. items(ul)에 2에서 만든 아이템 추가
  items.append(item)
  item.scrollIntoView({ block:'start'})  // 입력한 li 부분으로 스크롤 되게

  // 4. 인풋 초기화
  input.value='';
  input.focus();
}

// 입력후 아이템(li)를 만들어주는 함수
function createItem(text){
  const itemRow = document.createElement('li')
  itemRow.setAttribute('class','item_row')

  const item = document.createElement('div')
  item.classList.add('item')

  const span = document.createElement('span')
  span.classList.add('item_name')
  span.innerText = text;

  const delBtn = document.createElement('button')
  delBtn.classList.add('itemDel_btn')
  delBtn.innerHTML= '<i class="fa-solid fa-trash-can"></i>'

  delBtn.addEventListener('click', ()=>{  //삭제 버튼에 
    items.removeChild(itemRow)
  })

  item.append(span,delBtn)
  itemRow.append(item)

  return itemRow;
}

addBtn.addEventListener('click', () => { 
  onAdd()
});

// 엔터를 쳤을때도 입력이 되게
input.addEventListener('keypress', (e) => { 
  // if(e.key == 'Enter'){
  //   onAdd()
  // }
  e.key === 'Enter' && onAdd();
});