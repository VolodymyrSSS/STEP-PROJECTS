$(document).ready(function(){

  // функція для відображення форми поля з кліком по іконці пошуку

  $(".fa-search").click(function(){
    $(".search-element, .input").toggleClass("active");
    $("input[type='text']").focus();
    $(".navbar").css("width", "890px");
  });



  // підключення функції переключення картинок і тексту до них

  $("#services").click(function(ev){ // навішуємо подію кліка в блоці "#services" на елемент з класом "serv-b-active"
    $(".serv-b-active").removeClass("serv-b-active"); // видаляємо клас "serv-b-active", який мав подію кліка на початку
    $( ev.target ).toggleClass("serv-b-active"); // спрямовуємо/надаємо подію кліка на обраний елемент 
    let chosenBarName = $(".serv-b-active").html(); // нехай обраним елементом буде напис на полосі меню

    /* приводимо напис на полосі меню щоб вона відповідала напису який є в елементі, що буде обиратись:
    тобто мав вид: #img_напис_напис чи #text_напис_напис, як зазначено в id елементі, що обирається */
    let transformedName = chosenBarName.toLowerCase().split(" ").join("_"); 
    const imgID = "#img_" + transformedName; 
    const textID = "#text_" + transformedName;

    // видаляємо клас "img-serv-displayIt", який відображав картинку
    $(".img-serv-displayIt").removeClass("img-serv-displayIt");
    /* присвоюємо клас, що відображає, - обраній картинці 
    - тобто даємо подію відображення на обрану картинку*/ 
    $( imgID ).toggleClass( "img-serv-displayIt" );
    
    // видаляємо клас "text-serv-displayIt", який відображав текст
    $(".text-serv-displayIt").removeClass("text-serv-displayIt");
    /* присвоюємо клас, що відображає, - обраному тексту 
    - тобто даємо подію відображення на обраний текст*/
    $( textID ).toggleClass("text-serv-displayIt");
  })



  // підключення функції з'явлення форми поля при кліці по кнопці

  $('#open-modal').click(function (){
      $('#modal').addClass('open');
      $('.overlay').addClass('show')}
    );
    $('.close, .overlay').click(function () {
      $('.overlay').removeClass('show');
      $('#modal').removeClass('open');
    })
    $("input:submit").click(function(){
      let name = $("input:first").val();
      let email = $("input:text:last").val();
      setTimeout(function(){
        $("overlay, #modal").fadeOut(1000);
      }, 1000);
      $("#modal").html(`<div>Thank, ${name} on your e-mail ${email} will be send message </div>`);
    })



  // функція фільтра картинок
  
  $(".work-item").click(function(ev){ // отримуємо елемент з класом "work-item" та навішуємо на нього функцію з подією кліка
    if($(ev.target).hasClass("item-graphic")){ // якщо клікнули по елементу, який має клас "item-graphic"
      $(".prtf-item").css("display","block");  // отримуємо/відображаємо усі елементи з класами "prtf-item" і "grafic_design"
      $(".prtf-item").not($(".grafic_design")).css('display','none');} // НЕ відображаємо елементи, які не мають класу "grafic_design". У цьому значенні .not - це значить крім
    if($(ev.target).hasClass("item-web")){ 
      $(".prtf-item").css("display","block");
      $(".prtf-item").not($(".web_design")).css('display','none');} // НЕ відображаємо елементи, які не мають класу "web_design".
    if($(ev.target).hasClass("item-pages")){
      $(".prtf-item").css("display","block");
      $(".prtf-item").not($(".landing_page")).css('display','none');} // НЕ відображаємо елементи, які не мають класу "landing_page".
    if($(ev.target).hasClass("item-wordpress")){
      $(".prtf-item").css("display","block");
      $(".prtf-item").not($(".wordpress")).css('display','none'); // НЕ відображаємо елементи, які не мають класу "wordpress".
    }
    if($(ev.target).hasClass("item-all")){ // якщо клікнули по елементу, який має клас "item-all"
      $(".prtf-item").css("display","block"); // відображаємо усі елементи, які мають класи "prtf-item" і "item-all"
    }
  });

  // завантаження картинок 12+12+12, кнопка щезає

  $(".load-prtf").click(()=>{// навішуємо подію кліка на кнопку з класом "load-prtf"
    $(".prtf-images-load-hidden").css("display","block"); // міняємо стиль невидимого блоку з класом "prtf-images-load-hidden" на стиль "display:block;"
    setTimeout (function(){       // задаємо функцію затримки завантаження картинок (імітація завантаження  з сервера)
      $(".prtf-images-load-hidden").css("display","none");
      $(".prtf-hidden:lt(12)").removeClass("prtf-hidden"); // використали метод "клас:lt(index)" для відображення 24 картинок видаливши для 12 - клас "prtf-hidden"
    }, 2000);
      // $('.prtf-hidden').removeClass('prtf-hidden');  // простіший варіант завантаження картинок по кліку
      $(".load-prtf").click(()=>{ // знову навішуємо подію кліка на кнопку з класом "load-prtf"
        $(".prtf-hidden:lt(12)").removeClass("prtf-hidden"); // використали метод "клас:lt(index)" для відображення 36 картинок видаливши для решти 12 - клас "prtf-hidden"
        $(".load-prtf").hide(); // приховуємо кнопку
      })
  })
  


  // Підключення masonry 

  $('.grid').masonry({ // підключення masonry для розташування картинок по колонках одна за одною
    itemSelector: '.grid-item', // визначили основний параметр grid-sizer для розрахунку masonry,який для побудови буде брати ширину
    columnWidth: '.grid-sizer', // задаєм ширину колонки яка розраховується з 100%
    percentPosition: true,  // використовуємо для задання параметрів у %
    gutter: '.gutter-sizer', // задаєм відстань між колонками
    horizontalOrder: true // розташували по горизонталі, а відстань між рядками задали в css: в .grid-item {margin-bottom: 1%;}
  });

  // завантаження додаткових картинок

  $('.load-img').click(()=>{ // навішуємо клік на кнопку 
    $(".best-images-load-hidden").css("display","block"); // міняємо стиль невидимого блоку з класом "best-images-load-hidden" на стиль "display:block;"
    setTimeout (function(){       // задаємо функцію затримки завантаження картинок (імітація завантаження  з сервера)
      $(".best-images-load-hidden").css("display","none");
      $('.grid').children().removeClass("img-hidden"); // видаляємо клас "img-hidden" для картинок, які були приховані і тепер вони стають видимі
      $('.grid').masonry({ // підключення masonry для розташування доданих картинок по колонках одна за одною
        itemSelector: '.img-hidden', // визначили основний параметр grid-sizer для розрахунку masonry,який для побудови буде брати ширину
        columnWidth: '.grid-sizer', // задаєм ширину колонки яка розраховується з 100%
        percentPosition: true,  // використовуємо для задання параметрів у %
        gutter: '.gutter-sizer', // задаєм відстань між колонками
        horizontalOrder: true // розташували по горизонталі, а відстань між рядками задали в css: в .grid-item {margin-bottom: 1%;}
      });
      $(".load-img").hide(); // приховуємо кнопку
    }, 2000);
  });

  // збільшення картинки

  $(".blackout-item-expand").click(function(event){ //навісили подію кліка на елемент з класом 'blackout-item-expand'
  $(".imgScale").remove(); 
  let foundImg = $(event.target).closest(".img-box").find(".imgExpanded")[0]; //взяти найближчий перший елемент з блоку 'img-box' та класом 'blackout-item-expand' по якомук клікнули  
    let src = $(foundImg).attr("src");// присв перемінній атрибут 'src'
    let newElementImg = // присв перем створення шаблонними рядками блоку куди буде поміщатись картинка
    `<div class="imgScale">
      <img class="scaled-img" src="${src}"/>
    </div>`
    $(".grid").append(newElementImg);// згенерували блок 'imgScale' додавши його до батьківського 'grid'
    
    $(document).on("click",".imgScale",function(){ // навісили функцію кліка на елемент з класом 'imgScale'
      $(".imgScale").remove();// видалили блок 'imgScale' 
    });
  });
   
  $(".blackout-item-expand-2").click(function(event){
    $(".imgScale2").remove(); 
    let foundImg2 = $(event.target).closest(".grid-item").find(".imgExpanded_9-1");
    // let src = $(foundImg2).attr("src");
    let newElementImg2 = `<div class='imgScale2'>`;
      for(let i = 0; i < foundImg2.length; i++) {
        const src = $(foundImg2[i]).attr("src");
        newElementImg2 += `<img class="scaled-img2" src="${src}"/>`
      }
    newElementImg2 += `</div`;
    // console.log(newElementImg2);
    $(".grid").append(newElementImg2);

    $(document).on('click',".imgScale2",function(){ // навісили функцію кліка на елемент з класом 'imgScale2'
    $(".imgScale2").remove();// видалили блок 'imgScale2' 
    });
  }); 
  

})
