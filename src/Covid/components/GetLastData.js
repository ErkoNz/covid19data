import axios from 'axios'

export default function GetLastData(props, LOCAL_STORAGE_LASTDAY, setLastDayData) {
    // var returnThis

    // if (props.location.state) {
    //     returnThis = props.location.state[0]
    //     localStorage.setItem(LOCAL_STORAGE_LASTDAY, JSON.stringify(props.location.state[0]))
    //     setLastDayData(returnThis)

    //     return returnThis
    // }
    // else if (localStorage.getItem(LOCAL_STORAGE_LASTDAY)) {
    //     returnThis = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LASTDAY))
    //     setLastDayData(returnThis)
    //     console.log("this is good")

    //     return returnThis
    // }

    // else {
    var pom = []

    if (props.match.params.id === "Svet")
        axios.get('https://disease.sh/v2/all')
            .then(response => {
                localStorage.setItem(LOCAL_STORAGE_LASTDAY, JSON.stringify(response.data))
                setLastDayData(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    else
        axios.get('https://disease.sh/v2/countries')
            .then(response => {
                // const allowed = ["country", "active", "todayCases", "cases", "deaths", "recovered", "tests", "todayCases", "todayRecovered", "todayDeaths"]
                response.data.map((udaj, id) => {
                    Object.keys(udaj)
                        // .filter(key => allowed.includes(key))
                        .reduce((obj, key) => {
                            obj[key] = udaj[key];
                            pom[id] = obj
                            return obj;
                        }, {})
                    return null
                })
                pom = pom.filter(function (e) {
                    return e.country === props.match.params.id
                })
                localStorage.setItem(LOCAL_STORAGE_LASTDAY, JSON.stringify(pom[0]))
                setLastDayData(pom[0])
            })
            .catch(error => {
                console.log(error)
            })
    // }
}

