// 입력한 내용을 저장
const items = document.querySelector('.items')
const input = document.querySelector('.footer_input')
const addBtn = document.querySelector('.footerAdd_btn')


let shoppingList = []   // 입력한 내용을 넣을 배열


// localStorage에 배열을 저장
const save = () => {
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
}

const onAdd = () => {


  // 1. 사용자가 입력한 텍스트를 받아옴
  const product = {
    text: input.value,
    id: Date.now() //UTC시간부터 현재까지 몇초(1s = 1000ms)
  }
  if (product.text.trim() == '') {
    input.value = '';
    input.focus();
    return
  }


  // 배열에 아이템 저장
  shoppingList.push(product);
  save();  //localstorage에 저장하는 함수 실행




  // 2. 새로운 아이템(li/텍스트,삭제버튼) 생성
  const item = createItem(product);


  // 4. 인풋 초기화
  input.value = '';
  input.focus();
}

// 입력후 아이템(li)를 만들어주는 함수
function createItem(product) {
  const itemRow = document.createElement('li')
  itemRow.setAttribute('class', 'item_row')
  itemRow.setAttribute('data-id', product.id)

  itemRow.innerHTML = `
  <div class="item">
    <span class="item_name">${product.text}</span>
    <button class="itemDel_btn">
      <i class="fa-solid fa-trash-can" data-id=${product.id}></i>
    </button>
  </div>
  `

  // 3. items(ul)에 2에서 만든 아이템 추가
  items.append(itemRow)
  itemRow.scrollIntoView({ block: 'start' })  // 입력한 li 부분으로 스크롤 되게 만듦

  return items;   //최종적으로 만든 ul(items)를 리턴해줌
}

// 초기화 해주는 함수(스토리지에 저장된 것 반영)
const init = () => {
  const userShoppingList = JSON.parse(localStorage.getItem('shoppingList'));

  if (userShoppingList) {
    userShoppingList.forEach(element => createItem(element));
    shoppingList = userShoppingList;
  }

}
init();



addBtn.addEventListener('click', () => {
  onAdd()
});

// 엔터를 쳤을때도 입력이 되게 만듦
input.addEventListener('keypress', (e) => {
  e.key === 'Enter' && onAdd();
});



//이벤트 위임을 이용한 삭제
items.addEventListener('click', (e) => {
  const idc = e.target.dataset.id //삭제버튼 클릭했을때만 인식

  if (idc) {
    document.querySelector(`.item_row[data-id="${idc}"]`).remove();

    shoppingList = shoppingList.filter((aa) => aa.id !== parseInt(idc))
    save();
  }
})