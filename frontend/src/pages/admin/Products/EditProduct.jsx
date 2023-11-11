import react, { useState } from "react"
import { Typography, Box, IconButton, InputAdornment, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, TextField } from "@mui/material";
import { useEffect } from "react";
import { CurrencyRupee } from '@mui/icons-material';
import Swal from "sweetalert2";
// import { useAppStore } from '../../AppStore'




export default function EditForm({ closeEvent , fid } ) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    // const setRows = useAppStore((state) => state.setRows);
    // const rows = useAppStore((state) => state.rows);
    const [rows , setRows] = useState([]);

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value)
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }

    useEffect(()=>{
        console.log(fid.name);
        setName(fid.name);
        setCategory(fid.category);
        setPrice(fid.price)
    },[]);


    const createUser = () => {
        closeEvent();
        const currentDate = new Date();

        
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; 
        const year = currentDate.getFullYear();

      
        const formattedDate = `${month}/${day}/${year}`;


        const product = { id: 6, name: name, price: price, category: category, date: formattedDate }
        rows.push(product);
        setRows(rows)

        Swal.fire("Updated", "Your Product has been updated", "success");
    }
    return (
        <>
            <Box sx={{ m: 2 }} />

            <Typography variant="h5" align="center">
                Update Products
            </Typography>
            <IconButton style={{ position: "absolute", top: 0, right: 0 }} onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={20} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField id='outlines-basic' label="Name" variant="outlined" size="small" sx={{ minWidth: "100%" }} value={name} onChange={handleNameChange}></TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField id='outlines-basic'
                        label="Price"
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: "100%" }}
                        value={price}
                        type="number"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CurrencyRupee />
                                </InputAdornment>
                            ),
                        }}
                        onChange={handlePriceChange}></TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField id='outlines-basic' label="Category" variant="outlined" size="small" sx={{ minWidth: "100%" }} value={category} onChange={handleCategoryChange}></TextField>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                        <Button variant="contained" onClick={createUser}>
                            Submit
                        </Button>

                    </Typography>

                </Grid>
            </Grid>
            <Box sx={{ m: 4 }} />
        </>
    )
}