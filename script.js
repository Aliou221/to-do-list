let inputBox      = document.querySelector('#inputBox');
let btnAjout      = document.querySelector('.btnAjout');
let listContainer = document.querySelector('.listContainer');
let message       = document.querySelector('.message');



btnAjout.addEventListener('click', function(e){
    if(inputBox.value === ''){
        message.innerHTML = 'Veuillez remplir ce champs d\'abord 🙏';
        
        e.preventDefault();
    }
    else{

        message.innerHTML = '';

        let ul = document.createElement('ul');//Creation d'une balise <ul>

        let li = document.createElement('li');//Creation d'une balise <li> pour recevoir les valeurs entrer dans l'input
        li.innerHTML = inputBox.value;

        let myDiv = document.createElement('div');//Creation de mon blog div pour mes button d'editon et suppression
        myDiv.classList.add("div");//Ma blog div je lui ajoute une class "div"

        let btnEdite = document.createElement('button');//creation de mon button editer
        btnEdite.innerHTML = "🖊";
        btnEdite.classList.add('edite');

        let btnDel = document.createElement('button');//creation de mon button de suppression
        btnDel.innerHTML = "🗑";
        btnDel.classList.add('del');

        //Ajout des buttons dans mon blog de div

        myDiv.appendChild(btnEdite);
        myDiv.appendChild(btnDel);

        //Ajouter ul dans mon blog div-->listContainer
        listContainer.append(ul);

        //Apres on ajoute les listes et mon blog de div dans mon ul
        ul.appendChild(li);
        ul.appendChild(myDiv);

        
        ul.addEventListener('click', function(e){
            target = e.target;

            if(target.tagName == "LI"){

                target.classList.toggle("checked");//modification style de mon li lors d'une click
                sauvegardeDeDonnee();

            }

        });


        myDiv.addEventListener('click', function(e){
            target = e.target;

            if(target.classList.contains("del")){

                target.parentElement.parentElement.remove(); //suppression de l'element <ul>
                sauvegardeDeDonnee();

            }else if(target.classList.contains("edite")){

                let newli = prompt("Veuillez modifier votre tache : ");

                if(newli !== ""){
                    li.innerHTML = newli;
                    sauvegardeDeDonnee();

                }
            }
        });        
        
        inputBox.value = "";
        sauvegardeDeDonnee();

    }

});

//sauvegarde mes donnee dans le localStorage

sauvegardeDeDonnee = function(){
    localStorage.setItem("mesTaches" , listContainer.innerHTML);
}

showList = function(){

    localGet = localStorage.getItem("mesTaches");//recuperation des elements stocker dans le localstorage
    listContainer.innerHTML = localGet;

    if(localGet !== null){

        let mesList = document.querySelectorAll('ul li'); 
        let edites  = document.querySelectorAll('.div .edite');
        let supps   = document.querySelectorAll('.div .del');

        //Stylisation de mes liste lors d'un click pour chacun

        mesList.forEach(li =>{

            li.addEventListener('click', function(e){
                target = e.target;

                target.classList.toggle('checked');
                sauvegardeDeDonnee();
            });

        });

        //Modification des taches

        edites.forEach((edite , index) =>{

            edite.addEventListener('click' , function(e){

                let newli = prompt("Veuillez modifier votre tache : ");
                
                if(newli !== "" && newli !== null){
                    
                    mesList[index].innerHTML = newli;
                    sauvegardeDeDonnee();                   

                }

            });

        });

        //Suppression d'une tache

        supps.forEach(del => {

            del.addEventListener('click', function(){

                del.parentElement.parentElement.remove(); 
                sauvegardeDeDonnee();
            });

        });

        //recherche element

        let inputSearch   = document.querySelector('#inputSearch');

        inputSearch.addEventListener('input', function(){
            const filter = inputSearch.value.toLowerCase();//pour mettre l'element rechercher en minuscle

            mesList.forEach(liElement =>{
                const text = liElement.innerText.toLowerCase();//pour mettre l'element de li en minuscle

                if(text.includes(filter)){

                    liElement.parentElement.style.display = '';

                }else{

                    liElement.parentElement.style.display = 'none';
                }
            });
        });

    }
}

showList();
