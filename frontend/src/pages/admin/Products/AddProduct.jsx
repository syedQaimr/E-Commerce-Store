import react, { useState } from "react"
import { Typography, Box, IconButton, InputAdornment, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, TextField } from "@mui/material";
import { useEffect } from "react";
import { CurrencyRupee } from '@mui/icons-material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Autocomplete from '@mui/material/Autocomplete';
import Input from '@mui/material/Input';
import { addNewProduct, clearErrors } from '../../../actions/productAction'


import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';




export default function AddForm({ closeEvent }) {

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const { error, success } = useSelector((state) => state.newProduct)


    const categories = [
        "Laptop",
        "Electronic",
        "FoodItem",
        "Cloth",
        "HouseItem",
        "Shoes",
        "SmartPhone"
    ];




    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value)
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }

    const handleStockChange = (event) => {
        setStock(event.target.value)
    }


    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };


    const handleFileChange = (event) => {
        const filesArray = Array.from(event.target.files);

        // Filter to keep only image files
        const imageFiles = filesArray.filter((file) => file.type.startsWith('image/'));

        setSelectedFiles(imageFiles);

        // Read and store previews of selected images
        const filePreviews = imageFiles.map((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);
            };
            return reader;
        });
    };


    const createProduct = () => {


        console.log(name, price, category, description, stock, imagePreviews, 0)
        const product = { name, price, category, description, stock, images: imagePreviews, rating: 0 }
        dispatch(addNewProduct(product))


    }


    useEffect(() => {
        if (error) {
            Swal.fire("Not Submitted", "Your file has been submitted", "error");
            dispatch(clearErrors())
        }
        if (success) {
            Swal.fire("submitted", "Your file has been submitted", "success");
            dispatch({ type: 'NEW_PRODUCT_RESET' })
            closeEvent();

        }

       
    }, [error, dispatch, success])
    return (
        <>
            <Box sx={{ m: 2 }} />

            <Typography variant="h5" align="center">
                Add Products
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
                    <Autocomplete
                        id='category-combo'
                        options={categories}
                        value={category}
                        getOptionLabel={(option) => option} // Return the option itself as a string
                        onChange={(event, newValue) => setCategory(newValue)} // Update the category state on change
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Category"
                                variant="outlined"
                                size="small"
                                sx={{ minWidth: "100%" }}
                            />
                        )}
                    />

                </Grid>
                <Grid item xs={6}>
                    <TextField id='outlines-basic'
                        label="Stock"
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: "100%" }}
                        value={stock}
                        type="number"
                        onChange={handleStockChange}></TextField>
                </Grid>
                <Grid item xs={12}>
                    <Box>
                        <TextareaAutosize
                            id='outlines-basic'
                            label="Description"
                            variant="outlined"
                            size="small"
                            sx={{ minWidth: "100%" }}
                            placeholder="Description"
                            value={description}
                            onChange={handleDescriptionChange}
                            style={{ width: '100%', minHeight: '100px' }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Input
                        type="file"
                        inputProps={{ multiple: true, accept: 'image/*' }}
                        onChange={handleFileChange}
                    />
                    {/* Display selected file names and image previews */}
                    {selectedFiles.length > 0 && (
                        <div style={{ maxHeight: '200px', overflowX: 'auto' }}>

                            <div style={{ display: 'flex' }}>
                                {imagePreviews.map((preview, index) => (
                                    <img
                                        key={index}
                                        src={preview}
                                        alt={`Preview ${index}`}
                                        style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                        <Button variant="contained" onClick={createProduct}>
                            Submit
                        </Button>

                    </Typography>

                </Grid>
            </Grid>
            <Box sx={{ m: 4 }} />
        </>
    )
}