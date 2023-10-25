import React, { useState, useEffect, useRef } from "react";
import { View, Image, Text, Button } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import HomeStyle from "../styles/HomeStyle";
import { ref, set, get } from "firebase/database";
import { FIREBASE_DB } from "../firebaseConfig";
import { useSelector } from "react-redux";

const Home = () => {
  const { name, uid, image, email } = useSelector((state) => state.userReducer);
  const [userLocations, setUserLocations] = useState([]);
  const currentDate = new Date();
  const [showWhiteBorder, setShowWhiteBorder] = useState(false);
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const currentFormattedDate = `${currentDate.getFullYear()}-${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
  const [currentLocation, setCurrentLocation] = useState(null);
  const toggleWhiteBorder = () => {
    setShowWhiteBorder(!showWhiteBorder);
  };
  useEffect(() => {
    getPermissionAndLocation();
    //console.log("first");
  }, []);

  const getPermissionAndLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Please grant location permission");
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      if (location) {
        setCurrentLocation(location);
      } else {
        console.log("Location data is null.");
      }
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(sendLocation, 10000);
    //console.log("image", image);
    return () => clearInterval(intervalId);
  }, [currentLocation, name, uid]);

  const sendLocation = () => {
    const timestamp = Date.now();
    if (currentLocation) {
      const locationData = {
        userName: name,
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        date: currentFormattedDate,
        uid: uid,
        formattedTime: formattedTime,
      };
      // Create a reference to the database path
      const locationRef = ref(FIREBASE_DB, "usersLocation/" + timestamp);

      set(locationRef, locationData)
        .then(() => {
          console.log("Location sent successfully");
        })
        .catch((error) => {
          console.error("Error sending location:", error);
        });
    } else {
      console.log("Current location is null.");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(getAllUsersLocations, 12000);
    //console.log("third");
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getAllUsersLocations = async () => {
    try {
      const usersLocationRef = ref(FIREBASE_DB, "usersLocation");
      const snapshot = await get(usersLocationRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const locationsByUser = groupLocationsByUser(data);
        setUserLocations(locationsByUser);
        fitToMarkers(locationsByUser);
      } else {
        console.log("No data found in usersLocation");
      }
    } catch (error) {
      console.error("Error fetching user locations:", error);
    }
  };

  const groupLocationsByUser = (data) => {
    const uniqueUIDs = [
      ...new Set(Object.values(data).map((location) => location.uid)),
    ];
    const locationsByUser = uniqueUIDs.map((uid) => {
      return Object.values(data)
        .filter((location) => location.uid === uid)
        .sort((a, b) => a.timestamp - b.timestamp);
    });

    return locationsByUser;
  };

  const mapViewRef = useRef(null);

  const fitToMarkers = (locationsArray) => {
    if (mapViewRef.current && locationsArray.length > 0) {
      const coordinates = locationsArray
        .map((locations) =>
          locations.map((location) => ({
            latitude: location.latitude,
            longitude: location.longitude,
          }))
        )
        .flat();
      mapViewRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 25, right: 25, bottom: 25, left: 25 },
        animated: true,
      });
    }
  };
  return (
    <View style={HomeStyle.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={HomeStyle.map}
        ref={mapViewRef}
        >        
        {userLocations.map((locations, userIndex) => (
          <React.Fragment key={userIndex}>
            {/* {console.log("Location UID:", locations.map((location)=>location.uid))}
            {console.log(" UID:", uid)} */}
            {locations.map((location, index) => (
              <React.Fragment key={index}>
                <Marker
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                  title={location.userName}
                  description={location.formattedTime}
                />
                {locations.length > 1 && index > 0 && (
                  <Polyline
                    coordinates={[
                      {
                        latitude: location.latitude,
                        longitude: location.longitude,
                      },
                      {
                        latitude: locations[index - 1].latitude,
                        longitude: locations[index - 1].longitude,
                      },
                    ]}
                    strokeColor={ "blue"}
                    strokeWidth={5}
                  />
                  )}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </MapView>
      <View style={HomeStyle.buttonContainer}>
        <Button
          title={showWhiteBorder ? "Hide More Info" : "Show More Info"}
          onPress={toggleWhiteBorder}
        />
      </View>
      {showWhiteBorder && (
        <View style={HomeStyle.whiteBorder}>
         <Image
        source={image ? { uri: image } : require('../assets/OIP.png')}
        style={HomeStyle.imageStyle}
      />
          <View>
            <Text style={HomeStyle.textStyle}>Name: {name}</Text>
            <Text style={HomeStyle.textStyle}>Email: {email}</Text>
          </View>
          <View style={HomeStyle.closeBtn}>
            <Button title="Close " onPress={toggleWhiteBorder} />
          </View>
        </View>
      )}
    </View>
  );
};
export default Home;
