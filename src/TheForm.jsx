import {useForm} from "react-hook-form"
import "./TheForm.css"
// import { map } from "leaflet"
import { useState } from "react"
import MyMap from "./MyMap"

const TheForm = ({saveUzers}) => {
    const{register, handleSubmit, reset,formState: {errors,isValid}} = useForm()

    const [arr, setArr] = useState([]); // מאחסן את תוצאות החיפוש של הכתובת
    const [inputValue, setInputValue] = useState(''); // מאחסן את הערך שהוזן בשדה הכתובת
    const [lat, setlat] = useState(null); // מאחסן את קואורדינטת ה-latitude
    const [lon, setlon] = useState(null); // מאחסן את קואורדינטת ה-longitude
    const [nameAddress, setNameAddress] = useState(''); // מאחסן את שם הכתובת שנבחרה

    // פונקציה ששומרת את הנתונים ומאפס את הטופס אחרי שליחה
    const save = (data) => {
        saveUzers(data) //שמירת נתוני המשתמש במערך המשתמשים שלי
        setInputValue('');
        reset()    //איפוס הטופס
    }
    console.log(errors)

    // פונקציה אסינכרונית לחיפוש כתובת באמצעות API של OpenStreetMap
    const Nominatim = async (address) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}&limit=5`);
            let data = await response.json();
            setArr(data);  //שומר את האופציות שהתקבלו
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
     // פונקציה שמתעדכנת כאשר המשתמש משנה את הערך בשדה הכתובת
    const ifChange = (e) => {
        setInputValue(e.target.value);
        Nominatim(e.target.value); // קריאה לפונקצית החיפוש עם הקלט של המשתמש
    }

    // פונקציה שמתעדכנת כאשר המשתמש בוחר כתובת מתוך תוצאות החיפוש
   const addressToInput = (suggestion) =>{
      let myLat = suggestion.lat;
      let myLon = suggestion.lon;
      let myName = suggestion.display_name;
      setNameAddress(myName)
      setlat(myLat);
      setlon(myLon);
      setInputValue(suggestion.display_name); 
      setArr([]);
   }

//    useEffect(() => {
//     console.log(lat,lon)
//     if (lat !== null && lon !== null) {
//         printMap();
//     }}, [lat, lon, nameAddress]); 
   
//     function printMap(){
//         <MyMap lat={lat} lon={lon} nameAddress={nameAddress} />    
//     }
    return ( <div id="myForm">       {/*הטופס שלי */}
        <form noValidate onSubmit={handleSubmit(save)}>
        <input type="text" {...register("name", {required: true})} placeholder="name..."/>
        {errors.name && <div style={{color : "red"}}>שדה חובה</div>}
        <div >
        <input
        type="text"
        value={inputValue}      //
        {...register("address", {
            required: { value: true, message: "שדה חובה" },
            onChange: ifChange // כאשר הערך משתנה שליחה לפונקציה ifChange
        })}
        placeholder="address to search..."
        />

          {arr.map(item => (  //אם יש תוצאות חיפוש - מציג אותם
                <div key={item.place_id} className="addressDiv" onClick ={() => addressToInput(item)}>
                    {item.display_name}
                </div>
              ))} 
        </div>
        {errors.id && <div style={{color : "red"}}>{errors.id.message}</div>}
        <input type="text" {...register("phone")} placeholder="phone"/>
        <input type="email" {...register("mail")} placeholder="---@gmail.com"/>
        Internet connection
        <input type="checkbox" {...register("InternetConnection")}/>
        Kitchen
        <input type="checkbox" {...register("Kitchen")} />
        coffee machine
        <input type="checkbox" {...register("coffeeMachine")} />
        <input type="number" {...register("numRooms")} placeholder="num of rooms"/>
        <input type="number" {...register("distance")} placeholder="The greatest distance you agree to"/>
        <input type="submit" disabled={!isValid} />
    </form> 
    {console.log(lat,lon)}
    {/*קריאה לקומפוננטה להצגת המפה כל פעם שהמיקום משתנה (לפי ה key) */}
    {lat && lon ? (<MyMap key={`${lat}-${lon}`} lat={lat} lon={lon} nameAddress={nameAddress} />) : ('')}
    </div>);
    
}
 
export default TheForm;