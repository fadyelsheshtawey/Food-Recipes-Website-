

 let allRecipes=[];
 let recipeDetails
 let dishType ='pasta'

 let index ;


    

 async function getRecipes(term)
   {

      let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${term}`);
      allRecipes = await apiResponse.json();
      allRecipes = await allRecipes.recipes;
      displayData();

  }

  function displayData(){

      let cartona = ''
  
      for(let i = 0 ; i < allRecipes.length ; i++){
          
          cartona+=`

          <div class ="col-md-4 item mb-4">
                  <div>
                  <div class=" d-none" id='index'>${i}</div>
                  <img src="${allRecipes[i].image_url}" onclick="getRecipeDetails('${allRecipes[i].recipe_id}')" class="w-100 rounded shadow" alt="">
                  <h3 class="h6 pt-2">${allRecipes[i].title}</h3>
                  </div>

              </div>
          `

      }
      $('.recipe-items').html(cartona)
  }
      
  async function getRecipeDetails(id)
  {

     let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
      recipeDetails = await apiResponse.json();
     recipeDetails = recipeDetails.recipe
    
     displayRecipeDetails();

 }
  
 function displayRecipeDetails(){


    let steps = '';
    for(let i = 0 ; i < recipeDetails.ingredients.length ; i++){

            steps+=`
        
            <li class="py-2"><span class="fa-li"><i class="fas fa-utensil-spoon"></i></span>${recipeDetails.ingredients[i]}</li>
         `
    }


      let  cartona=`

                
                <h3 class="h6  text-center text-danger pt-2">${recipeDetails.title}</h3>
                <div>
                <img src="${recipeDetails.image_url}" class="w-100 mb-5 rounded shadow" alt="">
                
                <ul class="fa-ul">
                    ${steps}
                </ul>

                </div>

            
        `

        let cartona2 = `

        <i onclick='closeDetails()' class="fas float-end text-danger  fa-2x fa-times-circle"></i>
    
        
       <h3 class="h6 my-5 text-center text-danger pt-2">${recipeDetails.title}</h3>
       <div class=' position-relative d-flex justify-content-center align-items-center'>
        <i onclick="previousRecipe()" class="fas text-warning fa-2x  position-absolute fa-arrow-left"></i>
        <i onclick="nextRecipe()" class="fas text-warning fa-2x  position-absolute fa-arrow-right"></i>
       <img src="${recipeDetails.image_url}" class="w-100 mb-5 rounded shadow" alt="">
       </div>
       <ul class="fa-ul">
           ${steps}
       </ul>

       

   
`

    
    $('.recipe-details').html(cartona)
    $('.details').html(cartona2)

}

function  closeDetails(){
   
    index=0;
    $('#details').fadeOut()
    $("body").css("overflow", "scroll");

}

function nextRecipe(){

   if(index==(allRecipes.length-1))
   {
       index = 0
       let nextItemIndex =0
       let nextItemId =   allRecipes[nextItemIndex].recipe_id
 
       getRecipeDetails(nextItemId) 
   }
   else{

       let nextItemIndex = ++index
      let nextItemId =   allRecipes[nextItemIndex].recipe_id

      getRecipeDetails(nextItemId) 
   }
   
}
function previousRecipe(){
    
     if(index == 0){
         index = allRecipes.length-1
         let nextItemIndex = index
         let nextItemId =   allRecipes[nextItemIndex].recipe_id
         getRecipeDetails(nextItemId) 
     }
   else
   {
    let nextItemIndex = --index
    let nextItemId =   allRecipes[nextItemIndex].recipe_id
    getRecipeDetails(nextItemId) 
   }
   
}

function  windowResize(){

    let wSize = $(window).width()
    if (wSize < 992){
        $('nav').css('display','none')
        $('#details').css('display','block')
        $('.recipe-details').css('display','none')
        $("body").css("overflow", "hidden");

    }
    else{
        $('#details').css('display','none')
        $('.recipe-details').css('display','block')
        $("body").css("overflow", "scroll");

    }
}

function recipeDetailsApperance(){

    $(window).resize(function(){
        windowResize()
                
    })
    
    windowResize()
}


   $(document).ready(async function(){


                $(window).scroll(function(){

                    let wScroll = $(window).scrollTop();
                
                    if(wScroll>10){
                    
                        $('nav').css({"background":"linear-gradient(#fff, rgb(159,159,159))"})
                    }
                    else{
                        $('nav').css({"background":"linear-gradient(rgba(159,159,159,.8), rgba(159,159,159,.8))"})
                    }
                })


                await  getRecipes(dishType);
            

                
               $('.item').click(function(){
                
                index = parseInt($(this).children().children('#index').html()) 
                    
                recipeDetailsApperance()
                
                })


                $('input').keyup(async function(e){

                    if(e.keyCode==13){
                    dishType =   $('input').val().toLowerCase()
                    await     getRecipes(dishType);

                    $('.item').click(function(){
                        index = parseInt($(this).children().children('#index').html()) 
                        recipeDetailsApperance()
                    }) 
                    }  
                })


                $('button').click(async function(){
                dishType =   $('input').val().toLowerCase()
                    await     getRecipes(dishType);

                $('.item').click(function(){
                    index = parseInt($(this).children().children('#index').html()) 
                    recipeDetailsApperance()    
                })
                }) 
 
   })