import React from 'react';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material'




function DestinationSelector({destinations, onSubmit}) {

    console.log(destinations)

    function handleSelectDestination(e){
        const selected = destinations.find(destination => destination.id === parseInt(e.target.value))
        onSubmit(selected)
    }



    return (
       <FormControl fullWidth>
           <InputLabel id="destination-label">Choose a Destination</InputLabel>
           <Select labelId="destination-label"
                    name="destination_id"
                    label="Choose a Destination"
                   onChange={handleSelectDestination}
           >{destinations.map((destination) => (
               <MenuItem value={destination.id} key={destination.id}>{destination}</MenuItem>)
           )}
           </Select>
       </FormControl>
    );
}

export default DestinationSelector;