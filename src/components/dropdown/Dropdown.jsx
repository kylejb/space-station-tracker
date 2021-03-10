import { useState } from "react"
import parse from 'html-react-parser'
import XMLParser from 'react-xml-parser'

const Dropdown = () => {

    const [stateListValue, setStateListValue] = useState("")
    const [cityListValue, setCityListValue] = useState("")
    const [sightingLocationData, setSightingLocationData] = useState("")

    const countryDropdownHelper = (e) => {
        fetchStateData(e.target.value)
    }

    const fetchStateData = (country) => {
        console.log(`I just got ALL the states from ${country}`)
        
        //NOTE: For everything NOT USA or UK there is "none" for state

        const proxyURL = `https://cors-anywhere.herokuapp.com/`; //! temporary PROXY_URL
        const baseURL = `https://spotthestation.nasa.gov/sightings/location_files/`;
        

        fetch(proxyURL + baseURL + country + ".html")
            .then(response => response.text())
            .then(data => setStateListValue(data))
    }

    const stateDropdownHelper = (e) => {
        fetchCityData(e.target.value)
    }

    const fetchCityData = (state) => {
        console.log(`I just got ALL the cities from ${state}`)
        
        const proxyURL = `https://cors-anywhere.herokuapp.com/`; //! temporary PROXY_URL
        const baseURL = `https://spotthestation.nasa.gov/sightings/location_files/`;
        
        fetch(proxyURL + baseURL + state + ".html")
            .then(response => response.text())
            .then(data => setCityListValue(data))
    }

    //NOTE: this will evntually go in the app level since we'll need to feed info down into globe
    
    const cityFetchHelper = (e) => {
        console.log(`Going to fetch the sighting data from ${e.target.value}`)
        fetchSightingData(e.target.value)
    }
    
    const fetchSightingData = (citySearchInfo) => {
        
        const proxyURL = `https://cors-anywhere.herokuapp.com/`; //! temporary PROXY_URL
        const baseURL = "https://spotthestation.nasa.gov/sightings/xml_files/"

        fetch(proxyURL + baseURL + citySearchInfo + ".xml")
            .then(response => response.text())
            .then(data => {
                const xml = new XMLParser().parseFromString(data)
                setSightingLocationData(xml.getElementsByTagName('item'))

               }
            )
        }

return(
<>
    <br/><br/><br/>
    <h3>Dropdowns</h3>
    
    <label>Country</label>
    <input type="text" list="country" onChange={countryDropdownHelper} />
    <datalist id="country">
        <option value="Afghanistan">Afghanistan</option>
        <option value="Albania">Albania</option>
        <option value="Algeria">Algeria</option>
        <option value="Angola">Angola</option>
        <option value="Antigua">Antigua</option>
        <option value="Argentina">Argentina</option>
        <option value="Aruba">Aruba</option>
        <option value="Australia">Australia</option>
        <option value="Austria">Austria</option>
        <option value="Bahamas">Bahamas</option>
        <option value="Bahrain">Bahrain</option>
        <option value="Bangladesh">Bangladesh</option>
        <option value="Barbados">Barbados</option>
        <option value="Belarus">Belarus</option>
        <option value="Belgium">Belgium</option>
        <option value="Belize">Belize</option>
        <option value="Bermuda">Bermuda</option>
        <option value="Bolivia">Bolivia</option>
        <option value="Bonaire">Bonaire</option>
        <option value="Bosnia">Bosnia</option>
        <option value="Botswana">Botswana</option>
        <option value="Brazil">Brazil</option>
        <option value="Brunei">Brunei</option>
        <option value="Bulgaria">Bulgaria</option>
        <option value="Cameroon">Cameroon</option>
        <option value="Canada">Canada</option>
        <option value="Chile">Chile</option>
        <option value="China">China</option>
        <option value="Colombia">Colombia</option>
        <option value="Comoros">Comoros</option>
        <option value="Costa_Rica">Costa Rica</option>
        <option value="Croatia">Croatia</option>
        <option value="Cuba">Cuba</option>
        <option value="Curacao">Curacao</option>
        <option value="Cyprus">Cyprus</option>
        <option value="Czech_Republic">Czech Republic</option>
        <option value="Denmark">Denmark</option>
        <option value="Dominica">Dominica</option>
        <option value="Dominican_Republic">Dominican Republic</option>
        <option value="Ecuador">Ecuador</option>
        <option value="Egypt">Egypt</option>
        <option value="El_Salvador">El Salvador</option>
        <option value="Estonia">Estonia</option>
        <option value="Ethiopia">Ethiopia</option>
        <option value="Falkland_Islands">Falkland Islands</option>
        <option value="Fiji">Fiji</option>
        <option value="Finland">Finland</option>
        <option value="France">France</option>
        <option value="French_Guiana">French Guiana</option>
        <option value="Gabon">Gabon</option>
        <option value="Gambia">Gambia</option>
        <option value="Georgia">Georgia</option>
        <option value="Germany">Germany</option>
        <option value="Ghana">Ghana</option>
        <option value="Greece">Greece</option>
        <option value="Grenada">Grenada</option>
        <option value="Guadeloupe">Guadeloupe</option>
        <option value="Guatemala">Guatemala</option>
        <option value="Guyana">Guyana</option>
        <option value="Haiti">Haiti</option>
        <option value="Honduras">Honduras</option>
        <option value="Hong_Kong">Hong Kong</option>
        <option value="Hungary">Hungary</option>
        <option value="Iceland">Iceland</option>
        <option value="India">India</option>
        <option value="Indonesia">Indonesia</option>
        <option value="Iran">Iran</option>
        <option value="Iraq">Iraq</option>
        <option value="Ireland">Ireland</option>
        <option value="Israel">Israel</option>
        <option value="Italy">Italy</option>
        <option value="Jamaica">Jamaica</option>
        <option value="Japan">Japan</option>
        <option value="Jordan">Jordan</option>
        <option value="Kazakhstan">Kazakhstan</option>
        <option value="Kenya">Kenya</option>
        <option value="Kuwait">Kuwait</option>
        <option value="Kyrgyzstan">Kyrgyzstan</option>
        <option value="Laos">Laos</option>
        <option value="Latvia">Latvia</option>
        <option value="Lebanon">Lebanon</option>
        <option value="Liberia">Liberia</option>
        <option value="Lithuania">Lithuania</option>
        <option value="Luxembourg">Luxembourg</option>
        <option value="Macedonia">Macedonia</option>
        <option value="Madagascar">Madagascar</option>
        <option value="Malawi">Malawi</option>
        <option value="Malaysia">Malaysia</option>
        <option value="Malta">Malta</option>
        <option value="Marshall_Islands">Marshall Islands</option>
        <option value="Mauritius">Mauritius</option>
        <option value="Mexico">Mexico</option>
        <option value="Monaco">Monaco</option>
        <option value="Mongolia">Mongolia</option>
        <option value="Morocco">Morocco</option>
        <option value="Mozambique">Mozambique</option>
        <option value="Myanmar">Myanmar</option>
        <option value="Namibia">Namibia</option>
        <option value="Nepal">Nepal</option>
        <option value="Netherlands">Netherlands</option>
        <option value="New_Caledonia">New Caledonia</option>
        <option value="New_Zealand">New Zealand</option>
        <option value="Nicaragua">Nicaragua</option>
        <option value="Nigeria">Nigeria</option>
        <option value="Norway">Norway</option>
        <option value="Oman">Oman</option>
        <option value="Pakistan">Pakistan</option>
        <option value="Panama">Panama</option>
        <option value="Papua_New_Guinea">Papua New Guinea</option>
        <option value="Paraguay">Paraguay</option>
        <option value="Peru">Peru</option>
        <option value="Philippines">Philippines</option>
        <option value="Poland">Poland</option>
        <option value="Portugal">Portugal</option>
        <option value="Qatar">Qatar</option>
        <option value="Romania">Romania</option>
        <option value="Russia">Russia</option>
        <option value="Saudi_Arabia">Saudi Arabia</option>
        <option value="Senegal">Senegal</option>
        <option value="Serbia_Montenegro">Serbia Montenegro</option>
        <option value="Seychelles">Seychelles</option>
        <option value="Singapore">Singapore</option>
        <option value="Slovakia">Slovakia</option>
        <option value="Slovenia">Slovenia</option>
        <option value="South_Africa">South Africa</option>
        <option value="South_Korea">South Korea</option>
        <option value="Spain">Spain</option>
        <option value="Sri_Lanka">Sri Lanka</option>
        <option value="Sudan">Sudan</option>
        <option value="Suriname">Suriname</option>
        <option value="Sweden">Sweden</option>
        <option value="Switzerland">Switzerland</option>
        <option value="Syria">Syria</option>
        <option value="Tahiti">Tahiti</option>
        <option value="Taiwan">Taiwan</option>
        <option value="Tanzania">Tanzania</option>
        <option value="Thailand">Thailand</option>
        <option value="Trinidad_and_Tobago">Trinidad and Tobago</option>
        <option value="Tunisia">Tunisia</option>
        <option value="Turkey">Turkey</option>
        <option value="UAE">UAE</option>
        <option value="Uganda">Uganda</option>
        <option value="Ukraine">Ukraine</option>
        <option value="United_Kingdom">United Kingdom</option>
        <option value="United_States">United States</option>
        <option value="Uruguay">Uruguay</option>
        <option value="Uzbekistan">Uzbekistan</option>
        <option value="Venezuela">Venezuela</option>
        <option value="Vietnam">Vietnam</option>
        <option value="Yemen">Yemen</option>
        <option value="Zambia">Zambia</option>
        <option value="Zimbabwe">Zimbabwe</option>
    </datalist>

    <br/><br/>

    <label>State</label>
    <input type="text" list="state" onChange={stateDropdownHelper}/>
        <datalist id="state">
            {parse(stateListValue)}
        </datalist>
    <br/><br/>

    <label>City</label>
    <input type="text" list="city" onChange={(e) => cityFetchHelper(e)}/>
        <datalist id="city">
            {parse(cityListValue)}
        </datalist>

    <p>
        {sightingLocationData[0]?.children[2].value}
    </p>

</>
)


}

export default Dropdown