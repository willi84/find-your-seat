var indoorStyle3D = {
    "name": "Deutsche Bahn 3D beta",
    "active": false,
    "extrusion": true,
    "layers": [   
         // this layer is almost invisible in rendering but is needed because mapbox.gl doesnt check all layer for level if all layer are set invisible
          {
            "id": "justForRendering",           
            "type": "line",
            "source": "indoor_source",    
            "source-layer": "line",
            "filter": ["all",  
                      ["any", ["==", "railway", "rail"], ["==", "railway", "light_rail"]] 
                      ],
            "layout": {
                      //  "visibility": "none", <<<< this is the difference to all other layer
                        "line-cap": "square"
            },   
            "paint": {
                "line-color": "#D6D6D6",
                "line-width": 1
            },
        },
         // -------------------------------------------------        
        {
            "id": "rail",           
            "type": "line",
            "source": "indoor_source",    
            "source-layer": "line", 
            "filter": ["all",  
                      ["any", ["==", "railway", "rail"], ["==", "railway", "light_rail"]] 
                      ],
            "layout": {
                       "visibility": "none"
            },   
            "paint": {
                "line-color": "#4c4c4c",
                "line-width": 3, 
               // 'line-dasharray': [3,4]
            },
        },
         {
            "id": "rail_white",           
            "type": "line",
            "source": "indoor_source",    
            "source-layer": "line",
            "filter": ["all", 
                      ["any", ["==", "railway", "rail"], ["==", "railway", "light_rail"]] 
                      ],
            "layout": {
                        "visibility": "none",
                        "line-cap": "round"
            },   
            "paint": {
                "line-color": "white",
                "line-width": 2.5, 
                'line-dasharray': [3,4]
            },
        },
         {
            "id": "extrusion_corridor",
            "type": "fill-extrusion",
            "source": "indoor_source",    
            "source-layer": "polygon",
            "filter":
                     ["all", 
                     ["any", ["any", ["==", "room", "corridor"],["==", "indoor", "corridor"],["==", "indoor", "area"],["==", "building_part", "floor"]] ]                 
                     ],
            "layout": {
                "visibility": "none"
            },       
            "paint": {                
                'fill-extrusion-height': 0.5,
                'fill-extrusion-opacity': 0.5,
                'fill-extrusion-color': "#EDEDED",
                'fill-extrusion-base': 0
            }
        },          
         {
            "id": "extrusion_room",
            "type": "fill-extrusion",
            "source": "indoor_source",    
            "source-layer": "polygon",
            "filter":
                     ["all",
                     ["any", ["any", ["==", "indoor", "room"], ["==", "room", "yes"], ["has", "shop"],
                    // ["==", "access", "private"],["==", "access", "no"],
                    ["==", "highway", "elevator"],["==", "stairwell", "elevator"],["==", "building_part", "elevator"],
                   //  ["==", "amenity", "toilets"], ["==", "amenity", "police"],
                   //  ["==", "public_transport", "service_center"], ["==", "public_transport", "service_point"], ["==", "shop", "ticket"], ["==", "amenity", "luggage_locker"]
                     ] ]                 
                     ],
            "layout": {
                "visibility": "none"
            },       
            "paint": {                
                'fill-extrusion-height': 5,              
                'fill-extrusion-color': "#FCC21F",
                                     /*
                                        {
                                          "property": "group",
                                          "type": "categorical",
                                              "stops": 
                                             
                                              [                                             
                                                ["1", "#D5D5D5"], // #D5D5D5
                                                ["2", 'green'],
                                                ["3", '#C4C8CC'],
                                                ["4", '#066C9E'],
                                                ["5", '#E7342B']
                                             ]
                                             
                                        }
                                    */
            }
        },
        
        {
            "id": "extrusion_room_access",
            "type": "fill-extrusion",
            "source": "indoor_source",    
            "source-layer": "polygon",
            "filter":
                     ["all", 
                     ["any", ["all", ["==", "indoor", "room"],["any", ["==", "access", "private"],["==", "access", "no"]]]]                 
                     ],
            "layout": {
                "visibility": "none"
            },       
            "paint": {                
                'fill-extrusion-height': 5,
                //'fill-extrusion-opacity': 0.8,
                'fill-extrusion-color': "#D5D5D5",  //red from openstationmap//"#E7342B",
              //  'fill-extrusion-base': 4.8
            }
        },  
             
         {
            "id": "extrusion_stairwell",
            "type": "fill-extrusion",
            "source": "indoor_source",    
            "source-layer": "polygon",
            "filter":
                     ["all",
                      ["any", ["==", "stairwell", "flight_of_stairs"], ["==", "stairwell", "yes"]]
                      ],
            "layout": {
                "visibility": "none"
            },       
            "paint": {                
                'fill-extrusion-height': 0.5,
                'fill-extrusion-opacity': 0.5,
                'fill-extrusion-color': "#C4C8CC"
                
            }
        },       
         {
            "id": "extrusion_stairlanding",
            "type": "fill-extrusion",
            "source": "indoor_source",    
            "source-layer": "polygon",
            "filter":
                     ["all",  
                      ["any", ["==", "stairwell", "stair_landing"]]
                      ],
            "layout": {
                "visibility": "none"
            },       
            "paint": {                
                'fill-extrusion-height': 0.5,
                'fill-extrusion-opacity': 0.5,
                'fill-extrusion-color': "#C4C8CC"
                
            }
        },          
         {
              "id": "stairs",
            "type": "line",
            "source": "indoor_source",    
            "source-layer": "line",
            "minzoom": 17,
            "filter": ["all", 
                      ["all", ["==", "highway", "steps"],["!has", "width"]]
                      ],
            "layout": {
                "visibility": "none"
            },   
            "paint": {
                'line-color': '#7e7f80',
                'line-width': {                    
                     "stops": [[18,9], [19,18], [20,32]]
                },                
                'line-dasharray': [0.05,0.1] // 0.2,0.4 first number line second number gap
                }
        },

        {
              "id": "stairs_width",
            "type": "line",
            "source": "indoor_source",    
            "source-layer": "line",
            "minzoom": 17,
            "filter": ["all", 
                      ["all", ["==", "highway", "steps"],["has", "width"]]
                      ],
            "layout": {
                "visibility": "none"
            },   
            "paint": {
                
                'line-color': '#7e7f80',
                'line-width': {   
                     "stops": [[17,5], [18,7], [19,14], [20,28]]
                },                
                'line-dasharray': [0.05,0.1] 
                } 
        },
         {
            "id": "conveying_up",
            "minzoom": 18,
            "type": "symbol",
            "source": "indoor_source",    
            "source-layer": "line",            
            "layout": {
                  "visibility": "none",
                  "icon-image": "steps-arrow-2.small",
                  "icon-size": 0.3,
                  "symbol-placement": "line", 
                  "symbol-spacing": 1,                  
            },
            "filter": ["all", 
                      ["any", ["all", ["==", "highway", "steps"], ["==", "conveying", "forward"], ["==", "incline", "up"]], ["all", ["==", "highway", "steps"], ["==", "conveying", "backward"], ["==", "incline", "down"]]] 
                      ],   
           
        },        
         {
           "id": "conveying_down",
            "minzoom": 18,
            "type": "symbol",
            "source": "indoor_source",    
            "source-layer": "line",            
            "layout": {
                  "visibility": "none",
                  "icon-image": "steps-arrow-2.small",
                  "icon-size": 0.3,
                  "symbol-placement": "line",                
                  "icon-rotate": 180,
                  "symbol-spacing": 1,                  
            },
            "filter": ["all", 
                      ["any",["all", ["==", "highway", "steps"],["==", "conveying", "forward"], ["==", "incline", "down"]], ["all", ["==", "highway", "steps"], ["==", "conveying", "backward"], ["==", "incline", "up"]]]
                      ],   
        },
         {
            "id": "extrusion_platform",
            "type": "fill-extrusion",
            "source": "indoor_source",    
            "source-layer": "polygon",
            "filter":
                     ["all", 
                      ["any", ["==", "public_transport", "platform"],["==", "railway", "platform"]]
                      ],
            "layout": {
                "visibility": "none"
            },       
            "paint": {                
                'fill-extrusion-height': 1,
                //'fill-extrusion-opacity': 0.8,
                'fill-extrusion-color': "#C1C1C0",  //red from openstationmap//"#E7342B",
              //  'fill-extrusion-base': 4.8
            }
        },       
         {
              "id": "fence",
            "minzoom": 19,
            "type": "line",
            "source": "indoor_source",    
            "source-layer": "line",
            "filter": ["all", 
                      ["any", ["==", "barrier", "fence"], ["==", "barrier", "railing"], ["==", "barrier", "wall"]] 
                      ],
            "layout":{
                "visibility": "none"
            },   
            "paint": {
                'line-color': 'black',
                'line-width': 1.5                    
                     
                }
        },
             
        {
            "id": "extrusion_elevator",
            "type": "fill-extrusion",
            "source": "indoor_source",    
            "source-layer": "polygon",
            "filter":
                     ["all", 
                     ["any", ["==", "highway", "elevator"],["==", "stairwell", "elevator"],["==", "building_part", "elevator"]]                
                     ],
            "layout": {
                "visibility": "none"
            },       
            "paint": {                
                'fill-extrusion-height': 5,
                //'fill-extrusion-opacity': 0.8,
                'fill-extrusion-color': "#C4C8CC",  //red from openstationmap//"#E7342B",
              //  'fill-extrusion-base': 4.8
            }
        }, 
        {
            "id": "extrusion_facilities",
            "type": "fill-extrusion",
            "source": "indoor_source",    
            "source-layer": "polygon",
            "filter":
                     ["all", 
                      ["any", ["==", "amenity", "toilets"], ["==", "amenity", "police"]]
                      ],
            "layout": {
                "visibility": "none"
            },       
            "paint": {                
                'fill-extrusion-height': 5,
                //'fill-extrusion-opacity': 0.8,
                'fill-extrusion-color': "#066C9E",  //red from openstationmap//"#E7342B",
              //  'fill-extrusion-base': 4.8
            }
        },
      
        {
            "id": "extrusion_service",
            "type": "fill-extrusion",
            "source": "indoor_source",    
            "source-layer": "polygon",
            "filter":
                      ["all", 
                      ["any", ["==", "public_transport", "service_center"], ["==", "public_transport", "service_point"], ["==", "shop", "ticket"], ["==", "amenity", "luggage_locker"]] 
                      ],
            "layout": {
                "visibility": "none"
            },       
            "paint": {                
                'fill-extrusion-height': 5,
                //'fill-extrusion-opacity': 0.8,
                'fill-extrusion-color': "#E7342B",  //red from openstationmap//"#E7342B",
              //  'fill-extrusion-base': 4.8
            }
        },
       
        {
            "id": "footway",
            "minzoom": 18,
            "type": "line",
            "source": "indoor_source",    
            "source-layer": "line",
            "filter": ["all", 
                      ["any", ["==", "highway", "footway"]] 
                      ],
            "layout": {
                  "visibility": "none",
                  "line-cap": "round",                  
            },   
            "paint": {
                'line-color': '#ddd',
                'line-width': 1,
                'line-dasharray': [1,3] // 0.2,0.4 first number line second number gap
            }
        },              
        {
            "id": "door",
            "minzoom": 18,
            "type": "line",
            "source": "indoor_source",    
            "source-layer": "line",
            "filter": ["all", 
                      ["all", ["has", "door"]] 
                      ],
            "layout":{
                "visibility": "none"
            },   
            "paint": {
                'line-color': '#EDEDED',
                'line-width': 3   
            }
        },  
        // ++++++++++++++ START LABEL ++++++++++++++++++++++
        {  
            "id": "text_shop",
            "minzoom": 18,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "label",
            "filter": ["all",  
                      ["all", ["==", "room", "shop"], ["has", "name"]] 
                      ],   
            "layout": {
                  "visibility": "none",        
                  "text-offset": [0,0.5],
                  "text-field": "{name}",
                  "text-font": [ "Open Sans Regular", "Arial Unicode MS Regular"],
                  "text-max-width": 4,
                  "text-anchor": "top",
                  "text-size": 12                              
            }
        },
         {
            "id": "bench",
            "minzoom": 18,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "point",
            "filter": ["all", 
                      ["all", ["==", "amenity", "bench"]] 
                      ],   
            "layout": {
                  "visibility": "none",
                  "icon-image": "wartebereich.small",
                  "icon-size": 0.4
            }
        },
        {
            "id": "atm",
            "minzoom": 18,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "point",
            "filter": ["all", 
                      ["all", ["==", "amenity", "atm"]] 
                      ],   
            "layout": {
                  "visibility": "none",
                  "icon-image": "ec_atm.small",
                  "icon-size": 0.4
            }
        },
        {
            "id": "ticket_validator",
            "minzoom": 19,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "point",
            "filter": ["all", 
                      ["all", ["==", "vending", "ticket_validator"]]
                      ],   
            "layout": {
                  "visibility": "none",
                  "icon-image": "fahrkartenentwerter.small",
                  "icon-size": 0.4
            }
        },
        {  
            "id": "label_bank",
            "minzoom": 18,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "label",
            "filter": ["all",  
                      ["any", ["==", "amenity", "bank"]] 
                      ],   
            "layout": {
                  "visibility": "none",                  
                  "icon-image": "bank-11" ,
                 // "icon-size": 0.3,
                  "text-offset": [0,0.5],
                  "text-field": "{name}",
                  "text-font": [ "Open Sans Regular", "Arial Unicode MS Regular"],
                  "text-max-width": 4,
                  "text-anchor": "top",
                  "text-size": 12                              
            }
        },
        {  
            "id": "label_books",
            "minzoom": 18,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "label",
            "filter": ["all", 
                      ["any", ["==", "shop", "books"], ["==", "shop", "newsagent"]] 
                      ],   
            "layout": {
                  "visibility": "none",                  
                  "icon-image": "library-11" ,
                 // "icon-size": 0.3,
                  "text-offset": [0,0.5],
                  "text-field": "{name}",
                  "text-font": [ "Open Sans Regular", "Arial Unicode MS Regular"],
                  "text-max-width": 4,
                  "text-anchor": "top",
              //    "text-size": 12
                  "text-size": {
                    "base": 1.4,
                    "stops": [
                        [
                            18,
                            11
                        ],
                        [
                            20,
                            15
                        ]
                    ]
                }                              
            }
        },
        {  
            "id": "label_florist",
            "minzoom": 18,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "label",
            "filter": ["all", 
                      ["all", ["==", "shop", "florist"]] 
                      ],   
            "layout": {
                  "visibility": "none",                  
                  "icon-image": "garden-11" ,
                 // "icon-size": 0.3,
                  "text-offset": [0,0.5],
                  "text-field": "{name}",
                  "text-font": [ "Open Sans Regular", "Arial Unicode MS Regular"],
                  "text-max-width": 4,
                  "text-anchor": "top",
                  "text-size": 12                              
            }
        },
        {  
            "id": "label_bakery",
            "minzoom": 18,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "label",
            "filter": ["all", 
                      ["any", ["==", "amenity", "bakery"], ["==", "shop", "bakery"]] 
                      ],   
            "layout": {
                  "visibility": "none",                  
                  "icon-image": "bakery-11" ,
                 // "icon-size": 0.3,
                  "text-offset": [0,0.5],
                  "text-field": "{name}",
                  "text-font": [ "Open Sans Regular", "Arial Unicode MS Regular"],
                  "text-max-width": 4,
                  "text-anchor": "top",
                  "text-size": 12                              
            }
        },
        {  
            "id": "label_restaurant",
            "minzoom": 18,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "label",
            "filter": ["all", 
                      ["any", ["==", "amenity", "restaurant"], ["==", "indoor", "restaurant"]] 
                      ],   
            "layout": {
                  "visibility": "none",                  
                  "icon-image": "restaurant-11" ,
                 // "icon-size": 0.3,
                  "text-offset": [0,0.5],
                  "text-field": "{name}",
                  "text-font": [ "Open Sans Regular", "Arial Unicode MS Regular"],
                  "text-max-width": 4,
                  "text-anchor": "top",
                  "text-size": 12                              
            }
        },
         {  
            "id": "label_fast_food",
            "minzoom": 18,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "label",
            "filter": ["all", 
                      ["any", ["==", "amenity", "fast_food"]] 
                      ],   
            "layout": {
                  "visibility": "none",                  
                  "icon-image": "fast-food-11" ,
                 // "icon-size": 0.3,
                  "text-offset": [0,0.5],
                  "text-field": "{name}",
                  "text-font": [ "Open Sans Regular", "Arial Unicode MS Regular"],
                  "text-max-width": 4,
                  "text-anchor": "top",
                  "text-size": 12                              
            }
        },
         {  
            "id": "label_cafe",
            "minzoom": 18,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "label",
            "filter": ["all", 
                      ["any", ["==", "amenity", "cafe"], ["==", "shop", "coffee"]] 
                      ],   
            "layout": {
                  "visibility": "none",                  
                  "icon-image": "cafe-11" ,
                 // "icon-size": 0.3,
                  "text-offset": [0,0.5],
                  "text-field": "{name}",
                  "text-font": [ "Open Sans Regular", "Arial Unicode MS Regular"],
                  "text-max-width": 4,
                  "text-anchor": "top",
                  "text-size": 12                              
            }
        },
         {  
            "id": "label_car_rental",
            "minzoom": 18,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "label",
            "filter": ["all", 
                      ["all", ["==", "amenity", "car_rental"]] 
                      ],   
            "layout": {
                  "visibility": "none",                  
                  "icon-image": "car-11" ,
                 // "icon-size": 0.3,
                  "text-offset": [0,0.5],
                  "text-field": "{name}",
                  "text-font": [ "Open Sans Regular", "Arial Unicode MS Regular"],
                  "text-max-width": 4,
                  "text-anchor": "top",
                  "text-size": 12                              
            }
        },
        {  
            "id": "label_pharmacy",
            "minzoom": 18,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "label",
            "filter": ["all", 
                      ["all", ["==", "amenity", "pharmacy"]] 
                      ],   
            "layout": {
                  "visibility": "none",                  
                  "icon-image": "hospital-11" ,
                 // "icon-size": 0.3,
                  "text-offset": [0,0.5],
                  "text-field": "{name}",
                  "text-font": [ "Open Sans Regular", "Arial Unicode MS Regular"],
                  "text-max-width": 4,
                  "text-anchor": "top",
                  "text-size": 12                              
            }
        },
        {  
            "id": "label_clothes",
            "minzoom": 18,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "label",
            "filter": ["all", 
                      ["all", ["==", "shop", "clothes"]] 
                      ],   
            "layout": {
                  "visibility": "none",                  
                  "icon-image": "clothing-store-11" ,
                 // "icon-size": 0.3,
                  "text-offset": [0,0.5],
                  "text-field": "{name}",
                  "text-font": [ "Open Sans Regular", "Arial Unicode MS Regular"],
                  "text-max-width": 4,
                  "text-anchor": "top",
                  "text-size": 12                              
            }
        },
                {  
            "id": "label_information",
            "minzoom": 18,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "label",
            "filter": ["all", 
                      ["any", ["==", "tourism", "information"]] 
                      ],   
            "layout": {
                  "visibility": "none",                  
                  "icon-image": "information-11" ,
                 // "icon-size": 0.3,
                  "text-offset": [0,0.5],
                  "text-field": "{name}",
                  "text-font": [ "Open Sans Regular", "Arial Unicode MS Regular"],
                  "text-max-width": 4,
                  "text-anchor": "top",
                  "text-size": 12                              
            }
        },
        {  
            "id": "label_luggage_locker",
            "minzoom": 18,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "label",
            "filter": ["all", 
                      ["any", ["==", "amenity", "luggage_locker"]] 
                      ],   
            "layout": {
                  "visibility": "none",                  
                  "icon-image": "schliessfach.small" ,
                  "icon-size": 0.4             
            }
        },  
        {
            "id": "public_transport_tickets",
            "minzoom": 18,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "point",
            "filter": ["all",
                      ["all", ["==", "amenity", "vending_machine"],["==", "vending", "public_transport_tickets"]] 
                      ],   
            "layout": {
                  "visibility": "none",
                  "icon-image": "fahrkarten.small",
                  "icon-size": 0.4
            }
        },        
        {  
            "id": "label_toilet",
            "minzoom": 18,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "label",
            "filter": ["all",
                      ["any", ["==", "amenity", "toilets"]]
                      ],   
            "layout": {
                  "visibility": "none",                  
                  "icon-image": "wc.small" ,
                  "icon-size": 0.4     
            }
        },
        {
            "id": "information_point",
            "minzoom": 17,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "point",
            "filter": ["all", 
                      ["any", ["==", "tourism", "information"]]
                      ],   
            "layout": {
                  "visibility": "none",
                  "icon-image": "information-11",
                  "icon-size": 0.4
            }
        },        
        {
            "id": "elevatorpoint",
            "minzoom": 17,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "point",
            "filter": ["all", 
                      ["any", ["==", "highway", "elevator"]]
                      ],   
            "layout": {
                  "visibility": "none",
                  "icon-image": "aufzug.small",
                  "icon-size": 0.4
            }
        },
         {  
            "id": "service_symbol",
            "minzoom": 18,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "label",
            "filter": ["all", 
                      ["any", ["==", "public_transport", "service_center"], ["==", "public_transport", "service_point"], ["==", "shop", "ticket"]] 
                      ],   
            "layout": {
                  "visibility": "none",                  
                  "icon-image": "i.small" ,
                  "icon-size": 0.4,
                  "text-offset": [0,1.2],
                  "text-field": "{name}",
                  "text-font": [ "Open Sans Regular", "Arial Unicode MS Regular"],
                  "text-max-width": 4,
                  "text-anchor": "top",
                  "text-size": 12                               
            }
        }, 
        {
            "id": "local_ref1",
            "minzoom": 17,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "point",
            "filter": ["all", 
                      ["all", ["==", "public_transport", "stop_position"],["==", "local_ref", "1"]] 
                      ],   
            "layout": {
                  "visibility": "none",
                  "icon-image": "gleis_1.small",
                  "icon-size": 0.4
            }
        },
        {
            "id": "local_ref2",
            "minzoom": 17,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "point",
            "filter": ["all", 
                      ["all", ["==", "public_transport", "stop_position"],["==", "local_ref", "2"]] 
                      ],   
            "layout": {
                  "visibility": "none",
                  "icon-image": "gleis_2.small",
                  "icon-size": 0.4
            }
        },
        {
            "id": "local_ref3",
            "minzoom": 17,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "point",
            "filter": ["all", 
                      ["all", ["==", "public_transport", "stop_position"],["==", "local_ref", "3"]]
                      ],   
            "layout": {
                  "visibility": "none",
                  "icon-image": "gleis_3.small",
                  "icon-size": 0.4
            }
        },
        {
            "id": "local_ref4",
            "minzoom": 17,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "point",
            "filter": ["all", 
                      ["all", ["==", "public_transport", "stop_position"],["==", "local_ref", "4"]] 
                      ],   
            "layout": {
                  "visibility": "none",
                  "icon-image": "gleis_4.small",
                  "icon-size": 0.4
            },
        },    
        {
            "id": "local_ref5",
            "minzoom": 17,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "point",
            "filter": ["all", 
                      ["all", ["==", "public_transport", "stop_position"],["==", "local_ref", "5"]] 
                      ],   
            "layout": {
                  "visibility": "none",
                  "icon-image": "gleis_5.small",
                  "icon-size": 0.4
            },
        },    
        {
            "id": "local_ref6",
            "minzoom": 17,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "point",
            "filter": ["all", 
                      ["all", ["==", "public_transport", "stop_position"],["==", "local_ref", "6"]] 
                      ],   
            "layout": {
                  "visibility": "none",
                  "icon-image": "gleis_6.small",
                  "icon-size": 0.4
            },
        },    
        {
            "id": "local_ref7",
            "minzoom": 17,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "point",
            "filter": ["all", 
                      ["all", ["==", "public_transport", "stop_position"],["==", "local_ref", "7"]] 
                      ],   
            "layout": {
                  "visibility": "none",
                  "icon-image": "gleis_7.small",
                  "icon-size": 0.4
            }
        },
        {
            "id": "local_ref8",
            "minzoom": 17,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "point",
            "filter": ["all", 
                      ["all", ["==", "public_transport", "stop_position"],["==", "local_ref", "8"]] 
                      ],   
            "layout": {
                  "visibility": "none",
                  "icon-image": "gleis_8.small",
                  "icon-size": 0.4
            }
        },
        {
            "id": "local_ref9",
            "minzoom": 17,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "point",
            "filter": ["all", 
                      ["all", ["==", "public_transport", "stop_position"],["==", "local_ref", "9"]] 
                      ],   
            "layout": {
                  "visibility": "none",
                  "icon-image": "gleis_9.small",
                  "icon-size": 0.4
            }
        },
        {
            "id": "local_ref10",
            "minzoom": 17,
            "type": "symbol",
            "source": "indoor_source", 

            "source-layer": "point",
            "filter": ["all", 
                      ["all", ["==", "public_transport", "stop_position"],["==", "local_ref", "10"]] 
                      ],   
            "layout": {
                  "visibility": "none",
                  "icon-image": "gleis_10.small",
                  "icon-size": 0.4
            }
        },
        { //------------------ S bahn label
            "interactive": true,
            "minzoom": 14,
            "maxzoom": 19,
            "layout": {

                "icon-image": "s.small",
                "text-offset": [
                    0,
                    0.6
                ],
                "text-field": "{name_en}",
                "text-font": [
                    "Open Sans Semibold",
                    "Arial Unicode MS Bold"
                ],
                "text-max-width": 8,
                "text-anchor": "top",
                "text-size": 15,
                "icon-size": 0.3
            },
            "filter": ["all",["==","$type","Point"],["==","maki","rail-light"],["==","network","de-s-bahn"]],
            "type": "symbol",
            "source": "mapbox",
            "id": "railstation_light_label",
            "paint": {
               
                "text-color": "black",                                
                "text-halo-width": 3,
                "text-halo-color": "rgba(255,255,255,0.75)",
                "text-halo-blur": 1
                
            },
            "source-layer": "rail_station_label"
        },
        {  //------------------ underground label
            "interactive": true,
            "minzoom": 14,
            "maxzoom": 19,
            "layout": {
                "icon-image": "u.small",
                "text-offset": [
                    0,
                    0.6
                ],
                "text-field": "{name_en}",
                "text-font": [
                    "Open Sans Semibold",
                    "Arial Unicode MS Bold"
                ],
                "text-max-width": 8,
                "text-anchor": "top",
                "text-size": 15,
                "icon-size": 0.3
            },
            "filter": ["all",["==","$type","Point"],["==","maki","rail-metro"],["==","network","de-u-bahn"]],
            "type": "symbol",
            "source": "mapbox",
            "id": "railstation_underground_label",
            "paint": {
                "text-color": "black",
                "text-halo-width": 3,
                "text-halo-color": "rgba(255,255,255,0.75)",
                "text-halo-blur": 1
            },
            "source-layer": "rail_station_label"
        },        
        { //------------------ bahn label
            "interactive": true,
            "minzoom": 12,
            "maxzoom": 19,
            "layout": {
                "icon-image": "rail-light-15", // db_logo.small
                "text-offset": [
                    0,
                    0.6
                ],
                "text-field": "{name_en}",
                "text-font": [
                    "Open Sans Semibold",
                    "Arial Unicode MS Bold"
                ],
                "text-max-width": 8,
                "text-anchor": "top",
                "text-size": 15,
                "icon-size": 1
            },
            "filter": ["all",["==","$type","Point"],["==","maki","rail"],["==","network","rail"]],
            "type": "symbol",
            "source": "mapbox",
            "id": "railstation_label",
            "paint": {
                "text-color": "black",
                "text-halo-width": 3,
                "text-halo-color": "rgba(255,255,255,0.75)",
                "text-halo-blur": 1
            },
            "source-layer": "rail_station_label"
        }       
    ]
}
