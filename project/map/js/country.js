function baidu_map(map) {
    // var map = new BMap.Map("main");
    // 创建地图实例
    var point = new BMap.Point(117.094492, 36.205857);
    // 创建点坐标
    map.centerAndZoom(point, 13);
    // 初始化地图，设置中心点坐标和地图级别
    // 1c497a
    var jsonArray = [
        {
            "featureType": "land",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#0e3257ff"
            }
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#1b6288ff"
            }
        }, {
            "featureType": "green",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#1c497aff"
            }
        }, {
            "featureType": "building",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "building",
            "elementType": "geometry.topfill",
            "stylers": {
                "color": "#1b6288ff"
            }
        }, {
            "featureType": "building",
            "elementType": "geometry.sidefill",
            "stylers": {
                "color": "#143e56ff"
            }
        }, {
            "featureType": "building",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#dadada00"
            }
        }, {
            "featureType": "subwaystation",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#1b6288B2"
            }
        }, {
            "featureType": "education",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#1c497aff"
            }
        }, {
            "featureType": "medical",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#1c497aff"
            }
        }, {
            "featureType": "scenicspots",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#1c497aff"
            }
        }, {
            "featureType": "highway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "weight": "4"
            }
        }, {
            "featureType": "highway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "highway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#fed66900"
            }
        }, {
            "featureType": "highway",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "highway",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "highway",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "highway",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "arterial",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "weight": "2"
            }
        }, {
            "featureType": "arterial",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "arterial",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffeebb00"
            }
        }, {
            "featureType": "arterial",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "arterial",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "arterial",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "local",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "weight": "1"
            }
        }, {
            "featureType": "local",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "local",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "local",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "local",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#979c9aff"
            }
        }, {
            "featureType": "local",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffffff"
            }
        }, {
            "featureType": "railway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "weight": "1"
            }
        }, {
            "featureType": "railway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#123c52ff"
            }
        }, {
            "featureType": "railway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "subway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "weight": "1"
            }
        }, {
            "featureType": "subway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#d8d8d8ff"
            }
        }, {
            "featureType": "subway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "subway",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "subway",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#979c9aff"
            }
        }, {
            "featureType": "subway",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffffff"
            }
        }, {
            "featureType": "continent",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "continent",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "continent",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "continent",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "city",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "city",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "city",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "city",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "town",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "town",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "town",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#454d50ff"
            }
        }, {
            "featureType": "town",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffffff"
            }
        }, {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "poilabel",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "districtlabel",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "road",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "district",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "poilabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "poilabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "poilabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "manmade",
            "elementType": "geometry",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "districtlabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffffff"
            }
        }, {
            "featureType": "entertainment",
            "elementType": "geometry",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "shopping",
            "elementType": "geometry",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "nationalway",
            "stylers": {
                "level": "6",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "stylers": {
                "level": "7",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "stylers": {
                "level": "8",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "stylers": {
                "level": "9",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "stylers": {
                "level": "10",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "level": "6",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "level": "7",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "level": "8",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "level": "9",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "level": "10",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "labels",
            "stylers": {
                "visibility": "off",
                "level": "6",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "labels",
            "stylers": {
                "visibility": "off",
                "level": "7",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "labels",
            "stylers": {
                "visibility": "off",
                "level": "8",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "labels",
            "stylers": {
                "visibility": "off",
                "level": "9",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "labels",
            "stylers": {
                "visibility": "off",
                "level": "10",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "cityhighway",
            "stylers": {
                "level": "6",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "stylers": {
                "level": "7",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "stylers": {
                "level": "8",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "stylers": {
                "level": "9",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "level": "6",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "level": "7",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "level": "8",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "level": "9",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "labels",
            "stylers": {
                "visibility": "off",
                "level": "6",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "labels",
            "stylers": {
                "visibility": "off",
                "level": "7",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "labels",
            "stylers": {
                "visibility": "off",
                "level": "8",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "labels",
            "stylers": {
                "visibility": "off",
                "level": "9",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "subwaylabel",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "subwaylabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "tertiarywaysign",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "tertiarywaysign",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "provincialwaysign",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "provincialwaysign",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "nationalwaysign",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "nationalwaysign",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "highwaysign",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "highwaysign",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "village",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "district",
            "elementType": "labels.text",
            "stylers": {
                "fontsize": "20"
            }
        }, {
            "featureType": "district",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "district",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "country",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "country",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "tertiaryway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "tertiaryway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff10"
            }
        }, {
            "featureType": "provincialway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "provincialway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "highway",
            "elementType": "labels.text",
            "stylers": {
                "fontsize": "20"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "labels.text",
            "stylers": {
                "fontsize": "20"
            }
        }, {
            "featureType": "provincialway",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "provincialway",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "provincialway",
            "elementType": "labels.text",
            "stylers": {
                "fontsize": "20"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "labels.text",
            "stylers": {
                "fontsize": "20"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "estate",
            "elementType": "geometry",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "tertiaryway",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "tertiaryway",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "fourlevelway",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "fourlevelway",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "scenicspotsway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "scenicspotsway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "universityway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "universityway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "vacationway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "vacationway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "fourlevelway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "fourlevelway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "fourlevelway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "transportationlabel",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "transportationlabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "transportationlabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "transportationlabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "educationlabel",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "educationlabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "educationlabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "educationlabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "transportation",
            "elementType": "geometry",
            "stylers": {
                "color": "#1b6288ff"
            }
        }, {
            "featureType": "airportlabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "airportlabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "scenicspotslabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "scenicspotslabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "medicallabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "medicallabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "medicallabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "scenicspotslabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "airportlabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "entertainmentlabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "entertainmentlabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "entertainmentlabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "estatelabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "estatelabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "estatelabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "businesstowerlabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "businesstowerlabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "businesstowerlabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "companylabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "companylabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "companylabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "governmentlabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "governmentlabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "governmentlabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "restaurantlabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "restaurantlabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "restaurantlabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "hotellabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "hotellabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "hotellabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "shoppinglabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "shoppinglabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "shoppinglabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "lifeservicelabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "lifeservicelabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "lifeservicelabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "carservicelabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "carservicelabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "carservicelabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "financelabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "financelabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "financelabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "otherlabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "otherlabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "otherlabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "manmade",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "manmade",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "transportation",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "transportation",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "education",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "education",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "medical",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "medical",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "scenicspots",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "scenicspots",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }
    ];
    map.setMapStyleV2({styleJson: jsonArray});
    map.enableScrollWheelZoom(true);
}