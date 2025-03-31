function initMap() {
    const hungary = { lat: 47.1611615, lng: 19.5057541 };
    var activeInfoWindow;
    const options = {
        zoom: 7,
        center: hungary
    };
    const map = new google.maps.Map(document.getElementById("map"), options);
    
    const markers = dataOfSpreadsheet[1]
    
    markers.forEach(marker => {
        const markerItem=new google.maps.Marker({
            position: {lat: Number(marker.Lat), lng: Number(marker.Lon)},
            map: map,
            title: marker.Name,
            icon:{url:getSex(marker)}
        });

        const infowindow = new google.maps.InfoWindow({
            content: `<img src='assets/user.png' /> <br >Név: ${marker.Name} <br> Lakhely: ${marker.City}`
        });
        markerItem.addListener('click', () => {
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