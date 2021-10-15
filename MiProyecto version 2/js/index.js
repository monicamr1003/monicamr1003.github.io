function  info(id){
    let datosCoctel=null;
    
    fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='+id)
    .then(response => response.json())
    .then(data => {
        datosCoctel=data.drinks;
        console.log(datosCoctel);
        document.getElementById('titulo').innerText=datosCoctel[0].strDrink;
        document.getElementById('categoria').innerText=datosCoctel[0].strCategory;
        document.getElementById('instrucciones').innerText=datosCoctel[0].strInstructions;

        document.getElementById('modal').style.display='block';

    });

}


document.addEventListener('DOMContentLoaded', event=>{
    console.log('DOM ready!');
    let drinks =null;
    let ul = document.getElementById('results');
    let modal=document.getElementById('modal');
    fFilter.addEventListener('submit', async  event =>{

        event.preventDefault();
        console.log('filtering ...');
        const filter=iFilter.value;
        console.log(filter);
        if(filter !==''){
            fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
            .then(response => response.json())
            .then(data => {
                drinks=data.drinks;
                console.log('Bebidas',drinks);
                let filtered=drinks.filter(d => d.strDrink.toLowerCase().indexOf(
                    filter.toLowerCase()) !==-1);
                    console.log(filter);
                    console.log(filtered);
                   
                if (filtered.length>0){
                    results.innerHTML='';
                    filtered.forEach(drink=>{ 
                        const li=document.createElement('li');
                        const img=document.createElement('img');
                    
                        img.setAttribute('src',drink.strDrinkThumb+'/preview');
                        li.appendChild(img);
                        li.appendChild(document.createTextNode(drink.strDrink));
            
                        li.setAttribute('coctel',drink.idDrink);
                        li.addEventListener('click', function (){
            
                           // console.log('Click '+this.getAttribute('coctel'));
                           info(this.getAttribute('coctel'));
            
            
                        });
                        ul.appendChild(li);
                     });
                    }else{
                        results.innerHTML='Su consulta no ha generado resultados';
                        modal.addEventListener('click',function(){
            
                            this.style.display='none';
                        }); 
                    };

            });
    modal.addEventListener('click',function(){

    this.style.display='none';
}); 

        }
    });


/**
 * console.log('DOM ready!');
    
    
    


   
 */

});