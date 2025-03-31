
async function initMap() {
    const hungary = { lat: 47.1611615, lng: 19.5057541 };
    const { AdvancedMarkerElement } = await  google.maps.importLibrary("marker");
    var activeInfoWindow;
    const options = {
        zoom: 7,
        center: hungary,
        mapId: "1Cn3GOen7lGVUOACFzUFAF46Rlzsg-MI"
    };
    const map = new google.maps.Map(document.getElementById("map"), options);
    
    const markers = dataOfSpreadsheet[1]
    
    markers.forEach(marker => {

        //////////////////////////////////////////////////////
        const markerIcon = document.createElement("img");
        markerIcon.src = getSex(marker);
  /////////////////////////////

        const markerItem=new google.maps.marker.AdvancedMarkerElement({
            position: {lat: Number(marker.Lat), lng: Number(marker.Lon)},
            map: map,
            title: marker.Name,
            content:markerIcon
        });

        const infowindow = new google.maps.InfoWindow({
            content: `<img src='${marker.Image}' /> <br >Név: ${marker.Name} <br> Lakhely: ${marker.City}`
        });
        markerItem.addListener('gmp-click', () => {
            if (activeInfoWindow) {
                activeInfoWindow.close();
            }
            activeInfoWindow = infowindow;
            infowindow.open({
                anchor: markerItem,
                map
            });
        })
    })
    

}

const getSex = (marker)=>{
    switch(marker.Sex){
        case 'Férfi':
            return './assets/blue.png'
        case 'Nő':
            return './assets/red.png'
    }
}
