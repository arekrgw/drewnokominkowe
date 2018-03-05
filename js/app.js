function initMap() {

    var drewno = {lat: 51.815654, lng: 19.886089};
  
    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: drewno,
    styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]
    });
    //OSK
    
    var drewnoMark = new google.maps.Marker({
        position: drewno,
        map: map,
        title: 'Drewno Kominkowe'
    });
    var drewnoContent = '<h4>Drewno Kominkowe</h4>' + 'Kwiatowa 7';
  
    var drewnoInfo = new google.maps.InfoWindow({
      content: drewnoContent
    });
    drewnoMark.addListener('click', function(){
      drewnoInfo.open(map, drewnoMark);
    });
    drewnoInfo.open(map, drewnoMark)
}
    //OSK END

///////////////////////////////////////////////////
var run = document.querySelector('#run'),
    name1 = document.querySelector('.name'),
    email = document.querySelector('.email'),
    surname = document.querySelector('.nazwisko'),
    tresc = document.querySelector('.tresc'),
    output = document.querySelector('.output');


var dataFlag = {
  nameF: false,
  emailF: false,
  surnameF: false,
  trescF: false
};
var mailData = new FormData();
var sent = false

function checkIfNotEmpty(e){
  if(e.target.value != ''){
    switch(e.target.classList[0]){
      case 'name':
        mailData.append('imie', name1.value);
        dataFlag.nameF = true; 
        break;
      case 'email':
        mailData.append('email', email.value);
        dataFlag.emailF = true;
        break;
      case 'nazwisko':
        mailData.append('nazwisko', surname.value);
        dataFlag.surnameF = true;
        break;
      case 'tresc':
        mailData.append('tresc', tresc.value);
        dataFlag.trescF = true;
        break;
    }
  }
  else{
    switch(e.target.classList[0]){
      case 'name':
        dataFlag.nameF = false;    
        break;
      case 'email':
        dataFlag.emailF = false;    
        break;
      case 'nazwisko':  
        dataFlag.surnameF = false;
        break;
      case 'tresc':  
        dataFlag.trescF = false;
        break;
    }
  }
  if(!sent){
    if(dataFlag.emailF && dataFlag.nameF && dataFlag.surnameF && dataFlag.trescF){
      run.disabled = false;
      run.classList.add('ready');
    }
    else{
      run.disabled = true;
      run.classList.remove('ready');
    }
  }
}

name1.addEventListener('keyup', checkIfNotEmpty);
email.addEventListener('keyup', checkIfNotEmpty);
surname.addEventListener('keyup', checkIfNotEmpty);
tresc.addEventListener('keyup', checkIfNotEmpty);



run.addEventListener('click', function(){
  output.classList.remove('error');
  output.innerHTML = '';
  run.disabled = true;
  run.classList.remove('ready');
  axios.post('../php/sendmail.php', mailData)
    .then(function(response){
      if(response.data == 'success'){
        output.classList.add('success');
        output.innerHTML = 'Wiadomość została wysłana, dziękujemy za kontakt';
        sent = true;
      }
      else{
        output.classList.add('error');
        output.innerHTML = 'Wystąpił błąd, prosimy o kontakt telefoniczny';
        run.disabled = false;
        run.classList.add('ready');
      }
    });
});
