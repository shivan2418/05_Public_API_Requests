// returns a modal when provided with user data in json format
function create_modal(user_data){
  let modal = document.createElement('div')
  $(modal).addClass('modal-container')   
  modal.innerHTML = `<div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${user_data.picture.medium}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${user_data.name.first} ${user_data.name.last}</h3>
          <p class="modal-text">${user_data.email}</p>
          <p class="modal-text cap">${user_data.location.city}</p>
          <hr>
          <p class="modal-text">${user_data.phone}</p>
          <p class="modal-text">${user_data.location.street.number} ${user_data.location.street.name}, ${user_data.location.state}, ${user_data.location.postcode}</p>
          <p class="modal-text">${JSON.stringify(user_data.dob.date).slice(1,11)}</p>
      </div>`

  return modal;
}

// creates a card from an array of json
function create_cards (persons) {
  const personcards = persons.map(item => {
    const template = document.createElement('div')
    $(template).addClass("card card-info-container")
    template.innerHTML = `<img class=card-img src=${item.picture.medium}></img><p>
    <span class=card-name>${item.name.first} ${item.name.last}</span>
    <span class=card-text >${item.email}<br> ${item.location.city}</span>`;
    // save a copy of all the data for when we have to make the model window
    $(template).data('key',item);
    return template;
    });
  return personcards; }

// adds the cards to gallery
function add_cards_to_gallery(cards) {
  let gal = $('#gallery');
  // normally map is used for returning a value, but this works too
  cards.map(card => {
    gal.append(card);
  });
}

// adds the clicks listeners to all elements of the card class that are under the gallery id.
function add_click_listeners(){
  let cards = $('#gallery .card.card-info-container');
  cards.on('click',function(event){
    //create the modal from the user data we stored in the element
    let user_data = $(this).data('key');
    let modal = create_modal(user_data);
    // append the modal to the body
    document.body.append(modal);
    // add an event listener to to the close btn that removes the modal container class and remove the modal box
    document.getElementById('modal-close-btn').addEventListener('click',function(event){
      //$(this).parent().parent().removeClass('modal-container');
      $(this).parent().parent().remove();
      });
    });
}

// gets 12 random people from the randomuser API
function getRandomUsers(num_users=12) {
  fetch(`https://randomuser.me/api/?results=${num_users}`)
  .then(data => data.json())
  .then(data => create_cards(data.results))
  .then(cards => add_cards_to_gallery(cards))
  .then(add_click_listeners);
}

getRandomUsers();
