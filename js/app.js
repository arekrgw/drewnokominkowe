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


var run = document.querySelector('#run'),
    name = document.querySelector('.name'),
    email = document.querySelector('.email'),
    surname = document.querySelector('.nazwisko'),
    tresc = document.querySelector('.tresc'),
    output = document.querySelector('.output');

var mailData = {
    imie: name.value,
    nazwisko: surname.value,
    email: email.value,
    tresc: tresc.value
}

run.addEventListener('click', function(){
    output.classList.remove('error');
    output.innerHTML="Wysyłanie...";
    var mailData = {
        imie: name.value,
        nazwisko: surname.value,
        tresc: tresc.value
    };
    run.classList.add('gone');
    run.setAttribute('disabled', true);
    var ajax = new XMLHttpRequest();
      ajax.open('POST', 'php/sendmail.php');

      ajax.onreadystatechange = function(){

        if(ajax.readyState == 4 && ajax.status == 200){
           if(ajax.responseText == 'success'){
              output.classList.add('success');
              output.innerHTML = 'Wiadomość została wysłana';
              flag = true;
           }
           else{
              output.classList.add('error');
              output.innerHTML = 'Wystąpił błąd, skontaktuj się telefonicznie';
              run.classList.remove('gone');
              run.removeAttribute('disabled');
              flag = false;
           }
        }


      };
      ajax.send(mailData);
});