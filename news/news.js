/*vi ska göra dynamisk denna arkitektur
        <section class="list">
            <div class="list-item">   
                <div class="item-name   items"> TITLE </div>
                <div class="item-author  items"> AUTHOR </div>
                <div class="item-meta items"> TYPE </div>
                <div class="item-date  items">  Data - number </div>
                
            </div>
        </section>
*/


const list = document.querySelector('.list');
const forms = document.forms;

// Här väljer att vi ska visa och sortera på name, author och date
// const sort_name_btn =document.querySelector('.sort-options .sort-name');
// const sort_author_btn = document.querySelector('.sort-options .sort-author') 
const sort_date_btn = document.querySelector('.sort-options .sort-date')
const sort_meta_btn = document.querySelector('.sort-options .sort-meta')


fetch("news.json")
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {
    console.log(data);

    for (let i = 0; i < data.length; i++) {

      let desc = false;
      //Sortering på name-title
      // sort_name_btn.addEventListener('click', () => {
      //     let array = sort_array_by(data, 'name' , desc);
      //     displayList(array);

      //     desc = !desc;

      // });
      // //Sortering på author
      // sort_author_btn.addEventListener('click', () => {
      //     let array = sort_array_by(data, 'author' , desc);
      //     displayList(array);

      //     desc = !desc;

      // }); 

      // Sortering på type - vi behöver inte 
   

      //Sortering på date
      sort_date_btn.addEventListener('click', () => {
        let array = sort_array_by(data, 'date', desc);
        displayList(array);

        desc = !desc;

      });

      sort_meta_btn.addEventListener('click', () => {
        let array = sort_array_by(data, 'type', desc);
        displayList(array);

        desc = !desc;

      });



    }
    /*** *******************************SORTERING *************************/

    //Huvudsakliga function , som gör sortering
    function sort_array_by(array, sort, desc) {
      array.sort(function (a, b) {
        if (a[sort] < b[sort]) return -1;  //false
        if (a[sort] > b[sort]) return 1;
        return 0;

      });
      if (desc) array.reverse();
      return array
    }

    /************DISPLAY******************************************* */
    function displayList(array = []) {
      list.innerHTML = "";
      for (let i = 0; i < array.length; i++) {
        let item = array[i];

        let item_element = document.createElement('div');
        item_element.classList.add('list-item');     // 2 namn på classen <div class="item-name   items"> TITLE </div>

        //display name-title
        let title = document.createElement('div');
        title.classList.add('item-name', 'items');
        title.innerText = item.name;

        item_element.appendChild(title);

        //display author
        let author = document.createElement('div');
        author.classList.add('item-author', 'items');
        author.innerText = item.author;

        item_element.appendChild(author);



        let type = document.createElement('div');
        type.classList.add('item-meta', 'items');
        type.innerText = item.type;

        item_element.appendChild(type);
        // type.style.display = 'none'

        //display date
        let date = document.createElement('div');
        date.classList.add('item-date', 'items');

        date.innerText = item.date
        item_element.appendChild(date)

        list.appendChild(item_element);

      }
    }

    /* **********************FILTRERING*****************************************/
    displayList(data);



    // // Om vi vill filtrera på andra saker -title, date 
    // const dates = list.getElementsByClassName('item-date');
    // const titles = list.getElementsByClassName('item-name')
    // const all = list.getElementsByClassName('items'); 

    // const searchBar = forms['search-box'].querySelector('input');
    // searchBar.addEventListener('keyup', (e) => {
    //   const term = e.target.value.toLowerCase();
    //   const types = list.getElementsByClassName('item-meta');

    //   Array.from(types).forEach((typ) => {    //Array.from('foo') ger Array ["f", "o", "o"]
    //     const type = typ.textContent;
    //     if(type.toLowerCase().indexOf(e.target.value) != -1){  //här kollar man om detta som user skrev är "= article" eller "=news"
    //       typ.style.display = 'none';
    //       Array.from(titles).forEach((tit) => {
    //         tit.style.display = 'block';
    //       })
    //       Array.from(dates).forEach((d) => {
    //         d.style.display = 'block';
    //       })
    //     } else {
    //       typ.style.display = 'none';
    //     typ.parentElement.style.display = 'none';

    //     }
    //   });
    // });


  })
  .catch(function (err) {
    console.log(err);
  })