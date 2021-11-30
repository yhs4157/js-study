const list = document.querySelector('ul');
      const input = document.querySelector('input');
      const button = document.querySelector('button');

      button.onclick = function() {
        let myItem = input.value;
        input.value = '';

        const listItem = document.createElement('li');
        const listText = document.createElement('span');
        const listBtn = document.createElement('button');

        listItem.appendChild(listText);
        listText.textContent = myItem;
        listItem.appendChild(listBtn);
        listBtn.textContent = 'Delete';
        list.appendChild(listItem);

        listBtn.onclick = function(e) {
          list.removeChild(listItem);
        }

        input.focus();
      }

/*
span, p, a 차이는 ?
div , p => block 
span => inline

a => 링크를 걸 수 있음. 

link 거는 것을 타이밍이 중요하다. 
button을 받아오기 전에 js가 존재해버리니 error를 띄움. 
*/