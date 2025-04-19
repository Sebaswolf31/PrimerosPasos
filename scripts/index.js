class Activity {
    constructor(id,title,description,imgUrl){
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor(){
        this.activities = [];
        this._id_ = 1;
    }

    getAllActivities = () => this.activities;


    createActivity( title, description, imgUrl){
        
        const nuevaActividad = new Activity(this._id_, title, description, imgUrl);
        this.activities.push(nuevaActividad);
        this._id_++;
        return nuevaActividad;
    }

deleteActivity (id) {
    
        const actividadesFiltradas = this.activities.filter((actividad) => {
            if(actividad.id !== id) {
                return actividad;
            }
        });

        this.activities = actividadesFiltradas;
    }
}
/* ejemplos 
//const nuevoRepo = new Repository();

 //nuevoRepo.createActivity("futbol","ddddd", "eeeee");
 
// nuevoRepo.createActivity("nadar","rrrr", "ttt");
 
// nuevoRepo.createActivity("beisbol","ttt", "yyyy");

// console.log(nuevoRepo.getAllActivities());

// nuevoRepo.deleteActivity(2);

// console.log(nuevoRepo.getAllActivities());

*/

function activityToHtml(activity, repository) {
    const { id, title, description, imgUrl } = activity;

    const titleElement = document.createElement('h3');
    const descriptionElement = document.createElement('p');
    const imageElement = document.createElement('img');
    const deleteButton = document.createElement('button');
    const activityDiv = document.createElement('div');

    titleElement.textContent = title;
    descriptionElement.textContent = description;
    imageElement.src = imgUrl;
    imageElement.alt = title;
    deleteButton.textContent = 'Eliminar';

    titleElement.className = 'activity-title';
    descriptionElement.className = 'activity-description';
    imageElement.className = 'activity-image';
    deleteButton.className = 'activity-delete-button';
    activityDiv.className = 'activity-card';

    // Se añade el evento de eliminar al boton
    deleteButton.addEventListener('click', () => {
        repository.deleteActivity(id); // Eliminar del repositorio
        renderAllActivities(repository); // Refrescar la lista
    });

    activityDiv.appendChild(titleElement);
    activityDiv.appendChild(imageElement);
    activityDiv.appendChild(descriptionElement);
    activityDiv.appendChild(deleteButton);

    return activityDiv;
}

function renderAllActivities(repository) {
    const activityContainer = document.getElementById('activity-container');
    activityContainer.innerHTML = '';

    const allActivities = repository.getAllActivities();
    const activityElements = allActivities.map(activity => activityToHtml(activity, repository));

    activityElements.forEach(activityElement => {
        activityContainer.appendChild(activityElement);
    });
}

const repository = new Repository();

function handler(event) {
    event.preventDefault();

    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const imgUrlInput = document.getElementById('imgUrl');

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const imgUrl = imgUrlInput.value.trim();

    if (!title || !description || !imgUrl) {
        alert('Por favor, completa todos los campos antes de continuar.');
        return;
    }

    repository.createActivity(title, description, imgUrl);
    renderAllActivities(repository);

    titleInput.value = '';
    descriptionInput.value = '';
    imgUrlInput.value = '';
    
}

// Event Listener explícito en el botón
document.getElementById('add-activity-button').addEventListener('click', (event) => {
    const form = document.getElementById('activity-form');
    handler(new Event('submit', { target: form }));
   
});

// Event Listener en el formulario para manejar el evento submit
document.getElementById('activity-form').addEventListener('submit', handler);
